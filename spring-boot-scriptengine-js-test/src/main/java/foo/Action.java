package foo;

public interface Action {

	@SuppressWarnings("restriction")
	default public String extend(jdk.nashorn.api.scripting.ScriptObjectMirror obj) {
		System.out.println("Hello Action Extend");
		return null;
	}
	
	public void execute();
}
