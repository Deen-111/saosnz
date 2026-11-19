package com.ciena.saos.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.ciena.saos.entity.*;
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
import com.ciena.saos.dto.NodeDetailDTO;
import com.ciena.saos.dto.UpdateSoftwareVersionDTO;
import com.ciena.saos.service.SoftwareUpgradationService;


/**
 * @author Manoj
 *
 *         Controller for ZTP Data
 *
 */
@RestController
@RequestMapping(ApiMappings.UPGRADATION_URL)
@RequiredArgsConstructor
public class SoftwareUpgradationController {

	Logger logger = LoggerFactory.getLogger(SoftwareUpgradationController.class);

//	@Autowired
//	SoftwareUpgradationService softwareUpgradationService;
	private final SoftwareUpgradationService softwareUpgradationService;

	/**
	 * Method to Get by Distinct RingId
	 * 
	 * 
	 * @return
	 */

	@GetMapping(value = ApiMappings.NODE_DETAILS_RINGS)
	public List<String> getDistinctRings(Principal principal) {
		return softwareUpgradationService.getDistinctRings(principal.getName());
	}

	/**
	 * Method to Get by Distinct NodeName
	 * 
	 * 
	 * @return
	 */

	@GetMapping(value = ApiMappings.NODE_DETAILS_NODE_NAMES)
	public List<String> getDistinctNodeNames(Principal principal) {
		return softwareUpgradationService.getDistinctNodeNames(principal.getName());
	}

	/**
	 * Method to Get the Node Detail for Precheck and Software download
	 *
	 */

	@GetMapping(value = ApiMappings.NODE_DETAILS, produces = MediaType.APPLICATION_JSON_VALUE)
	public NodeDetailDTO getNodeDetails(
			@RequestParam(value = "state", required = false, defaultValue = "") String state,
			@RequestParam(value = "fromLimit", required = false) String page,
			@RequestParam(value = "toLimit", required = false) String size,
			@RequestParam(value = "ringId", required = false) String ringId,
			@RequestParam(value = "nodeName", required = false) String nodeName,
			Principal principal) {

		if (!state.isEmpty()) {

			if (nodeName != null && !nodeName.isEmpty()) {
				return softwareUpgradationService.getNodeDetailByNodeName(state, nodeName, principal.getName());
			}

			if (ringId != null && !ringId.isEmpty()) {
				return softwareUpgradationService.getNodeDetailByRingId(state, ringId, principal.getName());
			}

			return softwareUpgradationService.getNodeDetails(state, page, size, principal.getName());
		}

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		boolean hasUserRole = auth.getAuthorities().stream()
				.anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));

		if (hasUserRole) {
			return softwareUpgradationService.getNodeDetails(page, size);
		}

		if (page == null || size == null) {
			return softwareUpgradationService.getNodeDetails(principal.getName());
		}

		return softwareUpgradationService.getNodeDetails(state, page, size, principal.getName());
	}




	/**
	 * Method to save the Node Details
	 *
	 */
	@PostMapping(value = ApiMappings.NODE_DETAILS, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public NodeDetailDTO saveNodeDetails(@RequestBody List<NodeDetail> nodeDetails, Principal principal) {
		return softwareUpgradationService.saveNodeDetails(nodeDetails, principal.getName());
	}

	/**
	 * Method to delete Node Detailsby ids
	 *
	 */
	@DeleteMapping(value = ApiMappings.DELETE_NODE_DETAILS, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String deleteNodeDetail(@RequestBody IdDTO idDTO) {
		return softwareUpgradationService.deleteNodeDetails(idDTO);
	}

	/**
	 * Get Pre Check Validation Details
	 * 
	 * @param
	 * @param
	 * @return
	 */
	@GetMapping(value = ApiMappings.PRE_CHECK_VALIDATIONS, produces = MediaType.APPLICATION_JSON_VALUE)
	public PreCheckValidation getPreCheckValidations(@RequestParam(value = "id") String nodeDetailId) {
		return softwareUpgradationService.getPreCheckValidations(nodeDetailId);
	}

	/**
	 * Get Pre Check 6x Validation Details
	 * 
	 * @param
	 * @param
	 * @return
	 */
	@GetMapping(value = ApiMappings.PRE_CHECK_6x_VALIDATIONS, produces = MediaType.APPLICATION_JSON_VALUE)
	public PreCheck6xValidation getPreCheck6xValidations(@RequestParam(value = "id") String nodeDetailId) {
		return softwareUpgradationService.getPreCheck6xValidations(nodeDetailId);
	}

	/**
	 * Get Post Check Validation Details
	 * 
	 * @param
	 * @param
	 * @return
	 */
	@GetMapping(value = ApiMappings.POST_CHECK_VALIDATIONS, produces = MediaType.APPLICATION_JSON_VALUE)
	public PostCheckValidation getPostCheckStatusDetail(@RequestParam(value = "id") String nodeDetailId) {
		return softwareUpgradationService.getPostCheckValidations(nodeDetailId);
	}

	/**
	 * Get Post Check 6x Validation Details
	 * 
	 * @param
	 * @param
	 * @return
	 */
	@GetMapping(value = ApiMappings.POST_CHECK_6x_VALIDATIONS, produces = MediaType.APPLICATION_JSON_VALUE)
	public PostCheck6xValidation getPostCheck6xStatusDetail(@RequestParam(value = "id") String nodeDetailId) {
		return softwareUpgradationService.getPostCheck6xValidations(nodeDetailId);
	}

	/**
	 * Method to download Command Output file
	 *
	 */
	@GetMapping(value = ApiMappings.DOWNLOAD_OUTPUT_FILE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void downloadOutputFile(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "state") String state, @RequestParam(value = "id") String nodeDetailId)
			throws IOException {
		softwareUpgradationService.downloadOutputFile(request, response, nodeDetailId, state);
	}

	/**
	 * Method to Execute Upgradation
	 * 
	 */
	@PostMapping(value = ApiMappings.EXECUTE_UPGRADATION, produces = MediaType.APPLICATION_JSON_VALUE)
	public String RunPreCheckValdiation(@RequestParam(value = "state") String state, @RequestBody IdDTO idDTO,
			Principal principal) {
		return softwareUpgradationService.executeUpgradation(idDTO, principal.getName(), state);
	}



@PostMapping(value = ApiMappings.UPLOAD_SOFTWARE_URL,produces =MediaType.TEXT_PLAIN_VALUE )
public String uploadSoftware(@RequestParam(value = "state") String state, @RequestParam("file") MultipartFile file) throws IOException {
	String savedFile = softwareUpgradationService.uploadSoftwareFile(file,state);
	return savedFile;
}
		//
	@GetMapping(value = ApiMappings.SOFTWARE_VERSIONS)
	public List<String> getSoftwareVersions(@RequestParam(value = "typeGroup") String typeGroup){
		return softwareUpgradationService.getSoftwareVersions(typeGroup);
	}
	
	@PutMapping(value = ApiMappings.SOFTWARE_VERSIONS, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void updateNodeDetails(@RequestBody UpdateSoftwareVersionDTO softwareDto) {
		softwareUpgradationService.updateNodeDetails(softwareDto);
	}

}
