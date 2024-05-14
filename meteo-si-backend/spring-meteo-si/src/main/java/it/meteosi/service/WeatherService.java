package it.meteosi.service;

import java.util.List;

import it.meteosi.dto.WeatherDto;
import it.meteosi.dto.WeatherSaveDto;

public interface WeatherService {
	void saveData(WeatherSaveDto weatherDto);
	List<WeatherDto> getData(String email);
}
