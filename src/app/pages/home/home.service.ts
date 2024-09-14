import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/envirionment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable, tap } from 'rxjs';
import { CartItem } from './home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _items: BehaviorSubject<CartItem[]> = new BehaviorSubject(null);

  get $items(): Observable<CartItem[]> {
    return this._items.asObservable();
  }

  constructor(private _http: HttpClient) {}

  getItems(): Observable<CartItem[]> {
    return this._http.get<CartItem[]>(`${environment.apiUrl}items`).pipe(
      tap((data) => {
        this._items.next(data);
      }),
    );
  }
}
