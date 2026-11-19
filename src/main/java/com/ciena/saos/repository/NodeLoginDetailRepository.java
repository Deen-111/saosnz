package com.ciena.saos.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ciena.saos.entity.NodeLoginDetail;

public interface NodeLoginDetailRepository extends JpaRepository<NodeLoginDetail,Long> {
	
    Page<NodeLoginDetail> findAllByCreatedBy(Pageable pageable, String createdBy);
    
    List<NodeLoginDetail> findAllByCreatedBy(Sort nodeLoginDetailId, String createdBy);

    List<NodeLoginDetail> findByNodeNameAndCreatedBy(String nodeName, String createdBy);

    List<NodeLoginDetail> findByRingIdAndCreatedBy(String ringId, String createdBy);

    @Query(value = "SELECT cmd_output_file FROM node_login_detail WHERE id=:id", nativeQuery = true)
    String findRunCommandsFilePathById(String id);
    
    @Query(value = "SELECT DISTINCT ring_id FROM node_login_detail where created_by=:createdBy", nativeQuery = true)
	List<String> findDistinctRings(String createdBy);

	@Query(value = "SELECT DISTINCT node_name FROM node_login_detail where created_by=:createdBy", nativeQuery = true)
	List<String> findDistinctNeIds(String createdBy);
}
