package foo.demo;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;

import foo.report.SimpleFirstReport;

public class TestReport {

	public static void main(String[] args) {
		try {
			FileOutputStream fos = new FileOutputStream(new File("target/demo.pdf"));
			SimpleFirstReport report = new SimpleFirstReport();
			report.build(fos);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}

}
