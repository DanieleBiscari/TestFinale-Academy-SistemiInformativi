package it.meteosi.model;


import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "utente")
public class User {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "ID_U") 
	private int id;
	@Column(name = "Nome")
	private String name;
	@Column(name = "Cognome")
	private String lastName;
	@Column(name = "email")
	private String email;
	@Column(name = "password")
	private String password;
	
	
	
	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER) 
	@JoinTable
	( 
			name = "utente_meteo", 
			joinColumns = @JoinColumn(name = "FK_UM", referencedColumnName = "ID_U"),
			inverseJoinColumns = @JoinColumn(name = "FK_MU", referencedColumnName = "ID_M") 
			
	) 
	List<Weather> meteoDatas = new ArrayList<>();
	
	
	
	
	public List<Weather> getMeteoDatas() {
		return meteoDatas;
	}

	public void setMeteoDatas(List<Weather> meteoDatas) {
		this.meteoDatas = meteoDatas;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

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
