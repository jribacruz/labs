package foo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import foo.domain.Foo;

@Repository
public interface FooRepository extends JpaRepository<Foo, Long> {

}
