import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Matrix } from '../_models/index';
import { BusinessEditService } from '../_services/index';
import { map } from 'rxjs/operators/map';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';

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
  statusDrpSelected = false;
  statusShowOptions = false;
  public drpSelected = false;
  userName = '';
  public matrixStudyTitles: any[];
  public therapeuticAreas: any[];
  public studyTitles: any[];
  public studyDomains: any[];
  public searchBRStudy: any = {};
  public importTemplate: any = {};
  public view: Observable<GridDataResult>;
   public gridState: State = {
       sort: [],
       skip: 0,
       take: 50
   };

   public editBizDataItem: Matrix;
   public isNew: any;
   private businessEditService: BusinessEditService;

   public drp(): void {
    this.drpSelected = !this.drpSelected;
  }

  constructor(private route: ActivatedRoute,
    private userService: UserService, @Inject(BusinessEditService) businessEditServiceFactory: any) {
        this.businessEditService = businessEditServiceFactory();
  }
  public ngOnInit(): void {
         this.view = this.businessEditService.pipe(map(data => process(data, this.gridState)));

      //   this.businessEditService.read();
      this.businessEditService.fetchStudyTitles().subscribe(data => {
          this.studyTitles = data;
      });
      this.businessEditService.fetchTherapeuticAreas().subscribe(data => {
        this.therapeuticAreas = data;
    });
     /* this.businessEditService.fetchMatrixStudyTitles().subscribe(data => {
        this.matrixStudyTitles = data;
    });*/
    const userDetails = this.userService.getUser();
    if (userDetails !== undefined) {
    const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
    this.userName = userDetail;
    } else {
      this.userName = 'Admin';
    }
    const title = this.route.snapshot.paramMap.get('studyTitle');
    const therapeuticArea = this.route.snapshot.paramMap.get('therapeuticArea');
       if (title != null && therapeuticArea != null) {
             this.importTemplate.brStudy = title;
             this.importTemplate.therapeuticArea = therapeuticArea;
             this.addHandler('import', this.importTemplate);
       }
     }

     public fetchTemplate(searchBRStudy): void {
       this.businessEditService.read(searchBRStudy);
     }

     public onStateChange(searchBRStudy, state: State) {
         this.gridState = state;

         this.businessEditService.read(searchBRStudy);
     }

     public addHandler(flag: any, searchBRStudy: any) {
         this.editBizDataItem = new Matrix();
         this.editBizDataItem.study = searchBRStudy.brStudy;
         if (flag === 'add') {
         this.editBizDataItem.domain = searchBRStudy.brSdtmDomain;
         }
         this.isNew = flag;
     }

     public editHandler({dataItem}) {
         this.editBizDataItem = dataItem;
         this.isNew = 'edit';
     }

     public cancelHandler() {
         this.editBizDataItem = undefined;
     }

     public saveHandler(template: Matrix) {
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

     filterStudies(therapeuticArea: any) {
        if (therapeuticArea === 'undefined') {
            // do nothing
        } else if (therapeuticArea === 'all') {
            this.businessEditService.fetchStudyTitles().subscribe(data => {
                this.studyTitles = data;
            });
        } else {
           this.businessEditService.fetchStudiessBytherapeuticArea(therapeuticArea).subscribe(data => {
               this.studyTitles = data;
           });
        }
    }

     public clear() {
        this.searchBRStudy = {};
        this.importTemplate = {};
        this.studyDomains = [];
        this.studyShowOptions = false;
        this.studyDrpSelected = false;
        this.phaseShowOptions = false;
        this.phaseDrpSelected = false;
        this.statusShowOptions = false;
        this.statusDrpSelected = false;
        this.businessEditService.read('clear');
     }

     public getDomain(): String {
        if (this.searchBRStudy != null && this.searchBRStudy.brSdtmDomain != null) {
            return this.capitalizeFirstLetter(this.searchBRStudy.brSdtmDomain) + ' Domain';
        }
          return null;
          // else {
           // return 'Select a study and SDTM domain to see business rules';
        // }
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

      public statusDrp(): void {
        if (this.statusDrpSelected === false) {
          this.statusShowOptions = true;
          this.statusDrpSelected = true;
        } else {
          this.statusShowOptions = false;
          this.statusDrpSelected = false;
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
        if (this.searchBRStudy != null && this.searchBRStudy.brStudy != null) {
            return this.capitalizeFirstLetter(this.searchBRStudy.brStudy) + ' Study';
        }
     }
 }
