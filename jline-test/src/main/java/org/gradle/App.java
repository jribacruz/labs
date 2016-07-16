package org.gradle;

import java.io.IOException;

import jline.console.ConsoleReader;

public class App {

	public static void main(String[] args) throws IOException {
		ConsoleReader console = new ConsoleReader();
		console.setBellEnabled(false);
		console.setPrompt("> ");
		
		String ln = console.readLine();
		
		//System.out.println(ln);
	}

}
