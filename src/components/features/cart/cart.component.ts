import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Libro } from '../../../models/libros/libro';
import { Producto } from '../../../models/mac/producto';
import { CartService, ItemCarrito } from '../../services/cart.service.ts';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  mostrarCarro = false;
  itemsCarrito: ItemCarrito[] = [];
  defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon.jpg';

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.itemsCarrito.subscribe(items => this.itemsCarrito = items);
    this.cartService.mostrarCarro$.subscribe(show => this.mostrarCarro = show);
  }

  cerrarCarro() { 
    this.cartService.cerrarCarro(); 
  }

  onQtyChange(item: ItemCarrito, cantidad: number) {
    if (item.libro) {
      this.cartService.updateQuantity(item.libro.idLibro, cantidad, true);
    } else if (item.producto) {
      this.cartService.updateQuantity(item.producto.productoId, cantidad, false);
    }
  }

  delete(index: number) { 
    this.cartService.deleteItem(index); 
  }

  get total() { 
    return this.cartService.total; 
  }

  getTitulo(item: ItemCarrito) { 
    return item.libro ? item.libro.titulo : item.producto?.nombre; 
  }

  getDescripcion(item: ItemCarrito) { 
    return item.libro 
      ? item.libro.autor || 'Autor no disponible' 
      : item.producto?.descripcion; 
  }

  getImagen(item: ItemCarrito) { 
    return item.libro?.imagen || item.producto?.imagen || this.defaultImageUrl; 
  }
}
