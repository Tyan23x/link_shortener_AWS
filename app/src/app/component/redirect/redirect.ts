import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
    private http: HttpClient
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    
    if (code) {
      this.redirectToUrl(code);
    } else {
      this.notFound = true;
      this.isLoading = false;
    }
  }

  redirectToUrl(code: string) {
    // this.http.get<any>(`${environment.backendUrl}/api/short/${code}`)
    //   .subscribe({
    //     next: (data) => {
    //       // Esperar 5 segundos antes de redireccionar
    //       setTimeout(() => {
    //         window.location.href = data.url || data.originalUrl;
    //       }, 5000);
    //     },
    //     error: (err) => {
    //       this.isLoading = false;
    //       this.notFound = true;
    //     }
    //   });
  }
}
