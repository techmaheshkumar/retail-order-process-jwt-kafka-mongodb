/**
 * 
 */
package com.poc.orderapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poc.orderapi.dto.Response;
import com.poc.orderapi.model.Product;
import com.poc.orderapi.service.ProductService;
import com.poc.orderapi.util.Constants;

/**
 * @author maheshkumarsellamuthu
 *
 */

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

	@Autowired
	private ProductService productService;

	@GetMapping
	public Response<List<Product>> get() {
		return new Response<List<Product>>(HttpStatus.OK.value(), Constants.SUCCESS, productService.getAll());
	}

}
