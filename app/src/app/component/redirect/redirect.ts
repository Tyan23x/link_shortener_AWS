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
    `${this.config.backendUrlRedir}prod/${code}`
  ).subscribe({
    next: (data) => {
      const url = data.url || data.originalUrl;
      if (!url) {
        this.notFound = true;
        return;
      }

     setTimeout(() => {
          window.location.href = url ;
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
