package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdr.sdtm.model.PathToSdtmMatrix;

public interface SdtmMatrixRepository extends JpaRepository<PathToSdtmMatrix, Long>{
	
	List<PathToSdtmMatrix> findByStudyAndDomain(String study, String domain);
	
	@Query("select distinct study from PathToSdtmMatrix where study is not null")
	List<String> findDistinctStudies();
	
	@Query(nativeQuery=true,value="select distinct Domain_Name,Domain_Label from PATH_TO_SDTM_MATRIX_NEW where Study_Title=:study and domain_name is not null and domain_label is not null")
	List<Object[]> findDomainByStudy(@Param("study") String study);
	
	@Query("select distinct targetField from PathToSdtmMatrix where targetField is not null") 
	List<String> findDistinctSDTMVariables();
	
	List<PathToSdtmMatrix> findAll(Example exp);

}
