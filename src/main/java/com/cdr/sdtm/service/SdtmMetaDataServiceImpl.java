package com.cdr.sdtm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.StudyPhase;
import com.cdr.sdtm.model.StudySource;
import com.cdr.sdtm.model.StudyStatus;
import com.cdr.sdtm.model.StudyType;
import com.cdr.sdtm.repository.StudyPhaseRepository;
import com.cdr.sdtm.repository.StudySourceRepository;
import com.cdr.sdtm.repository.StudyStatusRepository;
import com.cdr.sdtm.repository.StudyTypeRepository;

@Service
public class SdtmMetaDataServiceImpl implements SdtmMetaDataService{
	
	@Autowired
	StudyTypeRepository studyTypeRepository;
	
	@Autowired
	StudyStatusRepository studyStatusRepository;
	
	@Autowired
	StudyPhaseRepository studyPhaseRepository;
	
	@Autowired
	StudySourceRepository studySourceRepository;

	@Override
	public List<StudyType> getStudyTypeMetaData() {
		return studyTypeRepository.findAll();
	}

	@Override
	public List<StudyStatus> getStudyStatusMetaData() {
		return studyStatusRepository.findAll();
	}

	@Override
	public List<StudySource> getStudySourceMetaData() {
		return studySourceRepository.findAll();
	}

	@Override
	public List<StudyPhase> getStudyPhaseMetaData() {
		return studyPhaseRepository.findAll();
	}
	
	

}
