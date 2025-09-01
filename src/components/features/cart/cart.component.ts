import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart.service.ts';
declare const bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  private cart = inject(CartService);

  get items(): CartItem[] {
    return this.cart.items;
  }

  get total(): number {
    return this.cart.total;
  }

  get selectedItem(): CartItem | null {
    return this.cart.selectedItem;
  }

  removerItem(idLibro: number) {
    this.cart.remove(idLibro);
  }

  onQtyChange(idLibro: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.cart.updateQuantity(idLibro, Number(input.value));
  }

  confirmarCompra() {
    // Para pruebas: solo limpiar carrito
    alert('Compra registrada con éxito (simulación)');
    this.cart.clear();
    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (offcanvasEl) {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      instance.hide();
    }
  }
}
