package foo;

import foo.impl.PdfImpl;
import foo.impl.WordImpl;
import foo.report.PontoTransmissaoReport;

/**
 * Hello world!
 *
 */
public class App {
	public static void main(String[] args) {
		PontoTransmissaoReport report = new PontoTransmissaoReport();
		
		JreportEngine.generate(report, new PdfImpl());
		JreportEngine.generate(report, new WordImpl());
	}
}
