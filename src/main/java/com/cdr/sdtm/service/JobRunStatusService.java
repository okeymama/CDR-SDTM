package com.cdr.sdtm.service;

import java.util.List;

import com.cdr.sdtm.model.JobRunStatus;

public interface JobRunStatusService {
	
	List<JobRunStatus> findByStudyAndDomain(String study, String domain);

}
