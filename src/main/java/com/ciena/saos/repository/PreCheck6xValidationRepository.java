package com.ciena.saos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.PreCheck6xValidation;

@Repository("preCheck6xValidationRepository")
public interface PreCheck6xValidationRepository extends JpaRepository<PreCheck6xValidation, Long> {

	PreCheck6xValidation findTopByNodeDetailIdOrderByPreCheckIdDesc(Long nodeDetailId);
}
