package foo.service;

public class TemplateService {

	static public String merge(String data) {
		return "Hello: " + data;
	}

	@SuppressWarnings("restriction")
	static public void input(jdk.nashorn.api.scripting.ScriptObjectMirror obj) {
		System.out.println(obj.get("name"));

		System.out.println("Chamando Validator: " + obj.callMember("validator"));
	}

	public String get(String name) {
		return "Retornando template: " + name;
	}
}
