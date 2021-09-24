/**
 * 
 */
package com.poc.orderapi.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Data
@AllArgsConstructor
public class AuthResponse {

	private String token;
	private String id;
	private String username;
	private String email;
	private List<String> roles;
}
