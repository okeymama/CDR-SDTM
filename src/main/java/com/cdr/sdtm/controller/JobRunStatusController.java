package com.cdr.sdtm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.JobRunStatus;
import com.cdr.sdtm.service.JobRunStatusService;

@RestController
@RequestMapping("/api/CDR")
public class JobRunStatusController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JobRunStatusController.class);
	
	@Autowired
	JobRunStatusService jobRunStatusService;
	
	@GetMapping("/jobs/{study}/{domain}")
	public List<JobRunStatus> findByStudyAndDomain(@PathVariable String study, @PathVariable String domain) {
		LOGGER.info("Jobs requested for study: " + study + "And  Domain: " + domain);
		return jobRunStatusService.findByStudyAndDomain(study, domain);
	}

}
