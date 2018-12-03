
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BusinessRuleConfigComponent } from './Components/business-rule-config/business-rule-config.component';
import { BusinessRuleConfigEditComponent } from './Components/business-rule-config-edit/business-rule-config-edit.component';
import { CommonModule } from '@angular/common';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditService, BusinessEditService, AlertService, AuthenticationService, UserService } from './Services';
import { GridModule } from '@progress/kendo-angular-grid';
import { HomeComponent } from './Components/home/home.component';
import { HttpClient,  HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { JobExecutionComponent } from './Components/job-execution/job-execution.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { StudySetupComponent } from './Components/study-setup/study-setup.component';
import { StudySetupEditComponent } from './Components/study-setup-edit/study-setup-edit.component';
import { SdtmHomeComponent } from './Components/sdtm-home/sdtm-home.component';
import { AppPropertiesComponent } from './Components/app-properties/app-properties.component';

@NgModule({
  imports: [
    BrowserModule,
    BsDropdownModule,
    CommonModule,
    DialogsModule,
    DropDownsModule,
    FormsModule,
    GridModule,
    HttpClientJsonpModule,
    HttpClientModule,
    HttpModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
   ],
   declarations: [
    BusinessRuleConfigComponent,
    BusinessRuleConfigEditComponent,
    HomeComponent,
    JobExecutionComponent,
    StudySetupComponent,
    StudySetupEditComponent,
    SdtmHomeComponent,
    AppPropertiesComponent
  ],
  exports: [],
 providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    },
    {
      deps: [HttpClient],
      provide: BusinessEditService,
      useFactory: (jsonp: HttpClient) => () => new BusinessEditService(jsonp)
    },
    AlertService,
    AuthenticationService,
    UserService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class SdtmModule { }
