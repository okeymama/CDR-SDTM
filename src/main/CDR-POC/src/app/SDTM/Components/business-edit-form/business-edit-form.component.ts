import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';


import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions } from '@angular/http';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { BusinessEditService } from '../../Services';
import { Matrix } from '../../Models';



@Component({
    selector: 'kendo-grid-business-edit-form',
    styles: [
        'style="background-color : black"',
    ],
    templateUrl: './business-edit-form.component.html'
})
export class BusinessEditFormComponent implements OnInit {
    public matrixStudyTitles: any[];
    public studyTitles: any[];
    public studyDomains: any[];
    public selectedDomains: any[];
    public searchBRStudy: any = {};
    public importTemplate: any = {};
    public transPlaceHolder = 'Enter Transformation Logic'; 
    private businessEditService: BusinessEditService;
    public transTypes: any[];
    public lookups: any[];
    public lookupVariables: any[];
    public lookupTables: any[];
    public sdtmVariables: any[];
    public active = false;
    public opened: boolean = false;
    public errorMsg: string;
    public editBusinessForm: FormGroup = new FormGroup({
        'id': new FormControl(),
        'study': new FormControl(),
        'matrixStudy': new FormControl(),
        'domain': new FormControl(),
        'importDomain': new FormControl(),
        'subDomain': new FormControl(),
        'targetFile': new FormControl(),
        'targetField': new FormControl(),
        'sourceFile': new FormControl(),
        'sourceField': new FormControl(),
        'joinLogic': new FormControl(),
        'transformation_type': new FormControl(),
        'transformation_logic': new FormControl()
    });

    constructor(private http: HttpClient, @Inject(BusinessEditService) businessEditServiceFactory: any) {
        this.businessEditService = businessEditServiceFactory();
    }
    private res: any[] = [];
    @Input() public isNew = false;

    @Input() public set model(matrix: Matrix) {
        this.editBusinessForm.reset(matrix);
        this.active = matrix !== undefined;
        if (this.active && matrix.transformation_type) {
            this.changePlaceholderAndValue(matrix.transformation_type);
        }
        if (this.active && matrix.sourceFile) {
            this.onSelect(matrix.sourceFile);
        }

    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Matrix> = new EventEmitter();
    @Output() delete: EventEmitter<Matrix> = new EventEmitter();

    public onSave(e, isNew: any) {
        e.preventDefault();
        if (isNew === 'add') {
            //alert(this.editBusinessForm.value.study);
            //alert(this.editBusinessForm.value.domain);
            if (this.editBusinessForm.value.study == null || this.editBusinessForm.value.domain == null) {
                this.opened = true;
                this.errorMsg = 'Please select study and domain to add a business rule.';
            } else {
                this.save.emit(this.editBusinessForm.value);
                this.active = false;
                this.transPlaceHolder = 'Enter Transformation';
            }
        } else {
            this.save.emit(this.editBusinessForm.value);
            this.active = false;
            this.transPlaceHolder = 'Enter Transformation';
        }
    }

    public close() {
        this.opened = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();
        this.errorMsg = '';
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
        this.studyDomains = [];
        this.transPlaceHolder = 'Enter Transformation';
    }

    public onDelete(e): void {
        e.preventDefault();
        this.delete.emit(this.editBusinessForm.value);
        this.active = false;
      }

    public ngOnInit(): void {
        this.businessEditService.fetchTransformationTypes().subscribe(data => {
            this.transTypes = data;
        });
        this.businessEditService.fetchLookUpData().subscribe(data => {
            this.lookups = data[0];
            this.lookupTables = data[1];
        });
        this.businessEditService.fetchSDTMVariables().subscribe(data => {
            this.sdtmVariables = data;
        });
        this.businessEditService.fetchStudyTitles().subscribe(data => {
            this.studyTitles = data;
        });
        this.businessEditService.fetchMatrixStudyTitles().subscribe(data => {
          this.matrixStudyTitles = data;
      });
    }

    public changePlaceholderAndValue(value: any) {
        switch (value) {
            case 'Manual Entry': this.transPlaceHolder = 'eg: Hello World'; break;
            case 'Concatenation':
                this.transPlaceHolder = 'eg: Source_File@Source_Variable_1, Source_File@Source_Variable_2';
                break;
            case 'Upper': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Lower': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Minimum': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Maximum': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Average': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Arithemetic Operation':
                this.transPlaceHolder = 'eg: Source_File@Source_Variable_1+(Source_File@Source_Variable_2/10)-9';
                break;
            case 'Number of Days': this.transPlaceHolder = 'eg: Source_File@Source_Variable_1- Source_File@Source_Variable_2'; break;
            case 'ISO Date Format': this.transPlaceHolder = 'eg: Source_File@Source_Variable'; break;
            case 'Lookup Transformation': this.transPlaceHolder = 'eg: Lookup_Type,Source_File@Source_Variable'; break;
            case 'Date Computation':
                this.transPlaceHolder = 'eg: (01/01/2018) - Source_File@Source_Variable or (CURRENTDATE)-Source_File@Source_Variable ';
                break;
            case 'No Transformation': this.transPlaceHolder = ''; break;
            case 'Sequence Generator': this.transPlaceHolder = 'eg: Source_Variable'; break;
            case 'Custom Code': this.transPlaceHolder = 'Please refer readme text for custom python code examples'; break;
            default: this.transPlaceHolder = 'Enter Transformation';
        }
    }

    public onSelect(table: any) {
        this.lookupVariables = [];
        for (let i = 0; i < this.lookups.length; i++) {
          if (this.lookups[i].lookUpTable === table) {
            this.lookupVariables.push(this.lookups[i].lookUpVariable);
          }
        }
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

    public fetchTemplate(): void {
        //this.businessEditService.read(searchBRStudy);
        let domains = [];
        this.importTemplate.study = this.editBusinessForm.value.study;
        this.selectedDomains = this.editBusinessForm.value.importDomain;
        for (let i = 0; i < this.selectedDomains.length; i++) {
            domains.push(this.selectedDomains[i].domain);
        }
        this.importTemplate.domain = domains;
        this.importTemplate.matrixStudy = this.editBusinessForm.value.matrixStudy;
        this.businessEditService.save(this.importTemplate, this.searchBRStudy, 'import');
        this.active = false;
      }
}
