package foo.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppRest {

	private Logger log = LoggerFactory.getLogger(AppRest.class);

	@RequestMapping(method = RequestMethod.GET, path = "/api/info")
	public ResponseEntity<?> endpoint() {
		log.info("[endpoint] Chamando método...");
		return ResponseEntity.ok().build();
	}
}
