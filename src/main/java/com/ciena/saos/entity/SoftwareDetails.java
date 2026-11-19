package com.ciena.saos.entity;

import lombok.Data;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "software_details")
public class SoftwareDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type_group")
    private String typeGroup;

    @Column(name = "software_version")
    private String softwareVersion;



}
