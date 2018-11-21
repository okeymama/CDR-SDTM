package com.cdr.sdtm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.TherapeuticAreas;

public interface TherapeuticRepository  extends JpaRepository<TherapeuticAreas, Long>{

}
