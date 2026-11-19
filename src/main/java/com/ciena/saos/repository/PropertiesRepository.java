package com.ciena.saos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.Property;

import java.util.Optional;


@Repository("propertiesRepository")
public interface PropertiesRepository extends JpaRepository<Property, Long> {

    Optional<Property> findByPropertyName(String propertyName);  //25J N8t
}
