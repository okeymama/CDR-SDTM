package com.cdr.sdtm.model;

public class Domain {
	
	private String domain;
	
	private String domainLabel;

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public String getDomainLabel() {
		return domainLabel;
	}

	public void setDomainLabel(String domainLabel) {
		this.domainLabel = domainLabel;
	}

	public Domain(String domain, String domainLabel) {
		super();
		this.domain = domain;
		this.domainLabel = domainLabel;
	}
	
	

}
