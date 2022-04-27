import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
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
