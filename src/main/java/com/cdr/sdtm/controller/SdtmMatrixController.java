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

import com.cdr.sdtm.model.LookUp;
import com.cdr.sdtm.model.PathToSdtmMatrix;
import com.cdr.sdtm.model.Transformation;
import com.cdr.sdtm.service.LookUpService;
import com.cdr.sdtm.service.SdtmMatrixService;

@RestController
@RequestMapping("/api/CDR")
public class SdtmMatrixController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(SdtmMatrixController.class);
	
	@Autowired
	SdtmMatrixService sdtmMatrixService;
	@Autowired
	LookUpService lookUpService;
	
	
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
	
	/**
	 * Method fetches available transformation types for business rules config 
	 *        screen from Transformation table
	 * @return
	 */
	@GetMapping("/matrix/transformations")
	public List<Transformation> getAllTransformations() {
		List<Transformation> transTypes = new ArrayList<Transformation>();
		transTypes = sdtmMatrixService.getTransTypes();
		return transTypes;
	}
	
	/**
	 * Method fetches distinct studies from path_to_sdtm_matrix table 
	 *       for business rules config screen - import study dropdown.
	 * @return
	 */
	@RequestMapping(value = "/matrix/importStudy", method = RequestMethod.GET)
	public List<String> getDistinctStudies() {
		LOGGER.info("Distinct Study method - STARTS");
		List<String> studies = new ArrayList<String>();
		studies = sdtmMatrixService.findDistinctStudies();
		LOGGER.info("Search Study method - ENDS"); 
		return studies;
	}
	
	@GetMapping("/busRules/domains/{study}")
	public List<String> findDomainByStudy(@PathVariable String study) {
		List<String> domains = new ArrayList<String>();
		domains = sdtmMatrixService.findDomainByStudy(study);
		return domains;
		
	}

	
	@GetMapping("/matrix/fetchOrInsert/{newStudy}/{study}/{domain}")
	public List<PathToSdtmMatrix> importData(@PathVariable String newStudy, @PathVariable String study, @PathVariable String domain) {
		List<PathToSdtmMatrix> matrices,insertMatrices = new ArrayList<PathToSdtmMatrix>();;
		PathToSdtmMatrix matrix = null;
		matrices = sdtmMatrixService.findByStudyAndDomain(newStudy,domain);
		if(matrices != null && matrices.size() > 0) {
			return matrices;
		} else {
			matrices = sdtmMatrixService.findByStudyAndDomain(study,domain);
			if(matrices != null && matrices.size() > 0) {
			for(PathToSdtmMatrix template : matrices) {
				matrix = new PathToSdtmMatrix();
				matrix.setStudy(newStudy);
				matrix.setDomain(template.getDomain());
				matrix.setSubDomain(template.getSubDomain());
				matrix.setTargetField(template.getTargetField());
				matrix.setTargetFile(template.getTargetFile());
				matrix.setSourceFile(template.getSourceFile());
				matrix.setSourceField(template.getSourceField());
				matrix.setJoinLogic(template.getJoinLogic());
				matrix.setTransformation_type(template.getTransformation_type());
				matrix.setTransformation_logic(template.getTransformation_logic());
				matrix.setBack_transformation_logic(template.getBack_transformation_logic());
				insertMatrices.add(matrix);
			}
			insertMatrices = sdtmMatrixService.saveMatrixForDomain(insertMatrices);
			}
			return insertMatrices;
		}
	}
	
	
	/**
	 * Method fetches available source files and source variables from LOOK UP table
	 * @return
	 */
	@GetMapping("/lookup/sourcetables")
	public List getAllSourceFiles() {
		List lookup = new ArrayList<>();
		List<LookUp> sourceTables = new ArrayList<LookUp>();
		List<String> tables = new ArrayList<String>();
		sourceTables = lookUpService.findAll();
		tables = lookUpService.findDistinctTables();
		lookup.add(sourceTables);
		lookup.add(tables);
		return lookup;
	}
	
	
	/**
	 * Method fetches distinct target variables from path_to_sdtm_matrix table 
	 *       for business rules config screen edit -  SDTM variables dropdown.
	 * @return
	 */
	@RequestMapping(value = "/matrix/targetVariables", method = RequestMethod.GET)
	public List<String> getDistinctSDTMVariables() {
		LOGGER.info("Distinct SDTM Variables method - STARTS");
		List<String> targetVariables = new ArrayList<String>();
		targetVariables = sdtmMatrixService.findDistinctSDTMVariables();
		LOGGER.info("Distinct SDTM Variables method - ENDS"); 
		return targetVariables;
	}
}
