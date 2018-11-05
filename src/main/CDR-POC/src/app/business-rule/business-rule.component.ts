import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Template } from '../_models/index';
import { BusinessEditService } from '../_services/index';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.css']
})
export class BusinessRuleComponent implements OnInit {
  searchBRStudy: any;
  public view: Observable<GridDataResult>;
   public gridState: State = {
       sort: [],
       skip: 0,
       take: 10
   };

   public editBizDataItem: Template;
   public isNew: boolean;
   private businessEditService: BusinessEditService;

  constructor(@Inject(BusinessEditService) businessEditServiceFactory: any) {
        this.businessEditService = businessEditServiceFactory();
  }
  public ngOnInit(): void {
         this.view = this.businessEditService.pipe(map(data => process(data, this.gridState)));

      //   this.businessEditService.read();
     }

     public fetchTemplate(searchBRStudy): void {
       this.businessEditService.read(searchBRStudy);
     }

     public onStateChange(searchBRStudy,state: State) {
         this.gridState = state;

         this.businessEditService.read(searchBRStudy);
     }

     public addHandler() {
         this.editBizDataItem = new Template();
         this.isNew = true;
     }

     public editHandler({dataItem}) {
         this.editBizDataItem = dataItem;
         this.isNew = false;
     }

     public cancelHandler() {
         this.editBizDataItem = undefined;
     }

     public saveHandler(template: Template) {
         this.businessEditService.save(template, this.isNew);

         this.editBizDataItem = undefined;
     }

     public removeHandler({dataItem}) {
         this.businessEditService.remove(dataItem, this.searchBRStudy);
     }
 }
