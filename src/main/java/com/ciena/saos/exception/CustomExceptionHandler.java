package com.ciena.saos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.ciena.saos.dto.ErrorDTO;

@ControllerAdvice
public class CustomExceptionHandler {

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(NoRecordFoundException.class)
	@ResponseBody
	ErrorDTO exceptionHandlerNoRecordFound(NoRecordFoundException e) {
		return new ErrorDTO("NO_ROUTER_FOUND", "Router details not found.");
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(Exception.class)
	@ResponseBody
	ErrorDTO exceptionHandlerGeneric(Exception e) {
		return new ErrorDTO("SERVER_ERROR", "Something wrong with backend.");
	}

	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(UnAuthorizedException.class)
	@ResponseBody
	ErrorDTO exceptionHandlerUnAuthorized(Exception e) {
		return new ErrorDTO("SESSION_EXPIRED", "Current session expired.");

	}
}



