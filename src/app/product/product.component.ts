import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../shared/interfaces';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product: Product;
}
