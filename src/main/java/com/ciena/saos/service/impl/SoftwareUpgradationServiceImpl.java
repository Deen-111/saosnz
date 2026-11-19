package com.ciena.saos.service.impl;

import java.io.File;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.ciena.saos.constants.Constants;
import com.ciena.saos.dto.IdDTO;
import com.ciena.saos.dto.NodeDetailDTO;
import com.ciena.saos.dto.UpdateSoftwareVersionDTO;
import com.ciena.saos.entity.NodeDetail;
import com.ciena.saos.entity.PostCheck6xValidation;
import com.ciena.saos.entity.PostCheckValidation;
import com.ciena.saos.entity.PreCheck6xValidation;
import com.ciena.saos.entity.PreCheckValidation;
import com.ciena.saos.entity.SoftwareDetails;
import com.ciena.saos.entity.UserPropertyValue;
import com.ciena.saos.repository.NodeDetailRepository;
import com.ciena.saos.repository.PostCheck6xValidationRepository;
import com.ciena.saos.repository.PostCheckValidationRepository;
import com.ciena.saos.repository.PreCheck6xValidationRepository;
import com.ciena.saos.repository.PreCheckValidationRepository;
import com.ciena.saos.repository.SoftwareDetailsRepository;
import com.ciena.saos.repository.UserPropertiesValuesRepository;
import com.ciena.saos.service.SoftwareUpgradationService;
import com.ciena.saos.util.ZipDirUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor            ////lombok added for contructor injection
@Slf4j
public class SoftwareUpgradationServiceImpl implements SoftwareUpgradationService {


	private final UserPropertiesValuesRepository userPropertiesValuesRepo;


//	@Autowired
//	SoftwareDetailsRepository softwareDetailsRepo;
    private final SoftwareDetailsRepository softwareDetailsRepo;


	private final WebClientServiceImpl webClientServiceImpl;


	private final PostCheckValidationRepository postCheckValidationRepository;


	private final PreCheckValidationRepository preCheckValidationRepository;

	private final PostCheck6xValidationRepository postCheck6xValidationRepository;

	private final PreCheck6xValidationRepository preCheck6xValidationRepository;

	private final ZipDirUtils zipDirUtils;

	private final Map<Integer, String> errorMap;


	private final NodeDetailRepository nodeDetailRepository;

	private final WebClient webClient;

	@Value("${post.check.api.url}")
	String postCheckApiUrl;

	@Value("${pre.check.api.url}")
	String preCheckApiUrl;

	@Value("${installation.api.url}")
	String installationApiUrl;

	@Value("${download.api.url}")
	String downloadApiUrl;

	@Value("${common.file.path}")
	String commonFilePath;

	@Value("${software.file.path}")
	String softwareFilePath;

	@Value("${software.file6x.path}")
	String softwareFile6xPath;

	@Override
	public List<String> getDistinctRings(String createdBy) {
		return nodeDetailRepository.findDistinctRings(createdBy);
	}

	@Override
	public List<String> getDistinctNodeNames(String createdBy) {
		return nodeDetailRepository.findDistinctNeIds(createdBy);
	}


@Override
public NodeDetailDTO getNodeDetails(String createdBy) {

	List<NodeDetail> nodeDetailList = nodeDetailRepository
			.findAllByCreatedBy(
					Sort.by(Sort.Direction.DESC, "nodeDetailId"),
					createdBy);

	return new NodeDetailDTO(nodeDetailList, false);
}


@Override
public NodeDetailDTO getNodeDetails(String page, String size) {

	Pageable pageable = PageRequest.of(
			Integer.parseInt(page),
			Integer.parseInt(size),
			Sort.by(Sort.Direction.DESC, "nodeDetailId"));

	Page<NodeDetail> nodeDetailPage = nodeDetailRepository.findAll(pageable);

	List<NodeDetail> nodeDetailList = nodeDetailPage.getContent();

	nodeDetailList.forEach(s -> s.setErrorCode(errorMapping(s.getErrorCode())));

	return new NodeDetailDTO(
			nodeDetailList,
			nodeDetailPage.isLast()
	);
}


@Override
public NodeDetailDTO getNodeDetails(String state, String page, String size, String createdBy) {

	List<NodeDetail> nodeDetailList = new ArrayList<>();
	boolean lastPage = false;

	if (state.equalsIgnoreCase("pre-check") || state.equalsIgnoreCase("download") || state.equalsIgnoreCase("")) {
		Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size),
				Sort.by(Sort.Direction.DESC, "nodeDetailId"));
		Page<NodeDetail> nodeDetailPage = nodeDetailRepository.findAllByCreatedBy(pageable, createdBy);

