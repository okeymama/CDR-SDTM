package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity()
@Table(name="PATH_TO_SDTM_TEMPLATE")
public class PathToSdtmTemplate {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="ID")
	private Long id;
	
	@Column(name="DOMAIN")
	private String domain;
	
	@Column(name="TARGET_FILE")
	private String targetFile;
	
	@Column(name="TARGET_FIELD")
	private String targetField;
	
	public PathToSdtmTemplate() {
		
	}
	
	public PathToSdtmTemplate(String domain, String targetFile, String targetField) {
		super();
		this.domain = domain;
		this.targetFile = targetFile;
		this.targetField = targetField;
	}
	
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public String getTargetFile() {
		return targetFile;
	}
	public void setTargetFile(String targetFile) {
		this.targetFile = targetFile;
	}
	public String getTargetField() {
		return targetField;
	}
	public void setTargetField(String targetField) {
		this.targetField = targetField;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	
	

}
