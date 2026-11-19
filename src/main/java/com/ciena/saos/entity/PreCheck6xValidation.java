package com.ciena.saos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity(name = "pre_check_6x_validations")
@Data
public class PreCheck6xValidation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long preCheckId;

	@Column(name = "node_detail_id")
	private Long nodeDetailId;

	@Column(name = "lldp")
	private String lldp;

	@Column(name = "bfd")
	private String bfd;

	@Column(name = "health_state")
	private String healthState;

	@Column(name = "dmac")
	private String dmac;

	@Column(name = "licence_key")
	private String licenceKey;

	@Column(name = "alarm_severity")
	private String alarmSeverity;

	@Column(name = "vlli")
	private String vlli;

	@Column(name = "isis_neighbor")
	private String isisNeighbor;

	@Column(name = "ospf")
	private String ospf;

	@Column(name = "lag_port")
	private String lagPort;

	@Column(name = "ring_status")
	private String ringStatus;

	@Column(name = "created_timestamp", insertable = false, updatable = false)
	private String createdTimeStamp;

}
