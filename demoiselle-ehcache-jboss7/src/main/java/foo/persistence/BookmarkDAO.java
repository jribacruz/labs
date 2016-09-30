package foo.persistence;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;

import br.gov.frameworkdemoiselle.stereotype.PersistenceController;
import br.gov.frameworkdemoiselle.template.JPACrud;
import foo.domain.Bookmark;
import foo.model.BookmarkModel;

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

	public List<BookmarkModel> findAllModels() {
		log.info("findAllModels()");
		TypedQuery<BookmarkModel> q = getEntityManager().createQuery("select new foo.model.BookmarkModel(o.id, o.link) from Bookmark o", BookmarkModel.class);
		return q.setHint("org.hibernate.cacheable", true).getResultList();
	}

}
