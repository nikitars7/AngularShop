import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../shared/interfaces';
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent implements OnInit {
  product$: Observable<Product>;
  constructor(
    private productService: ProductService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.product$ = this.router.params.pipe(
      switchMap((params) => {
        return this.productService.getById(params.id);
      })
    );
  }
}
