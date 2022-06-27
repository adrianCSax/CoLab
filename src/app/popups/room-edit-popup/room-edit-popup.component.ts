import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FriendIndex } from 'src/app/models/friend-index.model';
import { FriendOptions } from 'src/app/models/friend-options.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { RoomsService } from 'src/app/services/rooms.service';
import { Room } from 'src/app/models/room.model';
import { Friend } from 'src/app/models/friend.model';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-room-edit-popup',
  templateUrl: './room-edit-popup.component.html',
  styleUrls: ['./room-edit-popup.component.scss']
})
export class RoomEditPopupComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private friendListOptions!: FriendOptions;
  selectedFriends: FriendIndex[] = [];
  unselectedFriend!: FriendIndex;
  friendsCharged?: any;
  tags: string[] = [];
  description = new FormControl('');
  private currentUser!: string;

  constructor(
    public popupRef: MatDialogRef<RoomEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Room,
    private roomService: RoomsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.friendListOptions = {
      addButton: true,
      deleteButton: false,
      snap: true
    }
    console.log(this.data);
    this.currentUser = this.authService.getId();
    this.selectedFriends = this.data.participants.map((participant, index) => {
      return {
        tagname: participant.tagname,
        index: index
      }
    });
    this.friendsCharged = this.selectedFriends;
    this.tags = this.data.tags;
    this.description.setValue(this.data.description);
  }

  getFriendListOptions() {
    return this.friendListOptions;
  }

  onSelectedFriend(selectedFriend: FriendIndex) {
    if(this.selectedFriends.length < 14) {
      this.selectedFriends?.push(selectedFriend);
    }
  }

  removeSelectedFriend(selected: any) {
    console.log(this.selectedFriends === undefined)
    if(this.selectedFriends === undefined) return;

    const index = this.selectedFriends.indexOf(selected);

    if (index >= 0) {
      this.unselectedFriend = this.selectedFriends[index];
      this.selectedFriends.splice(index, 1);
    }
  }

  editRoom() {
    if (this.selectedFriends === []) return;
    if (this.tags === []) this.tags = [];

    const friendsToAdd: Friend[] = this.selectedFriends.map((friend) => {
      return {
        tagname: friend.tagname
      }
    });

    const room: Room = {
      id: this.data.id,
      name: this.data.name,
      admin: this.currentUser,
      description: this.description.value,
      tags: this.tags,
      participants: friendsToAdd
    }

    this.roomService.editRoom(this.currentUser, room);
    this.popupRef.close();
  }

  closePopup() {
    this.popupRef.close();
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value && this.tags.length < 6) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

}
