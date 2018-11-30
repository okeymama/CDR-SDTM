import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as FileSaver from 'file-saver';
import { RequestMethod, ResponseContentType} from "@angular/http";
import 'rxjs/Rx';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';
import { User } from '../Models';

@Injectable()
export class UserService {

    user : any;

    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods
    getUser() {
        return this.user;
    }

    setUser(currentUser: string, user) {
        this.user = user;
        return this.user;
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    exportFile(data){
      let headers = new Headers({
       'Content-Type': 'application/json',
       'Accept': 'application/pdf',
       'Access-Control-Allow-Origin': "http://localhost:4200",
       'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
       'Access-Control-Allow-Headers': 'Authorization, Lang',
      });

    }
  }
