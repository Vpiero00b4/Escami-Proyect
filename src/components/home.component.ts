import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `
})
export class HomeComponent {}
