import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CartItemLibro, CartItemProducto, ItemCarrito } from "../../app/components/features/libros/libro-list/libro-list";

@Injectable({ providedIn: 'root' })
export class CheckoutService {
    private apiNode = 'http://localhost:3000/checkout';

    constructor(private http: HttpClient) { }

    buildCheckoutPayload(): any {
        // Verificar ambas claves por si acaso
        const carritoData = localStorage.getItem('carroItems') || localStorage.getItem('carrito') || '[]';
        const carrito: ItemCarrito[] = JSON.parse(carritoData);
        
        // Persona por defecto si no existe en localStorage
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

        // Usuario por defecto para productos tecnológicos
        const usuarioStorage = localStorage.getItem('usuario');
        const usuario = usuarioStorage ? JSON.parse(usuarioStorage) : {
            idUsuario: 3  // ID por defecto para productos tecnológicos
        };

        // Validación adicional
        if (!Array.isArray(carrito)) {
            console.warn('El carrito no es un array válido:', carrito);
            return {
                carrito_id: 'CART-' + new Date().getTime(),
                cliente_id: persona.idPersona || 1,
                usuario_id: usuario.idUsuario || 3,  // Incluir usuario por defecto
                metodo_pago: 'EFECTIVO',
                tipoComprobante: 'BOLETA',
                totalAmount: 0,
                efectivoRecibido: 0,
                persona: persona,
                usuario: usuario,  // Incluir objeto usuario
                items: []
            };
        }

        const items = carrito
            .map((i: any) => {
                // Validación del item
                if (!i) {
                    console.warn('Item inválido encontrado:', i);
                    return null;
                }

                // Estructura correcta según interfaces (item.tipo)
                if (i.item && i.item.tipo) {
                    if (i.item.tipo === 'libro') {
                        const libro = i.item.data as CartItemLibro;
                        return {
                            tipo: 'libro',
                            libro: {
                                idLibro: libro.idLibro,
                                titulo: libro.titulo,
                                isbn: libro.isbn,
                                tamanno: libro.tamanno,
                                descripcion: libro.descripcion,
                                condicion: libro.condicion,
                                impresion: libro.impresion,
                                tipoTapa: libro.tipoTapa,
                                estado: libro.estado,
                                idSubcategoria: libro.idSubcategoria,
                                idTipoPapel: libro.idTipoPapel,
                                idProveedor: libro.idProveedor
                            },
                            precioVenta: i.precioVenta,
                            cantidad: i.cantidad,
                            descuento: 0
                        };
                    } else if (i.item.tipo === 'producto') {
                        const producto = i.item.data as CartItemProducto;
                        return {
                            tipo: 'tech',
                            idProducto: producto.productoId,
                            cantidad: i.cantidad,
                            precioUnitario: i.precioVenta,
                            nombre: producto.nombre,
                            descripcion: producto.descripcion,
                            imagen: producto.imagen
                        };
                    }
                }
                // Estructura legacy/incorrecta (libro directamente)
                else if (i.libro) {
                    const libro = i.libro;
                    return {
                        tipo: 'libro',
                        libro: {
                            idLibro: libro.idLibro,
                            titulo: libro.titulo,
                            isbn: libro.isbn || '',
                            tamanno: libro.tamanno || '',
                            descripcion: libro.descripcion,
                            condicion: libro.condicion || '',
                            impresion: libro.impresion || '',
                            tipoTapa: libro.tipoTapa || '',
                            estado: libro.estado || true,
                            idSubcategoria: libro.idSubcategoria,
                            idTipoPapel: libro.idTipoPapel,
                            idProveedor: libro.idProveedor
                        },
                        precioVenta: i.precioVenta,
                        cantidad: i.cantidad,
                        descuento: 0
                    };
                }
                // Estructura legacy/incorrecta (producto directamente)
                else if (i.producto) {
                    const producto = i.producto;
                    return {
                        tipo: 'tech',
                        idProducto: producto.productoId,
                        cantidad: i.cantidad,
                        precioUnitario: i.precioVenta,
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        imagen: producto.imagen
                    };
                }

                console.warn('Estructura de item no reconocida:', i);
                return null;
            })
            .filter(i => i !== null);

        const totalAmount = items.reduce((acc, i: any) => {
            if (i.tipo === 'libro') return acc + i.precioVenta * i.cantidad;
            if (i.tipo === 'tech') return acc + i.precioUnitario * i.cantidad;
            return acc;
        }, 0);

        return {
            carrito_id: 'CART-' + new Date().getTime(),
            cliente_id: persona.idPersona || 1,
            usuario_id: usuario.idUsuario || 3,  // Usuario por defecto para productos
            metodo_pago: 'EFECTIVO',
            tipoComprobante: 'BOLETA',
            totalAmount,
            efectivoRecibido: totalAmount,
            persona: persona,
            usuario: usuario,  // Incluir objeto usuario completo
            items
        };
    }

    // Enviar al backend Node
    checkout() {
        const payload = this.buildCheckoutPayload();
        return this.http.post(this.apiNode, payload);
    }
}