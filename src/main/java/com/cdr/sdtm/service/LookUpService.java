package com.cdr.sdtm.service;

import java.util.List;

import com.cdr.sdtm.model.LookUp;

public interface LookUpService {
	
	List<LookUp> findAll();
	
	List<String> findDistinctTables();

}
