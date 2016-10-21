package foo.impl;

import foo.api.Impl;

public class PdfImpl implements Impl {

	@Override
	public void text() {
		System.out.println("Geração em PDF");
	}

}
