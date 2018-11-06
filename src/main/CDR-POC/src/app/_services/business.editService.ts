import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions } from '@angular/http';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'delete';

@Injectable()
export class BusinessEditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);
    }

    private data: any[] = [];
    public searchStudy: any = {};
    private res: any[] = [];

    public read(searchBRStudy) {
        /*if (this.data.length) {
            return super.next(this.data);
        }*/
        console.log("====ssss===searchBRStudy===="+searchBRStudy);
        this.fetch(searchBRStudy)
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, searchBRStudy, isNew?: boolean ) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.reset();
        this.fetch(data, action)
          .subscribe(() => this.read(searchBRStudy), () => this.read(searchBRStudy));
    }

    public remove(data: any, searchBRStudy) {
        this.reset();
        this.fetch(data, REMOVE_ACTION)
            .subscribe(() => this.read(searchBRStudy), () => this.read(searchBRStudy));
    }

    private reset() {
        this.data = [];
    }

    private fetch(searchBRStudy, action: string = '', data?: any): Observable<any> {
    	let params = new HttpParams();
    	if(action == 'update') {
	        const updateUrl = '/api/CDR/matrix/update';
	        let url = `${updateUrl}/${searchBRStudy.id}`;
	        let body = JSON.stringify(searchBRStudy);
	        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	          return this.http.put(url, searchBRStudy, {headers: headers});
      	} else if(action == 'delete') {
	        const deleteUrl = '/api/CDR/matrix/delete';
	        let url = `${deleteUrl}/${searchBRStudy.id}`;
	        let body = JSON.stringify(searchBRStudy);
	        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	          return this.http.delete(url, searchBRStudy);
	    } else {        
	        console.log(JSON.stringify(searchBRStudy)+"=aaa==searchBRStudy=="+searchBRStudy.brStudy);
	        params =  params.set('domain', 'Invalid');
	        return this.http.get<any[]>(`/api/CDR/template/${searchBRStudy.brStudy}/${searchBRStudy.brSdtmDomain}`)
	            .pipe(map(res => <any[]>res));
    	}
	}
}
