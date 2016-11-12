package foo.security;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class DefaultAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

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
			redirectStrategy.sendRedirect(req, res, "/user/index.jsf");
		} else if (isAdmin) {
			redirectStrategy.sendRedirect(req, res, "/mngt/index.jsf");
		} else {
			throw new IllegalStateException();
		}
	}

}
