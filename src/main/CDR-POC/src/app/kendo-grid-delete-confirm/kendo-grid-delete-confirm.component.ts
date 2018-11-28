import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
import { StudyDetails } from '../_models/index';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'kendo-grid-remove-form',
  templateUrl: './kendo-grid-delete-confirm.component.html',
  styleUrls: ['./kendo-grid-delete-confirm.component.css']
})
export class KendoGridDeleteConfirmComponent implements OnInit {

  public active = false;
  public opened = false;

  public editForm: FormGroup = new FormGroup({
    'id': new FormControl(),
    'studyID': new FormControl(),
    'title': new FormControl(),
    'phase': new FormControl(),
    'status': new FormControl(),
    'therapeuticArea': new FormControl(),
    'source': new FormControl()
  });

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<StudyDetails> = new EventEmitter();

  @Input() public isDelete = false;

  @Input() public set model(studyDetails: StudyDetails) {
    this.editForm.reset(studyDetails);
    this.active = studyDetails !== undefined && this.isDelete === true;
}

  constructor() { }

  ngOnInit() {
  }

public onDelete(e): void {
  e.preventDefault();
  this.delete.emit(this.editForm.value);
  this.active = false;
}


public close() {
  this.opened = false;
}

public onCancel(e): void {
  e.preventDefault();
  this.closeForm();
}

private closeForm(): void {
  this.active = false;
  this.cancel.emit();
}

}