		nodeDetailList = nodeDetailPage.getContent();
		lastPage = nodeDetailPage.isLast();

	} else if (state.equalsIgnoreCase("installation")) {
		List<String> preCheckStatusList = List.of(Constants.STATUS_SUCCESS, Constants.STATUS_FAILED);
		Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), Sort.by(Sort.Direction.DESC, "nodeDetailId"));

		Page<NodeDetail> nodeDetailPage =
				nodeDetailRepository.findAllByDownloadStatusAndCreatedByAndPreCheckStatusIn(pageable, Constants.STATUS_SUCCESS, createdBy, preCheckStatusList);

		nodeDetailList = nodeDetailPage.getContent();
		lastPage = nodeDetailPage.isLast();

	} else if (state.equalsIgnoreCase("post-check")) {
		Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size),
				Sort.by(Sort.Direction.DESC, "nodeDetailId"));

		Page<NodeDetail> nodeDetailPage =
				nodeDetailRepository.findAllByInstallationStatusAndCreatedBy(pageable, Constants.STATUS_SUCCESS, createdBy);

		nodeDetailList = nodeDetailPage.getContent();
		lastPage = nodeDetailPage.isLast();
	}

	nodeDetailList.forEach(s -> s.setErrorCode(errorMapping(s.getErrorCode())));

	return new NodeDetailDTO(nodeDetailList, lastPage);
}


@Override
public NodeDetailDTO getNodeDetailByRingId(String state, String ringId, String createdBy) {

	List<NodeDetail> nodeDetailList = new ArrayList<>();

	if (state.equalsIgnoreCase("pre-check") || state.equalsIgnoreCase("download") || state.equalsIgnoreCase("node-detail")) {
		nodeDetailList = nodeDetailRepository.findByRingIdAndCreatedBy(ringId, createdBy);

	} else if (state.equalsIgnoreCase("installation")) {
		List<String> preCheckStatusList = List.of(Constants.STATUS_SUCCESS, Constants.STATUS_FAILED);
		nodeDetailList = nodeDetailRepository.findAllByRingIdAndCreatedByAndDownloadStatusAndPreCheckStatusIn(
						ringId, createdBy, Constants.STATUS_SUCCESS, preCheckStatusList);

	} else if (state.equalsIgnoreCase("post-check")) {
		nodeDetailList = nodeDetailRepository.findAllByRingIdAndCreatedByAndInstallationStatus(ringId, createdBy, Constants.STATUS_SUCCESS);
	}

	nodeDetailList.forEach(s -> s.setErrorCode(errorMapping(s.getErrorCode())));

	return new NodeDetailDTO(nodeDetailList, false);
}


