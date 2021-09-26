/**
 * 
 */
package com.poc.orderapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poc.orderapi.model.Product;
import com.poc.orderapi.repo.ProductRepo;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepo productRepo;

	@Override
	public List<Product> getAll() {
		return productRepo.findAll();
	}

}
