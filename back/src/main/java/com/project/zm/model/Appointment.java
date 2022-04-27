package com.project.zm.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;

@Entity
public class Appointment {
    @Id
    @GeneratedValue
    private long id;
    private String type;
    private String date;
    private String hour;
    private String patientUsername;
    private String doctorUsername;

    public Appointment(String type, String date, String hour, String patientUsername, String doctorUsername) {
        this.type = type;
        this.date = date;
        this.hour = hour;
        this.patientUsername = patientUsername;
        this.doctorUsername = doctorUsername;
    }


    @Enumerated(EnumType.ORDINAL)
    private AppointmentStatus status;

    public Appointment() {

    }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getPatientUsername() {
        return patientUsername;
    }

    public void setPatientUsername(String patientUsername) {
        this.patientUsername = patientUsername;
    }

    public String getDoctorUsername() {
        return doctorUsername;
    }

    public void setDoctorUsername(String doctorUsername) {
        this.doctorUsername = doctorUsername;
    }

    public String getHour() {
        return hour;
    }
    public void setHour(String hour) {
        this.hour = hour;
    }
/*
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId;}

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

 */

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

}
