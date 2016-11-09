package foo.model;

import java.util.List;

import foo.domain.Foo;

public class FooModel {

	private List<Foo> foos;

	private int total;

	public List<Foo> getFoos() {
		return foos;
	}

	public void setFoos(List<Foo> foos) {
		this.foos = foos;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

}
