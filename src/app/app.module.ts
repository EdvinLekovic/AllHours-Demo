import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/header/header.component';
import {RouterModule} from "@angular/router";
import { UsersComponent } from './pages/users/users.component';
import { AbsencesComponent } from './pages/absences/absences.component';
import {ROUTES} from "./routes-config";

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    HeaderComponent,
    UsersComponent,
    AbsencesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
