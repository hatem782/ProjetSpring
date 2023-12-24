package com.isamm.bibleoapp;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.isamm.bibleoapp.Entity.Adherant;
import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.Entity.Auteur;
import com.isamm.bibleoapp.Entity.AuteurStatut;
import com.isamm.bibleoapp.Entity.Commentaire;
import com.isamm.bibleoapp.Entity.Emprunt;
import com.isamm.bibleoapp.Entity.Langue;
import com.isamm.bibleoapp.Entity.Livre;
import com.isamm.bibleoapp.Entity.Role;
import com.isamm.bibleoapp.Entity.User;
import com.isamm.bibleoapp.dao.AuteurDao;
import com.isamm.bibleoapp.dao.CommentaireDao;
import com.isamm.bibleoapp.dao.EmpruntDao;
import com.isamm.bibleoapp.dao.LivreDao;
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
			userDao.save(new Admin(
				"Hatem Admin", "hatem@admin.com", "hatem@admin.com", "58217529", "Manouba, Slimen Kahya", new Date(),role_admin , 50f, new Date()));
			userDao.save(new Admin(
				"Ilhem Admin", "ilhem@admin.com", "ilhem@admin.com", "58217529", "Manouba, Slimen Kahya", new Date(),role_admin , 50f, new Date()));
		}

		// HERE WE CREATE 2 USERS IF THERE IS NO USERS
		ArrayList<User> users = (ArrayList<User>) userDao.findAllUsers();
		if(users.size() == 0){
			userDao.save(new Adherant(
				"Hatem User", "hatem@user.com", "hatem@user.com", "58217529", "Manouba, Slimen Kahya", new Date(), role_user, new Date()
			));
			userDao.save(new Adherant(
				"Ilhem User", "ilhem@user.com", "ilhem@user.com", "58217529", "Manouba, Slimen Kahya", new Date(), role_user, new Date()
			));




		AuteurStatut retourneValue = AuteurStatut.Vivant;
		  AuteurDao auteurDao=ctx.getBean(AuteurDao.class);
		// HERE WE CREATE 2auteur
			auteurDao.save(new Auteur(
				"Hatem Auteur", "hatem", new Date(0), "tunis", retourneValue
			));
			auteurDao.save(new Auteur(
				"Ilhem Auteur", "Ilhem", new Date(0), "tunis", retourneValue
			));
		

		  EmpruntDao empruntDao=ctx.getBean(EmpruntDao.class);
		// HERE WE CREATE 2auteur
	// 		empruntDao.save(new Emprunt(
	// 			new Date(0), 12
	// 		));
	// empruntDao.save(new Emprunt(
	// 			new Date(0), 12
	// 		));


			 // ########################################################
		// ########################################################

     
	Langue langue = Langue.Arabe;
			   LivreDao livreDao=ctx.getBean(LivreDao.class);
		 
		// HERE WE CREATE 2auteur
			// livreDao.save(new Livre(
			// 	"titre1", new Date(0), "isbn1","desc1",12 , 11,
			// 	 "imgurl","genre1",langue
			// ));


				
		}
		// ########################################################
		// ########################################################
		


		// //commentaire
		//  CommentaireDao commentaireDao =ctx.getBean(CommentaireDao.class);
		//  commentaireDao.save(new Commentaire(
		// 		"objet", "contenu1",true,"raisonSign"
		// 	));
		// 	commentaireDao.save(new Commentaire(
		// 		"objet2", "contenu2",false,"raisonSign"
		// 	));
	}

}