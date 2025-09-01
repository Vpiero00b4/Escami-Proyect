import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MueblesService } from '../../../../../components/services/services-tienda/Muebles/muebles.service';
import { CartService } from '../../../../../components/services/cart.service.ts';
import { ProductoMuebleService } from '../../../../../components/services/services-tienda/Muebles/producto.service';
import { CommonModule } from '@angular/common';
import { MuebleProducto, Producto } from '../../../../../models/mac/producto';

@Component({
  selector: 'app-mueble-list-component',
  imports: [CommonModule],
  templateUrl: './mueble-list-component.html',
  styleUrl: './mueble-list-component.css'
})
export class MuebleListComponent {
  idSubcategoria!: number;
  categoriaNombre!: string;
  subcategoriaNombre!: string;
  productos: MuebleProducto[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoMuebleService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoriaNombre = params.get('mueblesCategoria') || '';
      this.subcategoriaNombre = params.get('mueblesubcategoriaMac') || '';
      const id = this.route.snapshot.paramMap.get('idSubcategoria');
      if (id) {
        this.idSubcategoria = +id;
        this.cargarProductos();
      }
    });
  }

  cargarProductos() {
    this.productoService.getproductosCategoria(this.idSubcategoria)
      .subscribe(res => {
        // Si res no es array, lo convertimos
        this.productos = Array.isArray(res) ? res : [res];
      });
  }


  agregarAlCarrito(producto: MuebleProducto) {
    if (producto.stock <= 0) return;

    const itemParaCarrito: Producto = {
      productoId: producto.id,       // mapeo Id → productoId
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      subCategoria: producto.subCategoria,
      imagen: producto.imagen
    };

    this.cartService.addNewProduct(itemParaCarrito);
    this.cartService.abrirCarro();
  }

  onImageError(event: any) {
    event.target.src = '';
  }
}
