import { Injectable } from '@angular/core';
import { Users } from './models/Users';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  private users : Array<Users>;

  constructor() { 
    this.users = [
      new Users('adri', 'whatshit14', 'adrian@gmail.com')
    ];
  }

  checkIfUserExists(email : string, password : string) {
    const loged = this.users.find(userIn => userIn.getEmail() === email);
    return loged?.getPassword() === password ? loged : false;
  }


}
