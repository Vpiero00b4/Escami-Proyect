import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrarVentaDetalleRequest } from '../../models/libros/ventadto';

@Injectable({ providedIn: 'root' })
export class VentaService {
  private readonly baseUrl = 'https://localhost:7143';

  constructor(private http: HttpClient) {}

  registrarVentaDetalle(payload: RegistrarVentaDetalleRequest) {
    return this.http.post(`${this.baseUrl}/DetalleVenta/registrar-venta-detalle`, payload);
  }
}