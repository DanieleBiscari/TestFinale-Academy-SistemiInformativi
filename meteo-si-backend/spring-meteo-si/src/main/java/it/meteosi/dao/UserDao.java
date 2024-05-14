package it.meteosi.dao;


import org.springframework.data.repository.CrudRepository;
import it.meteosi.model.User;


public interface UserDao extends CrudRepository<User, Integer> {
	 boolean existsByEmail(String email);
	 User findByEmail(String email);
	 User findByEmailAndPassword(String email, String password);
}
