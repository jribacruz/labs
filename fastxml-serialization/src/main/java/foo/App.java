package foo;

import java.io.File;
import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import foo.domain.Atividade;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) throws JsonGenerationException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		Atividade atividade = new Atividade();
		atividade.setNome("Geração de Urnas");
		atividade.setInfo("API");
		
		objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
		objectMapper.writeValue(new File("target/atividade.json"), atividade);
	}
}
