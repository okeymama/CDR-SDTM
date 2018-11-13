package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdr.sdtm.model.PathToSdtmMatrix;

public interface SdtmMatrixRepository extends JpaRepository<PathToSdtmMatrix, Long>{
	
	List<PathToSdtmMatrix> findByStudyAndDomain(String study, String domain);
	
	@Query("select distinct study from PathToSdtmMatrix where study is not null")
	List<String> findDistinctStudies();
	
	@Query("select distinct domain from PathToSdtmMatrix where study=:study")
	List<String> findDomainByStudy(@Param("study") String study);

}
