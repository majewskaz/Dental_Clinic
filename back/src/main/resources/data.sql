INSERT INTO role (name) SELECT 'ROLE_DOCTOR' WHERE NOT EXISTS (SELECT * FROM role WHERE role.name='ROLE_DOCTOR');
INSERT INTO role (name) SELECT 'ROLE_PATIENT' WHERE NOT EXISTS (SELECT * FROM role WHERE role.name='ROLE_PATIENT');
