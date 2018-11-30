package com.cdr.sdtm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cdr.sdtm.model.JobRunStatus;

public interface JobRunStatusRepository extends JpaRepository<JobRunStatus, Long>{
	
	List<JobRunStatus> findByStudyAndDomain(String study, String domain);
	
	@Query(nativeQuery=true,value="select * FROM Job_Run_Statistics where study=:study and domain in (:domains)")
	List<JobRunStatus> findByStudyAndDomains(@Param("study") String study, @Param("domains") List<String> domains);

	List<JobRunStatus> findByStudy(String study);

}
