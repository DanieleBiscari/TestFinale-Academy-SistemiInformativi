package it.meteosi.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import it.meteosi.dto.WeatherDto;
import it.meteosi.dto.WeatherSaveDto;
import it.meteosi.filter.JWTTokenNedeed;
import it.meteosi.service.WeatherService;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("weather")
public class WeatherController {
	
	@Autowired
	private WeatherService weatherService;
	
	@JWTTokenNedeed
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/save")
	public Response save(@Valid @RequestBody WeatherSaveDto weatherDto) {
		try {
			weatherService.saveData(weatherDto);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@JWTTokenNedeed
	@GET
	@Path("/getAll")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllWeather(@RequestBody String email) {
		try {
			List<WeatherDto> weatherList = weatherService.getData(email);
			return Response.status(Response.Status.OK).entity(weatherList).build();

		} catch (Exception e) {

			return Response.status(Response.Status.BAD_REQUEST).entity("Errore caricamento utenti").build();
		}
	}
	
}
