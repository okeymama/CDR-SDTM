package com.cdr.sdtm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdr.sdtm.model.StudyStatus;

public interface StudyStatusRepository extends JpaRepository<StudyStatus, String> {

}
