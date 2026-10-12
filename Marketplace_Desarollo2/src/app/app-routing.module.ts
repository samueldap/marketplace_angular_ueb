import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlojamientosComponent } from './pages/alojamientos/alojamientos.component';
import { DetalleAlojamientoComponent } from './pages/detalle-alojamiento/detalle-alojamiento.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { Paginiciocomponent } from './pages/paginiciocomponent/paginiciocomponent';
import { Pagdestinoscomponent } from './pages/pagdestinoscomponent/pagdestinoscomponent';
import { Paghoteleriacomponent } from './pages/paghoteleriacomponent/paghoteleriacomponent';
import { Pagexperienciascomponent } from './pages/pagexperienciascomponent/pagexperienciascomponent';
import { Pagcontactocomponent } from './pages/pagcontactocomponent/pagcontactocomponent';
const routes: Routes = [
 { path: '', component: Paginiciocomponent, title: 'Inicio | Lumbre' },
 { path: 'inicio', component: Paginiciocomponent, title: 'Inicio | Lumbre' },
 { path: 'destinos', component: Pagdestinoscomponent, title: 'Destinos | Lumbre' },
 { path: 'alojamiento', component: Paghoteleriacomponent, title: 'Alojamientos | Lumbre' },
 { path: 'experiencias', component: Pagexperienciascomponent, title: 'Experiencias | Lumbre' },
 { path: 'contacto', component: Pagcontactocomponent, title: 'Contacto | Lumbre' },
 { path: 'alojamientos', component: AlojamientosComponent, title: 'Catálogo de alojamientos' },
 { path: 'alojamientos/:id', component: DetalleAlojamientoComponent, title: 'Detalle del alojamiento' },
 { path: 'mis-reservas', component: MisReservasComponent, title: 'Mis reservas' },
 { path: '**', redirectTo: '' }
];
@NgModule({ imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })], exports: [RouterModule] })
export class AppRoutingModule {}
