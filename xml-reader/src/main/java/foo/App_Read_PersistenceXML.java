package foo;

import java.io.IOException;
import java.io.InputStream;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

/**
 * Hello world!
 *
 */
public class App_Read_PersistenceXML {

	public static void main(String[] args)
			throws ParserConfigurationException, SAXException, IOException, XPathExpressionException {
		InputStream inputStream = App_Read_PersistenceXML.class.getResourceAsStream("/persistence.xml");
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
		Document doc = dBuilder.parse(inputStream);
		XPathFactory xPathfactory = XPathFactory.newInstance();
		XPath xpath = xPathfactory.newXPath();
		

		XPathExpression expr1 = xpath.compile("//class");
		NodeList classNodes = (NodeList) expr1.evaluate(doc, XPathConstants.NODESET);

		for (int i = 0; i < classNodes.getLength(); i++) {
			System.out.println(classNodes.item(i).getTextContent());
		}
		
		XPathExpression expr2 = xpath.compile("//property");
		NodeList propertyNodes = (NodeList) expr2.evaluate(doc, XPathConstants.NODESET);
		
		for (int i = 0; i < propertyNodes.getLength(); i++) {
			System.out.println(propertyNodes.item(i).getAttributes().getNamedItem("name"));
			System.out.println(propertyNodes.item(i).getAttributes().getNamedItem("value"));
			//System.out.println(classNodes.item(i).getTextContent());
		}
		
		XPathExpression expr3 = xpath.compile("//persistence-unit");
		NodeList persistenceUnitNodes = (NodeList) expr3.evaluate(doc, XPathConstants.NODESET);
		for (int i = 0; i < persistenceUnitNodes.getLength(); i++) {
			System.out.println(persistenceUnitNodes.item(i).getAttributes().getNamedItem("name"));
			System.out.println(persistenceUnitNodes.item(i).getAttributes().getNamedItem("transaction-type"));
			//System.out.println(classNodes.item(i).getTextContent());
		}

	}
}
