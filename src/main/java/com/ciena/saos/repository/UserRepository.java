package com.ciena.saos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ciena.saos.entity.UserManagement;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<UserManagement, Long> {

	Optional<UserManagement> findByUserName(String userName);

	Boolean existsByUserName(String userName);

	Optional<UserManagement> findByUserNameAndStatus(String username, String string);

}
