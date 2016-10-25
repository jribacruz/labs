package foo.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class StyleClass implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Map<String, StyleElement> element;

	public Map<String, StyleElement> getStyleElement() {
		if (this.element == null) {
			this.element = new HashMap<>();
		}
		return element;
	}

	public void setStyleElement(Map<String, StyleElement> styleElement) {
		this.element = styleElement;
	}

}
