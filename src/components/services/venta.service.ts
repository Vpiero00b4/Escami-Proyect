import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrarVentaDetalleRequest } from '../../models/libros/ventadto';
import { Observable } from 'rxjs';
// models/venta.model.ts
export interface DetalleVenta {
  producto: string;       // nombre del producto
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  idVenta: number;
  fechaVenta: string;     // se puede convertir a Date si quieres
  total: number;
  estado: string;
  cliente: string;
  detalles: DetalleVenta[];
}

@Injectable({ providedIn: 'root' })
export class VentaService {
  private readonly baseUrl = 'https://localhost:7143';

  constructor(private http: HttpClient) { }

  registrarVentaDetalle(payload: RegistrarVentaDetalleRequest) {
    return this.http.post(`${this.baseUrl}/DetalleVenta/registrar-venta-detalle`, payload);
  }

  ventasUsuario(id: number): Observable<Venta[]> {
    return this.http.get<Venta[]>(`https://localhost:7049/api/Ventas/usuario/${id}`);
  }

}