package com.project.zm.controller;

import com.project.zm.model.*;
import com.project.zm.repository.AppointmentRepository;
import com.project.zm.repository.RoleRepository;
import com.project.zm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/doctor")
public class DoctorRESTController {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    public DoctorRESTController(UserRepository userRepository,
                                RoleRepository roleRepository,
                                AppointmentRepository appointmentRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @DeleteMapping("/deleteAppointment/{appointmentId}")
    public ResponseEntity<Appointment> deleteAppointment(@PathVariable("appointmentId") long id) {
        Appointment appointment = appointmentRepository.findById(id);
        if(appointment == null) {
            System.out.println("Appointment not found!");
            return new ResponseEntity<Appointment>(HttpStatus.NOT_FOUND);
        }

        appointmentRepository.deleteById(id);
        return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/acceptAppointment/{appointmentId}")
    public ResponseEntity<Appointment> acceptAppointment (@PathVariable("appointmentId") long id) {
        Appointment appointment = appointmentRepository.findById(id);

        if (appointment == null) {
            System.out.println("Appointment not found!");
            return new ResponseEntity<Appointment>(HttpStatus.NOT_FOUND);
        }

        appointment.setStatus(AppointmentStatus.APPOINTMENT_ACCEPTED);
        appointmentRepository.save(appointment);
        return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/heldAppointment/{appointmentId}")
    public ResponseEntity<Appointment> heldAppointment (@PathVariable("appointmentId") long id) {
        Appointment appointment = appointmentRepository.findById(id);
        if (appointment == null) {
            System.out.println("Appointment not found!");
            return new ResponseEntity<Appointment>(HttpStatus.NOT_FOUND);
        }
        appointment.setStatus(AppointmentStatus.APPOINTMENT_HELD);
        appointmentRepository.save(appointment);
        return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getPatients")
    public List<User> getPatients(){
        Set<Role> doctor = new HashSet<>();
        doctor.add(roleRepository.findByName(RoleName.ROLE_DOCTOR).orElse(null));
        List<User> patients = userRepository.findAll();
        patients.removeIf(patient -> patient.getRoles().equals(doctor));
        return patients;
    }

    @PostMapping("{doctorUsername}/createAppointment/{patientUsername}")
    public ResponseEntity<Appointment> addAppointment(@RequestBody Appointment appointment, @PathVariable("doctorUsername") String doctorUsername, @PathVariable("patientUsername") String patientUsername) {
        User patient = userRepository.findByUsername(patientUsername).orElse(null);
        if (patient == null) {return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);}
        appointment.setPatientUsername(patientUsername);

        User doctor = userRepository.findByUsername(doctorUsername).orElse(null);
        if (doctor == null) {return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);}
        appointment.setDoctorUsername(doctorUsername);

        appointment.setStatus(AppointmentStatus.APPOINTMENT_ACCEPTED);
        appointmentRepository.save(appointment);

        return new ResponseEntity<Appointment>(appointment, HttpStatus.CREATED);
    }
/*
    @GetMapping("/appointmentsList/{id}")
    public List<Appointment> appointmentsList(@PathVariable("id") long id) {

        List<Appointment> appointmentList = appointmentRepository.findAll();
        appointmentList.removeIf(a -> !a.getDoctorId().equals(id));
        return appointmentList;
    }

 */
}
