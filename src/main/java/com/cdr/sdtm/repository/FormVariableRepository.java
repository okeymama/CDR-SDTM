package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdr.sdtm.model.FormVariablesMetaData;

public interface FormVariableRepository extends JpaRepository<FormVariablesMetaData, Long> {

	@Query("select distinct formName,formDesc from form_variables_metadata where formName is not null and formDesc is not null")
	List<FormVariablesMetaData> findDistinctForms();
	
	@Query(nativeQuery=true,value="select * FROM form_variables_metadata where form_name=:formName")
	List<FormVariablesMetaData> findFieldsByForm(@Param("formName") String formName);
	
}
