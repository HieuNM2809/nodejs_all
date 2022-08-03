import { SocketUserService } from './../../shared/service/socket-user.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storeUser: SocketUserService) {}

  canActivate() {
    if (this.storeUser.getStoredUser()) {
      return true
    }
    this.router.navigate(['/']);

    return false;
  }
}
