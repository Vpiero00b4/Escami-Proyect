import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Libro } from '../../../../models/libros/libro';
import { Autor } from '../../../../models/libros/autor';

interface Precio {
  idLibro: number;
  precioVenta: number;
}

interface Kardex {
  idLibro: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private baseUrl = 'https://localhost:7143';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/Libro`);
  }

getLibrosConAutoresPrecioStock(): Observable<Libro[]> {
  return forkJoin({
    libros: this.http.get<Libro[]>(`${this.baseUrl}/Libro`),
    precios: this.http.get<Precio[]>(`${this.baseUrl}/Precio`),
    kardex: this.http.get<Kardex[]>(`${this.baseUrl}/Kardex`)
  }).pipe(
    switchMap(({ libros, precios, kardex }) =>
      forkJoin(
        libros.map(libro => {
          const precio = precios.find(p => p.idLibro === libro.idLibro);
          const stock = kardex.find(k => k.idLibro === libro.idLibro);

          return this.http
            .get<Autor[]>(`${this.baseUrl}/LibroAutor/GetAutoresByLibroId/${libro.idLibro}`)
            .pipe(
              map(autores => ({
                ...libro,
                precioVenta: precio ? precio.precioVenta : 0,
                stock: stock ? stock.stock : 0,
                autores
              }))
            );
        })
      )
    )
  );
}

}

