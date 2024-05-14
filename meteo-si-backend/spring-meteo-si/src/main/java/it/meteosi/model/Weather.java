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
@Table(name = "meteo")
public class Weather {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "ID_M") 
	private int id;
	@Column(name = "Temperatura")
	private double temperature;
	@Column(name = "Temperatura_apparente")	
	private double temperatureApparent;
	@Column(name = "Umidita")	
	private double umidity;
	@Column(name = "Longitudine")
	private double longitude;
	@Column(name = "Latitudine")
	private double latitude;
	
	
	@ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER) 
	@JoinTable
	( 
			name = "utente_meteo", 
			joinColumns = @JoinColumn(name = "FK_MU", referencedColumnName = "ID_M"),
			inverseJoinColumns = @JoinColumn(name = "FK_UM", referencedColumnName = "ID_U") 
			
	) 
	List<User> users = new ArrayList<>();
	
	
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getTemperature() {
		return temperature;
	}
	public void setTemperature(double temperature) {
		this.temperature = temperature;
	}
	public double getTemperatureApparent() {
		return temperatureApparent;
	}
	public void setTemperatureApparent(double temperatureApparent) {
		this.temperatureApparent = temperatureApparent;
	}
	public double getUmidity() {
		return umidity;
	}
	public void setUmidity(double umidity) {
		this.umidity = umidity;
	}
	
	
}
