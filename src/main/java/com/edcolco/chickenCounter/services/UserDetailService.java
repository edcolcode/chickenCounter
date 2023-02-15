package com.edcolco.chickenCounter.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.edcolco.chickenCounter.models.User;
import com.edcolco.chickenCounter.models.UserSecurity;
import com.edcolco.chickenCounter.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserDetailService implements UserDetailsService {

	private final UserRepository userRepository;

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		final User user = userRepository.findByUsername(username);
		
		if (user != null) {
			return new UserSecurity(user);
		}
		
		throw new UsernameNotFoundException("User '" + username + "' not found");
	}
}
