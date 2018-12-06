import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BusinessResolverService implements Resolve<any> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const study: any = route.params['studyTitle'];
    return this.http.get<any[]>(`/api/CDR/busRules/domains/${study}`);
  }
}
