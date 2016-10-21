package foo.impl;

import foo.api.Impl;

public class WordImpl implements Impl {

	@Override
	public void text() {
		System.out.println("Geração em WORD");
	}

}
