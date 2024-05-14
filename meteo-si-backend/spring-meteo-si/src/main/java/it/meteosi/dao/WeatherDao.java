package it.meteosi.dao;

import org.springframework.data.repository.CrudRepository;

import it.meteosi.model.Weather;

public interface WeatherDao extends CrudRepository<Weather, Integer> {

}
