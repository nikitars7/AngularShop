import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  products$: Observable<any[]>;
  constructor(private productServ: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productServ.getAll();
  }
}
