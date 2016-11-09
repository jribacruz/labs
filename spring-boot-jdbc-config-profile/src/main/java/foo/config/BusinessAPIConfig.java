package foo.config;

import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import foo.api.BusinessAPI;
import foo.service.BusinessAPIImpl;

@Configuration
public class BusinessAPIConfig {

	@Bean(autowire = Autowire.BY_TYPE)
	@Profile("dev")
	public BusinessAPI createDevBusinessAPI() {
		BusinessAPIImpl businessAPIImpl = new BusinessAPIImpl("DEV");
		return businessAPIImpl;
	}

	@Bean(autowire = Autowire.BY_TYPE)
	@Profile("prod")
	public BusinessAPI creatProdBusinessAPI() {
		BusinessAPIImpl businessAPIImpl = new BusinessAPIImpl("PROD");
		return businessAPIImpl;
	}

}
