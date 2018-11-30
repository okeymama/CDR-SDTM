import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { AlertService, AuthenticationService, UserService } from 'src/app/SDTM/Services';
import { User } from 'src/app/SDTM/Models';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private http: Http,
        private userService: UserService
        ) { }

  ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    }
    login() {
      this.loading = true;
      return this.http.get(`/api/CDR/login?login.username=${this.model.username}&login.password=${this.model.password}`)
   .subscribe(
       data => {
       let user = data.json();
       this.userService.setUser('currentUser', user);
       this.router.navigate([this.returnUrl]);
   },
   error => {
       this.alertService.error("Username or Password is Invalid");
       this.loading = false;
   });

        }
}
