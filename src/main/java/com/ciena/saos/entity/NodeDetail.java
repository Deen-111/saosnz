package com.ciena.saos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import lombok.Data;

@Entity(name = "node_details")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"device_type"}))
@Data
public class NodeDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long nodeDetailId;

    @NotEmpty(message = "Invalid Circle")
	@Column(name = "circle")
	private String circle;

	@NotEmpty(message = "Invalid Ring ID")
	@Column(name = "ring_id")
	private String ringId;

	@NotEmpty(message = "Invalid NE ID")
	@Column(name = "ne_id")
	private String neId;

	@NotEmpty(message = "Invalid Device Type")
	@Column(name = "device_type")
	private String deviceType;

	@NotEmpty(message = "Invalid Loopback Id")
	@Column(name = "loopback_ip")
	private String loopbackIp;

	@NotEmpty(message = "Invalid Software version")
	@Column(name = "software_version")
	private String softwareVersion;

	@Column(name = "pre_check_status")
	private String preCheckStatus;

	@Column(name = "pre_check_output_file")
	private String preCheckOutputFile;

	@Column(name = "post_check_status")
	private String postCheckStatus;

	@Column(name = "post_check_output_file")
	private String postCheckOutputFile;

	@Column(name = "vrf_details_pre_check")
	private String vrfDetailsPreCheck;

	@Column(name = "vrf_details_post_check")
	private String vrfDetailsPostCheck;

	@Column(name = "mac_details_post_check")
	private String macDetailsPostCheck;

	@Column(name = "download_status")
	private String downloadStatus;

	@Column(name = "download_comment")
	private String downloadComment;

	@Column(name = "installation_status")
	private String installationStatus;

	@Column(name = "error_code")
	private String errorCode;

	@Column(name = "created_by")
	private String createdBy;

	@Column(name = "created_timestamp", insertable = false, updatable = false)
	private String createdTimeStamp;

	@Transient
	private String uploadStatus;



}
