package foo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import foo.domain.Bar;

@Repository
public interface BarRepository extends JpaRepository<Bar, Long> {

}
