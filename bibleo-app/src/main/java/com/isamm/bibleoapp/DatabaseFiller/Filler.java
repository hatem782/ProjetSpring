package com.isamm.bibleoapp.DatabaseFiller;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.context.ApplicationContext;

import com.isamm.bibleoapp.Entity.Adherant;
import com.isamm.bibleoapp.Entity.Admin;
import com.isamm.bibleoapp.Entity.Auteur;
import com.isamm.bibleoapp.Entity.AuteurStatut;
import com.isamm.bibleoapp.Entity.Langue;
import com.isamm.bibleoapp.Entity.Livre;
import com.isamm.bibleoapp.Entity.Role;
import com.isamm.bibleoapp.Entity.User;
import com.isamm.bibleoapp.dao.AuteurDao;
import com.isamm.bibleoapp.dao.LivreDao;
import com.isamm.bibleoapp.dao.RoleDao;
import com.isamm.bibleoapp.dao.UserDao;

public class Filler {
    ApplicationContext ctx = null;

    public Filler(ApplicationContext ctx) {
        this.ctx = ctx;
    }

    public void FillDatabase() {
        LivreDao livreDao = ctx.getBean(LivreDao.class);
        RoleDao roleDao = ctx.getBean(RoleDao.class);
        UserDao userDao = ctx.getBean(UserDao.class);
        AuteurDao auteurDao = ctx.getBean(AuteurDao.class);
        Langue langue = Langue.Arabe;
        AuteurStatut retourneValue = AuteurStatut.Vivant;

        // ########################################################
        // ########################################################
        // #################### ROLES CREATION ####################
        Role role_admin = new Role("ADMIN", "ADMINISTRATOR");
        roleDao.save(role_admin);
        Role role_user = new Role("USER", "SIMPLE USER");
        roleDao.save(role_user);
        // #################### ROLES CREATION ####################
        // ########################################################
        // ########################################################

        // ########################################################
        // ########################################################
        // ################### ADMINS CREATION ####################
        Admin admin1 = new Admin(
                "Hatem Admin",
                "hatem@admin.com",
                "hatem@admin.com",
                "58217529",
                "Manouba, Slimen Kahya",
                new Date(),
                role_admin,
                50f,
                new Date());
        userDao.save(admin1);

        Admin admin2 = new Admin(
                "Ilhem Admin",
                "ilhem@admin.com",
                "ilhem@admin.com",
                "58217529",
                "Manouba, Slimen Kahya",
                new Date(),
                role_admin,
                50f,
                new Date());
        userDao.save(admin2);
        // ################### ADMINS CREATION ####################
        // ########################################################
        // ########################################################

        // ########################################################
        // ########################################################
        // #################### USERS CREATION ####################
        User user1 = new Adherant(
                "Hatem User",
                "hatem@user.com",
                "hatem@user.com",
                "58217529",
                "Manouba, Slimen Kahya",
                new Date(),
                role_user,
                new Date());
        userDao.save(user1);

        User user2 = new Adherant(
                "Ilhem User",
                "ilhem@user.com",
                "ilhem@user.com",
                "58217529",
                "Manouba, Slimen Kahya",
                new Date(),
                role_user,
                new Date());
        userDao.save(user2);
        // #################### USERS CREATION ####################
        // ########################################################
        // ########################################################

        // ########################################################
        // ########################################################
        // ########################################################
        // ########################################################

        // ########################################################
        // ########################################################
        // ################### AUTEURS CREATION ###################
        Auteur auteur1 = new Auteur(
                "Hatem Auteur",
                "hatem",
                new Date(0),
                "tunis",
                retourneValue);
        auteurDao.save(auteur1);

        Auteur auteur2 = new Auteur(
                "Ilhem Auteur",
                "Ilhem", new Date(0),
                "tunis",
                retourneValue);
        auteurDao.save(auteur2);
        // ################### AUTEURS CREATION ###################
        // ########################################################
        // ########################################################

        // ########################################################
        // ########################################################
        // ################### LIVRES CREATION ####################
        Livre livre1 = new Livre(
                "titre1",
                new Date(0),
                "isbn1",
                "desc1",
                12,
                11,
                "imgurl",
                "genre1",
                langue,
                auteur1);
        livreDao.save(livre1);

        Livre livre2 = new Livre(
                "titre2",
                new Date(0),
                "isbn2",
                "desc2",
                12,
                11,
                "imgurl2",
                "genre2",
                langue,
                auteur2);
        livreDao.save(livre2);
        // ################### LIVRES CREATION ####################
        // ########################################################
        // ########################################################

    }
}
