import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions } from '@angular/http';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);
    }

    private data: any[] = [];
    public searchStudy: any = {};
    private res: any[] = [];

    public read(searchStudy) {
        /*if (this.data.length) {
            return super.next(this.data);
        }*/
        this.fetch(searchStudy)
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, searchStudy, isNew?: boolean ) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;
        this.reset();
        this.validateStudyDetails(data);
        this.fetch(data, action)
          .subscribe(() => this.read(searchStudy), () => this.read(searchStudy));
    }

    public validateStudyDetails(data: any): Observable<any[]>{
      return this.http.get<any[]>(`/api/CDR/study/validate/${data.studyID}`)
      .map(res => this.res = res);
    }

    public remove(data: any, searchStudy) {
        this.reset();
        this.fetch(data, REMOVE_ACTION)
            .subscribe(() => this.read(searchStudy), () => this.read(searchStudy));
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

        // revert changes
        Object.assign(originalDataItem, dataItem);
        super.next(this.data);
    }

    private reset() {
        this.data = [];
    }

    private fetch(searchStudy, action: string = '', data?: any): Observable<any> {
        let params = new HttpParams();
      if(action === 'create') {
        const searchUrl = '/api/CDR/study/create';
        let url = `${searchUrl}`;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
          return this.http.post(url, searchStudy, {headers: headers});

      } else if(action == 'update') {
        const searchUrl = '/api/CDR/study/update';
        let url = `${searchUrl}/${searchStudy.studyID}`;
        let body = JSON.stringify(searchStudy);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.put(url, searchStudy, {headers: headers});

      } else if(action == 'destroy') {
        const searchUrl = '/api/CDR/study/delete';
        let url = `${searchUrl}/${searchStudy.studyID}`;
        let body = JSON.stringify(searchStudy);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
          return this.http.delete(url, searchStudy);

      } else if(searchStudy != undefined && searchStudy != "clear") 
      {
        if (searchStudy.studyID) {
            params =  params.set('StudId', searchStudy.studyID);
            }
            if (searchStudy.title) {
            params =  params.set('StudTitle', searchStudy.title);
            }
            if (searchStudy.phase) {
            params =  params.set('StudPhase', searchStudy.phase);
            }
            if (searchStudy.status) {
            params =  params.set('StudStatus', searchStudy.status);
            }
            if (searchStudy.source) {
            params =  params.set('StudSource', searchStudy.source);
            }
            if (searchStudy.brTherapeuticArea) {
                params =  params.set('therapeuticArea', searchStudy.brTherapeuticArea); 
            }
        return this.http.get<any[]>(`/api/CDR/study/search`, { params: params })
            .pipe(map(res => <any[]>res));
      } else if(searchStudy == "clear") {
        params =  params.set('StudStatus', 'Invalid');
        return this.http.get<any[]>(`/api/CDR/study/search`, {params: params})
            .pipe(map(res => <any[]>res));
      }
    }


    public fetchStudyTitles() {
        return this.http.get<any[]>(`/api/CDR/study/dropdown`);
    }

    public fetchTherapeuticAreas() {
        return this.http.get<any[]>(`/api/CDR/matrix/therapeutics`);
    }

    public fetchStudiessBytherapeuticArea(therapeuticArea: any) {
        let params = new HttpParams();
        params =  params.set('therapeuticArea', therapeuticArea);
        return this.http.get<any[]>(`/api/CDR/study/ByTherapeuticArea`, {params: params});
    }

    public fetchStudyPhases() {
        return this.http.get<any[]>(`/api/CDR/study/phases`);
    }

    public fetchStudyStatuses() {
        return this.http.get<any[]>(`/api/CDR/study/statuses`);
    }

    public fetchStudySources() {
        return this.http.get<any[]>(`/api/CDR/study/sources`);
    }
}
