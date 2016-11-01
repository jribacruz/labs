package foo.service;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/services")
public class IndexService {

	@RequestMapping(path = "/names", method = RequestMethod.GET)
	public @ResponseBody String sayHello(@RequestParam(value = "name", required = false, defaultValue = "Stranger") String name) {
		return "{ \"label\": \"Bem Vindo ao REST\"}";
	}
}
