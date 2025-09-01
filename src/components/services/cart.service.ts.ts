import { Injectable } from '@angular/core';

export interface CartItem {
  idLibro: number;
  titulo: string;
  autor: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  stock: number;
  imagen?: string;
  // Campos opcionales que pueden ayudar a completar el DTO backend:
  isbn?: string;
  tamanno?: string;
  condicion?: string;
  impresion?: string;
  tipoTapa?: string;
  estado?: boolean;
  idSubcategoria?: number;
  idTipoPapel?: number;
  idProveedor?: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items: CartItem[] = [];
  private _selectedItem: CartItem | null = null;

  get items(): CartItem[] {
    return this._items;
  }

  get selectedItem(): CartItem | null {
    return this._selectedItem;
  }

  set selectedItem(item: CartItem | null) {
    this._selectedItem = item;
  }

  add(item: CartItem) {
    const existing = this._items.find(i => i.idLibro === item.idLibro);
    if (existing) {
      // controla stock
      const nuevaCantidad = Math.min(existing.cantidad + item.cantidad, existing.stock);
      existing.cantidad = nuevaCantidad;
      this._selectedItem = existing;
    } else {
      this._items.push({ ...item, cantidad: Math.min(item.cantidad || 1, item.stock) });
      this._selectedItem = item;
    }
  }

  updateQuantity(idLibro: number, cantidad: number) {
    const it = this._items.find(i => i.idLibro === idLibro);
    if (it) it.cantidad = Math.max(1, Math.min(cantidad, it.stock));
  }

  remove(idLibro: number) {
    this._items = this._items.filter(i => i.idLibro !== idLibro);
    if (this._selectedItem?.idLibro === idLibro) this._selectedItem = null;
  }

  clear() {
    this._items = [];
    this._selectedItem = null;
  }

  get total(): number {
    return this._items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  }
}