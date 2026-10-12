import { Component } from '@angular/core';

interface ExperienciasComponent {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  personas: string;
  precio: string;
  imagen: string;
}

@Component({
  selector: 'app-pagexperienciascomponent',
  standalone: false,
  styleUrl: './pagexperienciascomponent.css',
  templateUrl: './pagexperienciascomponent.html',
})
export class Pagexperienciascomponent {
  categorias = ['Todas', 'Mar', 'Sabores', 'Naturaleza', 'Bienestar', 'Cultura'];
  categoria = 'Todas';
  private readonly favoritosKey = 'lumbre-experiencias-favoritas';
  guardadas: number[] = this.leerFavoritos();
  experienciaSeleccionada?: ExperienciasComponent;

  experiencias: ExperienciasComponent[] = [
    {
      id: 1,
      categoria: 'Mar',
      titulo: 'Navegar al ritmo del Mediterráneo',
      descripcion: 'Una mañana entre calas secretas, agua cristalina y un aperitivo preparado a bordo',
      duracion: '4 horas',
      personas: 'Hasta 6',
      precio: 'Desde $180 USD',
      imagen: 'https://images.unsplash.com/photo-1627024216712-ccc7921250b6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400',
    },
    {
      id: 2,
      categoria: 'Sabores',
      titulo: 'Cena privada frente al mar',
      descripcion: 'Producto local, fuego lento y una mesa reservada para ver caer el sol.',
      duracion: '3 horas',
      personas: '2-8 personas',
      precio: 'Desde $105 USD',
      imagen: 'https://images.unsplash.com/photo-1782174177181-8c2898264d35?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000'
    },
    {
      id: 3,
      categoria: 'Naturaleza',
      titulo: 'Camino entre viñedos',
      descripcion: 'Paseo guiado entre vides y olivos, terminando con una cata de vinos de la finca.',
      duracion: '2.5 horas',
      personas: 'Hatsa 10',
      precio: 'Desde $60 USD',
      imagen: 'https://images.unsplash.com/photo-1690265632035-b4defdd9e593?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    },
    {
      id: 4,
      categoria: 'Bienestar',
      titulo: 'Amanecer en calma',
      descripcion: 'Respiración, movimiento y desayuno consciente en plena naturaleza ',
      duracion: '90 minutos',
      personas: 'Hatsa 8',
      precio: 'Desde $50 USD',
      imagen: 'https://images.unsplash.com/photo-1566568626594-699f661c7168?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    },
    {
      id: 5,
      categoria: 'Cultura',
      titulo: 'Pueblos con historia',
      descripcion: 'Arquitectura, artesanía y pequeñas historias de la mano de quien vive aquí.',
      duracion: '4 horas',
      personas: 'Hasta 8',
      precio: 'Desde $75 USD',
      imagen: 'https://images.unsplash.com/photo-1696607915607-54e95d557f1e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000'
    },
    {
      id: 6,
      categoria: 'Sabores',
      titulo: 'La mesa del pescador',
      descripcion: 'Una comida sencilla y extraordinaria con la pesca del día como protagonista',
      duracion: '2 horas',
      personas: '2-6 persona',
      precio: 'Desde $70 USD',
      imagen: 'https://images.unsplash.com/photo-1782174177186-9026d6c74413?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000'
    }
  ];

  experienciasVisibles: ExperienciasComponent[] = [...this.experiencias];

  filtrar(cat: string): void{
    this.categoria = cat;
    this.experienciasVisibles =
      cat === 'Todas'
        ? [...this.experiencias]
        : this.experiencias.filter((e) => e.categoria === cat);
  }

  esDestacada (indice: number):boolean{
    return indice === 0 && this.categoria === 'Todas';
  }

  estaGuardada (id:number): boolean{
    return this.guardadas.includes(id);
  }

  alternarGuardada (id:number):void{
    this.guardadas = this.estaGuardada(id)
      ? this.guardadas.filter((g) => g !== id)
      : [...this.guardadas, id];
    try { localStorage.setItem(this.favoritosKey, JSON.stringify(this.guardadas)); } catch { /* La página sigue funcionando aunque el navegador bloquee el almacenamiento. */ }
  }

  verExperiencia(id: number): void {
    this.experienciaSeleccionada = this.experiencias.find(e => e.id === id);
  }

  cerrarDetalle(): void { this.experienciaSeleccionada = undefined; }

  private leerFavoritos(): number[] {
    try {
      const guardados: unknown = JSON.parse(localStorage.getItem('lumbre-experiencias-favoritas') || '[]');
      return Array.isArray(guardados) ? guardados.filter((id): id is number => Number.isInteger(id)) : [];
    } catch { return []; }
  }

  irAExperiencias(): void{
    document.getElementById('experiencias')?.scrollIntoView({behavior: 'smooth'});
  }
}
