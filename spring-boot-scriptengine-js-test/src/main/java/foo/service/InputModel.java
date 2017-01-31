package foo.service;

public class InputModel {
	String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "InputModel [name=" + name + "]";
	}

}
