import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Config } from '../../services/config/config';

interface RedirectResponse {
  url?: string;
  originalUrl?: string;
}

@Component({
  selector: 'app-redirect',
  imports: [CommonModule],
  templateUrl: './redirect.html',
  styleUrl: './redirect.scss',
})
export class Redirect implements OnInit{
 isLoading: boolean = true;
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private config: Config
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    
    if (code) {
      this.redirectToUrl(code);
    } else {
      this.notFound = true;
      this.isLoading = false;
    }
  }

  redirectToUrl(code: string): void {
    this.http.get<RedirectResponse>(
      `${this.config.backendUrl}/api/short/${code}`
    ).subscribe({
      next: (data) => {
        setTimeout(() => {
          window.location.href = data.url || data.originalUrl || '/';
        }, 5000);
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
        this.notFound = true;
      }
    });
  }
}
