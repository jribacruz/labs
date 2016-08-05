package org.gradle;

import org.hibernate.validator.constraints.NotBlank;

public class Foo {
	private String value;

	@NotBlank
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
