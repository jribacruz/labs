package foo.service;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import foo.domain.Bar;
import foo.repository.BarRepository;

@Service
public class BarService implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Autowired
	private BarRepository barRepository;

	@Transactional
	public Bar insert(Bar bar) {
		return barRepository.saveAndFlush(bar);
	}

	public List<Bar> findAll() {
		return barRepository.findAll();
	}

}
