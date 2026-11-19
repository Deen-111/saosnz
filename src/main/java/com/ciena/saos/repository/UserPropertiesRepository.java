package com.ciena.saos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.UserProperty;

@Repository("userPropertiesRepository")
public interface UserPropertiesRepository extends JpaRepository<UserProperty, Long> {

}
