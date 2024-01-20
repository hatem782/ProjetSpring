package com.isamm.bibleoapp.security.service;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

    // Clé secrète pour signer le jeton (cette clé devrait être gardée secrète dans un environnement de production)
    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
   
    // Générer un jeton JWT à partir des détails de l'utilisateur
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", getUserIdFromUserDetails(userDetails));
        claims.put("roles", getRolesFromUserDetails(userDetails));
        return createToken(claims, userDetails.getUsername());
    }
 
    // Créer un jeton JWT avec les revendications spécifiées
    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 5000 * 90 * 60))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }
    
     // Extraire l'ID de l'utilisateur à partir des détails de l'utilisateur
    private String getUserIdFromUserDetails(UserDetails userDetails) {
        if (userDetails instanceof UserInfoDetails) {
            return ((UserInfoDetails) userDetails).getId();
        }
        return null;
    }


     // Extraire les rôles de l'utilisateur à partir des détails de l'utilisateur
    private Collection<String> getRolesFromUserDetails(UserDetails userDetails) {
    	
    	
        return userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
    }

      // Obtenir la clé de signature à partir de la clé secrète
    public Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }


     // Extraire le nom d'utilisateur à partir du jeton JWT
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }


     // Extraire la date d'expiration à partir du jeton JWT
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Extraire une revendication spécifique à partir du jeton JWT en utilisant le résolveur de revendications fourni
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extraire toutes les revendications du jeton JWT
    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Vérifier si le jeton JWT est expiré
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Valider le jeton JWT par rapport aux détails de l'utilisateur
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


}