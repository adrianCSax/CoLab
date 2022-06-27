import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FriendService } from 'src/app/services/friend.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Friend } from 'src/app/models/friend.model';
import { FriendOptions } from 'src/app/models/friend-options.model';

@Component({
  selector: 'friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  searchFriend = new FormGroup({
    friendtag: new FormControl('', [Validators.required]),
  });

  isLoading = false;
  private currentUser!: string;
  private friendListOptions!: FriendOptions;

  constructor(private friendService: FriendService, private authService: AuthService) { }
  

  ngOnInit(): void {
    this.isLoading = true;
    this.currentUser = this.authService.getId();
    
    this.friendListOptions = {
      addButton: false,
      deleteButton: true,
      snap: false
    }
  }

  getFriendListOptions() {
    return this.friendListOptions;
  }

  addFriend() {
    if(!this.searchFriend.valid) {
      return;
    }

    const friendTag = this.searchFriend.value.friendtag;
    console.log(friendTag);
    this.friendService.addFriend(this.currentUser, friendTag);
    this.searchFriend.reset();
  }

}
