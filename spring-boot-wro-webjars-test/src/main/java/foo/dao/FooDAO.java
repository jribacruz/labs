package foo.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import foo.domain.Foo;
import foo.model.FooModel;

@Service
public class FooDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public FooModel findAll(Integer first, Integer pageSize) {
		FooModel fooModel = new FooModel();
		List<Foo> entries = new ArrayList<>();
		jdbcTemplate.query("SELECT * FROM FOO LIMIT ?1 OFFSET ?2 ", new Object[] { pageSize, first },
				(rs, row) -> new Foo(rs.getLong("id"), rs.getString("name"))).forEach(entry -> entries.add(entry));
		
		
		fooModel.setFoos(entries);
		return fooModel;
	}

}
