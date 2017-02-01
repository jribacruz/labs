package foo.service;

import java.util.Iterator;
import java.util.Map;

import foo.model.EClass;

public class TemplateService {

	static public String merge(String data) {
		return "Hello: " + data;
	}

	@SuppressWarnings("restriction")
	public void merge(String template, jdk.nashorn.api.scripting.ScriptObjectMirror obj) {
		System.out.println("NAME: " + template);
		Iterator<Map.Entry<String, Object>> iter = obj.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry<String, Object> item = iter.next();
			System.out.println("K: " + item.getKey());
			System.out.println("V: " + item.getValue() + " CLASS: " + item.getValue().getClass());
		}
		System.out.println("==================");
	}

	public EClass get(String name) {
		return new EClass("XXX");
	}
}
