import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AlertService, AuthenticationService, UserService , EditService, BusinessEditService } from './_services/index';
import { SearchModuleComponent } from './search-module/search-module.component';
import { AlertComponent } from './_directives/index';
import { StudyInfoComponent } from './study-info/study-info.component';
import { HomeComponent } from './home/home.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditFormComponent } from './edit-form/edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { JobExecutionComponent } from './job-execution/job-execution.component';
import { BusinessRuleComponent } from './business-rule/business-rule.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DataQualityComponent } from './data-quality/data-quality.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';
import { BusinessEditFormComponent } from './business-edit-form/business-edit-form.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { KendoGridDeleteConfirmComponent } from './kendo-grid-delete-confirm/kendo-grid-delete-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchModuleComponent,
    AlertComponent,
    StudyInfoComponent,
    HomeComponent,
    EditFormComponent,
    JobExecutionComponent,
    BusinessRuleComponent,
    DataQualityComponent,
    AnalyticsComponent,
    HeaderComponent,
    FooterComponent,
    BusinessEditFormComponent,
    KendoGridDeleteConfirmComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    GridModule,
    ReactiveFormsModule,
    DialogsModule,
    BreadcrumbsModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDropdownModule.forRoot()
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
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
  bootstrap: [AppComponent]
})
export class AppModule { }
