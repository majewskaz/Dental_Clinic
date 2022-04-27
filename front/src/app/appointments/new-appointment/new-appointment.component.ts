import { Component, OnInit } from '@angular/core';
import {Appointment} from '../appointment.model';
import {AppointmentService} from '../appointment.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {User} from '../../user/user.model';
import {UserService} from '../../user/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css'],
  providers: [AppointmentService]
})
export class NewAppointmentComponent implements OnInit {

  patients: Observable<User[]> = this.userService.getPatients();
  doctors: Observable<User[]> = this.userService.getDoctors();
  chosenPatientId = '';
  chosenDoctorId = '';

  private roles!: string[];
  authority!: string;
  appointmentsList: Appointment[] = [];
  constructor(private appointmentService: AppointmentService, private tokenStorageService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_DOCTOR') {
          this.authority = 'doctor';
          return false;
        }
        this.authority = 'patient';
        return true;
      });
    }
  }

  creatingAppointment(type: string, date: string, hour: string, status: string, doctorUsername: string, patientUsername: string): void { //  doctorId: number, patientId: number
    type = type.trim();
    date = date.trim();
    hour = hour.trim();
    status = status.trim();
    doctorUsername = this.tokenStorageService.getUsername();
    this.appointmentService.createAppointment({ type, date, hour, status, doctorUsername, patientUsername } as Appointment) // doctorId, patientId
      .subscribe(appointment => { this.appointmentsList.push(appointment); },
        error1 => {},
        () => {},
      );
  }

  bookingAppointment(type: string, date: string, hour: string, status: string, doctorUsername: string, patientUsername: string): void {
    type = type.trim();
    date = date.trim();
    hour = hour.trim();
    status = status.trim();
    patientUsername = this.tokenStorageService.getUsername();
    this.appointmentService.bookAppointment({ type, date, hour, status, doctorUsername, patientUsername} as Appointment)
      .subscribe(appointment => { this.appointmentsList.push(appointment); },
        error1 => {},
        () => {},
      );
  }

}
