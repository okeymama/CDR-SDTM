import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'check-configuration',
  templateUrl: './check-configuration.component.html',
  styleUrls: ['./check-configuration.component.css']
})
export class CheckConfigurationComponent implements OnInit {

  appName: string;
  configTypeIcons: Object[];
  configTypeImage: string;
    configTypeTitle: string;
  constructor() { }

  ngOnInit() {
    this.configTypeImage = "assets/images/NewStudyConf.png";
    this.configTypeTitle= "Check Configuration";
    this.configTypeIcons = [
      {"icontitle": "Add Study", "iconImageSrc": "assets/images/AddStudy.png", "action":"add","inputParam":""},
      {"icontitle": "Upload", "iconImageSrc": "assets/images/NewNote.png", "action":"","inputParam":""},
      {"icontitle": "Download", "iconImageSrc": "assets/images/studyDownload.png", "":"","inputParam":""},
      {"icontitle": "Refresh", "iconImageSrc": "assets/images/Refresh.png"}
     
    ];
    this.appName = "Data Quality";
  }

}
