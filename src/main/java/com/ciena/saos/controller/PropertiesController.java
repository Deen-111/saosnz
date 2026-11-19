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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ciena.saos.constants.ApiMappings;
import com.ciena.saos.entity.Property;
import com.ciena.saos.service.PropertiesService;

/**
 * Controller for Properties
 *
 * @author Manoj
 *
 */
@RestController
@RequestMapping(ApiMappings.SETTINGS_URL)
@RequiredArgsConstructor
public class PropertiesController {

	Logger logger = LoggerFactory.getLogger(PropertiesController.class);

//	@Autowired
//	PropertiesService propertiesService;
	private final PropertiesService propertiesService;


	@GetMapping(value = ApiMappings.MASTER_PROPERTIES_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Property> getPropertiesData(HttpServletRequest request, HttpServletResponse response) {
		return propertiesService.getPropertiesData();
	}

	@PutMapping(value = ApiMappings.MASTER_PROPERTIES_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public void updatePropertiesData(@RequestBody Property properties) {
		propertiesService.updatePropertiesData(properties);
	}

	@GetMapping(value = ApiMappings.USER_PROPERTIES_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Property> getUserPropertiesData(HttpServletRequest request, HttpServletResponse response,
			Principal principal) {
		return propertiesService.getUserPropertiesData(principal.getName());
	}

	@PutMapping(value = ApiMappings.USER_PROPERTIES_URL, produces = MediaType.APPLICATION_JSON_VALUE)
	public void updateUserPropertiesData(@RequestBody Property properties, Principal principal) {
		propertiesService.updateUserPropertiesData(properties, principal.getName());
	}
}
