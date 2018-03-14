import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatTableModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
      CommonModule,
      MatTableModule,
      MatInputModule,
      FlexLayoutModule,
      RouterModule
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
