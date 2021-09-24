/**
 * 
 */
package com.poc.orderprocessapi.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poc.orderprocessapi.model.Order;
import com.poc.orderprocessapi.model.OrderStatusEnum;
import com.poc.orderprocessapi.repo.OrderRepo;
import com.poc.orderprocessapi.service.util.Constants;

/**
 * @author maheshkumar sellamuthu
 *
 */
@Service
public class KafKaConsumerServiceImpl {

	@Autowired
	private OrderRepo orderRepo;

	private final Logger logger = LoggerFactory.getLogger(KafKaConsumerServiceImpl.class);

	@KafkaListener(topics = Constants.TOPIC_NAME, groupId = Constants.GROUP_ID)
	public void consume(String message) {
		logger.info(String.format("Message recieved -> %s", message));
		Order order = new Order();
		try {
			order = new ObjectMapper().readValue(message, Order.class);
		} catch (JsonProcessingException ex) {
			logger.error("Exception consume():", ex.getMessage());
		}
		order.setStatus(OrderStatusEnum.PROCESSED);
		orderRepo.save(order);
	}
}
