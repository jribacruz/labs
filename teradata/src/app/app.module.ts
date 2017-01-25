import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { CovalentCoreModule, CovalentLayoutModule } from '@covalent/core';
import { AtividadeComponent } from './atividade/atividade/atividade.component';
import { VistoriaComponent } from './atividade/vistoria/vistoria.component';

@NgModule({
  declarations: [
    AppComponent,
    AtividadeComponent,
    VistoriaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    CovalentCoreModule.forRoot(),
    CovalentLayoutModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
