package com.ciena.saos.dto;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class IdDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<Long> ids;

	private String user;
}
