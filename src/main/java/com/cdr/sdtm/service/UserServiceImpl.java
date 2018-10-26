package com.cdr.sdtm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.CdrUser;
import com.cdr.sdtm.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepository userRepository;

	@Override
	public Optional<CdrUser> validateUser(String userName, String password) {
		return userRepository.findByUserNameAndPassword(userName,password);
	}

}
