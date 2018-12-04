import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdtm-home',
  templateUrl: './sdtm-home.component.html',
  styleUrls: ['./sdtm-home.component.css']
})
export class SdtmHomeComponent implements OnInit {
  navBarItems: Object[];
  appName: string;

  constructor() { }

  ngOnInit() {
    this.appName = " - Path to SDTM";
    this.navBarItems = [
      {"navBarTitle": "Home", "navBarLink": "/sdtmHome"},
      {"navBarTitle": "Study Configuration", "navBarLink": "studySetup"},
      {"navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules"},
      {"navBarTitle": "Job Execution", "navBarLink": "jobExecution"}
  }

}
