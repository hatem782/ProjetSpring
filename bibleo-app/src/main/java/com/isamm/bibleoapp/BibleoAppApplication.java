package com.isamm.bibleoapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.isamm.bibleoapp.DatabaseFiller.Filler;

@SpringBootApplication
public class BibleoAppApplication {

	public static void main(String[] args) {
		// SpringApplication.run(BibleoAppApplication.class, args);
		ApplicationContext ctx = SpringApplication.run(BibleoAppApplication.class, args);
		Filler filler = new Filler(ctx);
		filler.FillDatabase();

	}

}