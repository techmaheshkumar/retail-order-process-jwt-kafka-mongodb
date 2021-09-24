/**
 * 
 */
package com.poc.orderapi.service;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.poc.orderapi.model.Role;
import com.poc.orderapi.model.RoleEnum;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Repository
public interface RoleRepo extends MongoRepository<Role, String> {

	Optional<Role> findByName(RoleEnum name);

}
