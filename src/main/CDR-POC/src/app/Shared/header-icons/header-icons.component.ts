import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Matrix } from 'src/app/SDTM/Models';

@Component({
  selector: 'header-icons',
  templateUrl: './header-icons.component.html',
  styleUrls: ['./header-icons.component.css']
})
export class HeaderIconsComponent implements OnInit {

  @Input() configTypeImage: string;
  @Input() configTypeTitle: string;
  @Input() configTypeIcons: Object[];
  @Output() iconClick = new EventEmitter();
  public editBizDataItem: Matrix;

  constructor() { }
  ngOnInit() {
  }

  public addHandler(flag: any, inputParam: any) {
   
    console.log("flag   "+flag);
    this.iconClick.emit({flag, inputParam});
  
  }

}
