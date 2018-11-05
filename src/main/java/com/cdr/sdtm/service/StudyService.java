package com.cdr.sdtm.service;

import java.util.List;
import java.util.Optional;

import com.cdr.sdtm.model.Study;

public interface StudyService {
	
	List<Study> findByStudyID(String studyID);
	
	Study createStudy(Study study);
	
	boolean updateStudy(Study study, int id);
	
	List<Study> getStudies();
	
	boolean deleteById(int id);
	
	Optional<Study> findById(int id);
	
	List<Study> findAll(Study study);

	List<String> findDistinctStudies(); 

}
