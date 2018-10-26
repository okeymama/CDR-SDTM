package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.PathToSdtmTemplate;

public interface SdtmTemplateRepository extends JpaRepository<PathToSdtmTemplate, Long>{

	List<PathToSdtmTemplate> findByDomain(String domain);

}
