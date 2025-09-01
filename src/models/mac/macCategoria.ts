export interface MacCategoria {
    idCategoria: number;
    nombre: string;
    subcategorias: Subcategoria[];
}

export interface Subcategoria {
    id: number;
    nombre: string;
    categoria?: any | null; 
}
