INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_ADMIN');
INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_USER');
INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_TRAINER');

INSERT INTO users VALUES (nextval('user_seq_gen'), 'Nikolina', 'Pavkovic', '$2a$10$vl8bE7gOmlXJ4otSv5t1aeW9/9fAvcwunPqIPrCQyWY.If2v0ZbL6', '0658886407', 'pavkovicn@hotmail.com');
INSERT INTO users VALUES (nextval('user_seq_gen'), 'Milos', 'Milosevic', '$2a$10$Hc5OZFSMJNeRnWayZe29n./m2iyOS1camXVR.HCVpHaLMgsyjw4k.', '0637319010', 'pavkovicn51@gmail.com');
INSERT INTO users VALUES (nextval('user_seq_gen'), 'Marija', 'Maric', '$2a$10$OjKPmk.DpQa5iIA27CC4oOz4RQeJBiKzg5qVe7fXebfPCklsGOoNe', '0643813711', 'fishingbookernsm@hotmail.com');

INSERT INTO users_roles VALUES (1,1);
INSERT INTO users_roles VALUES (2,3);
INSERT INTO users_roles VALUES (3,2);