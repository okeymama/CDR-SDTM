package com.cdr.sdtm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.CdrUser;

public interface UserRepository extends JpaRepository<CdrUser, Integer> {
	
	public Optional<CdrUser> findByUserNameAndPassword(String userName, String password);

}
