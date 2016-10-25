package foo.model;

import java.util.HashMap;
import java.util.Map;

public class StyleClass {

	private String id;

	private Map<String, Object> style;

	public String getId() {
		return id;
	}

	public void setId(String key) {
		this.id = key;
	}

	public Map<String, Object> getStyle() {
		if (this.style == null) {
			this.style = new HashMap<>();
		}
		return style;
	}

	public void setStyle(Map<String, Object> property) {
		this.style = property;
	}

	@Override
	public String toString() {
		return "StyleClass [id=" + id + ", style=" + style + "]";
	}

}
