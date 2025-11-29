import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Config } from '../../services/config/config';

interface ShortUrlResponse {
  code?: string;
  shortCode?: string;
  id?: string;
}

interface RedirectResponse {
  url?: string;
  originalUrl?: string;
}

@Component({
  selector: 'app-form-link-shortener',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-link-shortener.html',
  styleUrl: './form-link-shortener.scss',
})
export class FormLinkShortener { url: string = '';
  shortCode: string = '';
  isLoading: boolean = false;
  error: string = '';
  copied: boolean = false;

  constructor(
    private http: HttpClient,
    private config: Config
  ) {}

  createShortUrl(): void {
    if (!this.url) {
      this.error = 'Por favor ingresa una URL válida';
      return;
    }

    // Validar URL
    if (!this.isValidUrl(this.url)) {
      this.error = 'Por favor ingresa una URL válida (debe comenzar con http:// o https://)';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.shortCode = '';

    this.http.post<ShortUrlResponse>(
      `${this.config.backendUrl}/prod/shorten`, 
      { url: this.url }
    ).subscribe({
      next: (data) => {
        this.shortCode = data.code || data.shortCode || data.id || '';
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'Error al conectar con el servidor. Verifica tu conexión.';
        this.isLoading = false;
      }
    });
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  }

  copyToClipboard(): void {
    const shortUrl = this.getShortUrl();
    navigator.clipboard.writeText(shortUrl).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

  getShortUrl(): string {
    return `${window.location.origin}/short/${this.shortCode}`;
  }

  reset(): void {
    this.url = '';
    this.shortCode = '';
    this.error = '';
    this.copied = false;
  }
}
