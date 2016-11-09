package foo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import foo.domain.Foo;
import foo.model.FooModel;

@RestController
public class IndexRS {

	@RequestMapping("/foos")
	public FooModel getNames() {
		FooModel fooModel = new FooModel();
		List<Foo> foos = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			foos.add(new Foo(new Long(i), "foo" + i));
		}
		fooModel.setFoos(foos);
		fooModel.setTotal(10);
		return fooModel;
	}
}
