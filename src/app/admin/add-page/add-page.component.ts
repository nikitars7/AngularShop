import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductService } from '../../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddPageComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  constructor(private productServ: ProductService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      // photo: new FormControl(null, Validators.required),
      // info: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
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

    console.log(this.form);
    this.productServ.create(product).subscribe((res) => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/']);
    });
  }
}
