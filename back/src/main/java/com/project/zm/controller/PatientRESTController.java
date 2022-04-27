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
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/patient")
public class PatientRESTController {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    public PatientRESTController(UserRepository userRepository,
                                 AppointmentRepository appointmentRepository,
                                 RoleRepository roleRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;

    }

    @GetMapping("/getDoctors")
    public List<User> getDoctors(){
        Set<Role> patient = new HashSet<>();
        patient.add(roleRepository.findByName(RoleName.ROLE_PATIENT).orElse(null));
        List<User> doctors = userRepository.findAll();
        doctors.removeIf(doctor -> doctor.getRoles().equals(patient));
        return doctors;
    }

    @PostMapping("{doctorUsername}/bookAppointment/{patientUsername}")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment, @PathVariable("doctorUsername") String doctorUsername, @PathVariable("patientUsername") String patientUsername) {
        User patient = userRepository.findByUsername(patientUsername).orElse(null);
        if (patient == null) {
            return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
        }
        appointment.setPatientUsername(patientUsername);

        User doctor = userRepository.findByUsername(doctorUsername).orElse(null);
        if (doctor == null) {
            return new ResponseEntity<Appointment>(HttpStatus.NO_CONTENT);
        }
        appointment.setDoctorUsername(doctorUsername);

        appointment.setStatus(AppointmentStatus.APPOINTMENT_PENDING);

        appointmentRepository.save(appointment);
        return new ResponseEntity<Appointment>(appointment, HttpStatus.CREATED);
    }
}
