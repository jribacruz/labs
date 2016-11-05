package foo.controller;

import java.io.Serializable;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Controller do index.
 * 
 * @author jcruz
 *
 */
@Controller
public class IndexCT implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 * @param name
	 * @param model
	 * @return
	 */
	@RequestMapping("/index")
	public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name, Model model) {
		model.addAttribute("name", name);
		return "index";
	}
}
