INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_ADMIN');
INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_USER');
INSERT INTO roles VALUES (nextval('role_seq_gen'), 'ROLE_TRAINER');

INSERT INTO users VALUES (nextval('user_seq_gen'), 'Nikolina', 'Pavkovic', '$2a$10$RPsiQIMBfCzwxwQfzGWyReLVymMoNXbagtXRsvwj53Qt4vsfyf5NK', 'pavkovicn@hotmail.com');

--INSERT INTO users_roles VALUES (1,1);