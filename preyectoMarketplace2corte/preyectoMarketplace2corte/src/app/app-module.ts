import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';

import { Navbarcomponent } from './components/navbarcomponent/navbarcomponent';
import { Bannercomponent } from './components/bannercomponent/bannercomponent';
import { Destinoscomponent } from './components/destinoscomponent/destinoscomponent';
import { Experienciascomponent } from './components/experienciascomponent/experienciascomponent';
import { Footercomponent } from './components/footercomponent/footercomponent';
import { Pagdestinoscomponent } from './pages/pagdestinoscomponent/pagdestinoscomponent';
import { Paghoteleriacomponent } from './pages/paghoteleriacomponent/paghoteleriacomponent';
import { Pagexperienciascomponent } from './pages/pagexperienciascomponent/pagexperienciascomponent';
import { Pagcontactocomponent } from './pages/pagcontactocomponent/pagcontactocomponent';

@NgModule({
  declarations: [
    App,
    Navbarcomponent,
    Bannercomponent,
    Destinoscomponent,
    Experienciascomponent,
    Footercomponent,
    Pagdestinoscomponent,
    Paghoteleriacomponent,
    Pagexperienciascomponent,
    Pagcontactocomponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [App],
})
export class AppModule {}
