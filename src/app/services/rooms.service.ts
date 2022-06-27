import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private rooms: Room[] = [];
  private roomsUpdated = new Subject<Room[]>();

  constructor(private http: HttpClient, private router: Router) {}

  joinRoom(room: Room) {
    this.router.navigate(["/lab/" + room.id]);
  }

  addRoom(tagname: string, room: Room) {
    const data = {
      user: tagname,
      room: room
    }
    this.http.post<{msg: string, addedStatus: boolean, error?: any}>("http://localhost:3000/api/room/add", data)
      .subscribe((response) => {
        console.log(response);
        if (response.addedStatus === true) {
          this.getRooms(tagname);
        }
      });
  }

  editRoom(tagname: string, room: Room) {
    const data = {
      user: tagname,
      room: room
    }
    this.http.put<{msg: string, addedStatus: boolean, error?: any}>("http://localhost:3000/api/room/edit", data)
      .subscribe((response) => {
        console.log(response);
        if (response.addedStatus === true) {
          this.getRooms(tagname);
        }
      });
  }

  deleteRoom(tagname: string, room: Room) {
    const data = {
      user: tagname,
      room: room
    }
    this.http.delete<{msg: string, addedStatus: boolean, error?: any}>("http://localhost:3000/api/room/delete/" + data.room.id +"/"+ data.user)
      .subscribe((response) => {
        console.log(response);
        this.getRooms(tagname);
      });
  }

  getRooms(tagname: string) {
    this.http.get<{msg: string, rooms: Room[], success: boolean}>("http://localhost:3000/api/room/"+tagname+"/rooms")
    .subscribe((reponse) => {
      this.rooms = reponse.rooms;
      this.roomsUpdated.next([...this.rooms]);
    });
  }

  getRoomsUpdateListener() {
    return this.roomsUpdated.asObservable();
  }
}
