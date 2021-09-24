/**
 * 
 */
package com.poc.orderapi.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

/**
 * @author maheshkumar sellamuthu
 *
 */
@Service
public class KafkaPublishServiceImpl {

	private static final Logger logger = LoggerFactory.getLogger(KafkaPublishServiceImpl.class);

	@Value("${kafka.topic}")
	private String topicName;

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;

	public void sendMessage(String message) {

		ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send(topicName, message);

		future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {

			@Override
			public void onSuccess(SendResult<String, String> result) {
				logger.info(String.format("Message sent -> %s", message));
			}

			@Override
			public void onFailure(Throwable ex) {
				System.out.println("Unable to send message=[" + message + "] due to : " + ex.getMessage());
			}
		});
	}
}
