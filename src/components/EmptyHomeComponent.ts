import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-16">
      <!-- Banner Carousel Deslizante con Imágenes Reales -->
      <section class="relative overflow-hidden rounded-2xl shadow-2xl">
        <div class="banner-carousel">
          <!-- Slide 1: Colchones -->
          <div class="banner-slide banner-slide-1 active">
            <div class="banner-content">
              <img src="https://www.rosen.com.pe/media/wysiwyg/VH_Colchones1.webp" 
                   alt="Colchones en Oferta" 
                   class="banner-bg-image" />
              <div class="banner-overlay"></div>
              <div class="relative z-10 text-left text-white p-12 max-w-lg">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 banner-title">Colchones Premium</h1>
                <p class="text-lg md:text-xl mb-6">Descansa mejor con nuestros colchones de alta calidad</p>
                <button class="banner-btn">Ver Colchones</button>
              </div>
            </div>
          </div>
          
          <!-- Slide 2: iPhone 16 -->
          <div class="banner-slide banner-slide-2">
            <div class="banner-content">
              <img src="https://pe.tiendasishop.com/cdn/shop/files/iPhone_16-D-2918x1459.webp?v=1755888563&width=1200" 
                   alt="iPhone 16" 
                   class="banner-bg-image" />
              <div class="banner-overlay"></div>
              <div class="relative z-10 text-left text-white p-12 max-w-lg">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 banner-title">iPhone 16</h1>
                <p class="text-lg md:text-xl mb-6">La nueva generación de iPhone ya está aquí</p>
                <button class="banner-btn">Descubrir</button>
              </div>
            </div>
          </div>
          
          <!-- Slide 3: iPhone 16 Pro -->
          <div class="banner-slide banner-slide-3">
            <div class="banner-content">
              <img src="https://pe.tiendasishop.com/cdn/shop/files/iPhone_16_Pro-D-2918x1459.webp?v=1755888564&width=1200" 
                   alt="iPhone 16 Pro" 
                   class="banner-bg-image" />
              <div class="banner-overlay"></div>
              <div class="relative z-10 text-left text-white p-12 max-w-lg">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 banner-title">iPhone 16 Pro</h1>
                <p class="text-lg md:text-xl mb-6">Tecnología profesional en tus manos</p>
                <button class="banner-btn">Ver Pro</button>
              </div>
            </div>
          </div>

          <!-- Slide 4: Sofás -->
          <div class="banner-slide banner-slide-4">
            <div class="banner-content">
              <img src="https://www.rosen.com.pe/media/wysiwyg/VH_SOFA__2.webp" 
                   alt="Sofás Premium" 
                   class="banner-bg-image" />
              <div class="banner-overlay"></div>
              <div class="relative z-10 text-left text-white p-12 max-w-lg">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 banner-title">Sofás de Lujo</h1>
                <p class="text-lg md:text-xl mb-6">Comodidad y elegancia para tu hogar</p>
                <button class="banner-btn">Ver Sofás</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Indicadores del carousel -->
        <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          <button class="banner-indicator active" data-slide="0"></button>
          <button class="banner-indicator" data-slide="1"></button>
          <button class="banner-indicator" data-slide="2"></button>
          <button class="banner-indicator" data-slide="3"></button>
        </div>
      </section>

      <!-- Barra de Beneficios -->
      <section class="bg-white rounded-2xl shadow-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-center justify-center space-x-4">
            <div class="bg-green-100 rounded-full p-3">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Envío Gratis</h3>
              <p class="text-sm text-gray-600">En compras superiores a $100</p>
            </div>
          </div>
          
          <div class="flex items-center justify-center space-x-4">
            <div class="bg-blue-100 rounded-full p-3">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Garantía Extendida</h3>
              <p class="text-sm text-gray-600">Hasta 2 años en todos los productos</p>
            </div>
          </div>
          
          <div class="flex items-center justify-center space-x-4">
            <div class="bg-purple-100 rounded-full p-3">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">Pago Seguro</h3>
              <p class="text-sm text-gray-600">Múltiples métodos de pago</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Ofertas Flash -->
      <section class="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-lg">
        <div class="text-center mb-8">
          <div class="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full mb-4">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
            </svg>
            Ofertas Flash - Tiempo Limitado
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">🔥 Descuentos Increíbles</h2>
          <p class="text-lg text-gray-600">Aprovecha estos precios especiales antes de que terminen</p>
        </div>
        
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Oferta 1 -->
          <div class="offer-card">
            <div class="offer-badge">-35%</div>
            <div class="countdown-badge">2d 15h</div>
            <img src="https://i.ibb.co/8cWFn8L/cama-individual.png" 
                 alt="Cama Individual" 
                 class="h-32 w-full object-cover rounded-lg mb-4" />
            <h3 class="font-semibold text-lg mb-2">Cama Individual Premium</h3>
            <div class="flex items-center justify-between mb-3">
              <div>
                <span class="text-red-500 line-through text-sm">$350</span>
                <span class="text-green-600 font-bold text-xl ml-2">$228</span>
              </div>
            </div>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
              <span class="text-sm text-gray-500 ml-2">(127 reseñas)</span>
            </div>
          </div>
          
          <!-- Oferta 2 -->
          <div class="offer-card">
            <div class="offer-badge">-20%</div>
            <div class="countdown-badge">1d 8h</div>
            <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" 
                 alt="MacBook" 
                 class="h-32 w-full object-contain rounded-lg mb-4" />
            <h3 class="font-semibold text-lg mb-2">MacBook Air M2</h3>
            <div class="flex items-center justify-between mb-3">
              <div>
                <span class="text-red-500 line-through text-sm">$1,200</span>
                <span class="text-green-600 font-bold text-xl ml-2">$960</span>
              </div>
            </div>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
              <span class="text-sm text-gray-500 ml-2">(89 reseñas)</span>
            </div>
          </div>
          
          <!-- Oferta 3 -->
          <div class="offer-card">
            <div class="offer-badge">-45%</div>
            <div class="countdown-badge">3d 22h</div>
            <img src="https://i.ibb.co/jT7Vfhm/sofa.png" 
                 alt="Sofá" 
                 class="h-32 w-full object-cover rounded-lg mb-4" />
            <h3 class="font-semibold text-lg mb-2">Sofá Moderno 2 Plazas</h3>
            <div class="flex items-center justify-between mb-3">
              <div>
                <span class="text-red-500 line-through text-sm">$500</span>
                <span class="text-green-600 font-bold text-xl ml-2">$275</span>
              </div>
            </div>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                <span>★★★★☆</span>
              </div>
              <span class="text-sm text-gray-500 ml-2">(156 reseñas)</span>
            </div>
          </div>
          
          <!-- Oferta 4 -->
          <div class="offer-card">
            <div class="offer-badge">-15%</div>
            <div class="countdown-badge">5d 12h</div>
            <img src="https://cdn-icons-png.flaticon.com/512/0/191.png" 
                 alt="iPhone" 
                 class="h-32 w-full object-contain rounded-lg mb-4" />
            <h3 class="font-semibold text-lg mb-2">iPhone 15 Pro Max</h3>
            <div class="flex items-center justify-between mb-3">
              <div>
                <span class="text-red-500 line-through text-sm">$1,100</span>
                <span class="text-green-600 font-bold text-xl ml-2">$935</span>
              </div>
            </div>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                <span>★★★★★</span>
              </div>
              <span class="text-sm text-gray-500 ml-2">(203 reseñas)</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Hero Original - Explora Nuestras Categorías -->
      <section class="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Explora Nuestras Categorías</h2>
        <p class="text-lg md:text-xl">Encuentra exactamente lo que necesitas</p>
      </section>

      <!-- Categorías principales -->
      <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Libros -->
        <a routerLink="/home/libros"
           class="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2">
          <img src="https://cdn-icons-png.flaticon.com/512/29/29302.png" alt="Libros"
               class="h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <h2 class="text-xl font-semibold text-center">Libros</h2>
          <p class="text-gray-600 text-center mt-2">+500 títulos disponibles</p>
        </a>

        <!-- MacBooks -->
        <a routerLink="/home/macProductos/apple/macbook/2"
           class="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2">
          <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="MacBooks"
               class="h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <h2 class="text-xl font-semibold text-center">MacBooks</h2>
          <p class="text-gray-600 text-center mt-2">Desde $960</p>
        </a>

        <!-- iPhones -->
        <a routerLink="/home/macProductos/apple/iphone/1"
           class="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2">
          <img src="https://cdn-icons-png.flaticon.com/512/0/191.png" alt="iPhone"
               class="h-24 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <h2 class="text-xl font-semibold text-center">iPhones</h2>
          <p class="text-gray-600 text-center mt-2">Últimos modelos</p>
        </a>

        <!-- Accesorios -->
        <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" alt="Accesorios"
               class="h-24 mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-center mb-4">Accesorios</h2>
          <div class="flex flex-col space-y-2">
            <a routerLink="/home/macProductos/accesorios/cargadores/3"
               class="text-indigo-600 hover:text-indigo-800 hover:underline text-center transition">Cargadores</a>
            <a routerLink="/home/macProductos/accesorios/fundas/4"
               class="text-indigo-600 hover:text-indigo-800 hover:underline text-center transition">Fundas</a>
          </div>
        </div>
      </section>

      <!-- Sección de Productos Destacados -->
      <section class="bg-gray-50 rounded-2xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">⭐ Productos Destacados</h2>
          <p class="text-lg text-gray-600">Los más vendidos de cada categoría</p>
        </div>
        
        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Producto Destacado 1 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden featured-product">
            <div class="md:flex">
              <div class="md:w-1/2">
                <img src="https://i.ibb.co/fFVLzRk/cama-doble.png" 
                     alt="Cama Doble Modelo B" 
                     class="h-64 w-full object-cover" />
              </div>
              <div class="p-6 md:w-1/2 flex flex-col justify-center">
                <div class="flex items-center mb-2">
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Bestseller</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3">Cama Doble Premium</h3>
                <p class="text-gray-600 mb-4">Cama doble moderna con almacenamiento inferior, fabricada con materiales de primera calidad.</p>
                <div class="flex items-center mb-4">
                  <div class="flex text-yellow-400 mr-2">
                    <span>★★★★★</span>
                  </div>
                  <span class="text-sm text-gray-500">(234 reseñas)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-green-600">$750</span>
                  <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">Ver Detalles</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Producto Destacado 2 -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden featured-product">
            <div class="md:flex">
              <div class="md:w-1/2">
                <img src="https://i.ibb.co/Wx5tThs/closet-madera.png" 
                     alt="Closet Madera" 
                     class="h-64 w-full object-cover" />
              </div>
              <div class="p-6 md:w-1/2 flex flex-col justify-center">
                <div class="flex items-center mb-2">
                  <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Eco-Friendly</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3">Closet Madera Maciza</h3>
                <p class="text-gray-600 mb-4">Amplio closet de 3 puertas fabricado en madera maciza sostenible, perfecto para organizar tu ropa.</p>
                <div class="flex items-center mb-4">
                  <div class="flex text-yellow-400 mr-2">
                    <span>★★★★☆</span>
                  </div>
                  <span class="text-sm text-gray-500">(178 reseñas)</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-green-600">$600</span>
                  <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">Ver Detalles</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Marcas Asociadas -->
      <section class="bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Marcas de Confianza</h2>
          <p class="text-gray-600">Trabajamos con las mejores marcas del mercado</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          <div class="brand-logo">
            <img src="https://cdn-icons-png.flaticon.com/512/179/179309.png" alt="Apple" class="h-12 mx-auto opacity-60 hover:opacity-100 transition" />
          </div>
          <div class="brand-logo">
            <div class="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span class="font-bold text-gray-600">ROSEN</span>
            </div>
          </div>
          <div class="brand-logo">
            <div class="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span class="font-bold text-gray-600">SAMSUNG</span>
            </div>
          </div>
          <div class="brand-logo">
            <div class="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span class="font-bold text-gray-600">SONY</span>
            </div>
          </div>
          <div class="brand-logo">
            <div class="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span class="font-bold text-gray-600">IKEA</span>
            </div>
          </div>
          <div class="brand-logo">
            <div class="h-12 bg-gray-200 rounded flex items-center justify-center">
              <span class="font-bold text-gray-600">XIAOMI</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Novedades -->
      <section class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">✨ Nuevos Productos</h2>
          <p class="text-lg text-gray-600">Descubre los últimos productos agregados a nuestro catálogo</p>
        </div>
        
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div *ngFor="let producto of nuevosProductos" class="product-card">
            <div class="relative">
              <img [src]="producto.imagen" [alt]="producto.nombre" class="h-48 w-full object-cover rounded-t-lg" />
              <div class="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                NUEVO
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-lg mb-2">{{ producto.nombre }}</h3>
              <p class="text-gray-600 text-sm mb-3">{{ producto.descripcion }}</p>
              <div class="flex items-center mb-3">
                <div class="flex text-yellow-400 mr-2">
                  <span>{{ producto.estrellas }}</span>
                </div>
                
              </div>
              <div class="flex items-center justify-between">
                <span class="text-2xl font-bold text-indigo-600">\${{ producto.precio }}</span>
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Testimonios -->
      <section class="bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">💬 Lo que Dicen Nuestros Clientes</h2>
          <p class="text-lg text-gray-600">Más de 10,000 clientes satisfechos</p>
        </div>
        
        <div class="grid gap-6 md:grid-cols-3">
          <div *ngFor="let testimonio of testimonios" class="testimonial-card">
            <div class="flex items-center mb-4">
              <img [src]="testimonio.avatar" [alt]="testimonio.nombre" class="w-12 h-12 rounded-full mr-4" />
              <div>
                <h4 class="font-semibold text-gray-800">{{ testimonio.nombre }}</h4>
                <div class="flex text-yellow-400 text-sm">
                  <span>{{ testimonio.estrellas }}</span>
                </div>
              </div>
            </div>
            <p class="text-gray-600 italic">"{{ testimonio.comentario }}"</p>
            <div class="mt-4 text-sm text-gray-500">
              Compró: <span class="font-medium">{{ testimonio.producto }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Estadísticas -->
      <section class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="stat-item">
            <div class="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
            <div class="text-indigo-200">Clientes Felices</div>
          </div>
          <div class="stat-item">
            <div class="text-3xl md:text-4xl font-bold mb-2">2,500+</div>
            <div class="text-indigo-200">Productos</div>
          </div>
          <div class="stat-item">
            <div class="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
            <div class="text-indigo-200">Satisfacción</div>
          </div>
          <div class="stat-item">
            <div class="text-3xl md:text-4xl font-bold mb-2">24/7</div>
            <div class="text-indigo-200">Soporte</div>
          </div>
        </div>
      </section>

      <!-- Sección de Newsletter -->
      <section class="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 text-center">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">📧 Mantente Informado</h2>
          <p class="text-lg text-gray-600 mb-6">Suscríbete y recibe ofertas exclusivas, nuevos productos y descuentos especiales</p>
          
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" 
                   placeholder="Tu correo electrónico" 
                   class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold">
              Suscribirse
            </button>
          </div>
          
          <div class="mt-6 flex justify-center space-x-6">
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              Sin spam
            </div>
            <div class="flex items-center text-gray-600">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              Descuentos exclusivos
            </div>
          </div>
        </div>
      </section>

      <!-- Sección de Blog/Noticias -->
      <section class="bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">📰 Últimas Noticias</h2>
          <p class="text-lg text-gray-600">Mantente al día con las tendencias y consejos</p>
        </div>
        
        <div class="grid gap-6 md:grid-cols-3">
          <article *ngFor="let articulo of articulos" class="blog-card">
            <img [src]="articulo.imagen" [alt]="articulo.titulo" class="h-48 w-full object-cover rounded-t-lg" />
            <div class="p-6">
              <div class="flex items-center mb-3">
                <span class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {{ articulo.categoria }}
                </span>
                <span class="text-gray-500 text-sm ml-3">{{ articulo.fecha }}</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">{{ articulo.titulo }}</h3>
              <p class="text-gray-600 mb-4">{{ articulo.resumen }}</p>
              <a href="#" class="text-indigo-600 hover:text-indigo-800 font-medium">Leer más →</a>
            </div>
          </article>
        </div>
      </section>

      <!-- Sección de Soporte y Ayuda -->
      <section class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">🤝 ¿Necesitas Ayuda?</h2>
          <p class="text-lg text-gray-600">Estamos aquí para ayudarte en cada paso de tu compra</p>
        </div>
        
        <div class="grid gap-6 md:grid-cols-3">
          <div class="support-card">
            <div class="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center mb-3">Chat en Vivo</h3>
            <p class="text-gray-600 text-center mb-4">Habla con nuestros expertos en tiempo real</p>
            <button class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
              Iniciar Chat
            </button>
          </div>
          
          <div class="support-card">
            <div class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center mb-3">Llámanos</h3>
            <p class="text-gray-600 text-center mb-4">Atención personalizada de lunes a sábado</p>
            <div class="text-center">
              <p class="font-semibold text-gray-800">+51 1 234-5678</p>
              <p class="text-sm text-gray-500">9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div class="support-card">
            <div class="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-center mb-3">Centro de Ayuda</h3>
            <p class="text-gray-600 text-center mb-4">Encuentra respuestas a preguntas frecuentes</p>
            <button class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
              Ver FAQ
            </button>
          </div>
        </div>
      </section>

      <!-- Sección de Redes Sociales -->
      <section class="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">📱 Síguenos en Redes</h2>
        <p class="text-lg text-gray-600 mb-8">Mantente conectado para ofertas exclusivas y novedades</p>
        
        <div class="flex justify-center space-x-6 mb-8">
          <a href="#" class="social-link facebook">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" class="social-link instagram">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C3.851 14.81 3.29 13.549 3.29 12.017c0-1.533.561-2.794 1.836-3.675.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297 1.275.881 1.836 2.142 1.836 3.675 0 1.532-.561 2.793-1.836 3.674-.875.807-2.026 1.297-3.323 1.297z"/>
            </svg>
          </a>
          <a href="#" class="social-link twitter">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="#" class="social-link youtube">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
          <div>👥 50K+ Seguidores</div>
          <div>📸 Fotos diarias</div>
          <div>🎁 Sorteos mensuales</div>
          <div>💡 Tips y consejos</div>
        </div>
      </section>

      <!-- Footer Informativo -->
      <section class="bg-gray-800 text-white rounded-2xl p-8">
        <div class="grid gap-8 md:grid-cols-4">
          <div>
            <h3 class="text-xl font-bold mb-4">Tienda Premium</h3>
            <p class="text-gray-300 mb-4">Tu destino para productos de calidad, tecnología avanzada y muebles elegantes.</p>
            <div class="flex space-x-4">
              <div class="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <span class="text-white font-bold text-sm">TP</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Categorías</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white transition">Libros</a></li>
              <li><a href="#" class="hover:text-white transition">Tecnología</a></li>
              <li><a href="#" class="hover:text-white transition">Muebles</a></li>
              <li><a href="#" class="hover:text-white transition">Accesorios</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Ayuda</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white transition">Centro de Ayuda</a></li>
              <li><a href="#" class="hover:text-white transition">Devoluciones</a></li>
              <li><a href="#" class="hover:text-white transition">Envíos</a></li>
              <li><a href="#" class="hover:text-white transition">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Información</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white transition">Sobre Nosotros</a></li>
              <li><a href="#" class="hover:text-white transition">Términos y Condiciones</a></li>
              <li><a href="#" class="hover:text-white transition">Política de Privacidad</a></li>
              <li><a href="#" class="hover:text-white transition">Trabaja con Nosotros</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 text-center">
          <p class="text-gray-400">© 2025 Tienda Premium. Todos los derechos reservados.</p>
          <div class="flex justify-center space-x-6 mt-4 text-sm text-gray-400">
            <span>Términos de Servicio</span>
            <span>•</span>
            <span>Política de Privacidad</span>
            <span>•</span>
            <span>Configuración de Cookies</span>
          </div>
        </div>
      </section>
    </div>
  `
})
export class EmptyHomeComponent implements OnInit {
  
  // Datos originales de muebles
  muebles = [
    {
      nombre: 'Cama Individual Modelo A',
      descripcion: 'Cama cómoda de madera, para una persona',
      precio: 350,
      imagen: 'https://i.ibb.co/8cWFn8L/cama-individual.png'
    },
    {
      nombre: 'Cama Doble Modelo B',
      descripcion: 'Cama doble moderna, con almacenamiento inferior',
      precio: 750,
      imagen: 'https://i.ibb.co/fFVLzRk/cama-doble.png'
    },
    {
      nombre: 'Closet Madera 3 Puertas',
      descripcion: 'Closet amplio de madera maciza',
      precio: 600,
      imagen: 'https://i.ibb.co/Wx5tThs/closet-madera.png'
    },
    {
      nombre: 'Sofá 2 Plazas Modelo E',
      descripcion: 'Sofá cómodo para sala de habitación',
      precio: 500,
      imagen: 'https://i.ibb.co/jT7Vfhm/sofa.png'
    }
  ];

  // Nuevos productos para la sección de novedades
  nuevosProductos = [
    {
      nombre: 'MacBook Pro M3',
      descripcion: 'La última generación con chip M3 para máximo rendimiento',
      precio: 1899,
      imagen: 'https://cdn-icons-png.flaticon.com/512/179/179309.png',
      estrellas: '★★★★★',
      reseñas: 45
    },
    {
      nombre: 'Silla Gaming Pro',
      descripcion: 'Silla ergonómica para largas sesiones de gaming',
      precio: 299,
      imagen: 'https://cdn-icons-png.flaticon.com/512/2515/2515270.png',
      estrellas: '★★★★☆',
      reseñas: 78
    },
    {
      nombre: 'Monitor 4K 27"',
      descripcion: 'Monitor ultra HD con tecnología HDR para profesionales',
      precio: 449,
      imagen: 'https://cdn-icons-png.flaticon.com/512/1042/1042339.png',
      estrellas: '★★★★★',
      reseñas: 92
    }
  ];

  // Testimonios de clientes
  testimonios = [
    {
      nombre: 'María González',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      comentario: 'Excelente calidad en todos los productos. El MacBook que compré superó mis expectativas.',
      producto: 'MacBook Air M2',
      estrellas: '★★★★★'
    },
    {
      nombre: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      comentario: 'El sofá es increíblemente cómodo y la entrega fue muy rápida. Totalmente recomendado.',
      producto: 'Sofá 2 Plazas',
      estrellas: '★★★★★'
    },
    {
      nombre: 'Ana Rodríguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
      comentario: 'Servicio al cliente excepcional. Me ayudaron a elegir el iPhone perfecto para mí.',
      producto: 'iPhone 15 Pro',
      estrellas: '★★★★☆'
    }
  ];

  // Artículos del blog
  articulos = [
    {
      titulo: 'Cómo elegir el colchón perfecto para tu descanso',
      resumen: 'Guía completa para seleccionar el colchón ideal según tu tipo de sueño y preferencias.',
      imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      categoria: 'Hogar',
      fecha: '15 Ago 2025'
    },
    {
      titulo: 'iPhone 16 vs iPhone 16 Pro: Comparativa completa',
      resumen: 'Análisis detallado de las diferencias entre los nuevos modelos de iPhone.',
      imagen: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      categoria: 'Tecnología',
      fecha: '10 Ago 2025'
    },
    {
      titulo: 'Tendencias en decoración de interiores 2025',
      resumen: 'Descubre los estilos y colores que marcarán tendencia este año.',
      imagen: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      categoria: 'Decoración',
      fecha: '05 Ago 2025'
    }
  ];

  ngOnInit() {
    // Inicializar el carousel después de que se renderice el componente
    setTimeout(() => {
      this.initCarousel();
      this.initCountdownTimers();
      this.initScrollAnimations();
    }, 100);
  }

  private initCarousel() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.banner-indicator');
    
    if (slides.length === 0 || indicators.length === 0) return;

    const showSlide = (index: number) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    };

    // Auto-slide cada 6 segundos
    let autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 6000);

    // Click en indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        // Reinicia el auto-slide
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % slides.length;
          showSlide(currentSlide);
        }, 6000);
      });
    });
  }

  private initCountdownTimers() {
    // Simulación de contadores regresivos para las ofertas
    const countdownElements = document.querySelectorAll('.countdown-badge');
    
    countdownElements.forEach((element, index) => {
      const days = [2, 1, 3, 5][index];
      const hours = [15, 8, 22, 12][index];
      let totalSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60);
      
      const updateCountdown = () => {
        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        
        if (totalSeconds > 0) {
          element.textContent = `${days}d ${hours}h ${minutes}m`;
          totalSeconds--;
        } else {
          element.textContent = 'Expirado';
        }
      };
      
      // Actualizar cada minuto para simular countdown
      setInterval(updateCountdown, 60000);
    });
  }

  private initScrollAnimations() {
    // Animaciones al hacer scroll (simplificado)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    // Observar elementos que queremos animar
    setTimeout(() => {
      const elements = document.querySelectorAll('.offer-card, .product-card, .testimonial-card, .support-card');
      elements.forEach(el => observer.observe(el));
    }, 500);
  }

  // Método para manejar suscripción al newsletter (solo UI)
  onNewsletterSubmit(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLFormElement;
    const emailInput = input.querySelector('input[type="email"]') as HTMLInputElement;
    
    if (emailInput?.value) {
      // Simular suscripción exitosa
      alert('¡Gracias por suscribirte! Recibirás ofertas exclusivas en tu correo.');
      emailInput.value = '';
    }
  }
}