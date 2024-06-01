import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/product.service';
import { switchMap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
})
export class EditPageComponent implements OnInit {
  form: FormGroup;
  product: Product;
  submitted: boolean;
  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.productServ.getById(params.id);
        })
      )
      .subscribe((product) => {
        this.product = product;
        this.initForm(product);
      });
  }

  initForm(product: Product) {
    this.form = new FormGroup({
      type: new FormControl(product.type, Validators.required),
      title: new FormControl(product.title, Validators.required),
      price: new FormControl(product.price, Validators.required),
    });
  }
  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const product = {
      type: this.form.value.type,
      // photo: this.form.value.photo,
      // info: this.form.value.info,
      title: this.form.value.title,
      price: this.form.value.price,
      date: new Date(),
    };

    this.productServ
      .update({
        ...this.product,
        ...product,
      })
      .subscribe((res) => {
        this.submitted = false;
        this.router.navigate(['/admin', 'dashboard']);
      });
  }
}
