import { Component, OnInit } from '@angular/core';
import { Venta, VentaService } from '../../services/venta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-component',
  imports: [CommonModule],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css'
})
export class UsuarioComponent implements OnInit {
  ventas: Venta[] = [];
  constructor(private ventaService: VentaService) { }
  ngOnInit(): void {
    this.getVentasUsuario();
  }

  getVentasUsuario(){
    this.ventaService.ventasUsuario(3).subscribe({
      next:(res)=>{
        this.ventas=res;
      }
    })
  }

}
