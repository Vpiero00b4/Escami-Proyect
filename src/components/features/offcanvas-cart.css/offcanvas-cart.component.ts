import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service.ts';
declare const bootstrap: any;

@Component({
  selector: 'app-offcanvas-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offcanvas-cart.component.html',
  styleUrls: ['./offcanvas-cart.component.css']
})
export class OffcanvasCartComponent {
  private cart = inject(CartService);

  get items(): CartItem[] {
    return this.cart.items;
  }

  get total(): number {
    return this.cart.total;
  }

  removerItem(idLibro: number) {
    this.cart.remove(idLibro);
  }

  onQtyChange(idLibro: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.cart.updateQuantity(idLibro, Number(input.value));
  }

  confirmarCompra() {
    alert('Compra registrada con éxito (simulación)');
    this.cart.clear();
    this.toggleCart(false);
  }

  toggleCart(open: boolean) {
    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (!offcanvasEl || typeof bootstrap?.Offcanvas !== 'function') return;

    const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
    open ? instance.show() : instance.hide();
  }
}
