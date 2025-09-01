import { Component, inject } from '@angular/core';
import { CartComponent } from './features/cart/cart.component';
import { CartService } from './services/cart.service.ts';
import { LibroList } from '../app/components/features/libros/libro-list/libro-list';

declare const bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ LibroList, CartComponent],
  template: `
    <div class="container mt-3">
      <!-- Offcanvas Carrito -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="cartOffcanvasLabel">🛒 Carrito</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <app-cart></app-cart>
        </div>
      </div>

      <!-- Listado de libros -->
      <app-libro-list (addToCart)="handleAddToCart($event)"></app-libro-list>
    </div>
  `
})
export class HomeComponent {
  private cart = inject(CartService);

  handleAddToCart(item: any) {
    this.cart.add(item);

    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (offcanvasEl && typeof bootstrap?.Offcanvas === 'function') {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
      instance.show();
    }
  }
}