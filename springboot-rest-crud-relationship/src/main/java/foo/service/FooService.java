package foo.service;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import foo.domain.Foo;
import foo.repository.FooRepository;

@Service
public class FooService implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private FooRepository fooRepository;

	@Transactional
	public Foo insert(Foo foo) {
		foo.getBars().stream().filter(bar -> bar.getId() != null);
		return fooRepository.save(foo);
	}

	public List<Foo> findAll() {
		return fooRepository.findAll();
	}

	public Foo find(Long id) {
		return fooRepository.findOne(id);
	}

}
