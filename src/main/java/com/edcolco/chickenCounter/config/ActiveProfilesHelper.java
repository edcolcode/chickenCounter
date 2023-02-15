package com.edcolco.chickenCounter.config;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ActiveProfilesHelper {
	@Value("${spring.profiles.active:}")
	private String activeProfiles;

	@Bean
	public Set<String> activeProfilesSet() {
		return new HashSet<>(Arrays.asList(activeProfiles.split(",")));
	}
}
