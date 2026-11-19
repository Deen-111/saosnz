//package com.ciena.saos.dto;
//
//import lombok.Data;
//
//@Data
//public class ErrorDTO {
//	private String errorCode;
//	private String errorMessage;
//
//	public ErrorDTO(String errorCode, String errorMessage) {
//		super();
//		this.errorCode = errorCode;
//		this.errorMessage = errorMessage;
//	}
//
//}
package com.ciena.saos.dto;
public record ErrorDTO(String errorCode, String errorMessage) { }
