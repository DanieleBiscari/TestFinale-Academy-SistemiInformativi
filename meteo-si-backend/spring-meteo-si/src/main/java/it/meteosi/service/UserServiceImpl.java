package it.meteosi.service;

import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.meteosi.dao.UserDao;
import it.meteosi.dto.UserDeleteDto;
import it.meteosi.dto.UserLoginRequestDto;
import it.meteosi.dto.UserRegisterDto;
import it.meteosi.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	public void register(UserRegisterDto userDto) {
		User user = new User();
		user.setName(userDto.getName());
		user.setLastName(userDto.getLastName());
		user.setEmail(userDto.getEmail());
		String sha256hex = DigestUtils.sha256Hex(userDto.getPassword());
		user.setPassword(sha256hex);
		userDao.save(user);
	}

	@Override
	public boolean existsByEmail(String email) {
		return userDao.existsByEmail(email);
	}

	@Override
	public boolean login(UserLoginRequestDto userDto) {
		User user = new User();
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		String passwordHash = DigestUtils.sha256Hex(user.getPassword());
		User credenzialiUtente = userDao.findByEmailAndPassword(user.getEmail(), passwordHash);

		return credenzialiUtente != null ? true : false;
	}

	@Override
	public User findByEmail(String email) {
		return userDao.findByEmail(email);
	}

	@Override
	public void deleteUserFromEmail(UserDeleteDto userDto) {
		User user = userDao.findByEmail(userDto.getEmail());
		Optional<User> userOptional = userDao.findById(user.getId());
		if (userOptional.isPresent()) {
			userDao.delete(userOptional.get());
		}
	}

}
