/**
 * 
 */
package com.poc.orderapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poc.orderapi.model.Order;
import com.poc.orderapi.model.OrderStatusEnum;
import com.poc.orderapi.repo.OrderRepo;

/**
 * @author MaheshKumar Sellamuthu
 *
 */

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepo orderRepo;

	@Autowired
	private KafkaPublishServiceImpl kafkaService;

	@Override
	@Transactional
	public Order create(Order order) {
		order.setStatus(OrderStatusEnum.PLACED);
		order = orderRepo.insert(order);
		try {
			kafkaService.sendMessage(new ObjectMapper().writeValueAsString(order));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return order;
	}

	@Override
	public List<Order> get(String userId) {
		List<Order> orders = orderRepo.findByUserId(userId);
		return orders;
	}

}
