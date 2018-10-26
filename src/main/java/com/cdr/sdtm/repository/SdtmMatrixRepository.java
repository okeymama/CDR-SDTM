package com.cdr.sdtm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.PathToSdtmMatrix;

public interface SdtmMatrixRepository extends JpaRepository<PathToSdtmMatrix, Long>{

}
