package com.project.zm.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min=3, max = 50)
    private String username;

    @NotBlank
    @Size(min=6, max = 40)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

    @NotBlank
    @Size(min=1, max = 50)
    private String name;

    @NotBlank
    @Size(min=1, max = 50)
    private String surname;

    public User() {
    }

    public User(@NotBlank @Size(min = 3, max = 50) String username,
                @NotBlank @Size(min = 6, max = 100) String password,
                @NotBlank @Size(min = 3, max = 50) String name,
                @NotBlank @Size(min = 3, max = 50) String surname) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getName(){ return this.name; }
    public void setName(String name) { this.name = name; }

    public String getSurname(){ return this.surname; }
    public void setSurname(String surname) { this.surname = surname; }

    public Set<Role> getRoles() {
        return roles;
    }
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

}
