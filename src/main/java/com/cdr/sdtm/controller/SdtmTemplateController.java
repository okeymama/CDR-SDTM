package com.cdr.sdtm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.service.SdtmTemplateService;


@RestController
@RequestMapping("/api/template")
public class SdtmTemplateController {
	
private static final Logger LOGGER = LoggerFactory.getLogger(StudyController.class);
	
	@Autowired
	SdtmTemplateService sdtmTemplateService;

}
