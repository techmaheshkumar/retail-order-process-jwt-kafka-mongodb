/**
 * 
 */
package com.poc.orderapi.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.orderapi.config.JwtConfig;
import com.poc.orderapi.dto.AuthResponse;
import com.poc.orderapi.model.Role;
import com.poc.orderapi.model.RoleEnum;
import com.poc.orderapi.model.User;
import com.poc.orderapi.model.UserDetailsImpl;
import com.poc.orderapi.repo.UserRepo;
import com.poc.orderapi.service.RoleRepo;

/**
 * @author maheshkumar sellamuthu
 *
 */

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private RoleRepo roleRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JwtConfig jwtConfig;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtConfig.generateToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(
				new AuthResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
	}

	@PutMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody User signUpRequest) {
		if (userRepo.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body("Error: Username is already taken!");
		}

		if (userRepo.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body("Error: Email is already in use!");
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword()));

		Set<Role> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepo.findByName(RoleEnum.USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role.getName().name()) {
				case "admin":
					Role adminRole = roleRepo.findByName(RoleEnum.ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;

				default:
					Role userRole = roleRepo.findByName(RoleEnum.USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		user.setRoles(roles);
		userRepo.save(user);

		return ResponseEntity.ok("User registered successfully!");
	}

}
