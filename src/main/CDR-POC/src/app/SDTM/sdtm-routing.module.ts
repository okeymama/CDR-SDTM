import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { JobExecutionComponent } from './Components/job-execution/job-execution.component';
import { BusinessRuleConfigComponent } from './Components/business-rule-config/business-rule-config.component';
import { StudySetupComponent } from './Components/study-setup/study-setup.component';
import { SdtmHomeComponent } from './Components/sdtm-home/sdtm-home.component';
import { SharedModule } from '../Shared/shared.module';

const routes: Routes = [
  {
    path: 'sdtmHome', 
    component: SdtmHomeComponent,
    children:[
      {
        path: 'sdtmHome',
        component: SdtmHomeComponent
      },
      {
        path: 'studySetup',
        component: StudySetupComponent
      },
      {
        path: 'businessRules',
        component: BusinessRuleConfigComponent
      },
      {
        path: 'businessRules/:studyTitle/:therapeuticArea',
        component: BusinessRuleConfigComponent
     },
     {
        path: 'jobExecution',
        component: JobExecutionComponent
     },
    {
      path: 'jobExecution/:studyTitle',
      component: JobExecutionComponent
    }
    ]
  },

   
  ];

  @NgModule({
    imports: [
      CommonModule,
      RouterModule,
      SharedModule
     ],
    
  declarations: []
})
export class SdtmRoutingModule { }
