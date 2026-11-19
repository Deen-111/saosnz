package com.ciena.saos.entity;

import lombok.Data;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Data
@Table(name = "node_login_detail",uniqueConstraints = {@UniqueConstraint(columnNames = {"node_name","loopback_ip"})})
public class NodeLoginDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long nodeLoginDetailId;

    @NotEmpty(message = "Node Name should not be empty")
    @Column(name = "node_name")
    private String nodeName;

    @Column(name = "ring_id")
    private String ringId;

    @NotEmpty(message = "Loopback Ip should not be empty")
    @Column(name="loopback_ip")
    private String loopbackIp;

    @Column(name = "cmd_output_file")
    private String cmdOutputFile;

    @Column(name = "status")
    private String status;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_timestamp", insertable = false, updatable = false)
    private String createdTimeStamp;

    @Transient
    private String uploadStatus;

}
