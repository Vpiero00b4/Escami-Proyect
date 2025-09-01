// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components/core/footer/footer';
import { LibroList } from './components/features/libros/libro-list/libro-list';
import {HeaderComponent } from '../components/core/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, Footer],  // 👈 sin HttpClientModule
  templateUrl:'./app.html',
  styleUrls: ['./app.css'],
})
export class App {}
