import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AnalyticsComponent } from './analytics/analytics.component';
import {BreadcrumbsModule} from 'ng6-breadcrumbs';
import { BsDropdownModule } from 'ngx-bootstrap';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { SearchModuleComponent } from './SDTM/Components/search-module/search-module.component';
import { AlertComponent } from './Directives';
import { HomeComponent } from './SDTM/Components/home/home.component';
import { EditFormComponent } from './SDTM/Components/edit-form/edit-form.component';
import { JobExecutionComponent } from './SDTM/Components/job-execution/job-execution.component';
import { BusinessRuleComponent } from './SDTM/Components/business-rule/business-rule.component';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { BusinessEditFormComponent } from './SDTM/Components/business-edit-form/business-edit-form.component';
import { KendoGridDeleteConfirmComponent } from './Shared/kendo-grid-delete-confirm/kendo-grid-delete-confirm.component';
import { LoginComponent } from './Shared/login/login.component';
import { EditService, BusinessEditService, AlertService, AuthenticationService, UserService } from './SDTM/Services';
import { DataQualityModule } from './DataQuality/data-quality.module';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { HeaderIconsComponent } from './Shared/header-icons/header-icons.component';
import { FilterMenuComponent } from './Shared/filter-menu/filter-menu.component';
import { StudySetupComponent } from './SDTM/Components/study-setup/study-setup.component';
import { StudySetupEditComponent } from './SDTM/Components/study-setup-edit/study-setup-edit.component';
import { BusinessRuleConfigComponent } from './SDTM/Components/business-rule-config/business-rule-config.component';
import { BusinessRuleConfigEditComponent } from './SDTM/Components/business-rule-config-edit/business-rule-config-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchModuleComponent,
    AlertComponent,
   
    HomeComponent,
    EditFormComponent,
    JobExecutionComponent,
    BusinessRuleComponent,
    AnalyticsComponent,
    HeaderComponent,
    FooterComponent,
    BusinessEditFormComponent,
    KendoGridDeleteConfirmComponent,
    SearchModuleComponent,
 
    HomeComponent,
    EditFormComponent,
    BusinessEditFormComponent,
    BusinessRuleComponent,
    NavBarComponent,
    HeaderIconsComponent,
    FilterMenuComponent,
    StudySetupComponent,
    StudySetupEditComponent,
    BusinessRuleConfigComponent,
    BusinessRuleConfigEditComponent
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
    BsDropdownModule.forRoot(),
    DropDownsModule,
    DataQualityModule
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
