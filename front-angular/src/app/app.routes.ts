import {Routes} from '@angular/router';
import {FormComponentComponent} from "./form-component/form-component.component";
import {ListComponent} from "./list/list.component";
import {DoQcmComponent} from "./do-qcm/do-qcm.component";

export const routes: Routes = [
    {
        path: '',
        component: ListComponent,
    },
    {
        path: 'qcms/new',
        component: FormComponentComponent
    },
    {
        path: 'qcms/:id',
        component: DoQcmComponent
    },
    {
        path: '**',
        redirectTo: '',
    }
];

