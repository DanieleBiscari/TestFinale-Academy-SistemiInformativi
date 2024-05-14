package it.meteosi.filter;

import java.io.IOException;
import java.security.Key;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ResourceInfo;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@JWTTokenNedeed
@Provider
public class JWTTokenNeededFilter implements ContainerRequestFilter {
	
	@Context 
	private ResourceInfo resourceInfo;

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		
		String authorizationHeader =  requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
		if(authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			throw new NotAuthorizedException("Authorization header must be provided");
		}
		
		String token = authorizationHeader.substring("Bearer".length()).trim();
			
		try {
			byte[] secretKey = "danielebscdnl12341412!123456781111111111111111".getBytes();
			Key key =  Keys.hmacShaKeyFor(secretKey);
			Jws<Claims> claims =  Jwts.parserBuilder()
									.setSigningKey(key)
									.build()
									.parseClaimsJws(token);
			Claims body = claims.getBody();
			
			boolean isLogged = body.get("isLogged", Boolean.class);
			if(!isLogged) {
				requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
			}
			
		} catch (Exception e) {
			requestContext.abortWith(Response.status(Response.Status.UNAUTHORIZED).build());
		}
	}
	
}
