import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container mx-auto p-4 md:p-6 lg:p-8 bg-white rounded-xl shadow-lg">
      <router-outlet></router-outlet>
    </div>
  `
})
export class HomeComponent { }
