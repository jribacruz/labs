package foo;

import com.google.gson.Gson;

import foo.model.StyleClass;

/**
 * Hello world!
 *
 */
public class App2 {
	public static void main(String[] args) {
		StyleClass styleClass = new StyleClass();
		styleClass.setId("ponto.transmissao.table");
		styleClass.getStyle().put("font-size", 1);
		styleClass.getStyle().put("font-family", "Verdana");

		System.out.println(new Gson().toJson(styleClass));
	}
}
