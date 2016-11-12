package foo.security;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// @formatter:off
		auth.
			inMemoryAuthentication()
					.withUser("user").password("12345").roles("USER")
				.and()
					.withUser("mngt").password("12345").roles("MNGT");
		// @formatter:on
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//@// @formatter:off
		http
			.csrf().disable()
			.authorizeRequests()
			.antMatchers("/user/**").hasRole("USER")
			.antMatchers("/mngt/**").hasRole("MNGT")
			.anyRequest().authenticated()
			.and()
				.logout().logoutSuccessUrl("/login.jsf?logout")
				.permitAll()
			.and()
				.formLogin()
				.loginPage("/login.jsf")
				.permitAll()
				.successHandler(new DefaultAuthenticationSuccessHandler());
		// @formatter:on

	}

}
