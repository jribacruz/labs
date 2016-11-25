package foo.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class JsecAuthenticationProvider implements AuthenticationProvider {

	@Override
	public Authentication authenticate(Authentication auth) throws AuthenticationException {
		String principal = (String) auth.getPrincipal();
		String password = (String) auth.getCredentials();

		System.out.println("Principal: " + principal);

		if (principal.equals("suporte") && password.equals("12345")) {

			Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
			authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(principal, password, authorities);
			return token;
		}

		throw new AuthenticationServiceException("Erro de Authenticação");
	}

	@Override
	public boolean supports(Class<?> arg0) {
		return true;
	}

}
