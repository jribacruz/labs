package foo;

import java.util.List;

import org.fusesource.jansi.AnsiConsole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codeshelf.consoleui.elements.PromptableElementIF;
import de.codeshelf.consoleui.prompt.ConsolePrompt;
import de.codeshelf.consoleui.prompt.builder.PromptBuilder;

@SpringBootApplication
public class SpringBootConsoleuiTestApplication implements CommandLineRunner {

	public static void main(String[] args) {
		AnsiConsole.wrapOutputStream(System.out);
		SpringApplication.run(SpringBootConsoleuiTestApplication.class, args);
		AnsiConsole.systemUninstall();
	}

	@Override
	public void run(String... arg0) throws Exception {
		ConsolePrompt prompt = new ConsolePrompt();
		PromptBuilder promptBuilder = prompt.getPromptBuilder();

		//// @formatter:off
		/*
		promptBuilder.createInputPrompt()
				.name("projectName")
				.message("Digite o nome do projeto")
				.addPrompt();	
		*/
		// @formatter:on
		
		 promptBuilder.createListPrompt()
         .name("pizzatype")
         .message("Which pizza do you want?")
         .newItem().text("Margherita").add()  // without name (name defaults to text)
         .newItem("veneziana").text("Veneziana").add()
         .newItem("hawai").text("Hawai").add()
         .newItem("quattro").text("Quattro Stagioni").add()
         .addPrompt();
		
		List<PromptableElementIF> promptableElementIFs = promptBuilder.build();
		prompt.prompt(promptableElementIFs);
	}
}
