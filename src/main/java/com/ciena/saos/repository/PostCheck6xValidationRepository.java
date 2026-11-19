package com.ciena.saos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.PostCheck6xValidation;

@Repository("postCheck6xValidationRepository")
public interface PostCheck6xValidationRepository extends JpaRepository<PostCheck6xValidation, Long> {

	PostCheck6xValidation findTopByNodeDetailIdOrderByPostCheckIdDesc(Long postCheckId);
}
