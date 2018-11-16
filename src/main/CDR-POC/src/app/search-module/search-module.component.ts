import { Component, OnInit, Inject  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { StudyDetails } from '../_models/index';
import { map } from 'rxjs/operators/map';
import { EditService } from '../_services/index';
import { AlertService } from '../_services/index';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-search-module',
  templateUrl: './search-module.component.html',
  styleUrls: ['./search-module.component.css']
})
export class SearchModuleComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };
    public userName = '';
    public studyTitles: any[];
    public formGroup: FormGroup;
    public editDataItem: StudyDetails;
    public isNew: boolean;
    public searchStudy: any = {};
    private editService: EditService;
    paramId: string;
    studyDrpSelected: boolean = false;
    studyShowOptions: boolean = false;
    phaseDrpSelected: boolean = false;
    phaseShowOptions: boolean = false;
    statusDrpSelected: boolean = false;
    statusShowOptions: boolean = false;
    sourceDrpSelected: boolean = false;
    sourceShowOptions: boolean = false;
    constructor(private userService: UserService,private route: ActivatedRoute, @Inject(EditService) editServiceFactory: any) {
        this.editService = editServiceFactory();
    }

    public ngOnInit(): void {
        this.getModule();
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));
        const userDetails = this.userService.getUser();
        if (userDetails !== undefined) {
        const userDetail = userDetails.firstName + ' ' + userDetails.lastName;
        this.userName = userDetail;
        } else {
          this.userName = 'Admin';
        }
        this.editService.fetchStudyTitles().subscribe(data => {
          this.studyTitles = data;
      });
    }

    public getModule(): void {
      this.paramId = this.route.snapshot.paramMap.get('id');
    }

    public fetch(searchStudy): void {
      this.editService.read(searchStudy);
    }

    public studyDrp(): void {
      if(this.studyDrpSelected == false){
        this.studyShowOptions = true;
        this.studyDrpSelected = true;
      }else{
        this.studyShowOptions = false;
        this.studyDrpSelected = false;
      }
    }

    public phaseDrp(): void {
      if(this.phaseDrpSelected == false){
        this.phaseShowOptions = true;
        this.phaseDrpSelected = true;
      }else{
        this.phaseShowOptions = false;
        this.phaseDrpSelected = false;
      }
    }

    public statusDrp(): void {
      if(this.statusDrpSelected == false){
        this.statusShowOptions = true;
        this.statusDrpSelected = true;
      }else{
        this.statusShowOptions = false;
        this.statusDrpSelected = false;
      }
    }

    public sourceDrp(): void {
      if(this.sourceDrpSelected == false){
        this.sourceShowOptions = true;
        this.sourceDrpSelected = true;
      }else{
        this.sourceShowOptions = false;
        this.sourceDrpSelected = false;
      }
    }

    public clear() {
       this.searchStudy = {};
       this.editService.read("clear");
    }
    public onStateChange(searchStudy,state: State) {
        this.gridState = state;
        this.editService.read(searchStudy);
    }

    public addHandler() {
        this.editDataItem = new StudyDetails();
        this.isNew = true;
    }

    public editHandler({dataItem}, searchStudy) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(studyDetails: StudyDetails) {
        this.editService.save(studyDetails, this.searchStudy, this.isNew);
        this.editDataItem = undefined;
    }

    public removeHandler({dataItem}) {
        this.editService.remove(dataItem, this.searchStudy);
    }
}
