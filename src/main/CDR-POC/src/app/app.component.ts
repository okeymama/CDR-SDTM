import { Component, OnInit, Inject  } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Location } from '@angular/common';
import { UserService } from './_services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  paramId: string;
  route: string;
  Login: boolean = false;
  currentUser:string;
  userService: UserService;
  
  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
        this.Login = false;
        console.log("printing route "+this.route)
      } else {
        this.Login = true;
        console.log("printing route1 "+this.route)
        
      }
    });
  }
  
  ngOnInit() {
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
    const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
    this.currentUser = userDetail;
    } else {
      this.currentUser = 'Admin';
    }
  }
    
  
}
