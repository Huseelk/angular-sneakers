import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  item$: Observable<User> = this._userService.$item;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {}
}
