/**
 * 
 */
package com.poc.orderapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.orderapi.dto.Response;
import com.poc.orderapi.model.Order;
import com.poc.orderapi.service.OrderService;
import com.poc.orderapi.util.Constants;

/**
 * @author maheshkumar sellamuthu
 *
 */

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping
	public Response<Order> create(@RequestBody Order order) {
		return new Response<Order>(HttpStatus.CREATED.value(), Constants.SUCCESS, orderService.create(order));
	}

	@GetMapping("/{userId}")
	public Response<List<Order>> get(@PathVariable String userId) {
		return new Response<List<Order>>(HttpStatus.OK.value(), Constants.SUCCESS, orderService.get(userId));
	}

}
