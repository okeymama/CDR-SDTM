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
const IMPORT_ACTION = 'import';

@Injectable()
export class BusinessEditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);
    }

    private data: any[] = [];
    public searchBRStudy: any = {};
    private res: any[] = [];

    public read(searchBRStudy) {
        /*if (this.data.length) {
            return super.next(this.data);
        }*/
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

    public fetchStudyTitles() {
        return this.http.get<any[]>(`/api/CDR/study/dropdown`);
    }
    public fetchMatrixStudyTitles() {
        return this.http.get<any[]>(`/api/CDR/matrix/importStudy`);
    }
    public fetchDomainsByStudy(study: any) {
        return this.http.get<any[]>(`/api/CDR/busRules/domains/${study}`);
    }

    public fetchTransformationTypes() {
        return this.http.get<any[]>(`/api/CDR/matrix/transformations`);
    }

    public fetchLookUpData() {
        return this.http.get<any[]>(`/api/CDR/lookup/sourcetables`);
    }

    public fetchSDTMVariables() {
        return this.http.get<any[]>(`/api/CDR/matrix/targetVariables`);
    }

    public fetchTherapeuticAreas() {
        return this.http.get<any[]>(`/api/CDR/matrix/therapeutics`);
    }

    public fetchStudiessBytherapeuticArea(therapeuticArea: any) {
        let params = new HttpParams();
        params =  params.set('therapeuticArea', therapeuticArea);
        return this.http.get<any[]>(`/api/CDR/study/ByTherapeuticArea`, {params: params});
    }

    public save(data: any, searchBRStudy, isNew?: any ) {
        let action = '';
        if (isNew === 'add') {
            action = CREATE_ACTION;
        } else if (isNew === 'edit') {
            action = UPDATE_ACTION;
        } else if (isNew === 'import') {
            action = IMPORT_ACTION;
        }
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
        if (action === 'create') {
            const searchUrl = '/api/CDR/matrix/create';
            let url = `${searchUrl}`;
            let headers = new HttpHeaders();
            headers.append('Content-Type', 'application/json');
              return this.http.post(url, searchBRStudy, {headers: headers});
          } else if (action === 'update') {
                const updateUrl = '/api/CDR/matrix/update';
                let url = `${updateUrl}/${searchBRStudy.id}`;
                let body = JSON.stringify(searchBRStudy);
                let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                return this.http.put(url, searchBRStudy, {headers: headers});
        } else if (action === 'delete') {
                const deleteUrl = '/api/CDR/matrix/delete';
                let url = `${deleteUrl}/${searchBRStudy.id}`;
                let body = JSON.stringify(searchBRStudy);
                let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                return this.http.delete(url, searchBRStudy);
        } else if (searchBRStudy === 'clear') {
                return this.http.get<any[]>(`/api/CDR/matrix/fetchOrInsert/${searchBRStudy}/${searchBRStudy}/${searchBRStudy}`)
                .pipe(map(res => <any[]>res));
        } else if (action === 'import') {
                console.log(JSON.stringify(searchBRStudy)+"=aaa==searchBRStudy=="+searchBRStudy.study);
                params =  params.set('domain', 'Invalid');
                return this.http.get<any[]>(`/api/CDR/matrix/fetchOrInsert/${searchBRStudy.study}/${searchBRStudy.matrixStudy}/${searchBRStudy.domain}`)
                .pipe(map(res => <any[]>res));
        } else {
                if (searchBRStudy.brStudy) {
                    params =  params.set('StudId', searchBRStudy.brStudy);
                    }
                    if (searchBRStudy.brSdtmDomain) {
                    params =  params.set('StudDomain', searchBRStudy.brSdtmDomain);
                    }
                return this.http.get<any[]>(`/api/CDR/matrix/search`, { params: params })
                    .pipe(map(res => <any[]>res));
        }}
}
