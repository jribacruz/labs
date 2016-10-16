package foo.dao;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;

public class FooDAO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Inject
	private EmbeddedDatabase db;

	public List<Map<String, Object>> findAll() {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(db);
		List<Map<String, Object>> results = jdbcTemplate.queryForList("select * from tbx");
		return results;
	}
}
