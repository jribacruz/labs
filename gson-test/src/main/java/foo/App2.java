package foo;

import com.google.gson.Gson;

import foo.model.StyleClass;
import foo.model.StyleElement;

/**
 * Hello world!
 *
 */
public class App2 {
	public static void main(String[] args) {
		StyleClass styleClass = new StyleClass();
		StyleElement element = new StyleElement();
		element.getStyle().put("font-size", 1);
		element.getStyle().put("font-family", "Verdana");

		styleClass.getStyleElement().put("#ponto.transmissao.id", element);

		System.out.println(new Gson().toJson(styleClass));
	}
}
