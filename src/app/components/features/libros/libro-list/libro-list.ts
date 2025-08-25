import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libro } from '../../../../../models/libros/libro';
import { LibroService } from '../../../../../services/libros/api.service';

@Component({
  selector: 'app-libro-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libro-list.html',
  styleUrls: ['./libro-list.css']
})
export class LibroList implements OnInit {

  libros: Libro[] = [];
  loading = true;

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        console.log('📚 Libros recibidos desde backend:', data);
        this.libros = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error cargando libros:', err);
        this.loading = false;
      }
    });
  }

  // Si la imagen falla, ponemos una por defecto
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/img/no-disponible.png';
  }
 
}
