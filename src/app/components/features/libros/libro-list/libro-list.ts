//libro-list.ts
import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../../../../models/libros/libro';
import { LibroService } from '../../../../../components/services/services-tienda/libros/api.service';
import { CartService } from '../../../../../components/services/cart.service.ts';
import { ActivatedRoute } from '@angular/router';

// Define aquí la interfaz CartItem mínima que usa tu CartService
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

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

  // Properties
  @Output() addToCart = new EventEmitter<CartItem>();
  libros: Libro[] = [];
  loading = false;
   idCategoria!: number;
  idSubcategoria!: number;

  // Constructor
  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private libroService: LibroService
  ) {}



 ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idCategoria = Number(params.get('idCategoria'));
      this.idSubcategoria = Number(params.get('idSubcategoria'));

      // ✅ Filtra según los parámetros de ruta
      if (this.idSubcategoria) {
        this.cargarLibrosPorSubcategoria(this.idSubcategoria);
      } else if (this.idCategoria) {
        this.cargarLibrosPorCategoria(this.idCategoria);
      } else {
        this.cargarLibros(); // fallback, todos los libros
      }
    });
  }

  // ✅ PUBLIC METHODS - Cart
  agregarAlCarrito(libro: Libro): void {
    if (libro.stock <= 0) return;
    this.cartService.addLibro(libro);
    this.cartService.abrirCarro();
  }

  // ✅ PUBLIC METHODS - UI Helpers
  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/img/no-disponible.png';
  }

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

  obtenerClaseStockTailwind(libro: Libro): string {
    const stock = this.obtenerStock(libro);
    if (stock > 10) {
      return 'bg-green-100 text-green-800'; // En stock
    } else if (stock > 0 && stock <= 10) {
      return 'bg-yellow-100 text-yellow-800'; // Stock bajo
    } else {
      return 'bg-red-100 text-red-800'; // Sin stock
    }
  }

  obtenerTextoStock(libro: Libro): string {
    const stock = this.obtenerStock(libro);
    return stock > 0 ? `${stock} disponibles` : 'Agotado';
  }

  estaDisponible(libro: Libro): boolean {
    return this.obtenerStock(libro) > 0;
  }

  // ✅ PRIVATE METHODS - Data Loading
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

  private cargarLibrosFiltrados(
    categoria: string | null,
    subcategoria: string | null,
    idSub: string | null
  ): void {
    this.loading = true;

    const idCategoria = idSub ? Number(idSub) : null;
    if (!idCategoria) {
      console.warn('⚠️ No se recibió un idSubcategoria válido');
      this.libros = [];
      this.loading = false;
      return;
    }

    this.libroService.getLibrosPorCategoria(idCategoria).subscribe({
      next: (res: Libro[]) => {
        this.libros = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar libros por categoría:', err);
        this.loading = false;
      }
    });
  }

  // ✅ PRIVATE METHODS - Utilities
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
private cargarLibrosPorSubcategoria(idSub: number): void {
  this.loading = true;
  this.libroService.getLibrosPorSubcategoria(idSub).subscribe({
    next: (res: Libro[]) => {
      this.libros = res;
      this.loading = false;
    },
    error: err => {
      console.error('❌ Error al cargar libros por subcategoría:', err);
      this.loading = false;
    }
  });
}

private cargarLibrosPorCategoria(idCategoria: number): void {
  this.loading = true;
  this.libroService.getLibrosPorCategoria(idCategoria).subscribe({
    next: (res: Libro[]) => {
      this.libros = res;
      this.loading = false;
    },
    error: err => {
      console.error('❌ Error al cargar libros por categoría:', err);
      this.loading = false;
    }
  });
}

}