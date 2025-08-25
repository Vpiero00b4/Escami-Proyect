// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';   
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';   // 👈 importar router
import { routes } from './app/app.routes';        // 👈 importar rutas

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)   // 👈 activar router en la app
  ]
});
