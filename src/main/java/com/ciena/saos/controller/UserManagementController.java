package com.ciena.saos.controller;

import java.security.Principal;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciena.saos.constants.ApiMappings;
import com.ciena.saos.entity.UserManagement;
import com.ciena.saos.service.impl.CustomUserDetailsService;

/**
 * Controller for Properties
 *
 * @author Manoj
 *
 */
@RestController
@RequestMapping(ApiMappings.SETTINGS_URL)
@RequiredArgsConstructor
public class UserManagementController {

	Logger logger = LoggerFactory.getLogger(UserManagementController.class);

//	@Autowired
//	CustomUserDetailsService customUserDetailsService;
	private final CustomUserDetailsService customUserDetailsService;


	@GetMapping(value = ApiMappings.USER_INFO_URL)
	public UserManagement userInfo(Principal principal) {
		return customUserDetailsService.getUserByUserName(principal.getName());
	}

	@GetMapping(value = ApiMappings.USER_MANAGEMENT_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserManagement> getUsersData(HttpServletRequest request, HttpServletResponse response) {
		return customUserDetailsService.getUsersData();
	}

	@PutMapping(value = ApiMappings.USER_MANAGEMENT_URL, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateUserData(@RequestBody UserManagement user) {
		customUserDetailsService.updateUserData(user);
	}

	@DeleteMapping(value = ApiMappings.USER_MANAGEMENT_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public String deleteUser(@RequestParam("id") String userId) {
		return customUserDetailsService.deleteUser(userId);
	}

	@PostMapping(value = ApiMappings.USER_MANAGEMENT_URL, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String createUser(@RequestBody UserManagement user) {
		return customUserDetailsService.createUser(user);
	}

	@PutMapping(value = ApiMappings.UPDATE_PASSWORD_URL)
	public void updateUserPassword(Authentication authentication, @RequestParam String userPwd) {
		String userName = authentication.getName();
		customUserDetailsService.updateUserPassword(userName, userPwd);
	}
}
