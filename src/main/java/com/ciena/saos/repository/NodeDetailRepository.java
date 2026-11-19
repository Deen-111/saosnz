package com.ciena.saos.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.NodeDetail;

@Repository("nodeDetailRepository")
public interface NodeDetailRepository extends JpaRepository<NodeDetail, Long> {

	List<NodeDetail> findAllByCreatedBy(Sort sort, String createdBy);

	Page<NodeDetail> findAllByCreatedBy(Pageable pageable, String createdBy);

	Page<NodeDetail> findAllByInstallationStatusAndCreatedBy(Pageable pageable, String installationStatus,
			String createdBy);

	Page<NodeDetail> findAllByDownloadStatusAndCreatedByAndPreCheckStatusIn(Pageable pageable, String downloadStatus,
			String createdBy, List<String> preCheckStatus);

	List<NodeDetail> findAllByRingIdAndCreatedByAndPreCheckStatusIn(String ringId, String createdBy,
			List<String> preCheckStatus);

	List<NodeDetail> findAllByRingIdAndCreatedByAndInstallationStatus(String ringId, String createdBy,
			String installationStatus);

	List<NodeDetail> findAllByRingIdAndCreatedByAndDownloadStatusAndPreCheckStatusIn(String ringId, String createdBy,
			String downloadStatus, List<String> preCheckStatus);

	List<NodeDetail> findAllByNeIdAndCreatedByAndPreCheckStatusIn(String nodeName, String createdBy,
			List<String> preCheckStatus);

	List<NodeDetail> findAllByNeIdAndCreatedByAndInstallationStatus(String nodeName, String createdBy,
			String installationStatus);

	List<NodeDetail> findAllByNeIdAndCreatedByAndDownloadStatusAndPreCheckStatusIn(String nodeName, String createdBy,
			String downloadStatus, List<String> preCheckStatus);

	List<NodeDetail> findByRingIdAndCreatedBy(String ringId, String createdBy);

	List<NodeDetail> findByNeIdAndCreatedBy(String nodeName, String createdBy);

	@Query(value = "SELECT DISTINCT ring_id FROM node_details where created_by=:createdBy", nativeQuery = true)
	List<String> findDistinctRings(String createdBy);

	@Query(value = "SELECT DISTINCT ne_id FROM node_details where created_by=:createdBy", nativeQuery = true)
	List<String> findDistinctNeIds(String createdBy);

	Boolean existsByCircleAndRingIdAndNeId(String circle, String ringId, String neId);

	@Query(value = "SELECT pre_check_output_file FROM node_details WHERE id=:id", nativeQuery = true)
	String findPreCheckFilePathById(String id);

	@Query(value = "SELECT post_check_output_file FROM node_details WHERE id=:id", nativeQuery = true)
	String findPostCheckFilePathById(String id);

}
