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
    if (this.isProduction()) {
      return 'https://6bfypnxd34.execute-api.us-east-2.amazonaws.com/';
    }
    return 'https://6bfypnxd34.execute-api.us-east-2.amazonaws.com/';
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
