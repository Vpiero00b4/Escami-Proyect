import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VentaService } from '../../services/venta.service';
import { CartItem, CartService } from '../../services/cart.service.ts';
import { LibroDTOBackend, PersonaDTO, RegistrarVentaDetalleItem, RegistrarVentaDetalleRequest } from '../../../models/libros/ventadto';

declare const bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  private cart = inject(CartService);
  private venta = inject(VentaService);

  get items() {
    return this.cart.items;
  }

  get selectedItem() {
    return this.cart.selectedItem;
  }

  get total() {
    return this.cart.total;
  }

  // Llamado desde fuera para agregar y abrir offcanvas
  addToCart(item: CartItem) {
    this.cart.add(item);
    const offcanvasEl = document.getElementById('bookDetailModal');
    if (offcanvasEl && typeof bootstrap?.Offcanvas === 'function') {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      instance.show();
    }
  }

  confirmarAgregar() {
    // Ya está agregado en memoria; opcionalmente cierra el offcanvas
    const offcanvasEl = document.getElementById('bookDetailModal');
    if (offcanvasEl) {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      instance.hide();
    }
  }

  removerItem(idLibro: number) {
    this.cart.remove(idLibro);
  }

  onQtyChange(idLibro: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const val = Number(input.value);
    // Si usas CartService centralizado:
    this.cart.updateQuantity(idLibro, val);

    // Si prefieres mutar local (no recomendado si ya tienes servicio):
    // const it = this.items.find(i => i.idLibro === idLibro);
    // if (it) {
    //   it.cantidad = Math.max(1, Math.min(val, it.stock));
    // }
  }

  // Simula persona hasta integrar auth/checkout
  private getPersonaMock(): PersonaDTO {
    return {
      idPersona: 0,
      nombre: 'Cliente',
      apellidoPaterno: 'Ecommerce',
      apellidoMaterno: 'Web',
      correo: 'cliente@demo.com',
      tipoDocumento: 'DNI',
      numeroDocumento: '00000000',
      telefono: '000000000',
      sub: 'anonymous'
    };
  }

  private mapToBackendLibro(item: CartItem): LibroDTOBackend {
    return {
      idLibro: item.idLibro,
      titulo: item.titulo ?? '',
      isbn: item.isbn ?? '',
      tamanno: item.tamanno ?? '',
      descripcion: item.descripcion ?? '',
      condicion: item.condicion ?? '',
      impresion: item.impresion ?? '',
      tipoTapa: item.tipoTapa ?? '',
      estado: item.estado ?? true,
      idSubcategoria: item.idSubcategoria ?? 0,
      idTipoPapel: item.idTipoPapel ?? 0,
      idProveedor: item.idProveedor ?? 0
    };
  }

  private buildPayload(): RegistrarVentaDetalleRequest {
    const items: RegistrarVentaDetalleItem[] = this.items.map(i => ({
      libro: this.mapToBackendLibro(i),
      precioVenta: i.precio,
      cantidad: i.cantidad,
      descuento: 0
    }));

    return {
      items,
      totalAmount: this.total,
      persona: this.getPersonaMock(),
      tipoComprobante: 'BOLETA',
      tipoPago: 'EFECTIVO',
      descuento: 0,
      vuelto: 0,
      efectivoRecibido: 0,
      montoDigital: 0
    };
  }

  confirmarCompra() {
    const payload = this.buildPayload();
    this.venta.registrarVentaDetalle(payload).subscribe({
      next: () => {
        this.cart.clear();
        const offcanvasEl = document.getElementById('bookDetailModal');
        if (offcanvasEl) {
          const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
          instance.hide();
        }
        alert('Compra registrada con éxito');
      },
      error: (err) => {
        console.error('Error registrando venta detalle', err);
        alert('No se pudo registrar la compra');
      }
    });
  }
}