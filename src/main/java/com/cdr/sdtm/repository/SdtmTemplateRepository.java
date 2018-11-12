package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdr.sdtm.model.PathToSdtmTemplate;

public interface SdtmTemplateRepository extends JpaRepository<PathToSdtmTemplate, Long>{

	List<PathToSdtmTemplate> findByStudyAndDomain(String study, String domain);
	
	@Query("select distinct domain from PathToSdtmTemplate where study=:study")
	List<String> findDomainByStudy(@Param("study") String study);

}
