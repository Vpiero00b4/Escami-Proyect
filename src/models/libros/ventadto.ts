// src > models > libros > TS ventadto.ts 
export interface RegistrarVentaDetalleRequest {
  items: RegistrarVentaDetalleItem[];
  totalAmount: number;
  persona: PersonaDTO;
  tipoComprobante: string;
  tipoPago: string;
  descuento: number;
  vuelto: number;
  efectivoRecibido: number;
  montoDigital: number;
}

export interface RegistrarVentaDetalleItem {
  libro: LibroDTOBackend;
  precioVenta: number;
  cantidad: number;
  descuento: number;
}

export interface LibroDTOBackend {
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
  idProveedor: number;
}

export interface PersonaDTO {
  idPersona: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  sub: string;
}