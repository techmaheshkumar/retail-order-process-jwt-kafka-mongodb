/**
 * 
 */
package com.poc.orderprocessapi.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.ToString;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Document(collection = "order")
@Data
@ToString
public class Order implements Serializable {

	private static final long serialVersionUID = -6179984297487676337L;

	@Id
	private String id;

	private Double totalPrice;

	private String userId;

	private OrderStatusEnum status;

	private Set<OrderItem> orderItems = new HashSet<>();

}
