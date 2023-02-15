package com.edcolco.chickenCounter;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.edcolco.chickenCounter.models.ChickenCount;
import com.edcolco.chickenCounter.models.User;
import com.edcolco.chickenCounter.repository.ChickenCounterRepository;
import com.edcolco.chickenCounter.repository.UserRepository;
import com.edcolco.chickenCounter.util.Constants;

@Configuration
public class DataIngest {

	@Value("${chickenCount.master.password}")
	private String masterPassword;

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final ChickenCounterRepository chickenCounterRepository;

	public DataIngest(UserRepository userRepository, PasswordEncoder passwordEncoder,
			ChickenCounterRepository chickenCounterRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.chickenCounterRepository = chickenCounterRepository;
	}

	@Bean
	public ApplicationRunner dataLoader() {
		return args -> {
			User adminUser = userRepository.findByRoles(Constants.FULL_ADMIN_ROLE);
			if (adminUser == null) {
				// Just create administrator account if no one exits.
				User masterUser = new User("admin", passwordEncoder.encode(masterPassword), "Admin", "",
						Constants.FULL_ADMIN_ROLE);
				userRepository.save(masterUser);
			}

			List<ChickenCount> sampleRecords = new ArrayList<>();
			int amount = 50;
			final Instant now = Instant.now();
			Instant latestTime = now;

			sampleRecords.add(ChickenCount.builder().amount(amount).timestamp(now).build());
			for (int i = 0; i < 40; i++) {
				latestTime = latestTime.minus(2, ChronoUnit.HOURS);
				amount--;

				sampleRecords.add(ChickenCount.builder().amount(amount).timestamp(latestTime).build());
			}
			Collections.reverse(sampleRecords);

			chickenCounterRepository.saveAll(sampleRecords);
		};
	}

}
