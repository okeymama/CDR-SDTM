package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity()
@Table(name="PATH_TO_SDTM_TEMPLATE")
public class PathToSdtmTemplate {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "template_Sequence")
    @SequenceGenerator(name = "template_Sequence", sequenceName = "TEMPLATE_SEQ")
	@Column(name="ID")
	private Long id;
	
	@Column(name="STUDY")
	private String study;
	
	@Column(name="DOMAIN")
	private String domain;
	
	@Column(name="SUB_DOMAIN")
	private String subDomain;
	
	@Column(name="TARGET_FILE")
	private String targetFile;
	
	@Column(name="TARGET_FIELD")
	private String targetField;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getStudy() {
		return study;
	}

	public void setStudy(String study) {
		this.study = study;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getSubDomain() {
		return subDomain;
	}

	public void setSubDomain(String subDomain) {
		this.subDomain = subDomain;
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

	public PathToSdtmTemplate() {
	
	}

	public PathToSdtmTemplate(String study, String domain, String subDomain, String targetFile, String targetField) {
		this.study = study;
		this.domain = domain;
		this.subDomain = subDomain;
		this.targetFile = targetFile;
		this.targetField = targetField;
	}
	
	
}
