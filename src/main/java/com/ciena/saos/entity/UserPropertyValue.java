package com.ciena.saos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity(name = "user_properties_values")
@Data
public class UserPropertyValue {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "value_id")
	private Long valueId;

	@Column(name = "property_id")
	private Long propertyId;

	@Column(name = "property_value")
	private String propertyValue;

	@Column(name = "user_name")
	private String userName;

}
