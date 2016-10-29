package foo;

import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

import foo.model.Item;
import foo.model.Question;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) throws Exception {
		Serializer serializer = new Persister();
		
		Question question = new Question();
		question.setTitle("Acessibilidade");
		question.getItens().add(new Item("Possui escadas adaptadas.", "true"));
		
		serializer.write(question, System.out);
	}
}
