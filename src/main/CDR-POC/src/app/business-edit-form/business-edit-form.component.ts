import { Component, Input, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Matrix } from '../_models/index';
import { BusinessEditService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Headers, RequestOptions } from '@angular/http';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';


@Component({
    selector: 'kendo-grid-business-edit-form',
    styles: [
        'style="background-color : black"',
    ],
    templateUrl: './business-edit-form.component.html'
})
export class BusinessEditFormComponent implements OnInit {
    public transPlaceHolder = 'Enter Transformation';
    private businessEditService: BusinessEditService;
    public transTypes: any[];
    public active = false;
    public opened: boolean = false;
    public errorMsg: string;
    public editBusinessForm: FormGroup = new FormGroup({
        'id': new FormControl(),
        'study': new FormControl(),
        'domain': new FormControl(),
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

    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Matrix> = new EventEmitter();

    public onSave(e) {
        e.preventDefault();
        this.save.emit(this.editBusinessForm.value);
        this.active = false;
        this.transPlaceHolder = 'Enter Transformation';
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
        this.transPlaceHolder = 'Enter Transformation';
    }

    public ngOnInit(): void {
        this.businessEditService.fetchTransformationTypes().subscribe(data => {
            this.transTypes = data;
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
}
