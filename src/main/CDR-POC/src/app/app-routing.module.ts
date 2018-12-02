import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoginComponent } from './Shared/login/login.component';
import { HomeComponent } from './SDTM/Components/home/home.component';
import { JobExecutionComponent } from './SDTM/Components/job-execution/job-execution.component';
import { CheckConfigurationComponent } from './DataQuality/Components/check-configuration/check-configuration.component';
import { BusinessRuleConfigComponent } from './SDTM/Components/business-rule-config/business-rule-config.component';
import { StudySetupComponent } from './SDTM/Components/study-setup/study-setup.component';
import { SharedModule } from './Shared/shared.module';
import { SdtmModule } from './SDTM/sdtm.module';



const routes: Routes = [
  { path: '', component: LoginComponent } ,
  {
      path: 'home',
      component: HomeComponent,
      data: {
          breadcrumb: 'Home'
      }
    },
    {
      path: 'searchModule',
      component: StudySetupComponent,
      data: {
            breadcrumb: 'Study'
        }
    },
    {
      path: 'busRules',
      component: BusinessRuleConfigComponent,
      data: {
        breadcrumb: 'Business Rule Configuration'
      }
    },
    {
           path: 'busRules/:studyTitle/:therapeuticArea',
           component: BusinessRuleConfigComponent,
            data: {
             breadcrumb: 'Business Rule Configuration'
            }
    },
    {
       path: 'job',
       component: JobExecutionComponent,
       data: {
        breadcrumb: 'Job Execution'
       }
    },
    {
      path: 'job/:studyTitle',
      component: JobExecutionComponent,
      data: {
       breadcrumb: 'Job Execution'
      }
   },
    {
      path: 'dataQuality',
      component: CheckConfigurationComponent,
      data: {
      breadcrumb: 'Data Quality Workbench'
      }
  },
    { path: 'analytics', component: AnalyticsComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}),
    SharedModule,
    SdtmModule
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
