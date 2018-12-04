import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dataquality-home',
  templateUrl: './dataquality-home.component.html',
  styleUrls: ['./dataquality-home.component.css']
})
export class DataqualityHomeComponent implements OnInit {
  appName: string;

  constructor() { }
  

  ngOnInit() {
    this.appName = " - Data Quality";
  }

}
