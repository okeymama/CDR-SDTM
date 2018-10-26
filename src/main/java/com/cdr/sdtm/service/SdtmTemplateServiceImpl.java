package com.cdr.sdtm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.repository.SdtmTemplateRepository;

@Service
public class SdtmTemplateServiceImpl implements SdtmTemplateService {
	
	@Autowired
	SdtmTemplateRepository sdtmTemplateRepository;

}
