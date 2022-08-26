INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_ADMIN');
INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_USER');
INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_TRAINER');

INSERT INTO users VALUES (nextval('user_seq_gen'), 'Nikolina', 'Pavkovic', '$2a$10$vl8bE7gOmlXJ4otSv5t1aeW9/9fAvcwunPqIPrCQyWY.If2v0ZbL6', '0658886407', 'pavkovicn@hotmail.com');
INSERT INTO users VALUES (nextval('user_seq_gen'), 'Milos', 'Milosevic', '$2a$10$Hc5OZFSMJNeRnWayZe29n./m2iyOS1camXVR.HCVpHaLMgsyjw4k.', '0637319010', 'pavkovicn51@gmail.com');
INSERT INTO users VALUES (nextval('user_seq_gen'), 'Marija', 'Maric', '$2a$10$OjKPmk.DpQa5iIA27CC4oOz4RQeJBiKzg5qVe7fXebfPCklsGOoNe', '0643813711', 'fishingbookernsm@hotmail.com');

INSERT INTO users_roles VALUES (1,1);
INSERT INTO users_roles VALUES (2,3);
INSERT INTO users_roles VALUES (3,2);

INSERT INTO benefits VALUES (nextval('benefit_seq_gen'), 'Neograničeno korišćenje teretane 30 dana');
INSERT INTO benefits VALUES (nextval('benefit_seq_gen'), 'Neograničeno posećivanje grupnih treninga 30 dana');
INSERT INTO benefits VALUES (nextval('benefit_seq_gen'), 'Preko 40 kardio sprava');
INSERT INTO benefits VALUES (nextval('benefit_seq_gen'), 'Uvodni trening');
INSERT INTO benefits VALUES (nextval('benefit_seq_gen'), 'Savetovanje');
INSERT INTO benefits VALUES (nextval('benefit_seq_gen'), 'Neograničeno korišćenje teretane 90 dana');
INSERT INTO benefits VALUES (nextval('benefit_seq_gen'), 'Neograničeno posećivanje grupnih treninga 90 dana');

INSERT INTO memberships VALUES (nextval('membership_seq_gen'), 30, 'Code 30 gym', 2500);
INSERT INTO memberships VALUES (nextval('membership_seq_gen'), 30, 'Code 30 grupni treninzi', 2500);
INSERT INTO memberships VALUES (nextval('membership_seq_gen'), 30, 'Code 30 gym + grupni treninzi', 3000);
INSERT INTO memberships VALUES (nextval('membership_seq_gen'), 90, 'Code 90 gym', 6000);
INSERT INTO memberships VALUES (nextval('membership_seq_gen'), 90, 'Code 90 grupni treninzi', 6000);
INSERT INTO memberships VALUES (nextval('membership_seq_gen'), 90, 'Code 90 gym + grupni treninzi', 7500);

INSERT INTO memberships_benefits VALUES (1,1);
INSERT INTO memberships_benefits VALUES (1,3);
INSERT INTO memberships_benefits VALUES (1,4);
INSERT INTO memberships_benefits VALUES (1,5);
INSERT INTO memberships_benefits VALUES (2,2);
INSERT INTO memberships_benefits VALUES (2,4);
INSERT INTO memberships_benefits VALUES (2,5);
INSERT INTO memberships_benefits VALUES (3,1);
INSERT INTO memberships_benefits VALUES (3,2);
INSERT INTO memberships_benefits VALUES (3,3);
INSERT INTO memberships_benefits VALUES (3,4);
INSERT INTO memberships_benefits VALUES (3,5);
INSERT INTO memberships_benefits VALUES (4,6);
INSERT INTO memberships_benefits VALUES (4,3);
INSERT INTO memberships_benefits VALUES (4,4);
INSERT INTO memberships_benefits VALUES (4,5);
INSERT INTO memberships_benefits VALUES (5,7);
INSERT INTO memberships_benefits VALUES (5,4);
INSERT INTO memberships_benefits VALUES (5,5);
INSERT INTO memberships_benefits VALUES (6,6);
INSERT INTO memberships_benefits VALUES (6,7);
INSERT INTO memberships_benefits VALUES (6,3);
INSERT INTO memberships_benefits VALUES (6,4);
INSERT INTO memberships_benefits VALUES (6,5);

INSERT INTO user_memberships VALUES (nextval('user_mem_seq_gen'),'2022-07-25 15:10:49.239', false, '2022-06-25 15:10:49.239', 1, 3);
INSERT INTO user_memberships VALUES (nextval('user_mem_seq_gen'),'2022-09-25 15:10:49.239', false, '2022-08-25 15:10:49.239', 1, 3);
