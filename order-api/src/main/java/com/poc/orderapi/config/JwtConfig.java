/**
 * 
 */
package com.poc.orderapi.config;

import java.io.Serializable;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.poc.orderapi.model.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

/**
 * @author maheshkumar sellamuthu
 *
 */

@Component
public class JwtConfig implements Serializable {

	private static final Logger logger = LoggerFactory.getLogger(JwtConfig.class);

	private static final long serialVersionUID = -6172619169813455738L;

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration.ms}")
	private String expirationMS;

	public String generateToken(Authentication authentication) {

		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		Date exp = new Date(System.currentTimeMillis() + Long.valueOf(expirationMS));

		return "Bearer ".concat(Jwts.builder().setSubject((userPrincipal.getUsername())).setIssuedAt(new Date())
				.setExpiration(exp).signWith(SignatureAlgorithm.HS512, secret).compact());
	}

	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException
				| IllegalArgumentException ex) {
			logger.error("Exception in validateToken(): {}", ex.getMessage());
		}
		return false;
	}

	public String getUserNameFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
	}

}
