package com.cdr.sdtm.service;

import java.util.Optional;

import com.cdr.sdtm.model.CdrUser;

public interface UserService {
	
	public Optional<CdrUser> validateUser(String userName,String passord);

}
