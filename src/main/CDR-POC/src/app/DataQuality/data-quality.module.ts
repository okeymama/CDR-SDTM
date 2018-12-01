import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportChecksComponent } from './Components/import-checks/import-checks.component';
import { CustomChecksComponent } from './Components/custom-checks/custom-checks.component';
import { EditChecksComponent } from './Components/edit-checks/edit-checks.component';
import { CheckConfigurationComponent } from './Components/check-configuration/check-configuration.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CheckConfigurationComponent, 
    ImportChecksComponent, 
    CustomChecksComponent, 
    EditChecksComponent]
})
export class DataQualityModule { }
