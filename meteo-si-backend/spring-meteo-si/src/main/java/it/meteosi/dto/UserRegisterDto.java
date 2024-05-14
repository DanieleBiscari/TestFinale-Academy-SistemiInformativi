package it.meteosi.dto;

import jakarta.validation.constraints.Pattern;

public class UserRegisterDto {
	@Pattern(regexp = "[a-zA-Z\\s']{4,20}", message = "nome non corretto")
	private String name;
	@Pattern(regexp = "[a-zA-Z\\s']{4,20}", message = "cognome non corretto")
	private String lastName;
	@Pattern(regexp = "[A-Za-z0-9\\.\\+_-]+@[A-Za-z0-9\\._-]+\\.[A-Za-z]{2,24}", message = "email non corretta")
	private String email;
	private String password;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
