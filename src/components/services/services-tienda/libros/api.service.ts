import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Libro } from '../../../../models/libros/libro';
import { Autor } from '../../../../models/libros/autor';

// Interfaces
interface Precio {
  idLibro: number;
  precioVenta: number;
}

interface Kardex {
  idLibro: number;
  stock: number;
}

interface PaginatedResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  libros: T[];
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  // Properties
  private readonly baseUrl = 'https://localhost:7143';

  // Constructor
  constructor(private http: HttpClient) {}

  // Public methods - CRUD básico
  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/Libro`);
  }

  getLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.baseUrl}/Libro/${id}`);
  }

  // Public methods - Con datos combinados (precio, stock, autores)
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
            
            return this.getAutoresByLibroId(libro.idLibro).pipe(
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

  // Public methods - Paginación
  getLibrosPaginados(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Libro>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Libro>>(`${this.baseUrl}/Libro/Paginator`, { params });
  }

  getLibrosPaginadosConDatos(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Libro>> {
    return this.getLibrosPaginados(page, pageSize).pipe(
      switchMap(response => {
        if (response.libros.length === 0) {
          return [response];
        }

        // Obtener datos adicionales para los libros de esta página
        return forkJoin({
          precios: this.http.get<Precio[]>(`${this.baseUrl}/Precio`),
          kardex: this.http.get<Kardex[]>(`${this.baseUrl}/Kardex`)
        }).pipe(
          switchMap(({ precios, kardex }) => {
            // Combinar datos para cada libro
            const librosConDatos$ = response.libros.map(libro => {
              const precio = precios.find(p => p.idLibro === libro.idLibro);
              const stock = kardex.find(k => k.idLibro === libro.idLibro);
              
              return this.getAutoresByLibroId(libro.idLibro).pipe(
                map(autores => ({
                  ...libro,
                  precioVenta: precio ? precio.precioVenta : 0,
                  stock: stock ? stock.stock : 0,
                  autores
                }))
              );
            });

            return forkJoin(librosConDatos$).pipe(
              map(librosCompletos => ({
                ...response,
                libros: librosCompletos
              }))
            );
          })
        );
      })
    );
  }

  // Public methods - Búsqueda y filtrado
  buscarLibros(termino: string, page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Libro>> {
    const params = new HttpParams()
      .set('termino', termino)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Libro>>(`${this.baseUrl}/Libro/Buscar`, { params });
  }

  getLibrosPorCategoria(categoriaId: number, page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Libro>> {
    const params = new HttpParams()
      .set('categoriaId', categoriaId.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Libro>>(`${this.baseUrl}/Libro/Categoria`, { params });
  }

  getLibrosPorSubcategoria(subcategoriaId: number, page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Libro>> {
    const params = new HttpParams()
      .set('subcategoriaId', subcategoriaId.toString())
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Libro>>(`${this.baseUrl}/Libro/Subcategoria`, { params });
  }

  // Private methods
  private getAutoresByLibroId(libroId: number): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${this.baseUrl}/LibroAutor/GetAutoresByLibroId/${libroId}`);
  }

  generarRangoPaginas(paginaActual: number, totalPaginas: number, maxVisible: number = 5): number[] {
    const inicio = Math.max(1, paginaActual - Math.floor(maxVisible / 2));
    const fin = Math.min(totalPaginas, inicio + maxVisible - 1);
    
    const paginas: number[] = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    
    return paginas;
  }
}