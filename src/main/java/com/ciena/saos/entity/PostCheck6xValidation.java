package com.ciena.saos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity(name = "post_check_6x_validations")
@Data
public class PostCheck6xValidation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long postCheckId;

	@Column(name = "node_detail_id")
	private Long nodeDetailId;

	@Column(name = "port")
	private String port;

	@Column(name = "bfd")
	private String bfd;

	@Column(name = "pseudowire")
	private String pseudowire;

	@Column(name = "health_state")
	private String healthState;

	@Column(name = "alarm_severity")
	private String alarmSeverity;

	@Column(name = "port_throughput")
	private String portThroughput;

	@Column(name = "interface_ip")
	private String interfaceIp;

	@Column(name = "vlli")
	private String vlli;

	@Column(name = "isis_neighbor")
	private String isisNeighbor;

	@Column(name = "ospf")
	private String ospf;

	@Column(name = "mac")
	private String mac;

	@Column(name = "created_timestamp", insertable = false, updatable = false)
	private String createdTimeStamp;

}
