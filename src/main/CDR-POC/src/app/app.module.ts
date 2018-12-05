import { AlertComponent } from './Directives';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { BreadcrumbsModule} from 'ng6-breadcrumbs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DataQualityModule } from './DataQuality/data-quality.module';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule} from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SdtmModule } from './SDTM/sdtm.module';
import { SharedModule } from './Shared/shared.module';

@NgModule({
  declarations: [
    AlertComponent,
    AnalyticsComponent,
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BreadcrumbsModule,
    BrowserAnimationsModule,
    BrowserModule,
    DataQualityModule,
    DialogsModule,
    DropDownsModule,
    FormsModule,
    GridModule,
    HttpClientJsonpModule,
    HttpClientModule,
    HttpModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    SdtmModule,
    SharedModule
  ],
  
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
