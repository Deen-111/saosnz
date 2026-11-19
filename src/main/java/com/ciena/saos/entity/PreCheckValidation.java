package com.ciena.saos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity(name = "pre_check_validations")
@Data
public class PreCheckValidation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long preCheckId;

	@Column(name = "node_detail_id")
	private Long nodeDetailId;

	@Column(name = "isis_neighbour")
	private String isisNeighbour;

	@Column(name = "bgp_peer")
	private String bgpPeer;

	@Column(name = "ip_neighbour")
	private String ipNeighbour;

	@Column(name = "cpu_state")
	private String cpuState;

	@Column(name = "alarm_severity")
	private String alarmSeverity;
	
	@Column(name = "vrf_interface")
	private String vrfInterface;

	@Column(name = "system_health")
	private String systemHealth;

	@Column(name = "created_timestamp", insertable = false, updatable = false)
	private String createdTimeStamp;

}
