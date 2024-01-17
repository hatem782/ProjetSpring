package com.isamm.bibleoapp.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
	private String access_token ;
	private int code ; 
}
