import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isNewUser: boolean = false;
  userObj: User = new User();
  userList: User[] = [];

  ngOnInit(): void {
  
    const localData = localStorage.getItem('crud_19');
    if (localData != null) { // Corrected condition
      this.userList = JSON.parse(localData || '[]');
    }
  }

  changeView() {
    this.isNewUser = !this.isNewUser;
  }


  onEdit(data: User) {
    this.userObj = data;
    this.changeView();
  }

  onDelete(userid: number) {
    const onDelete = confirm('Are you sure you want to delete this record?');
    if(onDelete){
      const index = this.userList.findIndex(m => m.userid == userid);
      this.userList.splice(index, 1);
      localStorage.setItem('crud_19', JSON.stringify(this.userList));
    }

  }

  onUpdate(){
    const record= this.userList.find(m=>m.userid == this.userObj.userid);
    if(record != undefined){
      record.fName = this.userObj.fName;
      record.lName = this.userObj.lName;
      record.uName = this.userObj.uName;
      record.city = this.userObj.city;
      record.state = this.userObj.state;
      record.zipcode = this.userObj.zipcode;
      record.isagree = this.userObj.isagree;
    }
    localStorage.setItem('crud_19', JSON.stringify(this.userList));
    this.changeView(); // Reinitialize userObj
  }
  onSave() {
   
    this.userObj.userid = this.userList.length + 1; // Assign a new ID based on the length of the list
    this.userList.push({ ...this.userObj }); // Use a copy of userObj
    localStorage.setItem('crud_19', JSON.stringify(this.userList));
    this.userObj = new User(); // Reinitialize userObj
    this.changeView();
  }
}

class User {
  userid: number;
  fName: string;
  lName: string;
  uName: string;
  city: string;
  state: string;
  zipcode: string;
  isagree: boolean;

  constructor() {
    this.userid = 0;
    this.fName = '';
    this.lName = '';
    this.uName = '';
    this.city = '';
    this.state = '';
    this.zipcode = '';
    this.isagree = false;
  }
}
