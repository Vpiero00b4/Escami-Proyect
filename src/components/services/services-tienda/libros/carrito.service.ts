// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { Libro } from '../../../../models/libros/libro';

// // Interfaces
// interface ItemCarrito {
//   libro: Libro;
//   cantidad: number;
//   subtotal: number;
// }

// interface ResumenCarrito {
//   items: ItemCarrito[];
//   totalItems: number;
//   totalPrecio: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CarritoService {
  
//   // Properties
//   private readonly carritoKey = 'carrito-libros';
//   private carritoSubject = new BehaviorSubject<ItemCarrito[]>(this.obtenerCarritoDelStorage());

//   // Constructor
//   constructor() {
//     // Escuchar cambios en localStorage de otras pestañas
//     window.addEventListener('storage', (event) => {
//       if (event.key === this.carritoKey) {
//         this.carritoSubject.next(this.obtenerCarritoDelStorage());
//       }
//     });
//   }

//   // Observables públicos
//   get carrito$(): Observable<ItemCarrito[]> {
//     return this.carritoSubject.asObservable();
//   }

//   get resumenCarrito$(): Observable<ResumenCarrito> {
//     return this.carrito$.pipe(
//       map(items => this.calcularResumen(items))
//     );
//   }

//   // Public methods - Gestión del carrito
//   agregarLibro(libro: Libro, cantidad: number = 1): void {
//     if (!libro || cantidad <= 0) return;

//     const carritoActual = this.carritoSubject.value;
//     const indiceExistente = carritoActual.findIndex(item => item.libro.idLibro === libro.idLibro);

//     let nuevoCarrito: ItemCarrito[];

//     if (indiceExistente >= 0) {
//       // Actualizar cantidad del libro existente
//       nuevoCarrito = carritoActual.map((item, index) => 
//         index === indiceExistente 
//           ? { 
//               ...item, 
//               cantidad: item.cantidad + cantidad,
//               subtotal: (item.cantidad + cantidad) * item.libro.precioVenta
//             }
//           : item
//       );
//     } else {
//       // Agregar nuevo libro al carrito
//       const nuevoItem: ItemCarrito = {
//         libro,
//         cantidad,
//         subtotal: cantidad * libro.precioVenta
//       };
//       nuevoCarrito = [...carritoActual, nuevoItem];
//     }

//     this.actualizarCarrito(nuevoCarrito);
//     this.mostrarNotificacion(`📚 "${libro.titulo}" agregado al carrito`);
//   }

//   actualizarCantidad(libroId: number, nuevaCantidad: number): void {
//     if (nuevaCantidad <= 0) {
//       this.eliminarLibro(libroId);
//       return;
//     }

//     const carritoActual = this.carritoSubject.value;
//     const nuevoCarrito = carritoActual.map(item =>
//       item.libro.idLibro === libroId
//         ? {
//             ...item,
//             cantidad: nuevaCantidad,
//             subtotal: nuevaCantidad * item.libro.precioVenta
//           }
//         : item
//     );

//     this.actualizarCarrito(nuevoCarrito);
//   }

//   eliminarLibro(libroId: number): void {
//     const carritoActual = this.carritoSubject.value;
//     const libroEliminado = carritoActual.find(item => item.libro.idLibro === libroId);
    
//     if (libroEliminado) {
//       const nuevoCarrito = carritoActual.filter(item => item.libro.idLibro !== libroId);
//       this.actualizarCarrito(nuevoCarrito);
//       this.mostrarNotificacion(`🗑️ "${libroEliminado.libro.titulo}" eliminado del carrito`);
//     }
//   }

//   limpiarCarrito(): void {
//     this.actualizarCarrito([]);
//     this.mostrarNotificacion('🧹 Carrito vaciado');
//   }

//   // Public methods - Consultas
//   obtenerCantidadTotal(): number {
//     return this.carritoSubject.value.reduce((total, item) => total + item.cantidad, 0);
//   }

//   obtenerPrecioTotal(): number {
//     return this.carritoSubject.value.reduce((total, item) => total + item.subtotal, 0);
//   }

//   estaEnCarrito(libroId: number): boolean {
//     return this.carritoSubject.value.some(item => item.libro.idLibro === libroId);
//   }

//   obtenerCantidadLibro(libroId: number): number {
//     const item = this.carritoSubject.value.find(item => item.libro.idLibro === libroId);
//     return item ? item.cantidad : 0;
//   }

//   // Public methods - Para checkout futuro
//   obtenerItemsParaCheckout(): ItemCarrito[] {
//     return this.carritoSubject.value.map(item => ({ ...item }));
//   }

//   // Private methods
//   private obtenerCarritoDelStorage(): ItemCarrito[] {
//     try {
//       const carritoGuardado = localStorage.getItem(this.carritoKey);
//       return carritoGuardado ? JSON.parse(carritoGuardado) : [];
//     } catch (error) {
//       console.error('Error al cargar carrito del storage:', error);
//       return [];
//     }
//   }

//   private actualizarCarrito(nuevoCarrito: ItemCarrito[]): void {
//     try {
//       localStorage.setItem(this.carritoKey, JSON.stringify(nuevoCarrito));
//       this.carritoSubject.next(nuevoCarrito);
//     } catch (error) {
//       console.error('Error al guardar carrito en storage:', error);
//     }
//   }

//   private calcularResumen(items: ItemCarrito[]): ResumenCarrito {
//     const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
//     const totalPrecio = items.reduce((total, item) => total + item.subtotal, 0);

//     return {
//       items,
//       totalItems,
//       totalPrecio
//     };
//   }

//   private mostrarNotificacion(mensaje: string): void {
//     // Aquí puedes integrar con un servicio de notificaciones
//     // Por ahora, solo console.log
//     console.log('🛒 Carrito:', mensaje);
    
//     // Opcional: Mostrar toast notification
//     // this.toastService.success(mensaje);
//   }
// }