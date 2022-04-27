export class Appointment {
  id: number;
  type: string;
  date: string;
  hour: string;
  status: string;
  doctorUsername: string;
  patientUsername: string;



  constructor(id: number, type: string, date: string, hour: string, status: string, doctorUsername: string, patientUsername: string) { // doctorId: number, patientId: number
    this.id = id;
    this.type = type;
    this.date = date;
    this.hour = hour;
    this.status = status;
    this.doctorUsername = doctorUsername;
    this.patientUsername = patientUsername;
  }
}
