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

// Categorías de Muebles
export interface MuebleCategoria {
    id: number;                     // Id de la categoría
    nombre: string;                 // Nombre de la categoría
    subcategorias: MuebleSubcategoria[]; // Lista de subcategorías
}

// Subcategorías de Muebles
export interface MuebleSubcategoria {
    id: number;                     // Id de la subcategoría
    nombre: string;                 // Nombre de la subcategoría
    categoria?: MuebleCategoria | null; // Referencia opcional a la categoría padre
}

