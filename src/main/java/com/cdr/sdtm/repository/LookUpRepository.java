package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdr.sdtm.model.LookUp;

public interface LookUpRepository extends JpaRepository<LookUp, Long> {
	
	@Query("select distinct lookUpTable from LookUp where lookUpTable is not null")
	List<String> findDistinctTables();

}
