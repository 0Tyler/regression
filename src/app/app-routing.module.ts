import { RegressionComponent } from './regression/regression.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    { path: 'regression', component: RegressionComponent },
    { path: '', redirectTo: '/regression', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
