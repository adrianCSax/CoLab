import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  searchFriend = new FormGroup({
    friendtag: new FormControl('', [Validators.required]),
  });

  constructor() { }
  

  ngOnInit(): void {
  }

  addFriend() {
    
  }

}
