package com.edcolco.chickenCounter.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edcolco.chickenCounter.response.AuthResponse;
import com.edcolco.chickenCounter.services.TokenService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api")
public class AuthController {
	private final TokenService tokenService;

	@PostMapping("token")
	public AuthResponse token(Authentication authentication) {
		return tokenService.getToken(authentication);
	}
}
