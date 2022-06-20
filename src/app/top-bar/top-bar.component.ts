import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

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
