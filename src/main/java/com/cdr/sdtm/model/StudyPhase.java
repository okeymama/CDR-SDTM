package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="Study_Phase_Metadata")
@Table(name="Study_Phase_Metadata") 
public class StudyPhase {
	
	@Id
	@Column(name="Study_Phase")
	private String phase;
	
	@Column(name="Study_Phase_Description")
	private String phaseDescription;

	public String getPhase() {
		return phase;
	}

	public void setPhase(String phase) {
		this.phase = phase;
	}

	public String getPhaseDescription() {
		return phaseDescription;
	}

	public void setPhaseDescription(String phaseDescription) {
		this.phaseDescription = phaseDescription;
	}
	

}
