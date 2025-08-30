import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../../../../models/libros/libro';
import { LibroService } from '../../../../../components/services/services-tienda/libros/api.service';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro-list.html',
  styleUrls: ['./libro-list.css']
})
export class LibroList implements OnInit {
  
  // Properties
  @Output() libroSeleccionado = new EventEmitter<Libro>();
  
  libros: Libro[] = [];
  loading = true;

  // Constructor
  constructor(private libroService: LibroService) {}

  // Lifecycle hooks
  ngOnInit(): void {
    this.cargarLibros();
  }

  // Public methods para uso en template
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/img/no-disponible.png';
  }

  agregarAlCarrito(libro: Libro): void {
    this.libroSeleccionado.emit(libro);
  }

  // Métodos auxiliares para el template
  tieneAutores(libro: Libro): boolean {
    return !!(libro.autores && libro.autores.length > 0);
  }

  obtenerNombresAutores(libro: Libro): string {
    if (!this.tieneAutores(libro)) {
      return 'Autor no disponible';
    }
    
    return libro.autores!
      .map(autor => `${autor.nombre} ${autor.apellido}`)
      .join(', ');
  }

  obtenerStock(libro: Libro): number {
    return libro.stock ?? 0;
  }

  obtenerClaseStock(libro: Libro): string {
    const stock = this.obtenerStock(libro);
    
    if (stock === 0) return 'stock-agotado';
    if (stock <= 10) return 'stock-bajo';
    return 'stock-alto';
  }

  obtenerTextoStock(libro: Libro): string {
    const stock = this.obtenerStock(libro);
    return stock > 0 ? `${stock} disponibles` : 'Agotado';
  }

  estaDisponible(libro: Libro): boolean {
    return this.obtenerStock(libro) > 0;
  }

  private mostrarStockEnConsola(): void {
  this.libros.forEach(libro => {
    console.log(`📖 ${libro.titulo} | Stock disponible: ${libro.stock}`);
  });
}

  // Private methods
 private cargarLibros(): void {
  this.loading = true;

  this.libroService.getLibrosConAutoresPrecioStock().subscribe({
    next: (data: Libro[]) => {
      this.libros = data;
      this.loading = false;
      this.mostrarStockEnConsola();
    },
    error: (err: any) => {
      console.error('❌ Error cargando libros:', err);
      this.loading = false;
    }
  });
}
}
