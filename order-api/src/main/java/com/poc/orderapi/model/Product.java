/**
 * 
 */
package com.poc.orderapi.model;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Document(collection = "product")
@Data
public class Product implements Serializable {

	private static final long serialVersionUID = 69666569932697853L;

	@Id
	private String id;

	private String name;

	private String imagePath;

	private double price;

	private String description;
}
