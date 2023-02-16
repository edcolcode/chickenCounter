package com.edcolco.chickenCounter.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.util.Strings;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.edcolco.chickenCounter.response.AuthResponse;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class TokenService {
	private final JwtEncoder encoder;

	public AuthResponse getToken(Authentication authentication) {
		log.info("Token requested for user: '{}'", authentication.getName());
		String token = generateToken(authentication);
		log.info("Token granted: {}", token);

		List<String> roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.toList();

		return AuthResponse.builder().user(authentication.getName()).token(token)
				.roles(Strings.join(roles, ',')).build();
	}

	private String generateToken(Authentication authentication) {
		log.info("Token requested for user: '{}'", authentication.getName());

		Instant now = Instant.now();
		String scope = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(" "));

		JwtClaimsSet claims = JwtClaimsSet.builder().issuer("self").issuedAt(now)
				.expiresAt(now.plus(15, ChronoUnit.MINUTES))
				.subject(authentication.getName()).claim("scope", scope)
				.build();

		return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
	}
}
