package com.ciena.saos.service;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;

import com.ciena.saos.dto.IdDTO;
import com.ciena.saos.dto.NodeLoginDetailDto;
import com.ciena.saos.entity.NodeLoginDetail;

public interface CliCutThroughService {
	
	List<String> getDistinctRings(String createdBy);
	
	List<String> getDistinctNodeNames(String createdBy);

	NodeLoginDetailDto getNodeLoginDetails(String page, String size);

	NodeLoginDetailDto getNodeLoginDetails(String createdBy);

	NodeLoginDetailDto getNodeLoginDetails(String page, String size, String createdBy);

	NodeLoginDetailDto getNodeLoginDetailByNodeName(String nodeName, String createdBy);

	NodeLoginDetailDto getNodeLoginDetailsByRingId(String ringId, String createdBy);

	String uploadCommandsFile(MultipartFile file);

	NodeLoginDetailDto saveNodeLoginDetails(List<NodeLoginDetail> nodeLoginDetails, String name);

	String executeCommands(IdDTO idDTO, String createdBy);

	void downloadCommandsOutputFile(HttpServletRequest request, HttpServletResponse response,
			String nodeLoginDetailId);

    String deleteRunCommandsDetails(IdDTO idDTO);

	List<String> getCliCommands() ;
}
