package foo;

import java.io.FileReader;

import javax.script.Bindings;
import javax.script.Invocable;
import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import foo.service.TemplateService;

@SpringBootApplication
public class SpringBootScriptengineJsTestApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootScriptengineJsTestApplication.class, args);
	}

	@Override
	public void run(String... arg0) throws Exception {
		ScriptEngineManager manager = new ScriptEngineManager();
		ScriptEngine engine = manager.getEngineByName("nashorn");
		Bindings bindings = engine.createBindings();
		bindings.put("$template", new TemplateService());
		//bindings.put("Action", Action.class);
		// bindings.put("context", new
		// FileReader("src/main/java/foo/data.json"));
		engine.setBindings(bindings, ScriptContext.GLOBAL_SCOPE);
		engine.eval(new FileReader("src/main/java/foo/action.js"));
		
		Object object = engine.get("action");
		
		Invocable invocable = (Invocable) engine;
		Action action = invocable.getInterface(object, Action.class);
		action.execute();
		action.prompting();
		// invocable.invokeMethod("action", "prepare");
	}
}
