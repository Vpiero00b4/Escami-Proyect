// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components/core/footer/footer';
import { LibroList } from './components/features/libros/libro-list/libro-list';
import { Header } from '../components/core/header/header';
import { MantLibroRegisterComponent } from './components/features/mant-libro-register/mant-libro-register';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],  // 👈 sin HttpClientModule
  templateUrl:'./app.html',
  styleUrls: ['./app.css'],
})
export class App {}
