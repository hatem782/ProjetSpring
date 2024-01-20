package com.isamm.bibleoapp.security;



import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.isamm.bibleoapp.security.service.JwtService;
import com.isamm.bibleoapp.security.service.UserInfoService;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// This class helps us to validate the generated jwt token
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoService userDetailsService;

    @Override
    protected void doFilterInternal( HttpServletRequest request,  HttpServletResponse response,  FilterChain filterChain) throws ServletException, IOException, IOException {
        // Récupérer le jeton JWT de l'en-tête Authorization
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null; 
         // Vérifier si l'en-tête Authorization est présent et commence par "Bearer "
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            // Extraire le jeton du préfixe "Bearer "
            token = authHeader.substring(7);
             // Extraire le nom d'utilisateur du jeton
            username = jwtService.extractUsername(token);
        }

        // Vérifier si le nom d'utilisateur est extrait du jeton et qu'aucune authentification n'est déjà présente dans le contexte de sécurité
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Charger les détails de l'utilisateur à partir du service utilisateur
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            // Valider le jeton JWT
            if (jwtService.validateToken(token, userDetails)) {
                // Créer une instance d'UsernamePasswordAuthenticationToken pour l'utilisateur authentifié
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                // Mettre à jour les détails d'authentification
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                System.out.println(authToken.toString());
                 // Mettre à jour le contexte de sécurité avec l'authentification réussie
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        // Passer la requête au filtre suivant dans la chaîne
        filterChain.doFilter(request, response);
        
    }
}