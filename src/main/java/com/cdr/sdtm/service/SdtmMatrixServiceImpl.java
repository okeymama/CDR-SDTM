package com.cdr.sdtm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.Domain;
import com.cdr.sdtm.model.PathToSdtmMatrix;
import com.cdr.sdtm.model.TherapeuticAreas;
import com.cdr.sdtm.model.Transformation;
import com.cdr.sdtm.repository.SdtmMatrixRepository;
import com.cdr.sdtm.repository.TherapeuticRepository;
import com.cdr.sdtm.repository.TransRepository;

@Service
public class SdtmMatrixServiceImpl implements SdtmMatrixService {
	
	@Autowired
	SdtmMatrixRepository sdtmMatrixRepository;
	
	@Autowired
	TransRepository transRepository;
	
	@Autowired
	TherapeuticRepository therapeuticRepository;

	@Override
	public PathToSdtmMatrix saveMatrix(PathToSdtmMatrix pathToSdtmMatrix) {
		return sdtmMatrixRepository.save(pathToSdtmMatrix);	
	}
	
	@Override
	public List<PathToSdtmMatrix> saveMatrixForDomain(List<PathToSdtmMatrix> matrices) {
		return sdtmMatrixRepository.saveAll(matrices);
	}

	@Override
	public List<PathToSdtmMatrix> findByStudyAndDomain(String study, String domain) {
		return sdtmMatrixRepository.findByStudyAndDomain(study, domain);
	}

	@Override
	public boolean updateMatrix(PathToSdtmMatrix pathToSdtmMatrix, Long id) {
		Optional<PathToSdtmMatrix> _matrixData = findById(id);
		 if(_matrixData.isPresent()) {
			 PathToSdtmMatrix _matrix = _matrixData.get();
			 _matrix.setTargetField(pathToSdtmMatrix.getTargetField());
			 _matrix.setSourceFile(pathToSdtmMatrix.getSourceFile());
			 _matrix.setSourceField(pathToSdtmMatrix.getSourceField());
			 _matrix.setJoinLogic(pathToSdtmMatrix.getJoinLogic());
			 _matrix.setTransformation_type(pathToSdtmMatrix.getTransformation_type());
			 _matrix.setTransformation_logic(pathToSdtmMatrix.getTransformation_logic()); 
			 if(pathToSdtmMatrix.getTransformation_logic() != null && pathToSdtmMatrix.getTransformation_logic() != "" && pathToSdtmMatrix.getTransformation_type() != null) {
			 _matrix.setBack_transformation_logic(getTransformationLogic(pathToSdtmMatrix.getTransformation_type(),pathToSdtmMatrix.getTransformation_logic()));
			 }
		     sdtmMatrixRepository.save(_matrix);
		  return true;
		 }
		 return false;
	}
	
	
	@Override
	public Optional<PathToSdtmMatrix> findById(Long id) {
		return sdtmMatrixRepository.findById(id);
	}

	@Override
	public boolean deleteById(Long matrixId) {
		Optional<PathToSdtmMatrix> _matrixData = findById(matrixId);
		if(_matrixData.isPresent()) {
			sdtmMatrixRepository.deleteById(matrixId);
			return true;
		} 
		return false;
	}

	@Override
	public List<Transformation> getTransTypes() {
		return transRepository.findAll();
	}
	
	@Override
	public List<TherapeuticAreas> getAllTherapeuticAreas() {
		return therapeuticRepository.findAll();
	}
	
