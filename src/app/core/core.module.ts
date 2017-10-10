import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { OverviewRoutes } from '../overview/overview.routes';
import { PresentationRoutes } from '../presentation/presentation.routes';
import { OverviewModule } from '../overview/overview.module';
import { PresentationModule } from '../presentation/presentation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot([
          ...OverviewRoutes,
          ...PresentationRoutes
      ]),

      // Feature Modules
      OverviewModule,
      PresentationModule
  ],
  declarations: []
})
export class CoreModule { }
