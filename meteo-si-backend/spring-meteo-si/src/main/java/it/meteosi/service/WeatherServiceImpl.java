package it.meteosi.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import it.meteosi.dao.WeatherDao;
import it.meteosi.dto.WeatherDto;
import it.meteosi.dto.WeatherSaveDto;
import it.meteosi.model.Weather;

@Service
public class WeatherServiceImpl implements WeatherService {
	private ModelMapper modelMapper = new ModelMapper();

	@Autowired
	private WeatherDao weatherDao;
	
	@Override
	public void saveData(WeatherSaveDto weatherDto) {
		Weather weather = new Weather();
		weather.setTemperature(weatherDto.getTemperature());
		weather.setTemperatureApparent(weatherDto.getTemperatureApparent());
		weather.setUmidity(weatherDto.getUmidity());
		weather.setLatitude(weatherDto.getLatitude());
		weather.setLongitude(weatherDto.getLongitude());
		weatherDao.save(weather);
	}
	
	public List<WeatherDto> getData(String email) {
		List<Weather> weather = (List<Weather>) weatherDao.findAll();
		List<WeatherDto> weatherDto = new ArrayList<>();
		weather.forEach(w -> weatherDto.add(modelMapper.map(w, WeatherDto.class)));
		
		return weatherDto;
	}

}
