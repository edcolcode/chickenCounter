package com.edcolco.chickenCounter.repository;

import org.springframework.data.repository.CrudRepository;

import com.edcolco.chickenCounter.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
	User findByUsername(String username);
	
	User findByRoles(String role);
}
	