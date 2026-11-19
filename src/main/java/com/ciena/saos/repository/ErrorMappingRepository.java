package com.ciena.saos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.ErrorMapping;

@Repository("errorMappingRepository")
public interface ErrorMappingRepository extends JpaRepository<ErrorMapping, Integer> {

}
