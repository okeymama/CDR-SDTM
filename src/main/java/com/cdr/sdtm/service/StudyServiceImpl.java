package com.cdr.sdtm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.Study;
import com.cdr.sdtm.repository.StudyRepository;

@Service
public class StudyServiceImpl implements StudyService {
	
	@Autowired
	StudyRepository studyRepository;

	@Override
	public List<Study> findByStudyID(String studyID) {
		return studyRepository.findByStudyID(studyID);
	}

	@Override
	public Study createStudy(Study study) {
		Study newStudy = new Study();
		newStudy.setStudyID(study.getStudyID());
		newStudy.setTitle(study.getTitle());
		newStudy.setPhase(study.getPhase());
		newStudy.setStatus(study.getStatus());
		newStudy.setTherapeuticArea(study.getTherapeuticArea());
		newStudy.setSource(study.getSource());
		
		return studyRepository.save(study);
		
	}

	@Override
	public boolean updateStudy(Study study, int id) {
		 Optional<Study> _studyData = findById(id);
		 if(_studyData.isPresent()) {
		 Study _study = _studyData.get();
		 _study.setTitle(study.getTitle());
		 _study.setPhase(study.getPhase());
		 _study.setStatus(study.getStatus());
		 _study.setTherapeuticArea(study.getTherapeuticArea());
		 _study.setSource(study.getSource());
		  studyRepository.save(_study);
		  return true;
		 }
		 return false;
	}

	@Override
	public List<Study> getStudies() {
		return studyRepository.findAll();
	}

	@Override
	public boolean deleteById(int id) {
		Optional<Study> _studyData = findById(id);
		if(_studyData.isPresent()) {
			studyRepository.deleteById(id);
			return true;
		} 
		return false;
	}

	@Override
	public Optional<Study> findById(int id) {
		return studyRepository.findById(id);
	}
	
	public List<Study> findAll(Study study) {
		
		ExampleMatcher matcher = ExampleMatcher.matching()
											   .withIgnoreNullValues()
											   .withStringMatcher(StringMatcher.CONTAINING)
											   .withIgnorePaths("id")
											   .withMatcher("status", ExampleMatcher.GenericPropertyMatcher.of(StringMatcher.EXACT))
											   .withMatcher("phase", ExampleMatcher.GenericPropertyMatcher.of(StringMatcher.EXACT));
		
		Example<Study> example = Example.of(study, matcher);
		
		return studyRepository.findAll(example);
		
	}

	@Override
	public List<String> findDistinctStudies() {
		return studyRepository.findDistinctTitles(); 
	}

	@Override
	public List<String> findStudyIds() {
		return studyRepository.findStudyIds(); 
	}

	@Override
	public List<String> findStudiesBytherapeuticArea(String therapeuticArea) {
		return studyRepository.findStudiesBytherapeuticArea(therapeuticArea);
	}
	
	
	

}
