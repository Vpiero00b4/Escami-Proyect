import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartItemLibro, CartItemProducto, ItemCarrito } from "../../app/components/features/libros/libro-list/libro-list";

@Injectable({ providedIn: 'root' })
export class CheckoutService {
      private apiNode = 'http://localhost:3000/checkout';

    constructor(private http: HttpClient) { }

    buildCheckoutPayload(): any {
        const carritoData = localStorage.getItem('carroItems') || localStorage.getItem('carrito') || '[]';
        const carrito: ItemCarrito[] = JSON.parse(carritoData);

        const personaStorage = localStorage.getItem('persona');
        const persona = personaStorage ? JSON.parse(personaStorage) : {
            idPersona: 24,
            nombre: "Juan",
            apellidoPaterno: "Pérez",
            apellidoMaterno: "Ramírez",
            correo: "juanperez@example.com",
            tipoDocumento: "dni",
            numeroDocumento: "12345678",
            telefono: "987654321",
            sub: "cliente-test"
        };

        const usuarioStorage = localStorage.getItem('usuario');
        const usuario = usuarioStorage ? JSON.parse(usuarioStorage) : { idUsuario: 3 };

        if (!Array.isArray(carrito)) {
            return {
                carrito_id: 'CART-' + Date.now(),
                cliente_id: persona.idPersona,
                usuario_id: usuario.idUsuario,
                metodo_pago: 'EFECTIVO',
                tipoComprobante: 'BOLETA',
                totalAmount: 0,
                efectivoRecibido: 0,
                persona,
                usuario,
                items: []
            };
        }

        const items = carrito
            .map((i: any) => {
                if (!i) return null;

                if (i.item && i.item.tipo) {
                    switch (i.item.tipo) {
                        case 'libro':
                            const libro = i.item.data;
                            return {
                                tipo: 'libro',
                                libro,
                                precioVenta: i.precioVenta,
                                cantidad: i.cantidad,
                                descuento: 0,
                                cliente_id: persona.idPersona
                            };
                        case 'producto':
                            const producto = i.item.data;
                            return {
                                tipo: 'tech',
                                idProducto: producto.productoId,
                                cantidad: i.cantidad,
                                precioUnitario: i.precioVenta,
                                nombre: producto.nombre,
                                descripcion: producto.descripcion,
                                imagen: producto.imagen,
                                cliente_id: usuario.idUsuario
                            };
                        case 'mueble':
                            const mueble = i.item.data;
                            return {
                                tipo: 'mueble',
                                idProducto: mueble.Id,
                                cantidad: i.cantidad,
                                precioUnitario: mueble.Precio,
                                nombre: mueble.Nombre,
                                descripcion: mueble.Descripcion,
                                imagen: mueble.ImagenUrl || '',
                                cliente_id: 1
                            };
                    }
                }

                return null;
            })
            .filter(i => i !== null);

        const totalAmount = items.reduce((acc, i: any) => {
            if (i.tipo === 'libro') return acc + i.precioVenta * i.cantidad;
            if (i.tipo === 'tech' || i.tipo === 'mueble') return acc + i.precioUnitario * i.cantidad;
            return acc;
        }, 0);

        return {
            carrito_id: 'CART-' + Date.now(),
            cliente_id: null, // opcional, cada item tiene su cliente_id
            usuario_id: usuario.idUsuario,
            metodo_pago: 'EFECTIVO',
            tipoComprobante: 'BOLETA',
            totalAmount,
            efectivoRecibido: totalAmount,
            persona,
            usuario,
            items
        };
    }

    checkout() {
        const payload = this.buildCheckoutPayload();
        return this.http.post(this.apiNode, payload);
    }
}