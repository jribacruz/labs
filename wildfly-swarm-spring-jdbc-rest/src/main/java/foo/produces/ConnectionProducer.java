package foo.produces;

import java.io.Serializable;

import javax.enterprise.inject.Produces;

import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

public class ConnectionProducer implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Produces
	public EmbeddedDatabase create() {
		System.out.println("Criando DB");
		//@formatter:off
		EmbeddedDatabase db = new EmbeddedDatabaseBuilder()
					.generateUniqueName(true)
				    .setType(EmbeddedDatabaseType.H2)
				    .setScriptEncoding("UTF-8")
				    .ignoreFailedDrops(true)
				    .addScripts("schema.sql", "data.sql")
				    .build();
		//@formatter:on	
		return db;
	}
}
