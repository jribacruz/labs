package foo;

import spark.Spark;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) {
		/**
		 * Porta padrão 4567
		 */
		Spark.get("/hello", (req, res) -> "Hello World");
	}
}
