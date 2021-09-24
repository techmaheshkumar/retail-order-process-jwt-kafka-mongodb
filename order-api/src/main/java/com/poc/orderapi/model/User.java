/**
 * 
 */
package com.poc.orderapi.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author MaheshKumar Sellamuthu
 *
 */

@Document(collection = "user")
@Data
@NoArgsConstructor
public class User implements Serializable {

	private static final long serialVersionUID = 6960808210799068342L;

	@Id
	private String id;

	private String username;

	private String email;

	private String password;

	@DBRef
	private Set<Role> roles = new HashSet<>();

	/**
	 * @param username
	 * @param email
	 * @param password
	 */
	public User(String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}

	/**
	 * @param username
	 * @param email
	 * @param roles
	 */
	public User(String username, String email, Set<Role> roles) {
		super();
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

}
