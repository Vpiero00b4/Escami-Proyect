import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../../../../components/services/services-tienda/mac/producto.service';
import { Producto } from '../../../../../models/mac/producto';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, ItemCarrito } from '../../../../../components/services/cart.service.ts';

@Component({
  selector: 'app-mac-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './mac-list.html',
  styleUrl: './mac-list.css'
})
export class MacList implements OnInit {
  idSubcategoria!: number;
  item: ItemCarrito[] = [];
  productos: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private producService: ProductoService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('idSubcategoria');
      if (id) {
        this.idSubcategoria = +id;
        this.cargarProductos();
      }
    });
  }

  // Método para agregar un producto específico al carrito
  agregarAlCarrito(producto: Producto) {
    if (producto.stock <= 0) return;

    // Enviar directamente el producto, no un ItemCarrito
    this.cartService.addNewProduct(producto);  // 👈 Solo el producto
    this.cartService.abrirCarro();
  }



  cargarProductos() {
    this.producService.getproductosCategoria(this.idSubcategoria)
      .subscribe(res => this.productos = res);
  }

  onImageError(event: any): void {
    event.target.src = '/assets/images/producto-placeholder.jpg';
  }

}
