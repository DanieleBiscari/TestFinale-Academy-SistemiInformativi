package it.meteosi.controller;

import java.security.Key;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.meteosi.dto.UserDeleteDto;
import it.meteosi.dto.UserLoginRequestDto;
import it.meteosi.dto.UserLoginResponseDto;
import it.meteosi.dto.UserRegisterDto;
import it.meteosi.filter.JWTTokenNedeed;
import it.meteosi.model.User;
import it.meteosi.service.UserService;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/register")
	public Response register(@Valid @RequestBody UserRegisterDto userDto) {
		try {
			if (!Pattern.matches("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}", userDto.getPassword())) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}
			if (userService.existsByEmail(userDto.getEmail())) {
				return Response.status(Response.Status.BAD_REQUEST).build();
			}

			userService.register(userDto);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(@RequestBody UserLoginRequestDto userLoginDto) {
		try {
			if (userService.login(userLoginDto)) {
				return Response.ok(createToken(userLoginDto.getEmail())).build();
			}
			return Response.status(Response.Status.BAD_REQUEST).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	private UserLoginResponseDto createToken(String email) {
		byte[] secretKey = "danielebscdnl12341412!123456781111111111111111".getBytes();
		Key key = Keys.hmacShaKeyFor(secretKey);
		User user = userService.findByEmail(email);

		Map<String, Object> map = new HashMap<>();
		map.put("email", email);
		map.put("name", user.getName());
		map.put("lastName", user.getLastName());
		map.put("isLogged", true);

//		List<String> ruoli = new ArrayList<>();
//		for (Ruolo ruolo : utente.getRuoli()) {
//			ruoli.add(ruolo.getTipologia().name()); 
//		}
//		map.put("ruoli", ruoli);
		
		Date dateStart = new Date();
		Date dateEnd  = Timestamp.valueOf(LocalDateTime.now().plusMinutes(15L));
		String jwtToken = Jwts.builder()
								.setClaims(map)
								.setIssuer("http://localhost:8080")
								.setIssuedAt(dateStart)
								.setExpiration(dateEnd)
								.signWith(key)
								.compact(); 

		UserLoginResponseDto token = new UserLoginResponseDto();
		token.setToken(jwtToken);
		token.setTokenCreationTime(dateStart);
		token.setTtl(dateEnd);

		return token;
	}
	
	@JWTTokenNedeed
	@DELETE
	@Path("/delete")
	public Response delete(@RequestBody UserDeleteDto userDelete) {
		try {
			userService.deleteUserFromEmail(userDelete);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
}
