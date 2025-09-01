import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../../../../models/mac/producto";

@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'https://localhost:7049/api';
    constructor(private http: HttpClient) { }

    getproductosCategoria(id:number):Observable<Producto[]>{
        return this.http.get<Producto[]>(`${this.apiUrl}/Productos/subcategoria/${id}`)
    }

} 