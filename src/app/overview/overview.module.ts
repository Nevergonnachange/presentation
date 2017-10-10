import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
      CommonModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      FlexLayoutModule,
      RouterModule
  ],
  declarations: [OverviewComponent]
})
export class OverviewModule { }
