import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
   private readonly config = {
    backendUrl: this.getBackendUrl(),
    production: this.isProduction()
  };

  private getBackendUrl(): string {
    // Puedes cambiar esto según tu entorno
    if (this.isProduction()) {
      return 'https://tu-api-produccion.com';
    }
    return 'http://localhost:3000'; // o tu backend local
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost';
  }

  get backendUrl(): string {
    return this.config.backendUrl;
  }

  get isProductionMode(): boolean {
    return this.config.production;
  }
}
