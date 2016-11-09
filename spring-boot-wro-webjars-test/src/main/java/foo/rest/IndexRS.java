package foo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import foo.domain.Foo;

@RestController
public class IndexRS {

	@RequestMapping("/foos")
	public List<Foo> getNames() {
		List<Foo> foos = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			foos.add(new Foo(new Long(i), "foo" + i));
		}
		return foos;
	}
}
