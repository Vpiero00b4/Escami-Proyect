import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../../../../models/libros/libro';
import { LibroService } from '../../../../../components/services/services-tienda/libros/api.service';

// Define aquí la interfaz CartItem mínima que usa tu CartService
interface CartItem {
  idLibro: number;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  stock: number;
  imagen?: string;

  // opcionales para el DTO backend (si los tienes disponibles en Libro)
  isbn?: string;
  tamanno?: string;
  condicion?: string;
  impresion?: string;
  tipoTapa?: string;
  estado?: boolean;
  idSubcategoria?: number;
  idTipoPapel?: number;
  idProveedor?: number;
}

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro-list.html',
  styleUrls: ['./libro-list.css']
})
export class LibroList implements OnInit {

  // Nuevo Output: emite el CartItem
  @Output() addToCart = new EventEmitter<CartItem>();

  libros: Libro[] = [];
  loading = true;

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/img/no-disponible.png';
  }

  // Botón: mapear Libro -> CartItem y emitir
  agregarAlCarrito(libro: Libro): void {
    const item = this.mapLibroToCartItem(libro);
    this.addToCart.emit(item);
  }

  // Helpers de template
  tieneAutores(libro: Libro): boolean {
    return !!(libro.autores && libro.autores.length > 0);
  }

  obtenerNombresAutores(libro: Libro): string {
    if (!this.tieneAutores(libro)) return 'Genérico';
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

  // Private
  private cargarLibros(): void {
    this.loading = true;
    this.libroService.getLibrosConAutoresPrecioStock().subscribe({
      next: (data: Libro[]) => {
        this.libros = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('❌ Error cargando libros:', err);
        this.loading = false;
      }
    });
  }

  private mapLibroToCartItem(libro: Libro): CartItem {
    const autor = this.tieneAutores(libro)
      ? `${libro.autores![0].nombre} ${libro.autores![0].apellido}`
      : 'Genérico';

    return {
      idLibro: libro.idLibro,
      titulo: libro.titulo ?? 'Sin título',
      autor,
      descripcion: libro.descripcion ?? '',
      precio: libro.precioVenta ?? 0,
      cantidad: 1,
      stock: libro.stock ?? 0,
      imagen: (libro as any).imagen ?? undefined,

      // opcionales si existen en tu modelo Libro:
      isbn: (libro as any).isbn ?? '',
      tamanno: (libro as any).tamanno ?? '',
      condicion: (libro as any).condicion ?? '',
      impresion: (libro as any).impresion ?? '',
      tipoTapa: (libro as any).tipoTapa ?? '',
      estado: (libro as any).estado ?? true,
      idSubcategoria: (libro as any).idSubcategoria ?? 0,
      idTipoPapel: (libro as any).idTipoPapel ?? 0,
      idProveedor: (libro as any).idProveedor ?? 0
    };
  }
  obtenerClaseStockTailwind(libro: any): string {
  if (libro.stock > 10) {
    return 'bg-green-100 text-green-800'; // En stock
  } else if (libro.stock > 0 && libro.stock <= 10) {
    return 'bg-yellow-100 text-yellow-800'; // Stock bajo
  } else {
    return 'bg-red-100 text-red-800'; // Sin stock
  }
}
}