import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegressionComponent } from './regression/regression.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts'; import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
@NgModule({
    declarations: [
        AppComponent,
        RegressionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        GoogleChartsModule.forRoot(),
        MatGridListModule,
        MatTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
