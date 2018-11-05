package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="PATH_TO_SDTM_MATRIX")
public class PathToSdtmMatrix {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "matrix_Sequence")
    @SequenceGenerator(name = "matrix_Sequence", sequenceName = "MATRIX_SEQ")
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
	
	@Column(name="SOURCE_FILE")
	private String sourceFile;
	
	@Column(name="SOURCE_FIELD")
	private String sourceField;
	
	@Column(name="JOIN_LOGIC")
	private String joinLogic;
	
	@Column(name="TRANSFORMATION_TYPE")
	private String transformation_type;
	
	@Column(name="TRANSFORMATION_LOGIC")
	private String transformation_logic;

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

	public String getSourceFile() {
		return sourceFile;
	}

	public void setSourceFile(String sourceFile) {
		this.sourceFile = sourceFile;
	}

	public String getSourceField() {
		return sourceField;
	}

	public void setSourceField(String sourceField) {
		this.sourceField = sourceField;
	}

	public String getJoinLogic() {
		return joinLogic;
	}

	public void setJoinLogic(String joinLogic) {
		this.joinLogic = joinLogic;
	}

	public String getTransformation_type() {
		return transformation_type;
	}

	public void setTransformation_type(String transformation_type) {
		this.transformation_type = transformation_type;
	}

	public String getTransformation_logic() {
		return transformation_logic;
	}

	public void setTransformation_logic(String transformation_logic) {
		this.transformation_logic = transformation_logic;
	}

	public PathToSdtmMatrix() {
		
	}

	public PathToSdtmMatrix(String study, String domain, String subDomain, String targetFile, String targetField,
			String sourceFile, String sourceField, String joinLogic, String transformation_type,
			String transformation_logic) {
		this.study = study;
		this.domain = domain;
		this.subDomain = subDomain;
		this.targetFile = targetFile;
		this.targetField = targetField;
		this.sourceFile = sourceFile;
		this.sourceField = sourceField;
		this.joinLogic = joinLogic;
		this.transformation_type = transformation_type;
		this.transformation_logic = transformation_logic;
	}
	
	
	
}
