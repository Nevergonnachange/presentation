import { Routes } from '@angular/router';
import { PresentationComponent } from './presentation.component';

export const PresentationRoutes: Routes = [{
    path: 'presentation/:name',
    component: PresentationComponent
}];
