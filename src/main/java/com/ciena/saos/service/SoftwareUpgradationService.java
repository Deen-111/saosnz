package com.ciena.saos.service;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.ciena.saos.entity.*;
import org.springframework.web.multipart.MultipartFile;

import com.ciena.saos.dto.IdDTO;
import com.ciena.saos.dto.NodeDetailDTO;
import com.ciena.saos.dto.UpdateSoftwareVersionDTO;

public interface SoftwareUpgradationService {

	public NodeDetailDTO getNodeDetails(String createdBy);

	public List<String> getDistinctRings(String createdBy);

	public List<String> getDistinctNodeNames(String createdBy);

	public NodeDetailDTO getNodeDetails(String page, String size);

	public NodeDetailDTO getNodeDetails(String state, String page, String size, String createdBy);

	public NodeDetailDTO getNodeDetailByRingId(String state, String ringId, String createdBy);

	public NodeDetailDTO getNodeDetailByNodeName(String state, String nodeName, String createdBy);

	public NodeDetailDTO saveNodeDetails(List<NodeDetail> nodeDetails, String createdBy);

	public String deleteNodeDetails(IdDTO idDTO);

	public PreCheckValidation getPreCheckValidations(String nodeDetailId);

	public PostCheckValidation getPostCheckValidations(String nodeDetailId);

	public PreCheck6xValidation getPreCheck6xValidations(String nodeDetailId);

	public PostCheck6xValidation getPostCheck6xValidations(String nodeDetailId);

	public void downloadOutputFile(HttpServletRequest request, HttpServletResponse response,
			String nodeDetailId, String state);
	
	public String executeUpgradation(IdDTO idDTO, String user,String state);

    public String uploadSoftwareFile(MultipartFile file, String state);   //10J

	void updateNodeDetails(UpdateSoftwareVersionDTO softwareDTO);
	
	List<String> getSoftwareVersions(String typeGroup);
	
}
