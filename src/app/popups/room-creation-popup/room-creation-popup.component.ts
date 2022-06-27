import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FriendIndex } from 'src/app/models/friend-index.model';
import { FriendOptions } from 'src/app/models/friend-options.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { RoomsService } from 'src/app/services/rooms.service';
import { Room } from 'src/app/models/room.model';
import { Friend } from 'src/app/models/friend.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

export interface DialogData {
  roomName: string;
}

@Component({
  selector: 'room-creation-popup',
  templateUrl: './room-creation-popup.component.html',
  styleUrls: ['./room-creation-popup.component.scss']
})
export class RoomCreationPopupComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private friendListOptions!: FriendOptions;
  selectedFriends: FriendIndex[] = [];
  unselectedFriend!: FriendIndex;
  tags: string[] = [];
  description = new FormControl('');
  private currentUser!: string;

  constructor(
    public popupRef: MatDialogRef<RoomCreationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private roomService: RoomsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.friendListOptions = {
      addButton: true,
      deleteButton: false,
      snap: true
    }

    this.currentUser = this.authService.getId();
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
      console.log("PArent" + this.unselectedFriend);
    }
  }

  createRoom() {
    if (this.selectedFriends === []) return;
    if (this.tags === []) this.tags = [];

    const friendsToAdd: Friend[] = this.selectedFriends.map((friend) => {
      return {
        tagname: friend.tagname
      }
    });

    const room: Room = {
      name: this.data.roomName,
      admin: this.currentUser,
      description: this.description.value,
      tags: this.tags,
      participants: friendsToAdd
    }

    this.roomService.addRoom(this.currentUser, room);
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
