package foo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import foo.domain.Bar;
import foo.service.BarService;

@RestController
public class BarRest {

	@Autowired
	private BarService barService;

	@RequestMapping(method = RequestMethod.POST, path = "/api/bars")
	public ResponseEntity<?> insert(@RequestBody Bar bar) {
		Bar insertedBar = barService.insert(bar);
		return ResponseEntity.ok(insertedBar);
	}

	@RequestMapping(method = RequestMethod.GET, path = "/api/bars")
	public ResponseEntity<?> findAll() {
		List<Bar> bars = barService.findAll();
		return ResponseEntity.ok(bars);
	}

}
