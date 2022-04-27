import { Component, OnInit } from '@angular/core';
import {Appointment} from '../appointment.model';
import {AppointmentService} from '../appointment.service';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
  providers: [AppointmentService]
})
export class AppointmentsListComponent implements OnInit {

  private roles!: string[];
  authority!: string;
  appointmentsList: Appointment[] = [];
  constructor(private appointmentService: AppointmentService, private tokenStorageService: TokenStorageService) { }

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
    this.getAppointments();
  }

  getAppointments(): void {
    this.appointmentService.getAppointmentsList(this.tokenStorageService.getUsername())
      .subscribe(appointmentsList => this.appointmentsList = appointmentsList);
  }

  delete(appointment: Appointment): void {
    this.appointmentsList = this.appointmentsList.filter(a => a !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }

  acceptAppointment(id: number, type: string, date: string, hour: string, status: string, doctorUsername: string, patientUsername: string): void {
    this.appointmentService.acceptAppointment({ id, type, date, hour, status, doctorUsername, patientUsername } as Appointment)
      .subscribe();
  }

  heldAppointment(id: number, type: string, date: string, hour: string, status: string, doctorUsername: string, patientUsername: string): void {
    this.appointmentService.heldAppointment({ id, type, date, hour, status, doctorUsername, patientUsername } as Appointment)
      .subscribe();
  }

  // tslint:disable-next-line:typedef
  reloadPage() {
    window.location.reload();
  }
}
