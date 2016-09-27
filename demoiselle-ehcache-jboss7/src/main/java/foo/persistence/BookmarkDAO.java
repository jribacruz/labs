package foo.persistence;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;

import br.gov.frameworkdemoiselle.stereotype.PersistenceController;
import br.gov.frameworkdemoiselle.template.JPACrud;

import foo.domain.Bookmark;

@PersistenceController
public class BookmarkDAO extends JPACrud<Bookmark, Long> {
	
	private static final long serialVersionUID = 1L;
	
	@Inject
	private Logger log;

	@Override
	public List<Bookmark> findAll() {
		log.info("findAll()");
		TypedQuery<Bookmark> q = getEntityManager().createQuery("select o from Bookmark o", Bookmark.class);
		return q.setHint("org.hibernate.cacheable", true).getResultList();
	}
	
	
	
}
