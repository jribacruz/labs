package foo.report;

import static net.sf.dynamicreports.report.builder.DynamicReports.cmp;
import static net.sf.dynamicreports.report.builder.DynamicReports.report;

import java.io.FileOutputStream;

import net.sf.dynamicreports.report.exception.DRException;

public class SimpleFirstReport {

	public void build(FileOutputStream fileOutputStream) {
		try {
			//// @formatter:off
			report()
				.addTitle(cmp.text("Tribunal Regional Eleitoral do Pará"))
			.toPdf(fileOutputStream);
			// @formatter:on
		} catch (DRException e) {
			e.printStackTrace();
		}
	}
}
