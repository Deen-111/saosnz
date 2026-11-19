package com.ciena.saos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.view.RedirectView;

import com.ciena.saos.constants.ApiMappings;

/**
 * Controller for Index
 * 
 * @author Manoj
 *
 */
@Controller
public class WebController {

	@GetMapping(value = ApiMappings.LOGIN_URL)
	public String login() {
		return "login";
	}

	@GetMapping(value = ApiMappings.ACCESS_DENIED_URL)
	public String accessDenied() {
		return "accessDenied";
	}

	@GetMapping(value = ApiMappings.INDEX_URL)
	public RedirectView index() {
		return new RedirectView("/soas" + ApiMappings.SOFTWARE_UPGRADATION_URL);
	}

	@GetMapping(value = ApiMappings.SOFTWARE_UPGRADATION_URL)
	public String softwareUpgradation() {
		return "softwareUpgradation";
	}

	@GetMapping(value = ApiMappings.UPLOAD_SOFTWARE_URL)    
	public String uploadSoftware() {
		return "uploadSoftware";
	}

	@GetMapping(value = ApiMappings.CLI_CUTTHROUGH_URL)    
	public String uploadCommands() {
		return "cliCutThrough";
	}

	@GetMapping(value = ApiMappings.USER_MANAGEMENT_URL)
	public String userManagement() {
		return "userManagement";
	}

	@GetMapping(value = ApiMappings.UPDATE_PASSWORD_URL)
	public String updatePassword() {
		return "updatePassword";
	}

	@GetMapping(value = ApiMappings.MASTER_PROPERTIES_URL)
	public String masterProperties() {
		return "masterProperties";
	}

	@GetMapping(value = ApiMappings.USER_PROPERTIES_URL)
	public String userProperties() {
		return "userProperties";
	}

}
