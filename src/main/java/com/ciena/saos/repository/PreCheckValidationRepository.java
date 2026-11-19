package com.ciena.saos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.PreCheckValidation;

@Repository("preCheckValidationRepository")
public interface PreCheckValidationRepository extends JpaRepository<PreCheckValidation, Long> {

	PreCheckValidation findTopByNodeDetailIdOrderByPreCheckIdDesc(Long nodeDetailId);
}
