package foo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import foo.domain.Foo;
import foo.service.FooService;

@RestController
public class FooRest {

	@Autowired
	private FooService fooService;

	@RequestMapping(method = RequestMethod.POST, path = "/api/foos")
	public ResponseEntity<?> insert(@RequestBody Foo foo) {
		Foo insertedFoo = fooService.insert(foo);
		return ResponseEntity.ok(insertedFoo);
	}

	@RequestMapping(method = RequestMethod.GET, path = "/api/foos")
	public ResponseEntity<?> findAll() {
		List<Foo> foos = fooService.findAll();
		return ResponseEntity.ok(foos);
	}

	@RequestMapping(method = RequestMethod.GET, path = "/api/foos/{fooId}/bars")
	public ResponseEntity<?> findAllBars(@PathVariable("fooId") Long fooId) {
		Foo foo = fooService.find(fooId);
		if (foo == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(foo.getBars());
	}

}
