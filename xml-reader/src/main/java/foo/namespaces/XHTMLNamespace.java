package foo.namespaces;

import java.util.Iterator;

import javax.xml.XMLConstants;
import javax.xml.namespace.NamespaceContext;

public class XHTMLNamespace implements NamespaceContext {

	@Override
	public String getNamespaceURI(String prefix) {
		return prefix.equals("p") ? "http://primefaces.org/ui" : XMLConstants.NULL_NS_URI;
	}

	@Override
	public String getPrefix(String namespaceURI) {
		return null;
	}

	@Override
	public Iterator getPrefixes(String namespaceURI) {
		return null;
	}

}
