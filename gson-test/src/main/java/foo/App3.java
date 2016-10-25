package foo;

import java.io.InputStreamReader;
import java.io.Reader;

import com.google.gson.Gson;

import foo.model.StyleClass;

/**
 * Hello world!
 *
 */
public class App3 {
	public static void main(String[] args) {

		Gson gson = new Gson();
		Reader fileReader = new InputStreamReader(App3.class.getResourceAsStream("/demo.report.style.json"));
		StyleClass styleClass = gson.fromJson(fileReader, StyleClass.class);
		
		System.out.println(styleClass);
	}
}
