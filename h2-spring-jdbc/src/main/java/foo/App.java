package foo;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) {
		//@formatter:off
		EmbeddedDatabase db = new EmbeddedDatabaseBuilder()
				.generateUniqueName(true)
			    .setType(EmbeddedDatabaseType.H2)
			    .setScriptEncoding("UTF-8")
			    .ignoreFailedDrops(true)
			    .addScripts("schema.sql", "data.sql")
			    .build();
	    //@formatter:on		

		JdbcTemplate jdbcTemplate = new JdbcTemplate(db);
		List<Map<String, Object>> results = jdbcTemplate.queryForList("select * from tbx");

		for (Map<String, Object> result : results) {
			Iterator<String> iter = result.keySet().iterator();
			while (iter.hasNext()) {
				String key = (String) iter.next();
				System.out.print("Column: " + key + " = " + result.get(key));
				System.out.println("");
			}
		}

		db.shutdown();

	}
}
