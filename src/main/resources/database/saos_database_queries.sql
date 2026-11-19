CREATE DATABASE saos;

USE saos;

CREATE TABLE `user_properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_name` varchar(200) NOT NULL,
  `display_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_properties_values` (
  `value_id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `property_value` varchar(200) NOT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  FOREIGN KEY(`property_id`) REFERENCES user_properties(id),
  PRIMARY KEY (`value_id`)
);
INSERT INTO `user_properties` VALUES 
(1,'MCP_IP','MCP Server Primary'),
(2,'MCP_USER','MCP User'),
(3,'MCP_PWD','MCP Password'),
(4,'NODE_USER','Node User'),
(5,'NODE_PWD','Node Password'),
(6,'FTP_IP','FTP Server Ip'),
(7,'FTP_USER','FTP Username'),
(8,'FTP_PWD','FTP Password'),
(9,'SERVER_TYPE','Server Type'),
(10,'SOFTWARE_PATH','Software Path'),
(11,'SOFTWARE_VERSION','Software Version')
;

create table node_login_detail(
  `id` int NOT NULL AUTO_INCREMENT,
  `node_name` varchar(200) NOT NULL,
  `ring_id` varchar(200) NOT NULL,
  `loopback_ip` varchar(200) NOT NULL,
  `cmd_output_file` varchar(500) DEFAULT NULL,
  `status` varchar(200) DEFAULT NULL,
  `created_by` varchar(200) NOT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`id`)
    );
    
  CREATE TABLE `node_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `circle` varchar(40) NOT NULL,
  `ring_id` varchar(500) NOT NULL,
  `ne_id` varchar(250) DEFAULT NULL,
  `device_type` varchar(40) DEFAULT NULL,
  `loopback_ip` varchar(40) DEFAULT NULL,
  `software_version` varchar(90) DEFAULT NULL,
  `pre_check_status` varchar(40) DEFAULT NULL,
  `pre_check_output_file` varchar(500) DEFAULT NULL,
  `post_check_status` varchar(40) DEFAULT NULL,
  `post_check_output_file` varchar(500) DEFAULT NULL,
  `vrf_details_pre_check` varchar(500) DEFAULT NULL,
  `vrf_details_post_check` varchar(500) DEFAULT NULL,
  `mac_details_post_check` varchar(500) DEFAULT NULL,
  `download_status` varchar(40) DEFAULT NULL,
  `download_comment` varchar(500) DEFAULT NULL,
  `installation_status` varchar(40) DEFAULT NULL,
  `error_code` int DEFAULT NULL,
  `created_by` varchar(90) DEFAULT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `error_mapping` (
    `error_code` int NOT NULL,
    `error_message` varchar(500) NOT NULL);
    
INSERT INTO `error_mapping` (`error_code`,`error_message`) VALUES
(0,'Success'),
(1,'Isis configured with single neighbor'),
(2,'Isis up with single neighbor'),
(3,'Isis not configured'),
(4,'Unreachable IP neighbors found'),
(5,'CPU Overload'),
(6,'Data not found'),
(7,'Exception occured in the code'),
(8,''),
(9,'Authentication failed'),
(10,'Pre-defined alarm is active'),
(11,'Vrf operationally down'),
(12,'BGP configured with single peer'),
(13,'BGP established with single peer'),
(14,'BGP not configured'),
(15,'Link count or state mismatch'),
(16,'Isis Neighbour count or state mismatch'),
(17,'BGP Peer count or state mismatch'),
(18,'Ip Neighbour count or state mismatch'),
(19,'New alarm Raised'),
(20,'LLDP count mismatch'), 
(21,'Pseudowire count or state mismatch'),
(22,'BFD session down'),
(23,'System health warning'),
(24,'IP AIB missing'),
(25,'License key missing'),
(26,'VLLI State disable for Global configuration'),
(27,'VLLI State disable for Instance group'),
(28,'ISIS state down'),
(29,'OSPF state warning'),
(30,'Port doesnot match'),
(31,'Bfd session doesnot match'),
(32,'Pseudowire count or state mismatch'),
(33,'Throughput mismatch observed'),
(34,'Health State doesnot match'),
(35,'Port doesnot match'),
(36,'Port throughput is not in range of 30%'),
(37,'Tx value changed to zero/back'),
(38,'Rx value changed to zero/back'),
(39,'Operational state of Interface ip changed'),
(40,'Ospf Neighbor doesnot match'),
(41,'Number of virtual switch entries for individual VS are not same'),
(42,'New Alarm doesnot Present'),
(43,'Lag Port Present'),
(44,'Ring is closed'),
(45,'Lldp neighbor port down'),
(46,'Vrf count mismatch'),
(47,'FTP Detail Missing'),
(48,'Mac doesnot match'),
(49,'BGP Peer not in established state'),
(-1, '');
    
CREATE TABLE `pre_check_validations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `node_detail_id` int NOT NULL,
  `isis_neighbour` int NOT NULL,
  `bgp_peer` int NOT NULL,
  `ip_neighbour` int NOT NULL,
  `cpu_state` int NOT NULL,
  `alarm_severity` int NOT NULL,
  `vrf_interface` int NOT NULL,
  `system_health` int NOT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  );
  
  CREATE TABLE `post_check_validations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `node_detail_id` int NOT NULL,
  `isis_neighbour` int NOT NULL,
  `bgp_peer` int NOT NULL,
  `ip_neighbour` int NOT NULL,
  `cpu_state` int NOT NULL,
  `alarm_severity` int NOT NULL,
  `logical_port` int NOT NULL,
  `pseudowire` int NOT NULL,
  `ettp_throughput` int NOT NULL,
  `lldp_neighbour` int NOT NULL,
  `vrf` int NOT NULL,
  `vrf_interface` int NOT NULL,
  `mac` int NOT NULL,
  `system_health` int NOT NULL,
  `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  );


   CREATE TABLE `pre_check_6x_validations` (
      `id` int NOT NULL AUTO_INCREMENT,
      `node_detail_id` int NOT NULL,
      `lldp` int NOT NULL,
      `bfd` int NOT NULL,
      `health_state` int NOT NULL,
      `dmac` int NOT NULL,
      `licence_key` int NOT NULL,
      `alarm_severity` int NOT NULL,
      `vlli` int NOT NULL,
      `isis_neighbor` int NOT NULL,
      `ospf` int NOT NULL,
      `lag_port` int NOT NULL,
      `ring_status` int NOT NULL,
      `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
      );

      CREATE TABLE `post_check_6x_validations` (
      `id` int NOT NULL AUTO_INCREMENT,
      `node_detail_id` int NOT NULL,
      `port` int NOT NULL,
      `bfd` int NOT NULL,
      `pseudowire` int NOT NULL,
      `health_state` int NOT NULL,
      `alarm_severity` int NOT NULL,
      `port_throughput` int NOT NULL,
      `interface_ip` int NOT NULL,
      `vlli` int NOT NULL,
      `isis_neighbor` int NOT NULL,
      `ospf` int NOT NULL,
      `mac` int NOT NULL,
      `created_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
      );
  
  
  CREATE TABLE `user_management` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `user_pwd` varchar(90) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `email` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `user_management` VALUES 
(1,'admin','$2a$10$8I1v4SThPihTtJpVg0SyiuUBbVSToTtMnPPsWNEH/bk79zkXFjeym', 'Ciena Admin', 'User', 'Admin', 'Active', 'admin@email.com');

create table software_details(
  `id` int NOT NULL AUTO_INCREMENT,
  `type_group` varchar(45) NOT NULL,
  `software_version` varchar(500) NOT NULL,
   PRIMARY KEY (`id`)
    );
    
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_name` varchar(200) NOT NULL,
  `property_value` varchar(200) NOT NULL,
  `display_name` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `properties` VALUES 
(1,'MCP_IP','100.72.253.5','MCP Server Primary'),
(2,'MCP_USER','admin','MCP User'),
(3,'MCP_PWD','adminpw','MCP Password'),
(4,'NODE_USER','NEMANAGER','Node User'),
(5,'NODE_PWD','Manager!1','Node Password'),
(6,'FTP_IP','','FTP Server Ip'),
(7,'FTP_USER','','FTP Username'),
(8,'FTP_PWD','','FTP Password'),
(9,'SERVER_TYPE','','Server Type'),
(10,'SOFTWARE_VERSION','','Software Version')
;


ALTER TABLE pre_check_validations ADD COLUMN system_health INT NOT NULL AFTER vrf_interface;
ALTER TABLE post_check_validations ADD COLUMN system_health INT NOT NULL AFTER mac;

ALTER TABLE node_details
ADD COLUMN vrf_details_pre_check VARCHAR(500) DEFAULT NULL,
ADD COLUMN vrf_details_post_check VARCHAR(500) DEFAULT NULL,
ADD COLUMN mac_details_post_check VARCHAR(500) DEFAULT NULL;





