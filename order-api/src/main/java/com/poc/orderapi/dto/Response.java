/**
 * 
 */
package com.poc.orderapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author maheshkumar sellamuthu
 *
 */
@Data
@AllArgsConstructor
public class Response<T> {

	private int status;
	private String message;
	private T data;
}
