import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { ActivatedRoute } from '@angular/router';
import { Matrix } from '../../Models';
import { BusinessEditService, UserService } from '../../Services';
import { Router } from '@angular/router';


@Component({
  selector: 'business-rule-config',
  templateUrl: './business-rule-config.component.html',
  styleUrls: ['./business-rule-config.component.css']
})
export class BusinessRuleConfigComponent implements OnInit {

    configTypeImage: string;
    configTypeTitle: string;
    configTypeIcons: Object[];
    navBarItems: Object[];
  studyDrpSelected = false;
  studyShowOptions = false;
  phaseDrpSelected = false;
  phaseShowOptions = false;
  statusDrpSelected = false;
  statusShowOptions = false;
  public drpSelected = false;
  userName = '';
  results: any[];
  public matrixStudyTitles: any[];
  public therapeuticAreas: any[];
  public studyTitles: any[];
  public studyDomains: any[];
  public searchBRStudy: any = {};
  public importTemplate: any = {};
  public selectedDomains: any[];
  public view: Observable<GridDataResult>;
   public gridState: State = {
       sort: [],
       skip: 0,
       take: 50
   };
   public sortable= false; 
   public editBizDataItem: Matrix;
   public isNew: any;
   private businessEditService: BusinessEditService;

   public drp(): void {
    this.drpSelected = !this.drpSelected;
  }

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    @Inject(BusinessEditService) businessEditServiceFactory: any,
    private router: Router) {
        this.businessEditService = businessEditServiceFactory();
  }
  public ngOnInit(): void {
      this.configTypeIcons = [
        {"icontitle": "Data Lineage", "iconImageSrc": "assets/images/DataLineage.png","action":"lineage","inputParam":""},
        {"icontitle": "Import from Template or Library", "iconImageSrc": "assets/images/RightImage1.png",  "action":"import","inputParam":this.importTemplate},
        {"icontitle": "Upload", "iconImageSrc": "assets/images/NewNote.png", "action":"","inputParam":""},
        {"icontitle": "Download", "iconImageSrc": "assets/images/studyDownload.png", "action":"","inputParam":""},
        {"icontitle": "Add Business Rule", "iconImageSrc": "assets/images/AddStudy.png","action":"add","inputParam":this.searchBRStudy}
       
      ];
      this.navBarItems = [
        {"navBarTitle": "Home", "navBarLink": "/sdtmHome"},
        {"navBarTitle": "Study Configuration", "navBarLink": "studySetup"},
        {"navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules"},
        {"navBarTitle": "Job Execution", "navBarLink": "jobExecution"}];
    this.configTypeImage = '../../../assets/images/BussRules.png';
    this.configTypeTitle = 'Business Rule Configuration';
         this.view = this.businessEditService.pipe(map(data => process(data, this.gridState)));
        /* console.log("view: "+this.view.length);
         if (this.view.length!=undefined){
                  console.log("sortable ngOnit: "+this.sortable);
                 this.sortable=true;
         } */
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
    const title = this.route.snapshot.paramMap.get('studyTitle');
    let therapeuticArea = this.route.snapshot.paramMap.get('therapeuticArea');
       if (title != null && therapeuticArea != null) {
        therapeuticArea = therapeuticArea.replace(new RegExp(/-/g), '/');
        this.studyDomains = this.route.snapshot.data['reqDomains'];
            if (this.studyDomains != null && this.studyDomains.length > 0) {
                this.searchBRStudy.brStudy = title;
                this.searchBRStudy.brSdtmDomain = this.studyDomains[0].domain;
                this.businessEditService.read(this.searchBRStudy);
            } else {
             this.importTemplate.brStudy = title;
             this.importTemplate.therapeuticArea = therapeuticArea;
             this.addHandler('import', this.importTemplate);
           }
       }
     }

     public fetchTemplate(searchBRStudy): void {
        if (searchBRStudy.brSdtmDomain) {
           if(this.configTypeIcons.length === 5){
            this.configTypeIcons.unshift( {"icontitle": "Go to job execution for this study", "iconImageSrc": "assets/images/JobExeGrey.png","action":"job","inputParam":this.searchBRStudy});
            }
        }
       this.sortable=true;
       console.log("sortable in fetch template");
       this.businessEditService.read(searchBRStudy);
       
     }

     public onStateChange(searchBRStudy, state: State) {
         this.gridState = state;
         console.log("sortable value: "+this.sortable);
         if(this.sortable == true){
         	this.businessEditService.read(searchBRStudy);
         }
         
     }

     addHandlerIconClick(data) {
        
         if (!data.flag) return; 
         else if (data.flag === 'job') {
            this.router.navigate(['/sdtm/jobExecution', this.searchBRStudy.brStudy]);
         } else if(data.flag === 'lineage'){
            window.open("https://portal.graphgist.org/", '_blank');
         }else {
             this.addHandler(data.flag, data.inputParam);
         }
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
        this.editBizDataItem = dataItem;
        this.isNew = 'delete';
     }

     public deleteHandler(template: Matrix) {
        this.businessEditService.remove(template, this.searchBRStudy);
        this.editBizDataItem = undefined;
      }

      public fetchHandler(template: Matrix) {
        let domains = [];
        this.importTemplate.study = template.study;
        this.selectedDomains = template.importDomain;

        this.selectedDomains.sort(function(a, b) {
            const nameA = a.domainLabel.toLowerCase();
            const nameB = b.domainLabel.toLowerCase();
            if (nameA < nameB) {
                return -1;
            } else if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        for (let i = 0; i < this.selectedDomains.length; i++) {
            domains.push(this.selectedDomains[i].domain);
        }
        this.importTemplate.domain = domains;
        this.importTemplate.matrixStudy = template.matrixStudy;
        this.searchBRStudy.brStudy = template.study;
        this.searchBRStudy.brSdtmDomain = domains[0];
        this.businessEditService.save(this.importTemplate, this.searchBRStudy, 'import');
        this.businessEditService.fetchDomainsByStudy(this.searchBRStudy.brStudy).subscribe(data => {
            this.studyDomains = data;
        });
        this.editBizDataItem = undefined;
      }

     filterDomains(studyTitle: any) {
        this.searchBRStudy.brSdtmDomain = undefined;
        this.businessEditService.read('clear');
        this.studyDomains = [];
         if (studyTitle !== 'undefined') {
            this.businessEditService.fetchDomainsByStudy(studyTitle).subscribe(data => {
                this.studyDomains = data;
            });
         }
     }

     filterStudies(therapeuticArea: any) {
        this.businessEditService.read('clear');
        this.studyDomains = [];
        this.searchBRStudy.brSdtmDomain = undefined;
        this.searchBRStudy.brStudy = undefined;
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
        this.businessEditService.fetchStudyTitles().subscribe(data => {
            this.studyTitles = data;
        });
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
        if (this.configTypeIcons.length === 6) {
                 this.configTypeIcons.shift();
        }
        this.sortable=false;
     }

     public getDomain(): String {
        let selectedDomain = '';
        if (this.searchBRStudy != null && this.searchBRStudy.brSdtmDomain != null
             && this.studyDomains != null && this.studyDomains.length > 0) {
            for (let i = 0; i < this.studyDomains.length; i++) {
                if (this.studyDomains[i].domain === this.searchBRStudy.brSdtmDomain) {
                    selectedDomain = this.studyDomains[i].domainLabel;
                    break;
                }
            }
            return this.capitalizeFirstLetter(selectedDomain) + ' Domain';
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
        if (this.searchBRStudy != null && this.searchBRStudy.brStudy != null && this.searchBRStudy.brSdtmDomain != null) {
            return this.capitalizeFirstLetter(this.searchBRStudy.brStudy) + ' Study';
        }
     }
 }

