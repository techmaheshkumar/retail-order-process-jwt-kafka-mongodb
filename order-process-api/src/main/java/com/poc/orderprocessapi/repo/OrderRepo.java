/**
 * 
 */
package com.poc.orderprocessapi.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.poc.orderprocessapi.model.Order;

/**
 * @author maheshkumar sellamuthu
 *
 */
@Repository
public interface OrderRepo extends MongoRepository<Order, String> {

}
