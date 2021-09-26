/**
 * 
 */
package com.poc.orderapi.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.poc.orderapi.model.Product;

/**
 * @author maheshkumar sellamuthu
 *
 */
@Repository
public interface ProductRepo extends MongoRepository<Product, String> {
}
