import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../../../../models/libros/libro';
import { LibroService } from '../../../../../components/services/services-tienda/libros/api.service';
import { CartService } from '../../../../../components/services/cart.service.ts';

// Define aquí la interfaz CartItem mínima que usa tu CartService
export interface CartItemLibro {
  idLibro: number;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  stock: number;
  imagen?: string;

  // opcionales para backend
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

export interface CartItemProducto {
  productoId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  stock: number;
  imagen?: string;
}

// El carrito acepta libro o producto
export type CartItem =
  | { tipo: 'libro'; data: CartItemLibro }
  | { tipo: 'producto'; data: CartItemProducto };

export interface ItemCarrito {
  item: CartItem;
  precioVenta: number;
  cantidad: number;
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

  constructor(private libroService: LibroService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cargarLibros();
  }
  // Método para agregar un producto específico al carrito
  agregarAlCarrito(libro: Libro) {
    if (libro.stock <= 0) return;
    this.cartService.addLibro(libro);
    this.cartService.abrirCarro();
  }



  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/img/no-disponible.png';
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

    const cartItemLibro: CartItemLibro = {
      idLibro: libro.idLibro,
      titulo: libro.titulo ?? 'Sin título',
      autor,
      descripcion: libro.descripcion ?? '',
      precio: libro.precioVenta ?? 0,
      cantidad: 1,
      stock: libro.stock ?? 0,
      imagen: (libro as any).imagen ?? undefined,

      // opcionales
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

    return {
      tipo: 'libro',
      data: cartItemLibro
    };
  }
  buildLibroPayload(items: ItemCarrito[], persona: any) {
    return {
      items: items
        .filter(i => i.item.tipo === 'libro') // solo los libros
        .map(i => {
          const libro = i.item.data as CartItemLibro; // 🔑 forzamos a CartItemLibro
          return {
            libro: {
              idLibro: libro.idLibro,
              titulo: libro.titulo,
              isbn: libro.isbn,
              tamanno: libro.tamanno,
              descripcion: libro.descripcion,
              condicion: libro.condicion,
              impresion: libro.impresion,
              tipoTapa: libro.tipoTapa,
              estado: libro.estado,
              idSubcategoria: libro.idSubcategoria,
              idTipoPapel: libro.idTipoPapel,
              idProveedor: libro.idProveedor
            },
            precioVenta: i.precioVenta,
            cantidad: i.cantidad,
            descuento: 0
          };
        }),
      totalAmount: items.reduce((acc, i) => acc + i.precioVenta * i.cantidad, 0),
      persona,
      tipoComprobante: 'BOLETA',
      tipoPago: 'EFECTIVO',
      descuento: 0,
      vuelto: 0,
      efectivoRecibido: items.reduce((acc, i) => acc + i.precioVenta * i.cantidad, 0),
      montoDigital: 0
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