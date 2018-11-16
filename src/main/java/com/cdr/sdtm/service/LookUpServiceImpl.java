package com.cdr.sdtm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.LookUp;
import com.cdr.sdtm.repository.LookUpRepository;

@Service
public class LookUpServiceImpl implements LookUpService {
	
	@Autowired
	LookUpRepository lookUpRepository;

	@Override
	public List<LookUp> findAll() {
		return lookUpRepository.findAll();
	}

	@Override
	public List<String> findDistinctTables() {
		return lookUpRepository.findDistinctTables();
	}

}
