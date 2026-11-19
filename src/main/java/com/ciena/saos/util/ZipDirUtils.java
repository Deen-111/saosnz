package com.ciena.saos.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ciena.saos.constants.Constants;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ZipDirUtils {
	final static Logger logger = LoggerFactory.getLogger(ZipDirUtils.class);

	List<String> filesListInDir = new ArrayList<>();

	public void downloadCmdOutputFile(HttpServletRequest request, HttpServletResponse response, String cmdFilePath)
			throws IOException {
		ServletContext context = request.getServletContext();

		// construct the complete absolute path of the file
		File downloadFile = new File(cmdFilePath);
		try (FileInputStream inputStream = new FileInputStream(downloadFile)) {

			// get MIME type of the file
			String mimeType = context.getMimeType(cmdFilePath);
			if (mimeType == null) {
				// set to binary type if MIME mapping not found
				mimeType = "application/octet-stream";
			}
			log.info("MIME type: " + mimeType);

			// set content attributes for the response
			response.setContentType(mimeType);
			response.setContentLength((int) downloadFile.length());

			// set headers for the response
			String headerKey = "Content-Disposition";
			String headerValue = String.format("attachment; filename=\"%s\"", downloadFile.getName());
			response.setHeader(headerKey, headerValue);

			// get output stream of the response
			try (OutputStream outStream = response.getOutputStream()) {

				byte[] buffer = new byte[Constants.BUFFER_SIZE];
				int bytesRead = -1;

				// write bytes read from the input stream into the output stream
				while ((bytesRead = inputStream.read(buffer)) != -1) {
					outStream.write(buffer, 0, bytesRead);
				}
			}
		}
	}
	
	public void unzipAll(String zipFilePath, String destDir) throws IOException {
        File destDirectory = new File(destDir);
        if (!destDirectory.exists()) {
            destDirectory.mkdirs();
        }

        // Start recursive extraction
        try {
            extractZipContents(zipFilePath, destDir);
            System.out.println("Extraction completed successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void extractZipContents(String zipFilePath, String destDir) throws IOException {
        // Create directory for current ZIP file
        String zipFileName = new File(zipFilePath).getName();
        String destSubDir = destDir + File.separator + zipFileName.substring(0, zipFileName.lastIndexOf('.'));
        new File(destSubDir).mkdirs();

        try (ZipFile zipFile = new ZipFile(zipFilePath)) {
            zipFile.stream()
                    .forEach(entry -> {
                        try {
                            String entryName = entry.getName();
                            String filePath = destSubDir + File.separator + entryName;

                            // If entry is a directory, create it
                            if (entry.isDirectory()) {
                                new File(filePath).mkdirs();
                            } else {
                                // If entry is a file, extract it
                                try (InputStream inputStream = zipFile.getInputStream(entry);
                                     FileOutputStream outputStream = new FileOutputStream(filePath)) {

                                    byte[] buffer = new byte[1024];
                                    int length;
                                    while ((length = inputStream.read(buffer)) > 0) {
                                        outputStream.write(buffer, 0, length);
                                    }
                                }
                            }

                            // Check if the extracted file is a ZIP file and recursively extract it
                            if (entryName.toLowerCase().endsWith(".zip")) {
                                extractZipContents(filePath, filePath.substring(0, filePath.lastIndexOf('.')));
                            }

                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        } catch (ZipException e) {
            // Handle specific ZipException, e.g., invalid LOC header (bad signature)
            e.printStackTrace();
            // Optionally, you can log the specific file causing the issue
            System.err.println("Error extracting file: " + zipFilePath);
        }
    }
}