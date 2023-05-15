import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(protected cartService: CartService, private formBuilder: FormBuilder,
              private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;

    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [ name, Validators.required ],
      address: [ address, Validators.required ]
    })
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if(this.checkoutForm.invalid) {
      this.toastr.warning('Please fill the input', 'Invalid Inputs');
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    console.log(this.order);
  }

}
