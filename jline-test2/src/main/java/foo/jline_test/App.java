package foo.jline_test;

import java.io.IOException;

import jline.console.ConsoleReader;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) throws IOException {
		ConsoleReader reader = new ConsoleReader();
		reader.addCompleter(new CHeandler());
		reader.setPrompt("sk@aelis2016$ ");
		String line = reader.readLine();
		reader.close();
	}
}
