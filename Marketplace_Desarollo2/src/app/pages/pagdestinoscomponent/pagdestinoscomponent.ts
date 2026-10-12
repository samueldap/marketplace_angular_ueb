import { Component } from '@angular/core';

interface DestinoItem {
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
  selector: 'app-pagdestinoscomponent',
  standalone: false,
  styleUrl: './pagdestinoscomponent.css',
  templateUrl: './pagdestinoscomponent.html',
})
export class Pagdestinoscomponent {
  categorias = ['Todas', 'Caribe', 'Andina', 'Eje Cafetero', 'Pacífico', 'Amazonía'];
  categoria = 'Todas';
  guardadas: number[] = [];

  destinos: DestinoItem[] = [
    {
      id: 1,
      categoria: 'Caribe',
      titulo: 'Cartagena & Islas del Rosario',
      descripcion: 'Ciudad amurallada llena de historia, arquitectura colonial e islas de agua cristalina.',
      duracion: 'Cálido 28°C',
      personas: '120+ alojamientos',
      precio: 'Desde $120 USD',
      imagen: 'https://images.unsplash.com/photo-1583997052301-004d88e73a4a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400',
    },
    {
      id: 2,
      categoria: 'Andina',
      titulo: 'Guatapé y la Piedra del Peñol',
      descripcion: 'Pueblo de zócalos multicolores, embalses panorámicos y naturaleza imponente.',
      duracion: 'Templado 21°C',
      personas: '85+ alojamientos',
      precio: 'Desde $85 USD',
      imagen: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    },
    {
      id: 3,
      categoria: 'Eje Cafetero',
      titulo: 'Valle del Cocora & Salento',
      descripcion: 'Palmas de cera gigantes, fincas de café de especialidad y senderos entre la neblina.',
      duracion: 'Fresco 18°C',
      personas: '95+ alojamientos',
      precio: 'Desde $70 USD',
      imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    },
    {
      id: 4,
      categoria: 'Caribe',
      titulo: 'Parque Nacional Tayrona',
      descripcion: 'Selva tropical que se encuentra con playas virgen y bahías sagradas de la Sierra.',
      duracion: 'Cálido 30°C',
      personas: '60+ alojamientos',
      precio: 'Desde $95 USD',
      imagen: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    },
    {
      id: 5,
      categoria: 'Pacífico',
      titulo: 'Nuquí y Bahía Solano',
      descripcion: 'Avistamiento de ballenas jorobadas, selva tupida y playas de arena oscura.',
      duracion: 'Húmedo 26°C',
      personas: '30+ alojamientos',
      precio: 'Desde $110 USD',
      imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    },
    {
      id: 6,
      categoria: 'Andina',
      titulo: 'Villa de Leyva',
      descripcion: 'Empedrados coloniales, tranquilidad andina, gastronomía y paisajes fosilizados.',
      duracion: 'Templado 19°C',
      personas: '75+ alojamientos',
      precio: 'Desde $80 USD',
      imagen: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    }
  ];

  destinosVisibles: DestinoItem[] = [...this.destinos];

  filtrar(cat: string): void {
    this.categoria = cat;
    this.destinosVisibles =
      cat === 'Todas'
        ? [...this.destinos]
        : this.destinos.filter((d) => d.categoria === cat);
  }

  esDestacada(indice: number): boolean {
    return indice === 0 && this.categoria === 'Todas';
  }

  estaGuardada(id: number): boolean {
    return this.guardadas.includes(id);
  }

  alternarGuardada(id: number): void {
    this.guardadas = this.estaGuardada(id)
      ? this.guardadas.filter((g) => g !== id)
      : [...this.guardadas, id];
  }

  irADestinos(): void {
    document.getElementById('destinos')?.scrollIntoView({ behavior: 'smooth' });
  }
}
