package foo;

import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;

import foo.model.Property;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) {
		Property property1 = new Property();
		property1.setKey("role.abc");
		property1.setValue(1);
		
		Property property2 = new Property();
		property2.setKey("role.xyz");
		property2.setValue(3);
		
		List<Property> properties = Arrays.asList(property1, property2);
		
		System.out.println(new Gson().toJson(properties));
	}
}
