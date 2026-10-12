import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pagcontactocomponent } from './pages/pagcontactocomponent/pagcontactocomponent';
import { Pagdestinoscomponent } from './pages/pagdestinoscomponent/pagdestinoscomponent';
import { Pagexperienciascomponent } from './pages/pagexperienciascomponent/pagexperienciascomponent';
import { Paghoteleriacomponent } from './pages/paghoteleriacomponent/paghoteleriacomponent';
import { Paginiciocomponent } from './pages/paginiciocomponent/paginiciocomponent';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: Paginiciocomponent },
  {path: 'contacto', component: Pagcontactocomponent  },
  {path: 'destinos' , component: Pagdestinoscomponent },
  {path: 'experiencias' , component: Pagexperienciascomponent },
  {path: 'alojamiento' , component: Paghoteleriacomponent },
  {path:'**', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
