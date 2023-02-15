package com.edcolco.chickenCounter.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.edcolco.chickenCounter.models.ChickenCount;

public interface ChickenCounterRepository extends CrudRepository<ChickenCount, Long> {
	Page<ChickenCount> findAll(Pageable pageable);
}
