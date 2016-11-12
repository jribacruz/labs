package foo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// @formatter:off
 		auth.
			inMemoryAuthentication()
				.withUser("suporte")
				.password("12345678")
				.roles("USER")
			.and()
				.withUser("admin")
				.password("12345678")
				.roles("MNGT");
 		// @formatter:on
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
		http
			.authorizeRequests()
				.antMatchers("/mngt/**").hasRole("MNGT")
				.antMatchers("/user/**").hasRole("USER")
				.anyRequest().authenticated()   
			.and()
				.logout()
			.and()
				.formLogin()
			.and()
				.addFilterBefore(createJwtTokenAuthentication(), JwtTokenAuthentication.class);
		// @formatter:on

	}

	@Bean
	public JwtTokenAuthentication createJwtTokenAuthentication() throws Exception {
		JwtTokenAuthentication authentication = new JwtTokenAuthentication("/login");
		authentication.setAuthenticationManager(this.authenticationManager());
		return authentication;
	}

}
