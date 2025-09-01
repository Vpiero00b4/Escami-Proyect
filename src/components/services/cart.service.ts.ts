import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Libro } from '../../models/libros/libro';
import { MuebleProducto, Producto } from '../../models/mac/producto';
import { LocalStorageService } from './localStorage.service';
import { CartItem, CartItemLibro } from '../../app/components/features/libros/libro-list/libro-list';

// Tipo unificado para los items del carrito
export type Item = Libro | Producto;

export interface ItemCarritos {
  libro?: CartItemLibro;
  producto?: Producto;
  muebleProductos?:MuebleProducto;
  precioVenta: number;
  cantidad: number;
}

// --- Type Guards ---
export function isLibro(item: Item): item is Libro {
  return (item as Libro).idLibro !== undefined;
}

export function isProducto(item: Item): item is Producto {
  return (item as Producto).productoId !== undefined;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'carroItems';
  private _itemsCarrito: BehaviorSubject<ItemCarritos[]>;

  // Estado de visibilidad del carrito
  private _mostrarCarro = new BehaviorSubject<boolean>(false);
  mostrarCarro$ = this._mostrarCarro.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const storedItems =
      this.localStorageService.getItem<ItemCarritos[]>(this.storageKey) || [];
    this._itemsCarrito = new BehaviorSubject<ItemCarritos[]>(storedItems);
  }

  get itemsCarrito() {
    return this._itemsCarrito.asObservable();
  }

  get total(): number {
    return this._itemsCarrito.value.reduce(
      (acc, item) => acc + item.precioVenta * item.cantidad,
      0
    );
  }

  abrirCarro() {
    this._mostrarCarro.next(true);
  }

  cerrarCarro() {
    this._mostrarCarro.next(false);
  }

  // Método para agregar productos/libros al carrito
  addNewProduct(item: Libro | Producto) {
    const items = [...this._itemsCarrito.value];

    const index = items.findIndex(i =>
      i.libro && isLibro(item)
        ? i.libro.idLibro === item.idLibro
        : i.producto && isProducto(item)
          ? i.producto.productoId === item.productoId
          : false
    );

    if (index >= 0) {
      items[index].cantidad += 1;
    } else {
      let nuevoItem: ItemCarritos;

      if (isLibro(item)) {
        // 👉 transformar Libro → CartItemLibro
        const cartItem: CartItemLibro = {
          idLibro: item.idLibro,
          titulo: item.titulo,
          autor: item.autor,
          descripcion: item.descripcion,
          precio: item.precioVenta ?? 0,
          cantidad: 1,
          stock: item.stock,
          imagen: item.imagen,
          isbn: item.isbn,
          tamanno: item.tamanno,
          condicion: item.condicion,
          impresion: item.impresion,
          tipoTapa: item.tipoTapa,
          estado: item.estado,
          idSubcategoria: item.idSubcategoria,
          idTipoPapel: item.idTipoPapel,
          idProveedor: item.idProveedor
        };

        nuevoItem = {
          libro: cartItem,
          precioVenta: cartItem.precio,
          cantidad: cartItem.cantidad
        };
      } else {
        // Producto ya viene listo
        nuevoItem = {
          producto: item,
          precioVenta: item.precio ?? 0,
          cantidad: 1
        };
      }

      items.push(nuevoItem);
    }

    this._updateStorage(items);
  }

  // === NUEVO MÉTODO GENERALIZADO ===
  private _addItem(newItem: ItemCarritos) {
    const items = [...this._itemsCarrito.value];

    let index = -1;

    if (newItem.libro) {
      index = items.findIndex(i => i.libro?.idLibro === newItem.libro?.idLibro);
    } else if (newItem.producto) {
      index = items.findIndex(i => i.producto?.productoId === newItem.producto?.productoId);
    }

    if (index >= 0) {
      items[index].cantidad += 1;
    } else {
      items.push(newItem);
    }

    this._updateStorage(items);
  }

  // 👉 Método para agregar un LIBRO
  addLibro(libro: Libro) {
    const cartItem: CartItemLibro = {
      idLibro: libro.idLibro,
      titulo: libro.titulo,
      autor: libro.autor,
      descripcion: libro.descripcion,
      precio: libro.precioVenta ?? 0,
      cantidad: 1,
      stock: libro.stock,
      imagen: libro.imagen,
      isbn: libro.isbn,
      tamanno: libro.tamanno,
      condicion: libro.condicion,
      impresion: libro.impresion,
      tipoTapa: libro.tipoTapa,
      estado: libro.estado,
      idSubcategoria: libro.idSubcategoria,
      idTipoPapel: libro.idTipoPapel,
      idProveedor: libro.idProveedor
    };

    this._addItem({
      libro: cartItem,
      precioVenta: cartItem.precio,
      cantidad: cartItem.cantidad
    });
  }




  deleteItem(index: number) {
    const items = this._itemsCarrito.value.filter((_, i) => i !== index);
    this._updateStorage(items);
  }

  updateQuantity(id: number, cantidad: number, esLibro: boolean) {
    const items = this._itemsCarrito.value.map(i => {
      if (esLibro && i.libro && i.libro.idLibro === id) {
        return { ...i, cantidad };
      }
      if (!esLibro && i.producto && i.producto.productoId === id) {
        return { ...i, cantidad };
      }
      return i;
    });
    this._updateStorage(items);
  }

  private _updateStorage(items: ItemCarritos[]) {
    this._itemsCarrito.next(items);
    this.localStorageService.setItem(this.storageKey, items);
  }
}
