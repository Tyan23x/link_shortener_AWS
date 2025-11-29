import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Config } from '../../services/config/config';

@Component({
  selector: 'app-redirect',
  imports: [CommonModule],
  templateUrl: './redirect.html',
  styleUrl: './redirect.scss',
})
export class Redirect implements OnInit {
  isLoading = true;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private config: Config
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (!code) {
      this.notFound = true;
      this.isLoading = false;
      return;
    }

    const redirectUrl = `${this.config.backendUrlRedir}prod/${code}`;
    window.location.href = redirectUrl;
  }
}
