import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bannercomponent',
  standalone: false,
  styleUrl: './bannercomponent.css',
  templateUrl: './bannercomponent.html',
})
export class Bannercomponent {
  destino = '';
  huespedes = 1;

  constructor(private router: Router) {}

  buscar(): void {
    const ciudad = this.destino.trim();
    this.router.navigate(['/alojamientos'], {
      queryParams: { ciudad: ciudad || null, huespedes: this.huespedes > 1 ? this.huespedes : null }
    });
  }
}
