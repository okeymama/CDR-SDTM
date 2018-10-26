import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName : string= '';
  constructor(private userService: UserService) { }

  ngOnInit() {
    let userDetails = this.userService.getUser();
    let userDetail = userDetails.firstName + ' ' + userDetails.lastName;
    this.userName = userDetail;
  }

}
