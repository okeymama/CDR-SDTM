package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="Study_Status_Metadata")
@Table(name="Study_Status_Metadata")
public class StudyStatus {
	
	@Id
	@Column(name="Study_Status")
	private String status;
	
	@Column(name="Study_Status_Description")
	private String statusDescription;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatusDescription() {
		return statusDescription;
	}

	public void setStatusDescription(String statusDescription) {
		this.statusDescription = statusDescription;
	}
	
	

}
