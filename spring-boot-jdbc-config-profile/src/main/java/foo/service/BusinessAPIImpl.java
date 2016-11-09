package foo.service;

import foo.api.BusinessAPI;

public class BusinessAPIImpl implements BusinessAPI {

	private String environment;

	public BusinessAPIImpl(String environment) {
		super();
		this.environment = environment;
	}

	@Override
	public String getHello() {
		return "Businesse Impl: " + getEnvironment();
	}

	public String getEnvironment() {
		return environment;
	}

}
