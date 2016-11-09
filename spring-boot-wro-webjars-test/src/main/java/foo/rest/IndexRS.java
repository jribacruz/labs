package foo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import foo.dao.FooDAO;
import foo.model.FooModel;

@RestController
public class IndexRS {

	@Autowired
	private FooDAO fooDAO;

	@RequestMapping("/foos")
	public FooModel getNames(@RequestParam(name = "first") Integer first, @RequestParam(name = "pagesize") Integer pageSize) {
		System.out.println("First: " + first);
		System.out.println("PageSize: " + pageSize);

		FooModel model = fooDAO.findAll(first, pageSize);

		return model;
	}
}
