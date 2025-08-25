import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../../models/libros/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService{
  private baseUrl = 'https://localhost:7143';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.baseUrl}/Libro`);
  }
}
