import { AtividadeComponent } from './atividade/atividade/atividade.component';
import { VistoriaComponent } from './atividade/vistoria/vistoria.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: 'atividades', component: AtividadeComponent },
    { path: 'vistorias', component: VistoriaComponent },
    { path: '', redirectTo: '/atividades', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }