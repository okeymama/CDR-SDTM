package com.cdr.sdtm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdr.sdtm.model.PathToSdtmMatrix;
import com.cdr.sdtm.repository.SdtmMatrixRepository;

@Service
public class SdtmMatrixServiceImpl implements SdtmMatrixService {
	
	@Autowired
	SdtmMatrixRepository sdtmMatrixRepository;

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
			 _matrix.setSourceFile(pathToSdtmMatrix.getSourceFile());
			 _matrix.setSourceField(pathToSdtmMatrix.getSourceField());
			 _matrix.setJoinLogic(pathToSdtmMatrix.getJoinLogic());
			 _matrix.setTransformation_type(pathToSdtmMatrix.getTransformation_type());
			 _matrix.setTransformation_logic(pathToSdtmMatrix.getTransformation_logic());
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


}
