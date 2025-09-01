import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MuebleCategoria } from "../../../../models/mac/macCategoria";

@Injectable({
  providedIn: 'root' 
})
export class MueblesService {
    private apiUrl = 'https://localhost:7256/api';
    constructor(private http: HttpClient) { }

    getCategorias(): Observable<MuebleCategoria[]> {
        return this.http.get<MuebleCategoria[]>(`${this.apiUrl}/Categoria`)
    }
}