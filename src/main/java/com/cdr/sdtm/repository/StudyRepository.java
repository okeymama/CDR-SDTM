package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

import com.cdr.sdtm.model.Study;

@Repository("studyRepository")
public interface StudyRepository extends JpaRepository<Study, String>, QueryByExampleExecutor <Study>{
	
	List<Study> findByStudyID(String studyID);
	
	List<Study> findAll(Example exp);
	
	@Query(nativeQuery=true,value="select distinct Study_Title from study_metadata where Study_Title is not null")
	List<String> findDistinctTitles();
	
	@Query(nativeQuery=true,value="select distinct Study_ID from study_metadata where Study_ID is not null")
	List<String> findStudyIds(); 
	
	@Query(nativeQuery=true,value="select distinct Study_Title from study_metadata where Therapeutic_Area=:therapeuticArea")
	List<String> findStudiesBytherapeuticArea(@Param("therapeuticArea") String therapeuticArea);
	
}
