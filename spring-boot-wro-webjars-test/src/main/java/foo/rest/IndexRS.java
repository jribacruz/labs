package foo.rest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import foo.domain.Foo;
import foo.model.FooModel;

@RestController
public class IndexRS {

	@RequestMapping("/foos")
	public FooModel getNames(@RequestParam(name = "first") Integer first, @RequestParam(name = "pagesize") Integer pageSize) {
		System.out.println("First: " + first);
		System.out.println("PageSize: " + pageSize);
		FooModel fooModel = new FooModel();
		List<Foo> foos = new ArrayList<>();
		for (int i = 0; i < 100; i++) {
			foos.add(new Foo(new Long(i), "foo" + i));
		}
		fooModel.setFoos(foos);
		fooModel.setTotal(10);
		return fooModel;
	}
}
