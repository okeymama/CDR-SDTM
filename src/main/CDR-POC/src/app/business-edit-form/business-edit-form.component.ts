import { Component, Input, Output, EventEmitter } from '@angular/core';
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
export class BusinessEditFormComponent {
    public active = false;
    public opened: boolean = false;
    public errorMsg: string;
    public editBusinessForm: FormGroup = new FormGroup({
      'sourceFile': new FormControl(),
      'sourceField': new FormControl(),
      'lookUpFile': new FormControl(),
      'joinLogic': new FormControl(),
      'targetFile': new FormControl(),
      'domain': new FormControl(),
      'study': new FormControl(),
      'transformation': new FormControl()
    });

    constructor(private http: HttpClient) {}
    private res: any[] = [];
    @Input() public isNew = false;

    @Input() public set model(matrix: Matrix) {
        this.editBusinessForm.reset(matrix);
        this.active = matrix !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Matrix> = new EventEmitter();

    public onSave(e) {
      e.preventDefault();
      this.save.emit(this.editBusinessForm.value);
      this.active = false;
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
    }
}
