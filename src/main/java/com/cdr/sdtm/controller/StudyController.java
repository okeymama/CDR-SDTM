package com.cdr.sdtm.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.Study;
import com.cdr.sdtm.service.StudyService;



@RestController
@RequestMapping("/api/CDR")
public class StudyController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(StudyController.class);
	
	@Autowired
	StudyService studyService;
	
	@PostMapping("/study/create")
	public ResponseEntity<String> saveStudy(@RequestBody Study study) {
		Study newStudy = studyService.createStudy(study);
		if(newStudy != null) {
			LOGGER.info("Study created successfully.");
			return new ResponseEntity<>("Study has been created", HttpStatus.OK);
		} else {
			LOGGER.info("Error while creating study.");
			return new ResponseEntity<>("Error while study creation",HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/study/update/{id}")
	public ResponseEntity<String> updateStudy(@PathVariable int id, @RequestBody Study study) {
		boolean isUpdated = studyService.updateStudy(study, id);
		if(isUpdated) {
			LOGGER.info("Study updated successfully.");
			return new ResponseEntity<>("Study has been updated", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while updating study.");
			return new ResponseEntity<>("Study not found", HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "/study/validate/{studyID}", method = RequestMethod.GET)
	public List<Study> getAllStudies(@PathVariable String studyID) {
		return studyService.findByStudyID(studyID);
	}
	
	
	@RequestMapping(value = "/study/search", method = RequestMethod.GET)
	public List<Study> getStudyById(@RequestParam(value="StudId",required=false) String studyID,
			@RequestParam(value="StudTitle",required=false) String title,
			@RequestParam(value="StudPhase",required=false) String phase,
			@RequestParam(value="StudStatus",required=false) String status,
			@RequestParam(value="StudSource",required=false) String source) {
		LOGGER.info("Search Study method - STARTS");
		List<Study> studies = new ArrayList<Study>();
		Study localStudy = new Study(studyID,title,phase,status,source);
		studies = studyService.findAll(localStudy);
		LOGGER.info("Search Study method - ENDS");
		return studies;	
	}
	
	
	@RequestMapping(value = "/study/delete/{studyID}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteStudy(@PathVariable int studyID) {
		boolean isDeleted = studyService.deleteById(studyID);
		if(isDeleted) {
			LOGGER.info("Study deleted successfully.");
			return new ResponseEntity<>("Study has been deleted", HttpStatus.OK);
		}
		else {
			LOGGER.info("Error while deleting study.");
			return new ResponseEntity<>("Study not found", HttpStatus.NOT_FOUND);
		}
	}
	
	
	@RequestMapping(value = "/study/dropdown", method = RequestMethod.GET)
	public List<String> getDistinctStudy() {
		LOGGER.info("Distinct Study title method - STARTS");
		List<String> studies = new ArrayList<String>();
		studies = studyService.findDistinctStudies();
		LOGGER.info("Search Study title method - ENDS");
		return studies;
	}

}
