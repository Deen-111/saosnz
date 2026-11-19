package com.ciena.saos.service.impl;

import java.lang.reflect.Field;
import java.util.List;

import com.ciena.saos.repository.PreCheck6xValidationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ciena.saos.constants.Constants;
import com.ciena.saos.dto.IdDTO;
import com.ciena.saos.entity.NodeLoginDetail;
import com.ciena.saos.entity.NodeDetail;
import com.ciena.saos.repository.NodeDetailRepository;
import com.ciena.saos.repository.NodeLoginDetailRepository;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class WebClientServiceImpl {


    private final NodeDetailRepository nodeDetailRepository;


	private final NodeLoginDetailRepository nodeLoginDetailRepo;

	private final WebClient webClient;

	@Async
	public void startService(String apiUrl, IdDTO idDTO, String statusField) {
		try {
			String response = webClient.post()
					.uri(apiUrl)
					.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
					.body(Mono.just(idDTO), IdDTO.class)
					.retrieve()
					.bodyToMono(String.class)
					.block();

			log.debug("Response from Job API: {}", response);

		} catch (Exception e) {

			log.warn("API is not working", e);

			List<NodeDetail> nodeDetailList = nodeDetailRepository.findAllById(idDTO.getIds());

			nodeDetailList.forEach(s -> {
				try {
					Field status = NodeDetail.class.getDeclaredField(statusField);
					status.setAccessible(true);
					status.set(s, Constants.STATUS_FAILED);

				} catch (Exception ex) {
					log.error("Error setting status field", ex);
				}
			});

			nodeDetailRepository.saveAll(nodeDetailList);
		}
	}

	@Async
	public void startRunCommandsService(String runCommandsApiUrl, IdDTO idDTO, String statusField) {
		try {
			String response = webClient.post().uri(runCommandsApiUrl)
					.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
					.body(Mono.just(idDTO), IdDTO.class).retrieve().bodyToMono(String.class).block();
			log.debug("Response from Job API: " + response);
		} catch (Exception e) {
			log.warn("API is not working");
			List<NodeLoginDetail> nodeLoginDetailList = nodeLoginDetailRepo.findAllById(idDTO.getIds());
			nodeLoginDetailList.forEach(s -> {
				try {
					Field status = NodeLoginDetail.class.getDeclaredField(statusField);
					status.setAccessible(true);
					status.set(s, Constants.STATUS_FAILED);
				} catch (Exception ex) {
					log.error("Error setting status field", ex);
				}
			});
			nodeLoginDetailRepo.saveAll(nodeLoginDetailList);
		}
	}
}
