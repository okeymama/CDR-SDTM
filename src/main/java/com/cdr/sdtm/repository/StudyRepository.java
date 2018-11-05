package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.cdr.sdtm.model.Study;

@Repository("studyRepository")
public interface StudyRepository extends JpaRepository<Study, Integer>, QueryByExampleExecutor <Study>{
	
	List<Study> findByStudyID(String studyID);
	
	List<Study> findAll(Example exp);
	
	@Query("select distinct title from STUDY where title is not null")
	List<String> findDistinctTitles();
	
}
