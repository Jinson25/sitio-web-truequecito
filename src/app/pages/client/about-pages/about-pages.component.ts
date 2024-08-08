import { Component, OnInit } from '@angular/core';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-about-pages',
  standalone: true,
  imports: [],
  templateUrl: './about-pages.component.html',
  styleUrl: './about-pages.component.css'
})
export class AboutPagesComponent implements OnInit{
  info: any;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo(): void {
    this.infoService.getInfo().subscribe({
      next: (data) => {
        this.info = data;
      },
      error: (error) => {
        console.error('Error al cargar la información:', error);
      }
    });
  }
}
