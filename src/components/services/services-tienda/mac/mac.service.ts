import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MacCategoria } from "../../../../models/mac/macCategoria";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' 
})
export class macService {
    private apiUrl = 'https://localhost:7049/api';
    constructor(private http: HttpClient) { }

    getCategorias(): Observable<MacCategoria> {
        return this.http.get<MacCategoria>(`${this.apiUrl}/Categoria`)
    }
}