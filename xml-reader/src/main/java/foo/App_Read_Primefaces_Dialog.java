package foo;

import java.io.IOException;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.xml.sax.SAXException;

import foo.namespaces.XHTMLNamespace;

/**
 * Hello world!
 *
 */
public class App_Read_Primefaces_Dialog {

	public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
		InputStream inputStream = App_Read_Primefaces_Dialog.class.getResourceAsStream("/pontoMngtEditDialog.xhtml");
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		dbFactory.setNamespaceAware(true);
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();

		Document doc = dBuilder.parse(inputStream);
		XPathFactory xPathfactory = XPathFactory.newInstance();
		XPath xpath = xPathfactory.newXPath();

		xpath.setNamespaceContext(new XHTMLNamespace());
		// XPathExpression expr1 = xpath.compile("//p:dialog");
		Node dialog = (Node) xpath.evaluate("//p:dialog", doc, XPathConstants.NODE);

		// System.out.println(dialog);
		System.out.println(dialog.getAttributes().getNamedItem("id").getTextContent());
		// System.out.println();

	}
}
