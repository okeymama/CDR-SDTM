package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.JobRunStatus;

public interface JobRunStatusRepository extends JpaRepository<JobRunStatus, Long>{
	
	List<JobRunStatus> findByStudyAndDomain(String study, String domain);

}
