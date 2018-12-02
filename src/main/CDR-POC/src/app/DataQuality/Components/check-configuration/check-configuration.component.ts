import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-configuration',
  templateUrl: './check-configuration.component.html',
  styleUrls: ['./check-configuration.component.css']
})
export class CheckConfigurationComponent implements OnInit {

  appName: string;
  constructor() { }

  ngOnInit() {
    this.appName = "Data Quality";
  }

}