@Override
public NodeDetailDTO getNodeDetailByNodeName(String state, String nodeName, String createdBy) {

	List<NodeDetail> nodeDetailList = new ArrayList<>();

	if (state.equalsIgnoreCase("pre-check") || state.equalsIgnoreCase("download")|| state.equalsIgnoreCase("node-detail")) {
		nodeDetailList = nodeDetailRepository.findByNeIdAndCreatedBy(nodeName, createdBy);
	}

	else if (state.equalsIgnoreCase("installation")) {
		List<String> preCheckStatusList = Arrays.asList(Constants.STATUS_SUCCESS, Constants.STATUS_FAILED);
		nodeDetailList = nodeDetailRepository.findAllByNeIdAndCreatedByAndDownloadStatusAndPreCheckStatusIn(
				nodeName, createdBy, Constants.STATUS_SUCCESS, preCheckStatusList);
	} else if (state.equalsIgnoreCase("post-check")) {
		nodeDetailList = nodeDetailRepository.findAllByNeIdAndCreatedByAndInstallationStatus(nodeName, createdBy,
				Constants.STATUS_SUCCESS);
	}
	nodeDetailList.forEach(s -> s.setErrorCode(errorMapping(s.getErrorCode())));
	return new NodeDetailDTO(nodeDetailList, false);
}



	@Override
	public NodeDetailDTO saveNodeDetails(List<NodeDetail> nodeDetail, String createdBy) {

		List<NodeDetail> statusList = new ArrayList<>();

		for (NodeDetail nodeDetails : nodeDetail) {

			nodeDetails.setCreatedBy(createdBy);

			try {

				UserPropertyValue userPropertyValue = userPropertiesValuesRepo
						.findByPropertyNameAndUserName("SOFTWARE_VERSION", createdBy)
						.orElse(null);

				if (userPropertyValue == null) {
					String errorMessage = "Software version property not found for user : " + createdBy;
					nodeDetails.setUploadStatus(errorMessage);
					statusList.add(nodeDetails);
					continue;
				}

				nodeDetails.setSoftwareVersion(userPropertyValue.getPropertyValue());

				nodeDetailRepository.save(nodeDetails);

				nodeDetails.setUploadStatus(Constants.MSG_ADDED_SUCCESSFULLY);
				statusList.add(nodeDetails);

			} catch (ConstraintViolationException e) {

				String error = e.getConstraintViolations().stream()
						.map(ConstraintViolation::getMessage)
						.collect(Collectors.joining(","));

				nodeDetails.setUploadStatus(error);
				statusList.add(nodeDetails);

			} catch (Exception e) {

				log.error("Error while saving node details.", e);

				nodeDetails.setUploadStatus(Constants.MSG_RECORD_ALREADY_PRESENT);
				statusList.add(nodeDetails);
			}
		}

		return new NodeDetailDTO(statusList, false);
	}


	@Override
	@Transactional
	public String deleteNodeDetails(IdDTO idDTO) {
		List<Long> nodeDetailIds = idDTO.getIds();
		nodeDetailRepository.deleteAllByIdInBatch(nodeDetailIds);
		return "Record deleted Successfully";
	}

	@Override
	public PreCheckValidation getPreCheckValidations(String nodeDetailId) {
		PreCheckValidation updatedPreCheckValidation = new PreCheckValidation();
		PreCheckValidation preCheckValidations = new PreCheckValidation();
		preCheckValidations = preCheckValidationRepository
				.findTopByNodeDetailIdOrderByPreCheckIdDesc(Long.parseLong(nodeDetailId));
		updatedPreCheckValidation.setIsisNeighbour(errorMapping(preCheckValidations.getIsisNeighbour()));
		updatedPreCheckValidation.setBgpPeer(errorMapping(preCheckValidations.getBgpPeer()));
		updatedPreCheckValidation.setIpNeighbour(errorMapping(preCheckValidations.getIpNeighbour()));
		updatedPreCheckValidation.setCpuState(errorMapping(preCheckValidations.getCpuState()));
		updatedPreCheckValidation.setAlarmSeverity(errorMapping(preCheckValidations.getAlarmSeverity()));

		String vrfInterface = errorMapping(preCheckValidations.getVrfInterface());

		if (preCheckValidations.getVrfInterface() != null
				&& !"0".equals(preCheckValidations.getVrfInterface())) {

			NodeDetail nodeDetail = nodeDetailRepository
					.findById(Long.parseLong(nodeDetailId))
					.orElse(null);

			if (nodeDetail != null
					&& nodeDetail.getVrfDetailsPreCheck() != null
					&& !nodeDetail.getVrfDetailsPreCheck().trim().isEmpty()) {

				String vrfDetails = nodeDetail.getVrfDetailsPreCheck();

				vrfInterface += " for " + vrfDetails;
			}
		}

		updatedPreCheckValidation.setVrfInterface(vrfInterface);
		updatedPreCheckValidation.setSystemHealth(errorMapping(preCheckValidations.getSystemHealth()));
		
		return updatedPreCheckValidation;
	}


