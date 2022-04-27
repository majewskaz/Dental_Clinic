import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from './appointment.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {User} from '../user/user.model';
import {UserService} from '../user/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) {}

  private userUrl = 'http://localhost:8080/restApi/user';
  private patientUrl = 'http://localhost:8080/restApi/patient';
  private doctorUrl = 'http://localhost:8080/restApi/doctor';

// tslint:disable-next-line:typedef
  private static log(message: string) {
    console.log('AppointmentService: ' + message);
  }

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.userUrl + '/appointmentsList');
  }

  getAppointmentsList(username: string): Observable<Appointment[]> {
    const url = `${this.userUrl}/appointmentsList/${username}`;
    return this.http.get<Appointment[]>(url).pipe(
      tap(_ => AppointmentService.log(`fetched user id=${username}`)),
      catchError(this.handleError<Appointment[]>(`getAppointments user=${username}`))
    );
  }

  getPatientIdByUsername(username: string): Observable<number> {
    const url = `${this.userUrl}/getPatientIdByUsername/${username}`;
    return this.http.get<number>(url).pipe(
      tap(_ => AppointmentService.log(`fetched user username=${username}`)),
      catchError(this.handleError<number>(`getId user=${username}`))
    );
  }

  getDoctorIdByUsername(username: string): Observable<number> {
    const url = `${this.userUrl}/getDoctorIdByUsername/${username}`;
    return this.http.get<number>(url).pipe(
      tap(_ => AppointmentService.log(`fetched user username=${username}`)),
      catchError(this.handleError<number>(`getId user=${username}`))
    );
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    const url = `${this.doctorUrl}/${appointment.doctorUsername}/createAppointment/${appointment.patientUsername}`;
    return this.http.post<Appointment>(url, appointment, httpOptions).pipe(
      tap((appointmentAdded: Appointment) => this.log(`created appointment`)),
      catchError(this.handleError<Appointment>('createAppointment'))
    );
  }

  bookAppointment(appointment: Appointment): Observable<Appointment> {
    const url = `${this.patientUrl}/${appointment.doctorUsername}/bookAppointment/${appointment.patientUsername}`;
    return this.http.post<Appointment>(url, appointment, httpOptions).pipe(
      tap((appointmentBooked: Appointment) => this.log(`booked appointment id=${appointmentBooked.id}`)),
      catchError(this.handleError<Appointment>('bookAppointment'))
    );
  }

  deleteAppointment(appointment: Appointment | number): Observable<Appointment>{
    const id = typeof appointment === 'number' ? appointment : appointment.id;
    const url = `${this.doctorUrl}/deleteAppointment/${id}`;
    return this.http.delete<Appointment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted appointment id=${id}`)),
      catchError(this.handleError<Appointment>('deleteAppointment'))
    );
  }

  acceptAppointment(appointment: Appointment): Observable<any> {
    const id = appointment.id;
    const url = `${this.doctorUrl}/acceptAppointment/${id}`;
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`updated appointment id=${id}`)),
      catchError(this.handleError<any>('acceptAppointment'))
    );
  }

  heldAppointment(appointment: Appointment): Observable<any> {
    const id = appointment.id;
    const url = `${this.doctorUrl}/heldAppointment/${id}`;
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`held appointment id=${id}`)),
      catchError(this.handleError<any>('heldAppointment'))
    );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  // tslint:disable-next-line:typedef
  private log(message: string) {
    console.log('AppointmentService: ' + message);
  }
}
