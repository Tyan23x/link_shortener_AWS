import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
   private readonly config = {
    backendUrl: this.getBackendUrl(),
    backendUrlRedir: this.getBackendUrlRedir(),
    production: this.isProduction()
  };

  private getBackendUrl(): string {
    if (this.isProduction()) {
      return 'https://6bfypnxd34.execute-api.us-east-2.amazonaws.com/';
    }
    return 'https://6bfypnxd34.execute-api.us-east-2.amazonaws.com/';
  }
  private getBackendUrlRedir(): string {
    if (this.isProduction()) {
      return 'https://uur1jnhv6h.execute-api.us-east-2.amazonaws.com/';
    }
    return 'https://uur1jnhv6h.execute-api.us-east-2.amazonaws.com/';
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost';
  }

  get backendUrl(): string {
    return this.config.backendUrl;
  }
  
  get backendUrlRedir(): string {
    return this.config.backendUrlRedir;
  }

  get isProductionMode(): boolean {
    return this.config.production;
  }
}
