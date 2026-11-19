package com.ciena.saos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import lombok.Data;

@Entity(name = "error_mapping")
@Data
public class ErrorMapping {


	@Id
	@Column(name = "error_code")
	private Integer errorCode;

	@Column(name = "error_message")
	private String errorMessage;

}
