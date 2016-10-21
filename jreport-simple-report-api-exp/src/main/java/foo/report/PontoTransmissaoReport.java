package foo.report;

import foo.api.Impl;
import foo.api.SimpleReport;

public class PontoTransmissaoReport implements SimpleReport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void create(Impl impl) {
		impl.text();
	}

}
