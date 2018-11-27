package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="STUDY")
@Table(name="STUDY") 
public class Study {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
    private String studyID;
    
    @Column(name="TITLE")
    private String title;
    private String phase;
    private String status;
    private String therapeuticArea;
    private String source;
    
    
    
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
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
    
    

}
