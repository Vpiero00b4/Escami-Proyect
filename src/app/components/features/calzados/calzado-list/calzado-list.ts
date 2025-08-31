import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calzado } from '../../../../../models/calzados/calzado';
import { CalzadoService } from '../../../../../components/services/services-tienda/calzados/api.service';

@Component({
  selector: 'app-calzado-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calzado-list.html',
  styleUrls: ['./calzado-list.css']
})
export class CalzadoList implements OnInit {
  
  @Output() calzadoSeleccionado = new EventEmitter<Calzado>();
  
  calzados: Calzado[] = [];
  loading = true;

  constructor(private calzadoService: CalzadoService) {}

  ngOnInit(): void {
    this.cargarCalzados();
  }

  agregarAlCarrito(calzado: Calzado): void {
    this.calzadoSeleccionado.emit(calzado);
  }

  obtenerNombresMarcas(calzado: Calzado): string {
    if (!calzado.marcas || calzado.marcas.length === 0) {
      return 'Marca no disponible';
    }
    
    return calzado.marcas
      .map(marca => marca.nombre)
      .join(', ');
  }

  obtenerStock(calzado: Calzado): number {
    return calzado.stock ?? 0;
  }

  obtenerClaseStock(calzado: Calzado): string {
    const stock = this.obtenerStock(calzado);
    
    if (stock === 0) return 'stock-agotado';
    if (stock <= 10) return 'stock-bajo';
    return 'stock-alto';
  }

  obtenerTextoStock(calzado: Calzado): string {
    const stock = this.obtenerStock(calzado);
    return stock > 0 ? `${stock} disponibles` : 'Agotado';
  }

  estaDisponible(calzado: Calzado): boolean {
    return this.obtenerStock(calzado) > 0;
  }

  private mostrarStockEnConsola(): void {
    this.calzados.forEach(calzado => {
      console.log(`👟 ${calzado.nombre} | Stock disponible: ${calzado.stock}`);
    });
  }

  private cargarCalzados(): void {
    this.loading = true;

    this.calzadoService.getCalzadosConMarcaPrecioStock().subscribe({
      next: (data: Calzado[]) => {
        this.calzados = data;
        this.loading = false;
        this.mostrarStockEnConsola();
      },
      error: (err: any) => {
        console.error('❌ Error cargando calzados:', err);
        this.loading = false;
      }
    });
  }
}