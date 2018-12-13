package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="form_variables_metadata")
@Table(name="form_variables_metadata")
public class FormVariablesMetaData {
	
	@Id
	@Column(name="form_id")
	private Long formId;

	@Column(name="form_name")
	private String formName;
	
	@Column(name="form_desc")
	private String formDesc; 
	
	@Column(name="field_name")
	private String fieldName;
	
	@Column(name="field_desc")
	private String fieldDesc;
	
	public String getFormName() {
		return formName;
	}
	public void setFormName(String formName) {
		this.formName = formName;
	}
	public String getFormDesc() {
		return formDesc;
	}
	public void setFormDesc(String formDesc) {
		this.formDesc = formDesc;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public String getFieldDesc() {
		return fieldDesc;
	}
	public void setFieldDesc(String fieldDesc) {
		this.fieldDesc = fieldDesc;
	}

}
