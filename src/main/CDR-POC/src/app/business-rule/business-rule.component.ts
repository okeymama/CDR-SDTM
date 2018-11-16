import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Template } from '../_models/index';
import { BusinessEditService } from '../_services/index';
import { map } from 'rxjs/operators/map';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-business-rule',
  templateUrl: './business-rule.component.html',
  styleUrls: ['./business-rule.component.css']
})
export class BusinessRuleComponent implements OnInit {
  studyDrpSelected = false;
  studyShowOptions = false;
  phaseDrpSelected = false;
  phaseShowOptions = false;
  public drpSelected = false;
  userName = '';
  public matrixStudyTitles: any[];
  public studyTitles: any[];
  public studyDomains: any[];
  public searchBRStudy: any = {};
  public view: Observable<GridDataResult>;
   public gridState: State = {
       sort: [],
       skip: 0,
       take: 10
   };

   public editBizDataItem: Template;
   public isNew: any;
   private businessEditService: BusinessEditService;

   public drp(): void {
    this.drpSelected = !this.drpSelected;
  }

  constructor(private userService: UserService, @Inject(BusinessEditService) businessEditServiceFactory: any) {
        this.businessEditService = businessEditServiceFactory();
  }
  public ngOnInit(): void {
         this.view = this.businessEditService.pipe(map(data => process(data, this.gridState)));

      //   this.businessEditService.read();
      this.businessEditService.fetchStudyTitles().subscribe(data => {
          this.studyTitles = data;
      });
      this.businessEditService.fetchMatrixStudyTitles().subscribe(data => {
        this.matrixStudyTitles = data;
    });
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
    const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
    this.userName = userDetail;
    } else {
      this.userName = 'Admin';
    }
     }

     public fetchTemplate(searchBRStudy): void {
       this.businessEditService.read(searchBRStudy);
     }

     public onStateChange(searchBRStudy, state: State) {
         this.gridState = state;

         this.businessEditService.read(searchBRStudy);
     }

     public addHandler(flag: any) {
         this.editBizDataItem = new Template();
         this.isNew = flag;
     }

     public editHandler({dataItem}) {
         this.editBizDataItem = dataItem;
         this.isNew = 'edit';
     }

     public cancelHandler() {
         this.editBizDataItem = undefined;
     }

     public saveHandler(template: Template) {
         this.businessEditService.save(template, this.searchBRStudy, this.isNew);

         this.editBizDataItem = undefined;
     }

     public removeHandler({dataItem}) {
         this.businessEditService.remove(dataItem, this.searchBRStudy);
     }

     filterDomains(studyTitle: any) {
         if (studyTitle === 'undefined') {
            this.studyDomains = [];
         } else {
            this.businessEditService.fetchDomainsByStudy(studyTitle).subscribe(data => {
                this.studyDomains = data;
            });
         }
     }

     public clear() {
        this.searchBRStudy = {};
        this.businessEditService.read('clear');
     }

     public getDomain(): String {
        if (this.searchBRStudy != null && this.searchBRStudy.brSdtmDomain != null) {
            return this.capitalizeFirstLetter(this.searchBRStudy.brSdtmDomain) + ' Domain';
        } else {
            return 'Select a study and SDTM domain to see business rules';
        }
     }

     public studyDrp(): void {
        if (this.studyDrpSelected === false) {
          this.studyShowOptions = true;
          this.studyDrpSelected = true;
        } else {
          this.studyShowOptions = false;
          this.studyDrpSelected = false;
        }
      }
      public phaseDrp(): void {
        if (this.phaseDrpSelected === false) {
          this.phaseShowOptions = true;
          this.phaseDrpSelected = true;
        } else {
          this.phaseShowOptions = false;
          this.phaseDrpSelected = false;
        }
      }

      capitalizeFirstLetter(str) {
          let temp = str;
          if (str != null && str.length > 2) {
            temp = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
          }
         return temp;
      }

      public getStudy(): String {
        if (this.searchBRStudy != null && this.searchBRStudy.brMatrixStudy != null) {
            return this.capitalizeFirstLetter(this.searchBRStudy.brMatrixStudy) + ' Study';
        }
     }
 }
