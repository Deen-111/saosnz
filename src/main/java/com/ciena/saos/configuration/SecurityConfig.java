//package com.ciena.saos.configuration;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//	// @formatter:off
//	private static final String[] SWAGGER_WHITELIST = {
//            "/swagger-ui.html",
//            "/v3/api-docs/**",
//            "/swagger-ui/**",
//            "/actuator/**"
//	};
//
//	private static final String[] ACCESS_WHITELIST = {
//            "/user-management"
//	};
//
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
//		httpSecurity
//		.authorizeRequests()
//		.antMatchers(SWAGGER_WHITELIST).permitAll()
//		.antMatchers(ACCESS_WHITELIST).hasAuthority("ROLE_ADMIN")
//		.antMatchers("/**").authenticated()
//		.and()
//		.csrf().disable()
//		.formLogin()
//		.loginPage("/login").permitAll()
//		.defaultSuccessUrl("/software-upgradation", true)
//		.failureUrl("/login?error")
//		.and()
//		.logout().logoutSuccessUrl("/login?logout").permitAll()
//		.and()
//		.sessionManagement().invalidSessionUrl("/login?invalid-session")
//		.and()
//		.exceptionHandling().accessDeniedPage("/access-denied");
//
//		return httpSecurity.build();
//	}
//	// @formatter:on
//
//	@Bean
//	public WebSecurityCustomizer webSecurityCustomizer() {
//		return web -> web.ignoring().antMatchers("/static/**");
//	}
//
//	@Bean
//	public PasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//}



package com.ciena.saos.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	private static final String[] SWAGGER_WHITELIST = {
			"/swagger-ui.html",
			"/v3/api-docs/**",
			"/swagger-ui/**",
			"/actuator/**"
	};

	private static final String[] ACCESS_WHITELIST = {
			"/user-management"
	};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(
								"/login",
								"/login**",
								"/css/**",
								"/js/**",
								"/images/**",
								"/webjars/**"
						).permitAll()
						.requestMatchers(SWAGGER_WHITELIST).permitAll()
						.requestMatchers(ACCESS_WHITELIST).hasAuthority("ROLE_ADMIN")
						.anyRequest().authenticated()
				)
				.csrf(csrf -> csrf.disable())
				.formLogin(form -> form
						.loginPage("/login")
						.permitAll()
						.defaultSuccessUrl("/software-upgradation", true)
						.failureUrl("/login?error")
				)
				.logout(logout -> logout
						.logoutSuccessUrl("/login?logout")
						.permitAll()
				)
				.sessionManagement(session -> session
						.invalidSessionUrl("/login?invalid-session")
				)
				.exceptionHandling(exception -> exception
						.accessDeniedPage("/access-denied")
				);

		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return web -> web.ignoring()
				.requestMatchers("/static/**");
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}