package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="SDTM_Transformation_Metadata")
@Table(name="SDTM_Transformation_Metadata")
public class Transformation {
	
	@Id
	@Column(name="Transformation_Type")
	private String transType;
	
	@Column(name="Transformation_Logic")
	private String transLogic;
	
	@Column(name="Actual_Backend_Transformation_Logic")
	private String backTransLogic;


	public String getTransType() {
		return transType;
	}

	public void setTransType(String transType) {
		this.transType = transType;
	}

	public String getTransLogic() {
		return transLogic;
	}

	public void setTransLogic(String transLogic) {
		this.transLogic = transLogic;
	}

	public String getBackTransLogic() {
		return backTransLogic;
	}

	public void setBackTransLogic(String backTransLogic) {
		this.backTransLogic = backTransLogic;
	}
	
	
	
}
