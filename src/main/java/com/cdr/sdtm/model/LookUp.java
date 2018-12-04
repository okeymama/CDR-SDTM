package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="look_up")
@Table(name="look_up")
public class LookUp {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="LOOKUP_ID")
	private Long id;
	
	@Column(name="LOOK_UP_TABLE")
	private String lookUpTable;
	
	@Column(name="LOOK_UP_VARIABLE")
	private String lookUpVariable;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLookUpTable() {
		return lookUpTable;
	}

	public void setLookUpTable(String lookUpTable) {
		this.lookUpTable = lookUpTable;
	}

	public String getLookUpVariable() {
		return lookUpVariable;
	}

	public void setLookUpVariable(String lookUpVariable) {
		this.lookUpVariable = lookUpVariable;
	}
	
	

}
