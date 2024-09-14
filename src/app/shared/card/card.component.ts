import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() img: string = '';
  @Input() price: number = 0;

  constructor() {}

  onClick() {}
}
