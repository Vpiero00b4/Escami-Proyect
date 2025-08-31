import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Calzado } from '../../../../models/calzados/calzado';
import { Marca } from '../../../../models/calzados/marca';

interface Precio {
  idCalzado: number;
  precioVenta: number;
}

interface Kardex {
  idCalzado: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalzadoService {
  private baseUrl = 'https://localhost:4200';

  constructor(private http: HttpClient) {}

  getCalzados(): Observable<Calzado[]> {
    return this.http.get<Calzado[]>(`${this.baseUrl}/Calzado`);
  }

  getCalzadosConMarcaPrecioStock(): Observable<Calzado[]> {
    return forkJoin({
      calzados: this.http.get<Calzado[]>(`${this.baseUrl}/Calzado`),
      precios: this.http.get<Precio[]>(`${this.baseUrl}/PrecioCalzado`),
      kardex: this.http.get<Kardex[]>(`${this.baseUrl}/KardexCalzado`)
    }).pipe(
      switchMap(({ calzados, precios, kardex }) =>
        forkJoin(
          calzados.map(calzado => {
            const precio = precios.find(p => p.idCalzado === calzado.idCalzado);
            const stock = kardex.find(k => k.idCalzado === calzado.idCalzado);
            
            return this.http
              .get<Marca[]>(`${this.baseUrl}/CalzadoMarca/GetMarcasByCalzadoId/${calzado.idCalzado}`)
              .pipe(
                map(marcas => ({
                  ...calzado,
                  precioVenta: precio ? precio.precioVenta : 0,
                  stock: stock ? stock.stock : 0,
                  marcas
                }))
              );
          })
        )
      )
    );
  }
}