package com.cdr.sdtm.service;

import java.util.List;
import java.util.Optional;

import com.cdr.sdtm.model.Study;

public interface StudyService {
	
	List<Study> findByStudyID(String studyID);
	
	Study createStudy(Study study);
	
	boolean updateStudy(Study study, String id);
	
	List<Study> getStudies();
	
	boolean deleteById(String id);
	
	Optional<Study> findById(String id);
	
	List<Study> findAll(Study study);

	List<String> findDistinctStudies(); 
	
	List<String> findStudyIds();

	List<String> findStudiesBytherapeuticArea(String therapeuticArea); 

}
