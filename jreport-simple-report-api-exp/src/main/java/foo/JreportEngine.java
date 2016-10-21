package foo;

import foo.api.Impl;
import foo.api.SimpleReport;

public class JreportEngine {

	public static void generate(SimpleReport sp, Impl impl) {
		sp.create(impl);
	}

}
