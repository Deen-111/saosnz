package com.ciena.saos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.PostCheckValidation;

@Repository("postCheckValidationRepository")
public interface PostCheckValidationRepository extends JpaRepository<PostCheckValidation, Long> {

	PostCheckValidation findTopByNodeDetailIdOrderByPostCheckIdDesc(Long postCheckId);
}
