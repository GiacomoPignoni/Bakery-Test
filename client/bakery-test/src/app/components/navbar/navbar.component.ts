import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public get isLogged(): boolean {
    return this.userSvc.isLogged;
  }

  constructor(
    private readonly userSvc: UserService
  ) { }

  logout(): void {
    this.userSvc.logout();
  }
}
