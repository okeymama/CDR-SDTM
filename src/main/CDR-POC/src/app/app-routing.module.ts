import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }   from './login/login.component';
import { SearchModuleComponent } from './search-module/search-module.component';
import { StudyInfoComponent } from './study-info/study-info.component';
import { HomeComponent } from './home/home.component';
import { BusinessRuleComponent } from './business-rule/business-rule.component';
import { JobExecutionComponent } from './job-execution/job-execution.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DataQualityComponent } from './data-quality/data-quality.component';

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
      component: SearchModuleComponent,
      data: {
            breadcrumb: 'Study'
        }
    },
    {
      path: 'busRules',
      component: BusinessRuleComponent,
      data: {
        breadcrumb: 'Business Rule Configuration'
      }
    },
    {
           path: 'busRules/:studyTitle/:therapeuticArea',
           component: BusinessRuleComponent,
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
      component: DataQualityComponent,
      data: {
      breadcrumb: 'Data Quality Workbench'
      }
  },
    { path: 'analytics', component: AnalyticsComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
