/**
 * 
 */
package com.poc.orderapi.model;

import java.io.Serializable;

import lombok.Data;
import lombok.ToString;

/**
 * @author MaheshKumar Sellamuthu
 *
 */
@Data
@ToString
public class OrderItem implements Serializable {

	private static final long serialVersionUID = 8083757486609161400L;

	private int qty;

	private double price;

	private String productId;
}
