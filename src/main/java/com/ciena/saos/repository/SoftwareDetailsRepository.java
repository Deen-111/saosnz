package com.ciena.saos.repository;

import com.ciena.saos.entity.SoftwareDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoftwareDetailsRepository extends JpaRepository<SoftwareDetails,Long> {
	
	@Query(value = "SELECT software_version FROM software_details WHERE type_group=:typeGroup", nativeQuery = true)
	
	List<String> findSoftwareVersionByTypeGroup(String typeGroup);
}
