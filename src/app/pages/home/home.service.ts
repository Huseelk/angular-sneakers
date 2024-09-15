import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/envirionment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, Observable, tap } from 'rxjs';
import { CartItem } from './home.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private _items: BehaviorSubject<CartItem[]> = new BehaviorSubject(null);
  private _favorites: BehaviorSubject<CartItem[]> = new BehaviorSubject(null);

  get $items(): Observable<CartItem[]> {
    return this._items.asObservable();
  }

  get $favorites(): Observable<CartItem[]> {
    return this._favorites.asObservable();
  }

  constructor(private _http: HttpClient) {}

  getItems(value: { search: string; sort: string }): Observable<CartItem[]> {
    const params: any = {};

    if (value.search) {
      params.title = `*${value.search}`;
    }

    if (value.sort) {
      params.sortBy = value.sort;
    }

    return this._http
      .get<CartItem[]>(`${environment.apiUrl}items`, { params: params })
      .pipe(
        map((data) => {
          data.map((obj) => ({ ...obj, isFavorite: false, isAdded: false }));
          return data;
        }),
        tap((data) => {
          this._items.next(data);
        }),
      );
  }

  getFavorites(): Observable<any[]> {
    return this._http.get<any[]>(`${environment.apiUrl}favorites`).pipe(
      tap((data) => {
        this._favorites.next(data);

        const modifiedItems = this._items.getValue().map((item) => {
          const favorite = data.find(
            (favorite) => favorite.parentId === item.id,
          );

          if (!favorite) {
            return item;
          }

          return {
            ...item,
            isFavorite: true,
            favoriteId: favorite.id,
          };
        });

        this._items.next(modifiedItems);
      }),
    );
  }

  addFavorite(data: { parentId: number }) {
    return this._http.post(`${environment.apiUrl}favorites`, data);
  }

  deleteFavorite(parentId: number) {
    return this._http.delete(`${environment.apiUrl}favorites/${parentId}`);
  }
}
