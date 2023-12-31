package com.isamm.bibleoapp.DatabaseFiller;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

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
                PasswordEncoder passwordEncoder = ctx.getBean(PasswordEncoder.class);
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
                                passwordEncoder.encode("hatem@admin.com"),
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
                                passwordEncoder.encode("ilhem@admin.com"),
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
                                passwordEncoder.encode("hatem@user.com"),
                                "58217529",
                                "Manouba, Slimen Kahya",
                                new Date(),
                                role_user,
                                new Date());
                userDao.save(user1);

                User user2 = new Adherant(
                                "Ilhem User",
                                "ilhem@user.com",
                                passwordEncoder.encode("ilhem@user.com"),
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
                                "Modeling Structured Finance Cash Flows With Microsoft Excel",
                                new Date(0),
                                "553578",
                                "During my first analytics position after graduate school, I asked a vice president at our company what the best way was to learn how his group modelled transactions. ",
                                12,
                                11,
                                "https://www.junkybooks.com/administrator/bookimages/63547955185676.26019912.jpg",
                                "genre1",
                                langue,
                                auteur1);
                livreDao.save(livre1);

                Livre livre2 = new Livre(
                                "Mathematics Of Bioinformatics: Theory, Methods And Applications",
                                new Date(0),
                                "368952",
                                "Recent progress in the determination of genomic sequences has yielded many millions of gene sequences. But what do these sequences tell us, and what generalities and rules are governed by them?",
                                12,
                                11,
                                "https://www.junkybooks.com/administrator/bookimages/640e4fb486d068.50794721.jpg",
                                "Math",
                                langue,
                                auteur2);
                livreDao.save(livre2);

                Livre livre3 = new Livre(
                                "Never Let Me Go",
                                new Date(0),
                                "175678",
                                "In Kazuo Ishiguro's 1995 novel The Unconsoled, Ryder, a pianist, is due to give an important concert in a foreign city. The novel is written in the form of an extended anxiety dream",
                                12,
                                5,
                                "https://www.junkybooks.com/administrator/bookimages/65077056c47326.57519022.jpg",
                                "Romance",
                                langue,
                                auteur2);
                livreDao.save(livre3);

                Livre livre4 = new Livre(
                                "The Most In Depth Self",
                                new Date(0),
                                "378374",
                                "Learning the way we work (as well as other people) is a very important aspect when it comes to living an effective life. We were created unique and though we are like other people",
                                12,
                                5,
                                "https://www.junkybooks.com/administrator/bookimages/62f864c6f124c2.67423707.PNG",
                                "Life",
                                langue,
                                auteur2);
                livreDao.save(livre4);

                Livre livre5 = new Livre(
                                "The Reluctant Coroner",
                                new Date(0),
                                "378374",
                                "Blood is thicker than oil--until murder is involved. Fenway Stevenson doesn't want to return to the coastal town where her estranged father is practically king.",
                                12,
                                5,
                                "https://www.junkybooks.com/administrator/bookimages/62bb5bfe51fa40.75435426.jpg",
                                "Mystry & Thriller",
                                langue,
                                auteur2);
                livreDao.save(livre5);

                Livre livre6 = new Livre(
                                "Lords Of Finance",
                                new Date(0),
                                "378728",
                                "INTRODUCTION ON AUGUST 15, 1931, the following press statement was issued: “The Governor of the Bank of England has been indisposed as a result",
                                12,
                                5,
                                "https://www.junkybooks.com/administrator/bookimages/63550ffb8b68b6.84225289.jpg",
                                "Finance",
                                langue,
                                auteur2);
                livreDao.save(livre6);

                Livre livre7 = new Livre(
                                "Advances In Quantitative Analysis",
                                new Date(0),
                                "73783",
                                "Introduction Emerging markets have been exposed to remarkable market risks and it is by now folk wisdom that, if given a choice, they should be endowed with instruments of hedging against downside risks",
                                12,
                                5,
                                "https://www.junkybooks.com/administrator/bookimages/6354712cc06591.09795574.jpg",
                                "Mystry & Thriller",
                                langue,
                                auteur2);
                livreDao.save(livre7);

                Livre livre8 = new Livre(
                                "Start Where You Are",
                                new Date(0),
                                "2365789",
                                "We already have everything we need. There is no need for self-improvement. All these trips that we lay on ourselves—the heavy-duty fearing that we’re bad and hoping that we’re good",
                                12,
                                5,
                                "https://www.junkybooks.com/administrator/bookimages/64e23253c09290.78632919.jpg",
                                "Life",
                                langue,
                                auteur2);
                livreDao.save(livre8);

                Livre livre9 = new Livre(
                                "Control Your Mind and Master Your Feelings",
                                new Date(0),
                                "1598765",
                                "We oftentimes look towards the outside world to find the roots of our problems. However, most of the times, we should be looking inwards. Our mind and our emotions determine our state of being in the present moment.",
                                20,
                                5,
                                "https://covers.openlibrary.org/b/id/12009823-L.jpg",
                                "Life",
                                langue,
                                auteur2);
                livreDao.save(livre9);

                Livre livre10 = new Livre(
                                "A ride into morning",
                                new Date(0),
                                "1598765",
                                "We oftentimes look towards the outside world to find the roots of our problems. However, most of the times, we should be looking inwards. Our mind and our emotions determine our state of being in the present moment.",
                                20,
                                5,
                                "https://covers.openlibrary.org/b/id/113579-L.jpg",
                                "Story",
                                langue,
                                auteur2);
                livreDao.save(livre10);

                Livre livre11 = new Livre(
                                "The Language of Literature",
                                new Date(0),
                                "65987",
                                "We oftentimes look towards the outside world to find the roots of our problems. However, most of the times, we should be looking inwards. Our mind and our emotions determine our state of being in the present moment.",
                                20,
                                5,
                                "https://covers.openlibrary.org/b/id/13305903-L.jpg",
                                "Litrature",
                                langue,
                                auteur2);
                livreDao.save(livre11);

                Livre livre12 = new Livre(
                                "Pacific Vortex!",
                                new Date(0),
                                "536975",
                                "Fully armed and with all hands on board, the nuclear submarine Starbuck sailed into the calm Pacific Ocean for sea trials - and vanished. No wreckage, no signals, no survivors",
                                20,
                                5,
                                "https://covers.openlibrary.org/b/id/368945-L.jpg",
                                "Story",
                                langue,
                                auteur2);
                livreDao.save(livre12);
                // ################### LIVRES CREATION ####################
                // ########################################################
                // ########################################################

        }
}
