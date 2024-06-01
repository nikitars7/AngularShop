import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Product } from '../../shared/interfaces';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productServ: ProductService,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit() {
    this.productServ
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: Product[]) => {
        this.products = res;
        console.log(this.products);
      });
  }
  remove(id: string) {
    this.productServ
      .remove(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.products = this.products.filter((product) => product.id !== id);
      });
  }
}
