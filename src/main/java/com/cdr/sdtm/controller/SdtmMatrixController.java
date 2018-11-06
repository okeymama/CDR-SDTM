package com.cdr.sdtm.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.PathToSdtmMatrix;
import com.cdr.sdtm.service.SdtmMatrixService;

@RestController
@RequestMapping("/api/CDR")
public class SdtmMatrixController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SdtmMatrixController.class);
	
	@Autowired
	SdtmMatrixService sdtmMatrixService;
	
	
	@PutMapping("/matrix/update/{id}")
	public ResponseEntity<String> updateMatrix(@PathVariable Long id, @RequestBody PathToSdtmMatrix pathToSdtmMatrix) {
		boolean isUpdated = sdtmMatrixService.updateMatrix(pathToSdtmMatrix, id);
		if(isUpdated) {
			LOGGER.info("Matrix updated successfully.");
			return new ResponseEntity<>("Matrix has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating matrix.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}
	
	
	@RequestMapping(value = "/matrix/delete/{matrixId}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteStudy(@PathVariable Long matrixId) {
		boolean isDeleted = sdtmMatrixService.deleteById(matrixId);
		if(isDeleted) {
			LOGGER.info("Matrix deleted successfully.");
			return new ResponseEntity<>("Matrix has been deleted", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while deleting Matrix.");
			return new ResponseEntity<>("Matrix not found", HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping("/matrix/{study}/{domain}")
	public List<PathToSdtmMatrix> findByDomain(@PathVariable String study, @PathVariable String domain) {
		LOGGER.info("Method Starts requested template for domain " + domain +" And Study " + study);
		List<PathToSdtmMatrix> matrices = new ArrayList<PathToSdtmMatrix>();
		 matrices = sdtmMatrixService.findByStudyAndDomain(study,domain);
		LOGGER.info("Method Ends."+ matrices.size());
		return matrices;
		
	}

}
