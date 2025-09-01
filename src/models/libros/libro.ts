import { Autor } from "./autor";

export interface Libro {
  idLibro: number;
  titulo: string;
  isbn: string;
  tamanno: string;
  descripcion: string;
  condicion: string;
  impresion: string;
  tipoTapa: string;
  estado: boolean;
  autor: string;
  idSubcategoria: number;
  idTipoPapel: number;
  tipoPapelDescripcion: string;
  idProveedor: number;
  imagen?: string;
  estadoDescripcion: string;
  autores?: Autor[];
  precioVenta: number;
  stock: number;
}