@Override
public PostCheckValidation getPostCheckValidations(String nodeDetailId) {
	PostCheckValidation updatedPostCheckStatus = new PostCheckValidation();
	PostCheckValidation postCheckStatus = new PostCheckValidation();
	postCheckStatus = postCheckValidationRepository
			.findTopByNodeDetailIdOrderByPostCheckIdDesc(Long.parseLong(nodeDetailId));
	updatedPostCheckStatus.setAlarmSeverity(errorMapping(postCheckStatus.getAlarmSeverity()));
	updatedPostCheckStatus.setBgpPeer(errorMapping(postCheckStatus.getBgpPeer()));
	updatedPostCheckStatus.setCpuState(errorMapping(postCheckStatus.getCpuState()));
	updatedPostCheckStatus.setEttpThroughput(errorMapping(postCheckStatus.getEttpThroughput()));
	updatedPostCheckStatus.setIpNeighbour(errorMapping(postCheckStatus.getIpNeighbour()));
	updatedPostCheckStatus.setIsisNeighbour(errorMapping(postCheckStatus.getIsisNeighbour()));
	updatedPostCheckStatus.setLldpNeighbour(errorMapping(postCheckStatus.getLldpNeighbour()));
	updatedPostCheckStatus.setLogicalPort(errorMapping(postCheckStatus.getLogicalPort()));
	updatedPostCheckStatus.setPseudowire(errorMapping(postCheckStatus.getPseudowire()));
	updatedPostCheckStatus.setVrf(errorMapping(postCheckStatus.getVrf()));
	String vrfInterface = errorMapping(postCheckStatus.getVrfInterface());
	String mac = errorMapping(postCheckStatus.getMac());

	NodeDetail nodeDetail = null;
	//fatch nodeDetail only when VRF and MAC Value is not equal to zero "0"
	if ((postCheckStatus.getVrfInterface() != null
			&& !"0".equals(postCheckStatus.getVrfInterface()))
			|| (postCheckStatus.getMac() != null
			&& !"0".equals(postCheckStatus.getMac()))) {

		nodeDetail = nodeDetailRepository
				.findById(Long.parseLong(nodeDetailId))
				.orElse(null);
	}

	if (postCheckStatus.getVrfInterface() != null
			&& !"0".equals(postCheckStatus.getVrfInterface())
			&& nodeDetail != null
			&& nodeDetail.getVrfDetailsPostCheck() != null
			&& !nodeDetail.getVrfDetailsPostCheck().trim().isEmpty()) {


		String vrfDetails = nodeDetail.getVrfDetailsPostCheck();
		vrfInterface += " for " + vrfDetails;
	}

	updatedPostCheckStatus.setVrfInterface(vrfInterface);

	if (postCheckStatus.getMac() != null
			&& !"0".equals(postCheckStatus.getMac())
			&& nodeDetail != null
			&& nodeDetail.getMacDetailsPostCheck() != null
			&& !nodeDetail.getMacDetailsPostCheck().trim().isEmpty()) {

		String macDetails = nodeDetail.getMacDetailsPostCheck();
		mac += " for " + macDetails;
	}

	updatedPostCheckStatus.setMac(mac);

	updatedPostCheckStatus.setSystemHealth(errorMapping(postCheckStatus.getSystemHealth()));

	return updatedPostCheckStatus;
}

	@Override
	public PreCheck6xValidation getPreCheck6xValidations(String nodeDetailId) {
		PreCheck6xValidation updatedPreCheckValidation = new PreCheck6xValidation();
		PreCheck6xValidation preCheck6xValidations = new PreCheck6xValidation();
		preCheck6xValidations = preCheck6xValidationRepository
				.findTopByNodeDetailIdOrderByPreCheckIdDesc(Long.parseLong(nodeDetailId));
		log.info("preCheck6xValidations" + preCheck6xValidations);
		updatedPreCheckValidation.setAlarmSeverity(errorMapping(preCheck6xValidations.getAlarmSeverity()));
		updatedPreCheckValidation.setBfd(errorMapping(preCheck6xValidations.getBfd()));
		updatedPreCheckValidation.setDmac(errorMapping(preCheck6xValidations.getDmac()));
		updatedPreCheckValidation.setHealthState(errorMapping(preCheck6xValidations.getHealthState()));
		updatedPreCheckValidation.setIsisNeighbor(errorMapping(preCheck6xValidations.getIsisNeighbor()));
		updatedPreCheckValidation.setLicenceKey(errorMapping(preCheck6xValidations.getLicenceKey()));
		updatedPreCheckValidation.setLldp(errorMapping(preCheck6xValidations.getLldp()));
		updatedPreCheckValidation.setOspf(errorMapping(preCheck6xValidations.getOspf()));
		updatedPreCheckValidation.setVlli(errorMapping(preCheck6xValidations.getVlli()));
		updatedPreCheckValidation.setLagPort(errorMapping(preCheck6xValidations.getLagPort()));
		updatedPreCheckValidation.setRingStatus(errorMapping(preCheck6xValidations.getRingStatus()));

		return updatedPreCheckValidation;
	}

	@Override
	public PostCheck6xValidation getPostCheck6xValidations(String nodeDetailId) {
		PostCheck6xValidation updatedPostCheckValidation = new PostCheck6xValidation();
		PostCheck6xValidation postCheck6xValidations = new PostCheck6xValidation();
		postCheck6xValidations = postCheck6xValidationRepository
				.findTopByNodeDetailIdOrderByPostCheckIdDesc(Long.parseLong(nodeDetailId));
		updatedPostCheckValidation.setAlarmSeverity(errorMapping(postCheck6xValidations.getAlarmSeverity()));
		updatedPostCheckValidation.setBfd(errorMapping(postCheck6xValidations.getBfd()));
		updatedPostCheckValidation.setHealthState(errorMapping(postCheck6xValidations.getHealthState()));
		updatedPostCheckValidation.setIsisNeighbor(errorMapping(postCheck6xValidations.getIsisNeighbor()));
		updatedPostCheckValidation.setInterfaceIp(errorMapping(postCheck6xValidations.getInterfaceIp()));
		updatedPostCheckValidation.setMac(errorMapping(postCheck6xValidations.getMac()));
		updatedPostCheckValidation.setOspf(errorMapping(postCheck6xValidations.getOspf()));
		updatedPostCheckValidation.setPort(errorMapping(postCheck6xValidations.getPort()));
		updatedPostCheckValidation.setPseudowire(errorMapping(postCheck6xValidations.getPseudowire()));
		updatedPostCheckValidation.setVlli(errorMapping(postCheck6xValidations.getVlli()));
		updatedPostCheckValidation.setPortThroughput(errorMapping(postCheck6xValidations.getPortThroughput()));
		return updatedPostCheckValidation;
	}

	@Override
	public void downloadOutputFile(HttpServletRequest request, HttpServletResponse response, String nodeDetailId,
			String state) {
		try {
			String filePath = "";
			if (state.equalsIgnoreCase("pre-check")) {
				String preCheckFilePath = nodeDetailRepository.findPreCheckFilePathById(nodeDetailId);
				filePath = commonFilePath + preCheckFilePath;
			} else if (state.equalsIgnoreCase("post-check")) {
				String postCheckFilePath = nodeDetailRepository.findPostCheckFilePathById(nodeDetailId);
				filePath = commonFilePath + postCheckFilePath;
			}
			zipDirUtils.downloadCmdOutputFile(request, response, filePath);
		} catch (Exception e) {
			log.error("Error while downloading Pre Check Command Output File: ", e);
		}

	}

	public String errorMapping(String value) {
		if (value != null)
			return errorMap.get(Integer.parseInt(value));
		else
			return "";
	}

	@Override
	@Transactional
	public String executeUpgradation(IdDTO idDTO, String user, String state) {
		if (state.equalsIgnoreCase("pre-check")) {
			List<NodeDetail> nodeDetailList = nodeDetailRepository.findAllById(idDTO.getIds());
			nodeDetailList.forEach(s -> {
				s.setPreCheckStatus(Constants.STATUS_IN_PROGRESS);
				s.setErrorCode("-1");
				s.setPreCheckOutputFile("");
			});
			idDTO.setUser(user);
			webClientServiceImpl.startService(preCheckApiUrl, idDTO, "preCheckStatus");
		} else if (state.equalsIgnoreCase("post-check")) {
			List<NodeDetail> nodeDetailsList = nodeDetailRepository.findAllById(idDTO.getIds());
			nodeDetailsList.forEach(s -> {
				s.setPostCheckStatus(Constants.STATUS_IN_PROGRESS);
				s.setErrorCode("-1");
				s.setPostCheckOutputFile("");
			});
			idDTO.setUser(user);
			webClientServiceImpl.startService(postCheckApiUrl, idDTO, "postCheckStatus");
		} else if (state.equalsIgnoreCase("software-download")) {
			List<NodeDetail> nodeDetailsList = nodeDetailRepository.findAllById(idDTO.getIds());
			nodeDetailsList.forEach(s -> {
				s.setDownloadStatus(Constants.STATUS_IN_PROGRESS);
				s.setDownloadComment("");
			});
			idDTO.setUser(user);
			webClientServiceImpl.startService(downloadApiUrl, idDTO, "downloadStatus");
		} else if (state.equalsIgnoreCase("software-installation")) {
			List<NodeDetail> nodeDetailsList = nodeDetailRepository.findAllById(idDTO.getIds());
			nodeDetailsList.forEach(s -> {
				s.setInstallationStatus(Constants.STATUS_IN_PROGRESS);
			});
			idDTO.setUser(user);
			webClientServiceImpl.startService(installationApiUrl, idDTO, "installationStatus");
		} else {
			System.out.print("Error Job push in queue");
			return "Error Job push in queue";
		}
		return "Request Initiated";
	}

	@Override
	public String uploadSoftwareFile(MultipartFile file, String state) { // 12J
		try {
			if (state.equalsIgnoreCase("PN10X")) 
				saveSoftware(file, "PN10x", softwareFilePath);
			else if (state.equalsIgnoreCase("PN6X")) 
				saveSoftware(file, "PN6x", softwareFile6xPath);
			return "File uploaded successfully";
		} catch (IOException e) {
			e.printStackTrace();
			return "File upload failed:" + e.getMessage();
		}
	}

	@Override
	public List<String> getSoftwareVersions(String typeGroup) {

		List<String> softwareVersions =
				new ArrayList<String>(
						softwareDetailsRepo.findSoftwareVersionByTypeGroup(typeGroup)
				);

		// Fetch default software version from user_properties tables
		List<String> defaultVersions =
				userPropertiesValuesRepo.findPropertyValuesByPropertyName("SOFTWARE_VERSION");

		if (defaultVersions != null) {
			for (String version : defaultVersions) {
				if (version != null && !version.trim().isEmpty()
						&& !softwareVersions.contains(version)) {
					softwareVersions.add(0, version);
				}
			}
		}

		return softwareVersions;
	}


