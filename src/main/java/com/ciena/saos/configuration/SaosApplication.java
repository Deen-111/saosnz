package com.ciena.saos.configuration;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.reactive.function.client.WebClient;

import com.ciena.saos.entity.ErrorMapping;
import com.ciena.saos.repository.ErrorMappingRepository;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass = true)
@ComponentScan(basePackages = "com.ciena.saos.*")
@EnableTransactionManagement
@EnableJpaRepositories("com.ciena.saos.repository")
@EntityScan("com.ciena.saos.entity")
@EnableAsync
@Slf4j
@RequiredArgsConstructor
public class SaosApplication extends SpringBootServletInitializer implements CommandLineRunner {

//	@Autowired
//	ErrorMappingRepository errorMappingRepository;
	private final ErrorMappingRepository errorMappingRepository;


	@Value("${software.file.path}")
	String softwareFilePath;
	
	@Value("${software.file6x.path}")
	String softwareFile6xPath;

	@Value("${commands.file.path}")
	String commandFilePath;

	public static void main(String[] args) {
		SpringApplication.run(SaosApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		List<String> folderPathList = new ArrayList<>();
		folderPathList.add(softwareFilePath);
		folderPathList.add(softwareFile6xPath);
		folderPathList.add(commandFilePath);

		for (String folderPath : folderPathList) {

			// Create a File object representing the folder
			File folder = new File(folderPath);
			

			// Check if the folder does not exist
			if (!folder.exists()) {
				// Create the folder
				boolean created = folder.mkdirs(); // mkdirs() creates parent directories if not exist

				if (created) {
					log.info("Folder created successfully: " + folder.getAbsolutePath());
				} else {
					log.error("Failed to create folder: " + folder.getAbsolutePath());
				}
			} else {
				log.info("Folder already exists: " + folder.getAbsolutePath());
			}
		}
	}

	@Bean
	public VelocityEngine getVelocityEngine() {
		VelocityEngine velocityEngine = new VelocityEngine();
		velocityEngine.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
		velocityEngine.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
		velocityEngine.init();

		return velocityEngine;
	}

	@Bean
	public WebClient getWebClientBuilder(WebClient.Builder webClientBuilder) {
		return webClientBuilder.defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();
	}


	@Bean
	public Map<Integer, String> loadErrorMapping() {
		return errorMappingRepository.findAll().stream()
				.collect(Collectors.toMap(ErrorMapping::getErrorCode, ErrorMapping::getErrorMessage));
	}

}
