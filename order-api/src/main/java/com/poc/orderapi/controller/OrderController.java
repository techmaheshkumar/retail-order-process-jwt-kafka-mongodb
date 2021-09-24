/**
 * 
 */
package com.poc.orderapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.orderapi.model.Order;
import com.poc.orderapi.service.OrderService;

/**
 * @author maheshkumar sellamuthu
 *
 */

@RestController
@RequestMapping("/api/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PutMapping
	public Order create(@RequestBody Order order) {
		return orderService.create(order);
	}

	@GetMapping("/{userId}")
	public List<Order> get(@PathVariable String userId) {
		return orderService.get(userId);
	}

}
