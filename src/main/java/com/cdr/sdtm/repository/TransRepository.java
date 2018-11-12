package com.cdr.sdtm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.Transformation;

public interface TransRepository extends JpaRepository<Transformation, Long>{

}
