package foo;

import io.vertx.core.AbstractVerticle;
import io.vertx.ext.web.Router;

/**
 * Hello world!
 *
 */
public class App extends AbstractVerticle {

	// Convenience method so you can run it in your IDE
	public static void main(String[] args) {
		Runner.runExample(App.class);
	}

	@Override
	public void start() throws Exception {

		Router router = Router.router(vertx);

		router.route().handler(routingContext -> {
			routingContext.response().putHeader("content-type", "text/html").end("Hello World!");
		});

		vertx.createHttpServer().requestHandler(router::accept).listen(8080);
	}
}
