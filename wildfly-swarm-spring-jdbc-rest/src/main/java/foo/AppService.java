package foo;

import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import foo.dao.FooDAO;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;

@Path("/hello")
public class AppService {

	@Inject
	private FooDAO dao;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response findAll() {
		return Response.ok(dao.findAll()).build();
	}
}