package com.ciena.saos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Data;

@Entity(name = "properties")
@Data
public class Property {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "property_name")
	private String propertyName;

	@Column(name = "property_value")
	private String propertyValue;

	@Column(name = "display_name")
	private String displayName;

}
