export interface Producto {
    productoId: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string | null;
    subCategoria: string | null;
    imagen: string | null;
}

export interface MuebleProducto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string | null;
  subCategoria: string | null;
  imagen: string | null;
}


