package com.isamm.bibleoapp;

import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

// import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.Entity.Role;
// import com.isamm.bibleoapp.dao.AdminDao;
import com.isamm.bibleoapp.dao.RoleDao;



@SpringBootApplication
public class BibleoAppApplication {

	public static void main(String[] args) {
		// SpringApplication.run(BibleoAppApplication.class, args);
		ApplicationContext ctx=SpringApplication.run(BibleoAppApplication.class, args);

		// ########################################################
		// ########################################################
		// HETE WE CREATE ROLES OF USERS
		RoleDao roleDao=ctx.getBean(RoleDao.class);
		ArrayList<Role> roles = (ArrayList<Role>) roleDao.findAll();
		if(roles.size() == 0){
			roleDao.save(new Role("ADMIN", "ADMINISTRATOR"));
			roleDao.save(new Role("USER", "SIMPLE USER"));
		}
		// ########################################################
		// ########################################################


		// ########################################################
		// ########################################################
		// HETE WE CREATE ROLES OF USERS
		// AdminDao adminDao=ctx.getBean(AdminDao.class);
		// ArrayList<Admin> admins = (ArrayList<Admin>) adminDao.findAll();
		// if(admins.size() == 0){
		// 	System.out.println("We need to create an admin");
		// }
		// ########################################################
		// ########################################################
		
	}

}
