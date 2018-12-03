package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="Study_Metadata")
@Table(name="Study_Metadata")
public class Study {
	
	@Id
	@Column(name="Study_ID")
    private String studyID;
    
    @Column(name="Study_Title")
    private String title;
    
    @Column(name="Study_Description")
    private String description;
    
    @Column(name="Study_Phase")
    private String phase;
    
    @Column(name="Study_Status")
    private String status;
    
    @Column(name="Therapeutic_Area")
    private String therapeuticArea;
    
    @Column(name="Study_Source")
    private String source;
    
    @Column(name="Study_Type")
    private String type;
    
    
    
	public Study() {
	}

	public Study(String studyID, String title, String phase, String status, String source, String therapeuticArea) {
		this.studyID = studyID;
		this.title = title;
		this.phase = phase;
		this.status = status;
		this.source = source;
		this.therapeuticArea = therapeuticArea;
	}
	

	public String getStudyID() {
		return studyID;
	}
	public void setStudyID(String studyID) {
		this.studyID = studyID;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPhase() {
		return phase;
	}
	public void setPhase(String phase) {
		this.phase = phase;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTherapeuticArea() {
		return therapeuticArea;
	}
	public void setTherapeuticArea(String therapeuticArea) {
		this.therapeuticArea = therapeuticArea;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
    
    

}
