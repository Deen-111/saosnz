package com.ciena.saos.service.impl;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ciena.saos.entity.UserManagement;
import com.ciena.saos.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

//	@Autowired
//	UserRepository userRepository;
	private final UserRepository userRepository;



	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		UserManagement userDetails = userRepository.findByUserNameAndStatus(username, "Active")
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found"));

		List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();
		if (userDetails.getRole().equals("Admin")) {
			logger.info("Admin logged in.");
			SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_ADMIN");
			simpleGrantedAuthorities.add(simpleGrantedAuthority);
		} else {
			logger.info("User logged in.");
			SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
			simpleGrantedAuthorities.add(simpleGrantedAuthority);
		}

		logger.info("Encoded password using Bcrypt: " + passwordEncoder.encode(userDetails.getUserPwd()));

		User user = new User(userDetails.getUserName(), userDetails.getUserPwd(), simpleGrantedAuthorities);

		return user;
	}

	public List<UserManagement> getUsersData() {
		return userRepository.findAll();
	}

	@Transactional
	public void updateUserData(UserManagement user) {
		UserManagement userDb = userRepository.findById(user.getId()).get();
		userDb.setEmail(user.getEmail());
		userDb.setStatus(user.getStatus());
		userDb.setRole(user.getRole());

//		userRepository.save(user);
	}

	public String deleteUser(String userId) {
		userRepository.deleteById(Long.parseLong(userId));
		return "Record deleted Successfully";
	}

	public String createUser(UserManagement user) {
		Boolean message = userRepository.existsByUserName(user.getUserName());

		if (message) {
			return "User Already Exist";
		} else {
			user.setUserPwd(passwordEncoder.encode(user.getUserPwd()));
			userRepository.save(user);
			return "User Added Sucessfully";
		}

	}

	@Transactional
	public void updateUserPassword(String userName, String userPwd) {
		UserManagement userDb = userRepository.findByUserName(userName).get();
		userDb.setUserPwd(passwordEncoder.encode(userPwd));
	}

	public UserManagement getUserByUserName(String userName) {
		UserManagement user = userRepository.findByUserName(userName).get();
		return user;
	}

}
