import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  tagname!: string;

  ngOnInit(): void {
    const date = new Date();
    console.log(date.getHours() + ":" + date.getMinutes() + this.authService.getId());
    this.tagname = this.authService.getId();
    console.log(date.getHours() + ":" + date.getMinutes() + this.tagname);
  }

  logout() {
    this.authService.logout();
  }

}
