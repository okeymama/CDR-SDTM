package com.cdr.sdtm.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="Transformation")
@Table(name="Transformation")
public class Transformation {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="TRANS_ID")
	private Long trans_id;
	
	@Column(name="TRANS_TYPE")
	private String transType;
	
	@Column(name="TRANS_LOGIC")
	private String transLogic;

	public Long getTrans_id() {
		return trans_id;
	}

	public void setTrans_id(Long trans_id) {
		this.trans_id = trans_id;
	}

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
	
}
