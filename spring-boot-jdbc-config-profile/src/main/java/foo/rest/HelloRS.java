package foo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import foo.api.BusinessAPI;

@RestController
public class HelloRS {

	@Autowired
	private BusinessAPI businessAPI;

	@RequestMapping(path = "/hello", method = RequestMethod.GET)
	public String hello() {
		return businessAPI.getHello();
	}
}
