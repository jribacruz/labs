package foo.api;

import java.io.Serializable;

/**
 * 
 * @author jcruz
 *
 */
public interface SimpleReport extends Serializable {

	void create(Impl impl);
}
