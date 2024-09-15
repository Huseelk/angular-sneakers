import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from './user.interface';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatSidenavModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  item$: Observable<User> = this._userService.$item;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {}
}
