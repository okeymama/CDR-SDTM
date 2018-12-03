package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="path_to_sdtm_matrix")
@Table(name="path_to_sdtm_matrix")
public class PathToSdtmMatrix {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="Matrix_ID")
	private Long id; 
	
	@Column(name="Study_Title")
	private String study;
	
	@Column(name="Domain_Name")
	private String domain;
	
	@Column(name="Domain_Label")
	private String domainLabel;
	
	@Column(name="Domain_Name_Extension")
	private String domainNameExt;

	@Column(name="Sub_Domain_Label")
	private String subDomain;
	
	@Column(name="Form_Name")
	private String formName;
	
	@Column(name="Form_Label")
	private String formLable;
	
	@Column(name="Form_Name_Extension")
	private String formExt;
	
	@Column(name="Form_Variable_Name")
	private String sourceFile;
	
	@Column(name="Form_Variable_Label")
	private String sourceField;
	
	@Column(name="SDTM_Variable_Name")
	private String targetFile;
	
	@Column(name="SDTM_Variable_Label")
	private String targetField;
	
	@Column(name="Join_Criteria")
	private String joinLogic;
	
	@Column(name="Transformation_Type")
	private String transformation_type;
	
	@Column(name="Transformation_Pseudo_Code")
	private String transformation_logic;
	
	@Column(name="Transformation_Code")
	private String back_transformation_logic;

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

	public PathToSdtmMatrix(String studyID, String domain) {
		this.study = studyID;
		this.domain = domain;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBack_transformation_logic() {
		return back_transformation_logic;
	}

	public void setBack_transformation_logic(String back_transformation_logic) {
		this.back_transformation_logic = back_transformation_logic;
	}

	public String getDomainLabel() {
		return domainLabel;
	}

	public void setDomainLabel(String domainLabel) {
		this.domainLabel = domainLabel;
	}

	public String getDomainNameExt() {
		return domainNameExt;
	}

	public void setDomainNameExt(String domainNameExt) {
		this.domainNameExt = domainNameExt;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String getFormLable() {
		return formLable;
	}

	public void setFormLable(String formLable) {
		this.formLable = formLable;
	}

	public String getFormExt() {
		return formExt;
	}

	public void setFormExt(String formExt) {
		this.formExt = formExt;
	}
	
	
	
}
