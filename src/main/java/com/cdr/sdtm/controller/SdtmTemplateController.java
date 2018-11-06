package com.cdr.sdtm.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.PathToSdtmMatrix;
import com.cdr.sdtm.model.PathToSdtmTemplate;
import com.cdr.sdtm.service.SdtmMatrixService;
import com.cdr.sdtm.service.SdtmTemplateService;


@RestController
@RequestMapping("/api/CDR")
public class SdtmTemplateController {
	
private static final Logger LOGGER = LoggerFactory.getLogger(SdtmTemplateController.class);
	
	@Autowired
	SdtmTemplateService sdtmTemplateService;
	
	@Autowired
	SdtmMatrixService sdtmMatrixService;
	
	@GetMapping("/template/{study}/{domain}")
	public List<PathToSdtmMatrix> findByDomain(@PathVariable String study, @PathVariable String domain) {
		LOGGER.info("Method Starts requested template for domain " + domain +" And Study " + study);
		List<PathToSdtmMatrix> matrices = null;
		PathToSdtmMatrix matrix = null;
		List<PathToSdtmTemplate> localTemp = sdtmTemplateService.findByDomainAndStudy(study,domain);
		if(localTemp != null && localTemp.size() > 0) {
	    matrices = sdtmMatrixService.findByStudyAndDomain(study,domain);
			if(matrices == null || (matrices != null && matrices.size() == 0)) {
				matrices = new ArrayList<PathToSdtmMatrix>();
				for(PathToSdtmTemplate template : localTemp) {
					matrix = new PathToSdtmMatrix();
					matrix.setStudy(template.getStudy());
					matrix.setDomain(template.getDomain());
					matrix.setSubDomain(template.getSubDomain());
					matrix.setTargetField(template.getTargetField());
					matrix.setTargetFile(template.getTargetFile());
					matrices.add(matrix);
				}
				matrices = sdtmMatrixService.saveMatrixForDomain(matrices);
			}
		}
		LOGGER.info("Method Ends."+ matrices.size());
		return matrices;
		
	}
}
