import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlojamientosComponent } from './pages/alojamientos/alojamientos.component';
import { DetalleAlojamientoComponent } from './pages/detalle-alojamiento/detalle-alojamiento.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Bannercomponent } from './components/bannercomponent/bannercomponent';
import { Destinoscomponent } from './components/destinoscomponent/destinoscomponent';
import { Experienciascomponent } from './components/experienciascomponent/experienciascomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Pagdestinoscomponent } from './pages/pagdestinoscomponent/pagdestinoscomponent';
import { Paghoteleriacomponent } from './pages/paghoteleriacomponent/paghoteleriacomponent';
import { Pagexperienciascomponent } from './pages/pagexperienciascomponent/pagexperienciascomponent';
import { Pagcontactocomponent } from './pages/pagcontactocomponent/pagcontactocomponent';
import { Paginiciocomponent } from './pages/paginiciocomponent/paginiciocomponent';
@NgModule({
 declarations: [AppComponent, AlojamientosComponent, DetalleAlojamientoComponent, MisReservasComponent, Navbarcomponent, Bannercomponent, Destinoscomponent, Experienciascomponent, Footercomponent, Pagdestinoscomponent, Paghoteleriacomponent, Pagexperienciascomponent, Pagcontactocomponent, Paginiciocomponent],
 imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule], bootstrap: [AppComponent]
}) export class AppModule {}
