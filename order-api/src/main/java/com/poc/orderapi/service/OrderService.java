package com.poc.orderapi.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poc.orderapi.model.Order;

@Service
public interface OrderService {

	Order create(Order order);

	List<Order> get(String userId);
}
