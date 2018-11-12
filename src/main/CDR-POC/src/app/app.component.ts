import { Component, OnInit, Inject  } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Location } from '@angular/common';

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
}