@Override
@Transactional
public void updateNodeDetails(UpdateSoftwareVersionDTO softwareDTO) {
	NodeDetail nodeDetail = nodeDetailRepository.findById(softwareDTO.id()).orElseThrow(() -> new EntityNotFoundException(
					"NodeDetail not found for id :" + softwareDTO.id()));

	nodeDetail.setSoftwareVersion(softwareDTO.softwareVersion());
	nodeDetailRepository.save(nodeDetail);
}

	public void saveSoftware(MultipartFile file, String state, String path) throws IOException {
		log.debug(file.getOriginalFilename());
		File destFile = new File(path + file.getOriginalFilename());
        file.transferTo(destFile);
        
        // Example: Set read and write permissions for owner, read permissions for group and others
        destFile.setReadable(true, false);
        destFile.setWritable(true, false);
        destFile.setExecutable(true, false);
		
        zipDirUtils.unzipAll(path + file.getOriginalFilename(),path);
		
		// extract the software name from the original file name
		String originalFilename = file.getOriginalFilename();
		String softwareVersion = originalFilename != null
				? Arrays.stream(originalFilename.split("\\.")).filter(s -> !s.equals("zip"))
						.collect(Collectors.joining("."))
				: "unknown";
	
		SoftwareDetails softwareDetails = new SoftwareDetails();
		softwareDetails.setTypeGroup(state);
		softwareDetails.setSoftwareVersion(softwareVersion);
		softwareDetailsRepo.save(softwareDetails);
	}
	

	

}
