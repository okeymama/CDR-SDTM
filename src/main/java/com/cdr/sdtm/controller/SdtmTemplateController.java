package com.cdr.sdtm.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.PathToSdtmTemplate;
import com.cdr.sdtm.service.SdtmTemplateService;


@RestController
@RequestMapping("/api/CDR")
public class SdtmTemplateController {
	
private static final Logger LOGGER = LoggerFactory.getLogger(StudyController.class);
	
	@Autowired
	SdtmTemplateService sdtmTemplateService;
	
	@GetMapping("/template/{domain}")
	public List<PathToSdtmTemplate> findByDomain(@PathVariable String domain) {
		LOGGER.info("Method Starts requested template for domain " + domain);
		List<PathToSdtmTemplate> localTemp = sdtmTemplateService.findByDomain(domain);
		LOGGER.info("Method Ends.");
		return localTemp;
		
	}

}
