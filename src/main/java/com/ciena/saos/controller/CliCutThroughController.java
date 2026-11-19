package com.ciena.saos.controller;

import java.io.IOException;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ciena.saos.constants.ApiMappings;
import com.ciena.saos.dto.IdDTO;
import com.ciena.saos.dto.NodeLoginDetailDto;
import com.ciena.saos.entity.NodeLoginDetail;
import com.ciena.saos.service.CliCutThroughService;


@RestController
@RequestMapping(ApiMappings.CLI_CUT_THROUGH_URL)
@RequiredArgsConstructor
public class CliCutThroughController {

	Logger logger = LoggerFactory.getLogger(CliCutThroughController.class);

//	@Autowired
//	CliCutThroughService cliCutThroughService;
	private final CliCutThroughService cliCutThroughService;
	
	/**
	 * Method to Get by Distinct RingId
	 * 
	 * 
	 * @return
	 */

	@GetMapping(value = ApiMappings.RINGS)
	public List<String> getDistinctRings(Principal principal) {
		return cliCutThroughService.getDistinctRings(principal.getName());
	}

	/**
	 * Method to Get by Distinct NodeName
	 * 
	 * 
	 * @return
	 */

	@GetMapping(value = ApiMappings.NODE_NAMES)
	public List<String> getDistinctNodeNames(Principal principal) {
		return cliCutThroughService.getDistinctNodeNames(principal.getName());
	}


@GetMapping(value = ApiMappings.LOGIN_DETAILS, produces = MediaType.APPLICATION_JSON_VALUE)
public NodeLoginDetailDto getNodeLoginDetails(@RequestParam(value = "fromLimit", required = false) String page,
		                                      @RequestParam(value = "toLimit", required = false) String size, Principal principal) {

	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	boolean hasUserRole = auth.getAuthorities().stream()
			.anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
	if (hasUserRole) {
		return cliCutThroughService.getNodeLoginDetails(page, size);
	}
	if (page == null || size == null) {
		return cliCutThroughService.getNodeLoginDetails(principal.getName());
	}

	return cliCutThroughService.getNodeLoginDetails(page, size, principal.getName());
}

	
	@PostMapping(value = ApiMappings.UPLOAD_COMMANDS,produces =MediaType.TEXT_PLAIN_VALUE )
	public String uploadCommands(@RequestParam("file") MultipartFile file) throws IOException {
		String savedFile = cliCutThroughService.uploadCommandsFile(file);
		return savedFile;
	}

	@PostMapping(value = ApiMappings.LOGIN_DETAILS, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public NodeLoginDetailDto saveNodeLoginDetails(@RequestBody List<NodeLoginDetail> nodeLoginDetails, Principal principal) {
		return cliCutThroughService.saveNodeLoginDetails(nodeLoginDetails, principal.getName());
	}

	
	@GetMapping(value = ApiMappings.DETAILS_BY_NODE_NAME)
	public NodeLoginDetailDto getLoginDetailByNodeName(@PathVariable String nodeName, Principal principal) {
		return cliCutThroughService.getNodeLoginDetailByNodeName(nodeName, principal.getName());
	}


@GetMapping(value = ApiMappings.DETAILS_BY_RING_ID)
public NodeLoginDetailDto getLoginDetailsByRingId(@PathVariable String ringId, Principal principal) {
	return cliCutThroughService.getNodeLoginDetailsByRingId(ringId, principal.getName());
}

	@PostMapping(value = ApiMappings.EXECUTE_COMMANDS, produces = MediaType.APPLICATION_JSON_VALUE)
	public String ExecuteCommands(@RequestBody IdDTO idDTO, Principal principal) {
		return cliCutThroughService.executeCommands(idDTO,principal.getName() );
	}

	@GetMapping(value = ApiMappings.DOWNLOAD_COMMANDS_OUTPUT_FILE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void downloadCommandOutputFile(HttpServletRequest request, HttpServletResponse response,
										   @RequestParam(value = "id") String nodeLoginDetailId) throws IOException {
		cliCutThroughService.downloadCommandsOutputFile(request, response, nodeLoginDetailId);
	}

	@DeleteMapping(value = ApiMappings.LOGIN_DETAILS, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String deleteRunCommands(@RequestBody IdDTO idDTO) {
		return cliCutThroughService.deleteRunCommandsDetails(idDTO);
	}


	@GetMapping(value = ApiMappings.CLI_COMMANDS_DATA)
	public List<String> getCliCommands() throws IOException{
		return cliCutThroughService.getCliCommands();
	}



}
