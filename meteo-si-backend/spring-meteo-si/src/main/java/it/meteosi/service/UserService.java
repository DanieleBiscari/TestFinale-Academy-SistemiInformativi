package it.meteosi.service;

import it.meteosi.dto.UserDeleteDto;
import it.meteosi.dto.UserLoginRequestDto;
import it.meteosi.dto.UserRegisterDto;
import it.meteosi.model.User;

public interface UserService {
	void register(UserRegisterDto userDto);
	boolean login(UserLoginRequestDto userDto);
	User findByEmail(String email);
	void deleteUserFromEmail(UserDeleteDto userDto);
	
	boolean existsByEmail(String email);
}
