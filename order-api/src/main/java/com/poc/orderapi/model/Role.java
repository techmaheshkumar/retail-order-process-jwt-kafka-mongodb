/**
 * 
 */
package com.poc.orderapi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Document(collection = "role")
@Data
public class Role {

	@Id
	private String id;

	private RoleEnum name;

}
