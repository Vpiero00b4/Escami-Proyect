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
  idSubcategoria: number;
  idTipoPapel: number;
  tipoPapelDescripcion: string;
  idProveedor: number;
  imagen?: string;
  estadoDescripcion: string;
}
