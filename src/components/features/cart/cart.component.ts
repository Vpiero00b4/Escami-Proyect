import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Libro } from '../../../models/libros/libro';
import { Producto } from '../../../models/mac/producto';
import { CartService, ItemCarritos } from '../../services/cart.service.ts';
import { CartItemLibro, CartItemProducto, ItemCarrito } from '../../../app/components/features/libros/libro-list/libro-list';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  mostrarCarro = false;
  itemsCarrito: ItemCarritos[] = [];
  defaultImageUrl = 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon.jpg';
  itemsCarritos: ItemCarrito[] = JSON.parse(localStorage.getItem('carroItems') || '[]');
  constructor(public cartService: CartService, private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.cartService.itemsCarrito.subscribe(items => this.itemsCarrito = items);
    this.cartService.mostrarCarro$.subscribe(show => this.mostrarCarro = show);
  }

  cerrarCarro() {
    this.cartService.cerrarCarro();
  }

  onQtyChange(item: ItemCarritos, cantidad: number) {
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

  getTitulo(item: ItemCarritos) {
    return item.libro ? item.libro.titulo : item.producto?.nombre;
  }

  getDescripcion(item: ItemCarritos) {
    return item.libro
      ? item.libro.autor || 'Autor no disponible'
      : item.producto?.descripcion;
  }

  getImagen(item: ItemCarritos) {
    return item.libro?.imagen || item.producto?.imagen || this.defaultImageUrl;
  }


  buildLibroPayload(items: ItemCarrito[], persona: any) {
    return {
      items: items
        .filter(i => i.item.tipo === 'libro')
        .map(i => {
          const libro = i.item.data as CartItemLibro;
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

      // 👇 aquí ya no mandamos todo el objeto persona
      persona: {
        nombrePersona: 'default'
      },

      tipoComprobante: 'BOLETA',
      tipoPago: 'EFECTIVO',
      descuento: 0,
      vuelto: 0,
      efectivoRecibido: items.reduce((acc, i) => acc + i.precioVenta * i.cantidad, 0),
      montoDigital: 0
    };
  }

  buildProductoPayload(items: ItemCarrito[], idUsuario: number) {
    return {
      idUsuario,
      detalles: items
        .filter(i => i.item.tipo === 'producto')
        .map(i => {
          const producto = i.item.data as CartItemProducto;
          return {
            idProducto: producto.productoId,
            cantidad: i.cantidad
          };
        })
    };
  }
  // CartComponent - finalizarCompra() corregido
  finalizarCompra() {
    if (this.itemsCarritos.length === 0) return;

    this.checkoutService.checkout().subscribe({
      next: (res: any) => {
        console.log('Compra procesada:', res);
        alert('Compra realizada con éxito! 🎉');

        // Limpiar AMBAS claves por consistencia
        localStorage.removeItem('carrito');
        localStorage.removeItem('carroItems');
        this.itemsCarritos = [];
      },
      error: (err) => {
        console.error('Error al procesar la compra:', err);
        alert('Ocurrió un error al procesar la compra ❌');
      }
    });
  }
}
