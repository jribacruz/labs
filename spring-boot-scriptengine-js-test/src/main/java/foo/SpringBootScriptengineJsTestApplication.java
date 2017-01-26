package foo;

import java.io.FileReader;

import javax.script.Bindings;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootScriptengineJsTestApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootScriptengineJsTestApplication.class, args);
	}

	@Override
	public void run(String... arg0) throws Exception {
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("nashorn");
		//Bindings bindings = engine.createBindings();
		//bindings.put("context", new FileReader("src/main/java/foo/data.json"));
		//engine.setBindings(bindings, ScriptContext.ENGINE_SCOPE);
		engine.eval(new FileReader("src/main/java/foo/action.js"));
	}
}
