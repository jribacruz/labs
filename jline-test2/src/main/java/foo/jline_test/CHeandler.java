package foo.jline_test;

import java.util.Arrays;
import java.util.List;

import jline.console.completer.Completer;

public class CHeandler implements Completer {

	@Override
	public int complete(String arg0, int arg1, List<CharSequence> candidates) {
		candidates.addAll(Arrays.asList("a", "b", "c"));
		// System.out.println("ARG0: " + arg0);
		// System.out.println("ARG1: " + arg1);
		return 0;
	}

}
