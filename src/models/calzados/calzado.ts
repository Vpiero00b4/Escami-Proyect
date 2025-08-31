import { Marca } from "./marca";

export interface Calzado {
  idCalzado: number;
  nombre: string;
  descripcion: string;
  talla: number;
  condicion: string;
  material: string;
  idSubcategoria: number;
  idProveedor: number;
  imagen?: string;
  estado?: string;
  marcas?: Marca[];
  precioVenta?: number;
  stock?: number;
}