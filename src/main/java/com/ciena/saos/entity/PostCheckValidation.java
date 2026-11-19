package com.ciena.saos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity(name = "post_check_validations")
@Data
public class PostCheckValidation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long postCheckId;

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

	@Column(name = "logical_port")
	private String logicalPort;

	@Column(name = "pseudowire")
	private String pseudowire;

	@Column(name = "ettp_throughput")
	private String ettpThroughput;

	@Column(name = "lldp_neighbour")
	private String lldpNeighbour;
	
	@Column(name = "vrf")
	private String vrf;
	
	@Column(name = "vrf_interface")
	private String vrfInterface;
	
	@Column(name = "mac")
	private String mac;

	@Column(name = "system_health")
	private String systemHealth;

	@Column(name = "created_timestamp", insertable = false, updatable = false)
	private String createdTimeStamp;

}
