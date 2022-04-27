import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {Appointment} from '../appointments/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private patientUrl = 'http://localhost:8080/restApi/patient';
  private doctorUrl = 'http://localhost:8080/restApi/doctor';

  constructor(private http: HttpClient) { }
  getPatientPage(): Observable<string> {
    return this.http.get(this.patientUrl, { responseType: 'text' });
  }

  getDoctorPage(): Observable<string> {
    return this.http.get(this.doctorUrl, { responseType: 'text' });
  }

  getPatients(): Observable<User[]> {
    return this.http.get<User[]>(this.doctorUrl + '/getPatients');
  }

  getDoctors(): Observable<User[]> {
    return this.http.get<User[]>(this.patientUrl + '/getDoctors');
  }
}
