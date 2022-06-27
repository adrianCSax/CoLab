import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Friend } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private friends: Friend[] = [];
  private friendsUpdated = new Subject<Friend[]>();

  constructor(private http: HttpClient) { }

  addFriend(tagname: string, friendTagname: string) {
    const userAddFriend = {
      tagname: tagname,
      friendTagname: friendTagname
    }
    this.http.put<{msg: string, addedStatus: boolean, error?: any}>("http://localhost:3000/api/user/add", userAddFriend)
      .subscribe((response) => {
        console.log(response);
        if (response.addedStatus === true) {
          this.getFriends(tagname);
        }
      });
  }

  deleteFriend(tagname: string, friendTagname: string) {
    const userAddFriend = {
      tagname: tagname,
      friendTagname: friendTagname
    }
    this.http.put<{msg: string, addedStatus: boolean, error?: any}>("http://localhost:3000/api/user/deleteFriend", userAddFriend)
      .subscribe((response) => {
        console.log(response);
        if (response.addedStatus === true) {
          this.getFriends(tagname);
        }
      });
  }

  getFriendsUpdateListener() {
    return this.friendsUpdated.asObservable();
  }

  getFriends(tagname: string) {
    this.http.get<{msg: string, friends: Friend[], success: boolean}>("http://localhost:3000/api/user/"+tagname+"/friends")
    .subscribe((reponse) => {
      this.friends = reponse.friends;
      console.log(this.friends);
      this.friendsUpdated.next([...this.friends]);
    });
  }
}
