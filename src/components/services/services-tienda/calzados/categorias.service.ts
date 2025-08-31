import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria  } from '../../../../models/calzados/categoria';
import { Subcategoria } from '../../../../models/calzados/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaCalzadoService {
  private apiUrl = 'https://localhost:4200'; 

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/Categoria`);
  }

  getSubcategorias(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(`${this.apiUrl}/Subcategoria`);
  }
}