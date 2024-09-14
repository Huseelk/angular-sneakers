import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input() title: string = '';
  @Input() img: string = '';
  @Input() price: number = 0;

  constructor() {}

  onClick() {}
}
