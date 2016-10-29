package foo.model;

import java.util.ArrayList;
import java.util.List;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import org.simpleframework.xml.ElementList;
import org.simpleframework.xml.Root;

@Root
public class Question {

	@Attribute
	private String title;

	@ElementList(inline=true)
	private List<Item> itens;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Item> getItens() {
		if (this.itens == null) {
			this.itens = new ArrayList<>();
		}
		return itens;
	}

	public void setItens(List<Item> itens) {
		this.itens = itens;
	}

}
