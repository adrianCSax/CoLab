import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FriendIndex } from 'src/app/models/friend-index.model';
import { FriendOptions } from 'src/app/models/friend-options.model';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friend.service';


@Component({
  selector: 'friend-sublist',
  templateUrl: './friend-sublist.component.html',
  styleUrls: ['./friend-sublist.component.scss']
})
export class FriendSublistComponent implements OnInit, OnDestroy, OnChanges {

  private friendsSubscription!: Subscription;
  private currentUser!: string;
  @Input() options!: FriendOptions;
  @Input() unselectedFriend?: FriendIndex;
  @Input() friendsCharged?: FriendIndex[];
  @Output() selectedFriend = new EventEmitter<FriendIndex>();
  friends:Friend[] = [];
  friendsSnap: Friend[] = [];
  isLoading = false;
  fristSnap = true;

  constructor(private friendService: FriendService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.currentUser = this.authService.getId()
    this.friendService.getFriends(this.currentUser);
    this.friendsSubscription = this.friendService.getFriendsUpdateListener()
      .subscribe((friends: Friend[]) => {
        this.isLoading = false;
        this.friends = friends;
        console.log("Friends: " + this.friends);
        if (this.options.snap && this.fristSnap) {
          this.friendsSnap = [...this.friends];
          this.fristSnap = false;
          
          if(this.friendsCharged !== undefined) {
            this.friendsCharged.forEach((charged) => {
              this.friendsSnap.forEach((snap, index) => {
                if(charged.tagname === snap.tagname) {
                  this.friendsSnap.splice(index, 1);
                }
              })
            })
          }
          console.log("Snap: " + this.friendsSnap);
        }
      });
  }

  ngOnDestroy() {
    this.friendsSubscription.unsubscribe();
    this.friendsSnap = [];
  }

  deleteFriend(friendTagname: string) {
    this.friendService.deleteFriend(this.currentUser, friendTagname);
  } 

  addFriendToParentList(friendTagname: string, index: number) {
    this.selectedFriend.emit({tagname: friendTagname, index: index});
    this.friendsSnap.splice(index, 1);
  }

  ngOnChanges() {
    if(this.unselectedFriend === undefined) return;
    this.addFriendToList(this.unselectedFriend);
  }

  private addFriendToList(friend: FriendIndex) {
    const addFriend: Friend = {
      tagname: friend.tagname
    } 
    this.friendsSnap.splice(friend.index, 0, addFriend)
  }

}
