package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="TherapeuticAreas")
@Table(name="TherapeuticAreas")
public class TherapeuticAreas {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="THERAPEUTIC_ID")
	private Long therapeutic_id;
	
	@Column(name="THERAPEUTIC_AREA")
	private String therapeuticArea;

	public Long getTherapeutic_id() {
		return therapeutic_id;
	}

	public void setTherapeutic_id(Long therapeutic_id) {
		this.therapeutic_id = therapeutic_id;
	}

	public String getTherapeuticArea() {
		return therapeuticArea;
	}

	public void setTherapeuticArea(String therapeuticArea) {
		this.therapeuticArea = therapeuticArea;
	}
	
	

}
