package foo;

public interface Action {

	@SuppressWarnings("restriction")
	default public String prompting() {
		System.out.println("Hello Action Extend");
		return null;
	}
	
	public void execute();
}
