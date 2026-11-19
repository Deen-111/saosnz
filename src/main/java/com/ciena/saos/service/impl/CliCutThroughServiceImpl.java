package com.ciena.saos.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ciena.saos.constants.Constants;
import com.ciena.saos.dto.IdDTO;
import com.ciena.saos.dto.NodeLoginDetailDto;
import com.ciena.saos.entity.NodeLoginDetail;
import com.ciena.saos.repository.NodeLoginDetailRepository;
import com.ciena.saos.service.CliCutThroughService;
import com.ciena.saos.util.ZipDirUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CliCutThroughServiceImpl implements CliCutThroughService {


	private final NodeLoginDetailRepository nodeLoginDetailRepo;


	private final WebClientServiceImpl webClientServiceImpl;

	private final ZipDirUtils zipDirUtils;

//	@Autowired
//	Map<Integer, String> errorMap;
	private final Map<Integer, String> errorMap;

	@Value("${common.file.path}")
	String commonFilePath;

	@Value("${commands.file.path}")
	String commandsFilePath;

	@Value("${execute.command.api.url}")
	String executeCommandsApiUrl;

	@Override
	public List<String> getDistinctRings(String createdBy) {
		return nodeLoginDetailRepo.findDistinctRings(createdBy);
	}

	@Override
	public List<String> getDistinctNodeNames(String createdBy) {
		return nodeLoginDetailRepo.findDistinctNeIds(createdBy);
	}


@Override
public NodeLoginDetailDto getNodeLoginDetails(String page, String size) {

	Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size),
			Sort.by(Sort.Direction.DESC, "nodeLoginDetailId")
	);
	Page<NodeLoginDetail> nodeLoginDetailPage = nodeLoginDetailRepo.findAll(pageable);
	List<NodeLoginDetail> nodeDetailsList =
			nodeLoginDetailPage.getContent();
	return new NodeLoginDetailDto(nodeDetailsList, nodeLoginDetailPage.isLast());
}



@Override
public NodeLoginDetailDto getNodeLoginDetails(String createdBy) {

	List<NodeLoginDetail> nodeLoginDetailList = nodeLoginDetailRepo.findAllByCreatedBy(
					Sort.by(Sort.Direction.DESC, "nodeLoginDetailId"), createdBy);

	return new NodeLoginDetailDto(nodeLoginDetailList, false);
}


@Override
public NodeLoginDetailDto getNodeLoginDetails(String page, String size, String createdBy) {

	Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size),
			Sort.by(Sort.Direction.DESC, "nodeLoginDetailId"));
	Page<NodeLoginDetail> nodeLoginDetailPage = nodeLoginDetailRepo.findAllByCreatedBy(pageable, createdBy);
	List<NodeLoginDetail> nodeLoginDetailList = nodeLoginDetailPage.getContent();

	return new NodeLoginDetailDto(nodeLoginDetailList, nodeLoginDetailPage.isLast()
	);
}


@Override
public NodeLoginDetailDto getNodeLoginDetailByNodeName(String nodeName, String createdBy) {

	List<NodeLoginDetail> nodeLoginDetailList = nodeLoginDetailRepo.findByNodeNameAndCreatedBy(nodeName, createdBy);
	return new NodeLoginDetailDto(nodeLoginDetailList, false
	);
}


@Override
public NodeLoginDetailDto getNodeLoginDetailsByRingId(String ringId, String createdBy) {
	List<NodeLoginDetail> nodeLoginDetailList = nodeLoginDetailRepo.findByRingIdAndCreatedBy(ringId, createdBy);
	return new NodeLoginDetailDto(nodeLoginDetailList, false);
}

	@Override
	@Transactional
	public String executeCommands(IdDTO idDTO, String createdBy) {
		List<NodeLoginDetail> nodeLoginDetailList = nodeLoginDetailRepo.findAllById(idDTO.getIds());
		nodeLoginDetailList.forEach(s -> {
			s.setStatus(Constants.STATUS_IN_PROGRESS);
			s.setCmdOutputFile("");
		});
		idDTO.setUser(createdBy);
		webClientServiceImpl.startRunCommandsService(executeCommandsApiUrl, idDTO, "status");

		return "Request initiated";
	}

	@Override
	public void downloadCommandsOutputFile(HttpServletRequest request, HttpServletResponse response,
			String nodeLoginDetailId) {
		try {
			String runCommandsFilePath = nodeLoginDetailRepo.findRunCommandsFilePathById(nodeLoginDetailId);
			String filePath = commonFilePath + runCommandsFilePath;
			zipDirUtils.downloadCmdOutputFile(request, response, filePath);
		} catch (Exception e) {
			log.error("Error while downloading Pre Check Command Output File: ", e);
		}

	}

	@Override
	public String uploadCommandsFile(MultipartFile file) {
		try {
			file.transferTo(new File(commandsFilePath + "cli.txt"));
			return "File uploaded successfully";
		} catch (IOException e) {
			e.printStackTrace();
			return "File upload failed:" + e.getMessage();
		}
	}

	@Override
	public NodeLoginDetailDto saveNodeLoginDetails(List<NodeLoginDetail> nodeLoginDetails, String name) {
		List<NodeLoginDetail> statusList = new ArrayList<>();
		for (NodeLoginDetail nodeLoginDetail : nodeLoginDetails) {
			nodeLoginDetail.setCreatedBy(name);
			try {
				nodeLoginDetailRepo.save(nodeLoginDetail);


				nodeLoginDetail.setUploadStatus(Constants.MSG_ADDED_SUCCESSFULLY);
				statusList.add(nodeLoginDetail);
				 } catch (ConstraintViolationException e) { String error =
				  e.getConstraintViolations().stream().map(ConstraintViolation::getMessage)
				 .collect(Collectors.joining(",")); nodeLoginDetail.setUploadStatus(error);
				  statusList.add(nodeLoginDetail);
			} catch (Exception e) {
				log.error("NODE PRESENT");
				nodeLoginDetail.setUploadStatus(Constants.MSG_RECORD_ALREADY_PRESENT);
				statusList.add(nodeLoginDetail);
			}
		}

		return new NodeLoginDetailDto(statusList, false);
	}

	@Override
	@Transactional
	public String deleteRunCommandsDetails(IdDTO idDTO) {
		List<Long> nodeLoginDetailId = idDTO.getIds();
		nodeLoginDetailRepo.deleteAllByIdInBatch(nodeLoginDetailId);
		return "Record deleted Successfully";
	}

	@Override
	public List<String> getCliCommands() {

		String filePath = commandsFilePath + "cli.txt";

		List<String> content = new ArrayList<>();
		try (BufferedReader br = new BufferedReader((new FileReader(filePath)))) {
			String line;
			while ((line = br.readLine()) != null) {
				content.add(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return content;
	}

}
