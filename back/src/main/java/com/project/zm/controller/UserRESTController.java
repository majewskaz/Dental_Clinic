package com.project.zm.controller;

import com.project.zm.model.Appointment;
import com.project.zm.model.User;
import com.project.zm.repository.AppointmentRepository;
import com.project.zm.repository.RoleRepository;
import com.project.zm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/restApi/user")
public class UserRESTController {
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    public UserRESTController(UserRepository userRepository,
                                 AppointmentRepository appointmentRepository,
                                 RoleRepository roleRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/appointmentsList")
    public List<Appointment> getAppointments() {
        List<Appointment> appointmentList = appointmentRepository.findAll();
        return appointmentList;
    }

    @GetMapping("/appointmentsList/{username}")
    public List<Appointment> appointmentsList(@PathVariable("username") String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        List<Appointment> appointmentList = appointmentRepository.findAll();
        appointmentList.removeIf(a -> (!a.getPatientUsername().equals(user.getUsername())&&!a.getDoctorUsername().equals(user.getUsername())));
        return appointmentList;
    }

    @GetMapping("/getPatientIdByUsername/{patientUsername}")
    public long getPatientIdByUsername(@PathVariable("patientUsername") String username){
        User patient = userRepository.findByUsername(username).orElse(null);
        return patient.getId();
    }

    @GetMapping("/getDoctorIdByUsername/{doctorUsername}")
    public long getDoctorIdByUsername(@PathVariable("doctorUsername") String username){
        User doctor = userRepository.findByUsername(username).orElse(null);
        return doctor.getId();
    }
}
