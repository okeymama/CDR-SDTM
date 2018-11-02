import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {Router} from '@angular/router';
import { BreadcrumbsService } from '../../../node_modules/ng6-breadcrumbs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName = '';
  public location = '' ;
  constructor(private userService: UserService, private  _router: Router) {
    this.location = _router.url;
   }

  ngOnInit() {
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
    const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
    this.userName = userDetail;
    } else {
      this.userName = 'Admin';
    }
  }

}
