package foo.config;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

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
				.antMatchers("/index").hasRole("MNGT")
				.antMatchers("/dashboard").hasRole("USER")
				.anyRequest().authenticated()
			.and()
			.formLogin()
				.successHandler(new DefaultAuthenticationSuccessHandler())
			.and()
			.httpBasic();
		// @formatter:on

	}

	private class DefaultAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

		@Override
		public void onAuthenticationSuccess(HttpServletRequest req, HttpServletResponse res, Authentication auth)
				throws IOException, ServletException {

			if (res.isCommitted()) {
				return;
			}

			System.out.println(auth.getAuthorities());
			
			Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
			boolean isUser = false;
			boolean isAdmin = false;
			for (GrantedAuthority grantedAuthority : authorities) {
				if (grantedAuthority.getAuthority().equals("ROLE_USER")) {
					isUser = true;
					break;
				} else if (grantedAuthority.getAuthority().equals("ROLE_MNGT")) {
					isAdmin = true;
					break;
				}
			}

			RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

			if (isUser) {
				redirectStrategy.sendRedirect(req, res, "/dashboard.html");
			} else if (isAdmin) {
				redirectStrategy.sendRedirect(req, res, "/index.html");
			} else {
				throw new IllegalStateException();
			}
		}

	}

}