	public String getTransformationLogic(String type, String logic) {
		String storedLogic = "";
		//String delims = "[+\\-]+";
		
		switch(type) {
		   case "Manual Entry": storedLogic = logic;
			                    break;
			                          
		   case "Concatenation": storedLogic = "CONCAT(" + logic + ")";
                                 break;
                                      
		   case "Upper": storedLogic = "UPPER(" + logic + ")";
           			     break;
           							  
		   case "Lower": storedLogic = "LOWER(" + logic + ")";
		   				 break;
		   							  
		   case "Minimum": storedLogic = "MIN(" + logic + ")";
                           break;
		   case "Maximum": storedLogic = "MAX(" + logic + ")";
                           break;
		   case "Average": storedLogic = "AVG(" + logic + ")";
                           break;
		   case "Arithemetic Operation": storedLogic = "ARITH(" + logic + ")";
                                         break;
		   case "Number of Days": storedLogic = "DAYDIFF(" + logic + ")";
                                  break;
		   case "ISO Date Format": storedLogic = "DATEISO(" + logic + ")";
                                   break;
		   case "Lookup Transformation": storedLogic = "CODE_LIST(" + logic + ")";
                                         break;
		   case "Date Computation": //String[] tokens = logic.split(delims);
			                         storedLogic = "DATECOMPUTATION" + logic;
                                     break;
		   case "No Transformation": storedLogic = "No Transformation";
                                     break;
		   case "Sequence Generator": storedLogic = "SEQGENERATOR(" + logic + ")";
                                      break;
		   case "Custom Code": storedLogic = "PYTHONSCRIPT(" + logic + ")";
                               break;
		
		}
		return storedLogic;
	}
	
	
	@Override
	public List<String> findDistinctStudies() {
		return sdtmMatrixRepository.findDistinctStudies(); 
	}

	@Override
	public List<Domain> findDomainByStudy(String study) {
		List<Object[]> values = sdtmMatrixRepository.findDomainByStudy(study);
		Domain domain = null;
		List<Domain> results = new ArrayList<Domain>();
		for(Object[] value : values) {
			domain = new Domain((String)value[0],(String)value[1]);
			results.add(domain); 
		}
		return results;
	}

	@Override
	public List<String> findDistinctSDTMVariables() {
		return sdtmMatrixRepository.findDistinctSDTMVariables();
	}

	@Override
	public List<PathToSdtmMatrix> findAll(PathToSdtmMatrix matrix) {
		
		ExampleMatcher matcher = ExampleMatcher.matching()
											   .withIgnoreNullValues()
											   .withStringMatcher(StringMatcher.CONTAINING)
											   .withIgnorePaths("id")
											   .withMatcher("study", ExampleMatcher.GenericPropertyMatcher.of(StringMatcher.EXACT))
											   .withMatcher("domain", ExampleMatcher.GenericPropertyMatcher.of(StringMatcher.EXACT));
		
		Example<PathToSdtmMatrix> example = Example.of(matrix, matcher);
		
		return sdtmMatrixRepository.findAll(example);
	}

	@Override
	public PathToSdtmMatrix createMatrix(PathToSdtmMatrix pathToSdtmMatrix) {
		 PathToSdtmMatrix _matrix = new PathToSdtmMatrix();
		 _matrix.setStudy(pathToSdtmMatrix.getStudy());
		 _matrix.setDomain(pathToSdtmMatrix.getDomain());
		 _matrix.setSubDomain(pathToSdtmMatrix.getSubDomain());
		 _matrix.setTargetField(pathToSdtmMatrix.getTargetField());
		 _matrix.setSourceFile(pathToSdtmMatrix.getSourceFile());
		 _matrix.setSourceField(pathToSdtmMatrix.getSourceField());
		 _matrix.setJoinLogic(pathToSdtmMatrix.getJoinLogic());
		 _matrix.setTransformation_type(pathToSdtmMatrix.getTransformation_type());
		 _matrix.setTransformation_logic(pathToSdtmMatrix.getTransformation_logic()); 
		 if(pathToSdtmMatrix.getTransformation_logic() != null && pathToSdtmMatrix.getTransformation_logic() != "" && pathToSdtmMatrix.getTransformation_type() != null) {
		 _matrix.setBack_transformation_logic(getTransformationLogic(pathToSdtmMatrix.getTransformation_type(),pathToSdtmMatrix.getTransformation_logic()));
		 }
		return sdtmMatrixRepository.save(_matrix);
	}


}
