/**
 * 
 */
package com.poc.orderapi.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.poc.orderapi.model.User;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Repository
public interface UserRepo extends MongoRepository<User, String> {

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

}
