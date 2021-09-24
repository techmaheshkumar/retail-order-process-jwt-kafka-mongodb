/**
 * 
 */
package com.poc.orderapi.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.poc.orderapi.model.Order;

/**
 * @author maheshkumar sellamuthu
 *
 */
@Repository
public interface OrderRepo extends MongoRepository<Order, String> {

	List<Order> findByUserId(String userId);

}
