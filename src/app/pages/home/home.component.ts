import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { HomeService } from './home.service';
import { take } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, NgIf, NgFor, AsyncPipe],
  templateUrl: './home.component.html',
  providers: [HomeService],
})
export class HomeComponent {
  items$ = this._homeService.$items;

  constructor(private _homeService: HomeService) {}

  ngOnInit() {
    this._homeService.getItems().pipe(take(1)).subscribe();
  }
}
