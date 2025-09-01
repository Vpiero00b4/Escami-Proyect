import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../../../../components/services/services-tienda/mac/producto.service';
import { Producto } from '../../../../../models/mac/producto';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mac-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './mac-list.html',
  styleUrl: './mac-list.css'
})
export class MacList implements OnInit {
  idSubcategoria!: number;
  productos: Producto[] = [];
  constructor(private route: ActivatedRoute, private producService: ProductoService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('idSubcategoria');
      if (id) {
        this.idSubcategoria = +id;
        this.cargarProductos();
      }
    });
  }

  cargarProductos() {
    this.producService.getproductosCategoria(this.idSubcategoria)
      .subscribe(res => this.productos = res);
  }
}
