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
import { SdtmHomeComponent } from './SDTM/Components/sdtm-home/sdtm-home.component';
import { DataqualityHomeComponent } from './DataQuality/Components/dataquality-home/dataquality-home.component';
import { DataQualityModule } from './DataQuality/data-quality.module';
import { BusinessResolverService } from './SDTM/Services/business-resolver.service';



const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'sdtmHome',
    component: SdtmHomeComponent,

    children: [
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
        component: BusinessRuleConfigComponent,
        resolve: {
          reqDomains: BusinessResolverService
        }

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
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'dataQuality',
    component: DataqualityHomeComponent,
    children: [
      {
        path: 'checkConfig',
        component: CheckConfigurationComponent

      }
    ]
  },
  { path: 'analytics', component: AnalyticsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }),
    SharedModule,
    SdtmModule,
    DataQualityModule
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [BusinessResolverService]
})
export class AppRoutingModule { }
