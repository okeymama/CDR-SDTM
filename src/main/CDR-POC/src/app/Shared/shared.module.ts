
import { AlertService, AuthenticationService, UserService } from '../SDTM/Services';
import { BreadcrumbsModule } from 'ng6-breadcrumbs';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { HeaderComponent } from './header/header.component';
import { HeaderIconsComponent } from './header-icons/header-icons.component';
import { KendoGridDeleteConfirmComponent } from './kendo-grid-delete-confirm/kendo-grid-delete-confirm.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FilterIconHeadingComponent } from './filter-icon-heading/filter-icon-heading.component';

@NgModule({
  imports: [
    BreadcrumbsModule,
    BrowserModule,
    CommonModule,
    DialogsModule,
    DropDownsModule,
    FormsModule,
    GridModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    RouterModule
],
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeaderIconsComponent,
    KendoGridDeleteConfirmComponent,
    LoginComponent,
    NavBarComponent,
    SideBarComponent,
    FilterIconHeadingComponent
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    HeaderIconsComponent,
    KendoGridDeleteConfirmComponent,
    LoginComponent,
    NavBarComponent,
    FilterIconHeadingComponent
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService
  ],
})
export class SharedModule { }
