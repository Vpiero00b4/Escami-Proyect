import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {  MuebleProducto, Producto } from "../../../../models/mac/producto";

@Injectable({
    providedIn: 'root'
})
export class ProductoMuebleService {
    private apiUrl = 'https://localhost:7256/api';
    constructor(private http: HttpClient) { }

    getproductosCategoria(id:number):Observable<MuebleProducto[]>{
        return this.http.get<MuebleProducto[]>(`${this.apiUrl}/ProductoMueble/subcategoria/${id}`)
    }
} 