package com.isamm.bibleoapp;

import java.sql.Date;
import java.util.ArrayList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.isamm.bibleoapp.Entity.Role;
import com.isamm.bibleoapp.Entity.User;
import com.isamm.bibleoapp.dao.RoleDao;
import com.isamm.bibleoapp.dao.UserDao;



@SpringBootApplication
public class BibleoAppApplication {

	public static void main(String[] args) {
		// SpringApplication.run(BibleoAppApplication.class, args);
		ApplicationContext ctx=SpringApplication.run(BibleoAppApplication.class, args);

		// ########################################################
		// ########################################################
		// HERE WE CREATE ROLES OF USERS
		RoleDao roleDao=ctx.getBean(RoleDao.class);
		ArrayList<Role> roles = (ArrayList<Role>) roleDao.findAll();
		Role role_admin = new Role("ADMIN", "ADMINISTRATOR");
		Role role_user = new Role("USER", "SIMPLE USER");
		if(roles.size() == 0){
			roleDao.save(role_admin);
			roleDao.save(role_user);
		}
		// ########################################################
		// ########################################################


		// ########################################################
		// ########################################################
		// HERE WE CREATE 2 ADMINS IF THERE IS NO ADMINS
		UserDao userDao=ctx.getBean(UserDao.class);
		ArrayList<User> admins = (ArrayList<User>) userDao.findAllAdmins();
		if(admins.size() == 0){
			userDao.save(new User(
				"Hatem Admin", "hatem@admin.com", "hatem@admin.com", "58217529", "Manouba, Slimen Kahya", new Date(0),role_admin , 50f, new Date(0)
			));
			userDao.save(new User(
				"Ilhem Admin", "ilhem@admin.com", "ilhem@admin.com", "58217529", "Manouba, Slimen Kahya", new Date(0),role_admin , 50f, new Date(0)
			));
		}

		// HERE WE CREATE 2 USERS IF THERE IS NO USERS
		ArrayList<User> users = (ArrayList<User>) userDao.findAllUsers();
		if(users.size() == 0){
			userDao.save(new User(
				"Hatem User", "hatem@user.com", "hatem@user.com", "58217529", "Manouba, Slimen Kahya", new Date(0), role_user, new Date(0)
			));
			userDao.save(new User(
				"Ilhem User", "ilhem@user.com", "ilhem@user.com", "58217529", "Manouba, Slimen Kahya", new Date(0), role_user, new Date(0)
			));
				
		}
		// ########################################################
		// ########################################################
		
	}

}
