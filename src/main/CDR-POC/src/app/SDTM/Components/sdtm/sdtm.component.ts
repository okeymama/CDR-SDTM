import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sdtm',
  templateUrl: './sdtm.component.html',
  styleUrls: ['./sdtm.component.css']
})
export class SdtmComponent implements OnInit {
  navBarItems: Object[];
  appName: string;

  constructor() { }

  ngOnInit() {
    this.appName = " - Path to SDTM";
    this.navBarItems = [
      {"navBarTitle": "Home", "navBarLink": ""},
      {"navBarTitle": "Study Configuration", "navBarLink": "studySetup"},
      {"navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules"},
      {"navBarTitle": "Job Execution", "navBarLink": "jobExecution"}];
  }

}
