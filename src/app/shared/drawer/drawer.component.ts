import { Component, Input } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './drawer.component.html',
})
export class DrawerComponent {
  @Input() title: string = '';
  @Input() img: string = '';
  @Input() price: number = 0;

  constructor() {}

  onClick() {}
}
