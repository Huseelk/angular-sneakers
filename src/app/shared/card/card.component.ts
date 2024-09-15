import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HomeService } from '../../pages/home/home.service';
import { take } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './card.component.html',
  providers: [HomeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() item: any;

  constructor(
    private _homeService: HomeService,
    private _chageDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.item.price = this.item.price / 100;
  }

  onFavoriteClick() {
    if (!this.item.isFavorite) {
      this._homeService
        .addFavorite({ parentId: this.item.id })
        .pipe(take(1))
        .subscribe((value: any) => {
          this.item.isFavorite = true;
          this.item.parentId = value.id;

          this._chageDetectorRef.markForCheck();
        });

      return;
    }

    this._homeService
      .deleteFavorite(this.item.favoriteId)
      .pipe(take(1))
      .subscribe(() => {
        this.item.isFavorite = false;
        delete this.item.parentId;
      });
  }
}
