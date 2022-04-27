import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent {
  isAppointmentsListShown = false;
  isAddAppointmentShown = false;
  constructor(private userService: UserService) { }

  listTab(){
    this.isAddAppointmentShown = false;
    this.isAppointmentsListShown = true;
  }
  addTab(){
    this.isAppointmentsListShown = false;
    this.isAddAppointmentShown = true;
  }
}
