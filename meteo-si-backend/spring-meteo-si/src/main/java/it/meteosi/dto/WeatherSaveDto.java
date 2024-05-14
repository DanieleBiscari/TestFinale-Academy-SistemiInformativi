package it.meteosi.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public class WeatherSaveDto {
	@Min(value = (long) -273.15)
	@Max(value = (long) 4000)
	private double  temperature;
	@Min(value = (long) -273.15)
	@Max(value = (long) 4000)
	private double  temperatureApparent;
	@Min(value = 0)
	@Max(value = 100)
	private double  umidity;
	private double longitude;
	private double latitude;
	
	
	
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
