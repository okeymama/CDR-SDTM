import { Component, OnInit, Inject  } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { UserService, AlertService } from '../../Services';




@Component({
  selector: 'app-job-execution',
  templateUrl: './job-execution.component.html',
  styleUrls: ['./job-execution.component.css']
})
export class JobExecutionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private alertService: AlertService,
    private userService: UserService
  ){ }

  public view: Observable<GridDataResult>;
  data: any[] = [];
  private msg: any;
  jobStatus: boolean = false;
  isLive: boolean = false;
  isJobAborted = false;
  isDomain: boolean = false;
  allDomainsLive: boolean = false;
  public gridState: State = {
      sort: [],
      skip: 0,
    };
    take: 10;

  public formGroup: FormGroup;
  public searchJob: any = {};
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedItemsList = [];
  loading = false;
  missingFields = false;
  public studyTitles: any[];
  public studyIds: any[];
  public therapeuticAreas: any[];
  domainList = [];
  drpSelected: boolean = false;
  public userName = '';
  studyInHeader = '';
  hideInstructions: boolean = false;
  hideDropdowns: boolean = false;
  studyTitleShowOptions = false;
  therapeuticAreaShowOptions = false;
  isCheckboxSelected = false;
  checkbox: boolean;
  
  studyTitleDropdownSelected: boolean = false;
  therapeuticAreaDropdownSelected: boolean = false;
  index = 0;
  itemDuplicate :any;
   configTypeIcons: Object[];
  configTypeImage: string;
  configTypeTitle: string;
  navBarItems: Object[];

  
  public ngOnInit() {

    this.configTypeIcons = [
      {"icontitle": "Download", "iconImageSrc": "assets/images/studyDownload.png", "":"","inputParam":""},
      //{"icontitle": "Upload", "iconImageSrc": "assets/images/NewNote.png", "action":"","inputParam":""},
      {"icontitle": "Refresh", "iconImageSrc": "assets/images/Refresh.png", "action":this.searchJob,"inputParam":this.selectedItems}
     
    ];
    this.navBarItems = [
      {"navBarTitle": "Home", "navBarLink": "/sdtmHome"},
      {"navBarTitle": "Study Configuration", "navBarLink": "studySetup"},
      {"navBarTitle": "Business Rule Configuration", "navBarLink": "businessRules"},
      {"navBarTitle": "Job Execution", "navBarLink": "jobExecution"}]
  this.configTypeImage = "assets/images/JobExecution.png";
  this.configTypeTitle= "Job Execution";
    
        this.dropdownList = 
        					[
                              {"id":1,"itemName":"Demographics"},
                              {"id":2,"itemName":"Adverse Events"},
                              {"id":3,"itemName":"Concomitant Medications"},
                              {"id":4,"itemName":"Domain1"},
                              {"id":5,"itemName":"Domain2"},
                              {"id":6,"itemName":"Domain3"},
                              {"id":7,"itemName":"Domain4"}
                            ];

     
        this.dropdownSettings = {
                            singleSelection: false,
                            idField: 'id',
                            textField: 'itemName',
                            selectAllText: 'Select All',
                            unSelectAllText: 'Unselect All',
                            itemsShowLimit: 3,
                            maxHeight: 190,//197 is deafult
                            allowSearchFilter: true
                          };
        this.fetchStudyTitles().subscribe(data => {
          this.studyTitles = data;
      });
       this.fetchStudyIds().subscribe(data => {
          this.studyIds = data;
      });
        this.fetchTherapeuticAreas().subscribe(data => {
        this.therapeuticAreas = data;
    });
      
       const userDetails = this.userService.getUser();
        if (userDetails !== undefined) {
        const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
        this.userName = userDetail;
        } else {
          this.userName = 'Admin';
        }
        // Code added  when we come from business rules screen
        const title = this.route.snapshot.paramMap.get('studyTitle');
        if (title != null && title !== undefined && title !== 'undefined') {
          this.searchJob.study = title;
          this.searchJobExecution(this.searchJob, undefined);
        }
   }

   addHandlerIconClick(data){
    if(!data.flag) return; 
   this.refresh(data.flag, data.inputParam);
}
    public fetchStudyTitles() {
        return this.http.get<any[]>(`/api/CDR/study/dropdown`);
    }
    public fetchStudyIds() {
        return this.http.get<any[]>(`/api/CDR/matrix/therapeutics`);
    }
     public fetchTherapeuticAreas() {
        return this.http.get<any[]>(`/api/CDR/matrix/therapeutics`);
    }

    public fetchStudiessBytherapeuticArea(therapeuticArea: any) {
        let params = new HttpParams();
        params =  params.set('therapeuticArea', therapeuticArea);
        return this.http.get<any[]>(`/api/CDR/study/ByTherapeuticArea`, {params: params});
    }
    
      filterStudyIds(therapeuticArea: any) {
        if (therapeuticArea === 'undefined') {
            // do nothing
        } else if (therapeuticArea === 'all') {
            this.fetchStudyTitles().subscribe(data => {
                this.studyTitles = data;
            });
        } else {
           this.fetchStudiessBytherapeuticArea(therapeuticArea).subscribe(data => {
               this.studyTitles = data;
           });
        }
    }
   
   onItemSelect (item:any) {
      this.selectedItemsList.push(item.domain);

   }
  

  loadDropdown(){
        let params = new HttpParams();
		const searchUrl = '/api/CDR/study/dropdown';
        let url = `${searchUrl}`;
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.get(url, {headers: headers});
   }

 onSelectAll (items: any) {
   console.log(items);
 }


  public searchJobExecution(searchJob,selectedItems) {
    this.hideInstructions=true;
    this.isCheckboxSelected = false;
    let params = new HttpParams();
    console.log( "params1");

  
    console.log( "params2");
    params = params.append('study', searchJob.study);
    console.log( "params3");
    console.log(params);
    
    if(searchJob.study) {
      this.loading = true;
      this.studyInHeader = searchJob.study;
    
      console.log( "params4");
    
    	return this.http.get<any[]>(`/api/CDR/jobsForStudy/${searchJob.study}`)
       .subscribe(data => {this.data = data });

    }else{
     this.missingFields = true;
    }


  }

  public onStateChange(state: State) {
      this.gridState = state;
  }

  public reset(searchJob,selectedItems,f): void {
    this.hideDropdowns = true;
    this.searchJob.domain = "";
    this.searchJob.study = "";
    this.selectedItemsList = [];
    this.jobStatus =  false;
    this.loading = false;
    this.data = [];
    this.domainList = [];
   	this.allDomainsLive = false;
    this.hideInstructions = false;
    this.checkbox = false;
    this.isCheckboxSelected = !this.isCheckboxSelected;
    this.studyTitleShowOptions = false;
    this.therapeuticAreaShowOptions = false;
    this.studyTitleDropdownSelected = false;
    this.therapeuticAreaDropdownSelected = false;
    this.studyInHeader = '';
    this.msg = '';
    
    //this.view = '';
    f.form.reset();

  }

 public actionOnJobExecution(item,action){
    if(action=='Disable'){
       item.jobDisabled = 'Y';
       this.callUpdateService(item);
       
       
    }else{
    
    	//Need to proceed only if action is not 'Disable'
    	
    	 if (action == 'Enable'){
    	    item.jobDisabled = 'N';
       		this.callUpdateService(item);
            
    	 }else{
    		if(action=='Run'){
    			item.isLive = true;
    			
    		}else if (action=='Abort'){
         		item.isJobAborted = true;
         		item.isLive = false;  
         		      
    		}
   		
    		let headers = new HttpHeaders();
        	headers.append('Content-Type', 'application/json');
     //	return this.http.post(`http://10.0.2.254?Study_name=${item.study}&domain_array=${item.domain}&Action=${action}`,{headers: headers})
     return this.http.post(`http://10.0.2.156?Study_name=${item.study}&domain_array=${item.domain}&Action=${action}`,{headers: headers})
       	.subscribe(data => {this.msg = data });
		}	
 	  }
 }
 
 public runForAllSelectedDomains(){
     console.log("checkbox"+this.checkbox);
     console.log("chkbox sel value"+this.isCheckboxSelected);
 
    console.log("selected items run all"+this.selectedItemsList);
	this.allDomainsLive = true;
	
	if(this.checkbox && this.isCheckboxSelected){
	// header checkbox has been clicked so push all domains into selectedItemsList
	    for (let item of this.data) {
	    //if (!item.isDisabled){
	    if (item.jobDisabled!='Y'){	    
	     this.selectedItemsList.push(item.domain);
	     }
		}
	}
	 
    //null checks for study TODO
    //reload table to disable run buttons
         this.hideInstructions=true;
         this.loading= true;
     
    for (let item of this.data) {
    //this.domainList.push(item.domain);
    //above line is not reqd instead setting isLive status to true
    console.log("printing...domain..."+ item.domain + "... "+this.selectedItemsList.includes(item.domain))
    	if(this.selectedItemsList.includes(item.domain)){
    	 console.log("match found");
    	 this.index = this.data.indexOf(item); 
    	 console.log("index found "+this.index);
    	 console.log("printing data at index "+JSON.stringify(this.data[this.index]));
    	 this.data[this.index].isLive = true;
    	 //this.data[this.index].isDisabled = false;
    	 console.log("printing data at index after setting property"+JSON.stringify(this.data[this.index]));
    	 
   	 }
    }
    
    let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
 	return this.http.post(`http://10.0.2.156?Study_name=${this.searchJob.study}&domain_array=${this.selectedItemsList}&Action=Run`,{headers: headers})
       .subscribe(data => {this.msg = data });
 	
 }
  
   
   public refresh(searchJob,selectedItems): void {
   
    this.jobStatus =  false;
    this.loading = false;
    this.data = [];
    this.domainList = [];
   	this.allDomainsLive = false;
    this.isCheckboxSelected = false;
    this.checkbox = false;
    this.selectedItemsList = [];
    this.searchJobExecution(searchJob,selectedItems);
    this.msg = '';

  }
   
  /* public hideHeader(){
   		this.hideInstructions = true;
    
   }*/

  public studyTitleDropdown(): void {
        if (this.studyTitleDropdownSelected === false) {
          this.studyTitleShowOptions = true;
          this.studyTitleDropdownSelected = true;
        } else {
          this.studyTitleShowOptions = false;
          this.studyTitleDropdownSelected = false;
        }
    }
    
    public therapeuticAreaDropdown(): void {
   
        if (this.therapeuticAreaDropdownSelected === false) {
          this.therapeuticAreaShowOptions = true;
          this.therapeuticAreaDropdownSelected = true;
        } else {
          this.therapeuticAreaShowOptions = false;
          this.therapeuticAreaDropdownSelected = false;
        }
    }
    public callUpdateService(item) {
      console.log('uniqueId ' + item.job_id + 'jobDisabled ' + item.jobDisabled);
      const searchUrl = '/api/CDR/updateJobs';
      const url = `${searchUrl}/${item.job_id}/${item.jobDisabled}`;
      console.log('url  ' + url);
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put(url, item , {headers: headers}).subscribe(data => {
        console.log('Job Status:' + data);
      });
   }
   /*
    public navigateBusinessImport(dataItem: any) {
      // this.router.navigate(['/sdtmHome/businessRules', {studyTitle: dataItem.title, therapeuticArea: dataItem.therapeuticArea}]);
      this.businessEditService.setImportStudyMessage("true");
      this.router.navigate([`/sdtm/businessRules/${dataItem.title}/${dataItem.therapeuticArea.replace(new RegExp(/\//g), '-')}`]);
    }*/
}
