package foo;

import spark.Request;
import spark.Response;
import spark.Route;

public class IndexRoute implements Route {

	@Override
	public Object handle(Request req, Response res) throws Exception {
		return "Hello";
	}

}
