package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cdr.sdtm.model.LookUp;

public interface LookUpRepository extends JpaRepository<LookUp, Long> {
	
	@Query(nativeQuery=true,value="select distinct look_up_table from look_up where look_up_table is not null")
	List<String> findDistinctTables();

}
