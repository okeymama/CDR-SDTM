import { Component, OnInit, Inject  } from '@angular/core';
import { Params,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators/map';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AlertService, AuthenticationService } from '../_services/index';
import { UserService } from '../_services/user.service';



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
  studyTitleShowOptions = false;
  therapeuticAreaShowOptions = false;
  isCheckboxSelected = false;
  checkbox: boolean;
  
  studyTitleDropdownSelected: boolean = false;
  therapeuticAreaDropdownSelected: boolean = false;
  index = 0;
  itemDuplicate :any;
  
  public ngOnInit() {
        this.dropdownList = //loadDropdown();
        					[
                              {"id":1,"itemName":"Demographics"},
                              {"id":2,"itemName":"Adverse Events"},
                              {"id":3,"itemName":"Concomitant Medications"},
                              {"id":4,"itemName":"Domain1"},
                              {"id":5,"itemName":"Domain2"},
                              {"id":6,"itemName":"Domain3"},
                              {"id":7,"itemName":"Domain4"}
                            ];

      /*  this.selectedItems = [
                              //  {"id":1,"itemName":"Demographics"},
                              //  {"id":3,"itemName":"Concomitant Medications"}

                            ];*/
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
                this.studyIds = data;
            });
        } else {
           this.fetchStudiessBytherapeuticArea(therapeuticArea).subscribe(data => {
               this.studyIds = data;
           });
        }
    }
   onItemSelect (item:any) {
    // if(typeof item!= 'undefined' && item!= null && item.length>0){
   // console.log(this.item+item+" on select before setting"+this.selectedItemsList);

    this.selectedItemsList.push(item.domain);

     }
  // }
   //console.log(" on select"+ item.itemName);

   //this.selectedItems = item;

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
    //this.jobStatus =  true;
    this.hideInstructions=true;
    this.isCheckboxSelected = false;
    //console.log( " searchJobExecution selectedItemsList");
    //console.log( this.selectedItemsList);

    let params = new HttpParams();
    console.log( "params1");
  //  params = {key: 'domain', array:  this.selectedItemsList};

  //if(typeof this.selectedItemsList!= 'undefined' && this.selectedItemsList!= null && this.selectedItemsList.length>0){
  // console.log("inside domain looop"+this.selectedItemsList);
  // this.isDomain = true;
  //  params = params.append('domain', this.selectedItemsList.toString());
  //  }
    console.log( "params2");
    params = params.append('study', searchJob.study);
    console.log( "params3");
    console.log(params);
    
    if(searchJob.study) {
      this.loading = true;
      this.studyInHeader = searchJob.study;
    
      console.log( "params4");
    //if(this.isDomain){
    //	return this.http.get<any[]>(`/api/CDR/jobStatus/${searchJob.study}/${this.selectedItemsList}`)
    //   .subscribe(data => {this.data = data });
    //}else{
    	return this.http.get<any[]>(`/api/CDR/jobsForStudy/${searchJob.study}`)
       .subscribe(data => {this.data = data });
    //}

    }else{
     this.missingFields = true;
    }

//    this.jobExecutionService.read(searchJob);

  }

  public onStateChange(state: State) {
      this.gridState = state;
  //    this.jobExecutionService.read();
  }

  public reset(searchJob,selectedItems,f): void {
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
    
    //this.view = '';
    f.form.reset();

  }

 public actionOnJobExecution(item,action){
    if(action=='Disable'){
       item.isDisabled = true;
     
    }else{
    
    	//Need to proceed only if action is not 'Disable'
    	
    	 if (action == 'Enable'){
    	    item.isDisabled = false;
    	 }else{
    		if(action=='Run'){
    			item.isLive = true;
    			item.isDisabled = false;
    			
    		}else if (action=='Abort'){
         		item.isJobAborted = true;
         		item.isLive = false;  
         		item.isDisabled = false;
         		      
    		}
   			//this.domainList.push(item.domain);
    		//domainList.push('Adverse Events');
    		let headers = new HttpHeaders();
        	headers.append('Content-Type', 'application/json');
 			return this.http.post(`http://10.0.2.254?Study_name=${item.study}&domain_array=${item.domain}&Action=${action}`,{headers: headers})
       	.subscribe(data => {this.msg = data });
		}	
 	  }
 }
 
 public runForAllSelectedDomains(){
    console.log("selected items run all"+this.selectedItemsList);
	this.allDomainsLive = true;
	 
    //null checks for study TODO
    //reload table to disable run buttons
     //this.searchJobExecution(this.searchJob,this.selectedItems);
         this.hideInstructions=true;
         this.loading= true;
     
    for (let item of this.data) {
    //this.domainList.push(item.domain);
    //above line is not reqd instead setting isLive status to true
    console.log("printing...domain..."+ item.domain + "... "+this.selectedItemsList.includes(item.domain))
    //	if(this.selectedItemsList.includes(item.domain)){
    	 console.log("match found");
    	 this.index = this.data.indexOf(item); 
    	 console.log("index found "+this.index);
    	 console.log("printing data at index "+JSON.stringify(this.data[this.index]));
    	 this.data[this.index].isLive = true;
    	 console.log("printing data at index after setting property"+JSON.stringify(this.data[this.index]));
    	 
   	//	 }
    }
    
    let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
 	return this.http.post(`http://10.0.2.254?Study_name=${this.searchJob.study}&domain_array=${this.selectedItemsList}&Action=Run`,{headers: headers})
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

  }
   
   public hideHeader(){
   this.hideInstructions = true;
   }

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
   
        if (this.studyTitleDropdownSelected === false) {
          this.therapeuticAreaShowOptions = true;
          this.therapeuticAreaDropdownSelected = true;
        } else {
          this.therapeuticAreaShowOptions = false;
          this.therapeuticAreaDropdownSelected = false;
        }
    }
}
