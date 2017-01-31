package foo.service;

public class TemplateService {

	static public String merge(String data) {
		return "Hello: " + data;
	}
	
	static public void input(jdk.nashorn.api.scripting.ScriptObjectMirror obj) {
		System.out.println(obj.get("name"));
	}
}
