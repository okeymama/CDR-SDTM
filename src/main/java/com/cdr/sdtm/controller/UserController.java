package com.cdr.sdtm.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.CdrUser;
import com.cdr.sdtm.service.UserService;


@RestController
@RequestMapping("/api/CDR")
public class UserController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value="/login", method = RequestMethod.GET)
	public ResponseEntity<CdrUser> validateUser(@RequestParam(value="login.username",required=false) String userName,
			@RequestParam(value="login.password",required=false) String password) {
		
		Optional<CdrUser> cdrUser = userService.validateUser(userName,password);
		
		if(cdrUser.isPresent()) {
			CdrUser local = cdrUser.get();
			LOGGER.info("User exists with provided username and password");
			return new ResponseEntity<CdrUser>(local, HttpStatus.OK);
		} else {
			LOGGER.info("User doesn't exist with provided username and password");
			return new ResponseEntity<CdrUser>(HttpStatus.NOT_FOUND);
		}
		
		
	}

}
