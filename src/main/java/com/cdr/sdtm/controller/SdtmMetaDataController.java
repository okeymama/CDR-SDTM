package com.cdr.sdtm.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdr.sdtm.model.StudyPhase;
import com.cdr.sdtm.model.StudySource;
import com.cdr.sdtm.model.StudyStatus;
import com.cdr.sdtm.model.StudyType;
import com.cdr.sdtm.service.SdtmMetaDataService;

@RestController
@RequestMapping("/api/CDR")
public class SdtmMetaDataController {
	
	@Autowired
	SdtmMetaDataService sdtmMetaDataService;
	
	/**
	 * Method fetches study phase metadata
	 * @return
	 */
	@GetMapping("/study/phases")
	public List<StudyPhase> getPhaseMetaData() {
		List<StudyPhase> phases = new ArrayList<StudyPhase>();
		phases = sdtmMetaDataService.getStudyPhaseMetaData();
		return phases;
	}
	
	/**
	 * Method fetches study sources
	 * @return
	 */
	@GetMapping("/study/sources")
	public List<StudySource> getSourceMetaData() {
		List<StudySource> sources = new ArrayList<StudySource>();
		sources = sdtmMetaDataService.getStudySourceMetaData();
		return sources;
	}
	
	/**
	 * Method fetches study types
	 * @return
	 */
	@GetMapping("/study/types")
	public List<StudyType> getTypeMetaData() {
		List<StudyType> types = new ArrayList<StudyType>();
		types = sdtmMetaDataService.getStudyTypeMetaData();
		return types;
	}
	
	/**
	 * Method fetches study statuses
	 * @return
	 */
	@GetMapping("/study/statuses")
	public List<StudyStatus> getStausMetaData() {
		List<StudyStatus> statues = new ArrayList<StudyStatus>();
		statues = sdtmMetaDataService.getStudyStatusMetaData();
		return statues;
	}
	

}
