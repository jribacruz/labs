package foo.business.validator;

import br.jus.tre_pa.jbase.jsf.validation.AbstractValidator;
import br.jus.tre_pa.jbase.jsf.validation.exception.BusinessValidationException;
import foo.domain.Bookmark;

/**
 * 
 * @author jcruz
 *
 */
public class BookmarkHasLengthLinkValidator extends AbstractValidator<Bookmark> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@Override
	public void validate(Bookmark bean) throws BusinessValidationException {
		failIsBlank(bean.getLink(), "O Bookmark deve possuir um link!");
	}
}
