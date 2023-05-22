-----------------------------------
-----Altera permissão usuários-----
-----------------------------------
---Usuários inseridos manualmente
--NomeA, SobrenomeA, ufba_dcc_ic045_20231_events_team@googlegroups.com, senha123, admin
--NomeB, SobrenomeB, usuarioB@gmail.com, senha123, tecnico
--NomeC, SobrenomeC, usuarioC@gmail.com, senha123, visitante

--UsuárioA
update public.usuario set permissao = 'admin' where id = '0e8c91e8-1f2f-4285-b898-1ca65116bf04';

--Usuário B
update public.usuario set permissao = 'servidor' where id = '409c2cbf-6bbd-4539-b406-4234e40d3529';
-------------------------
----Insere Categorias----
-------------------------
--Palestras
INSERT INTO public.categoria values (gen_random_uuid (), 'Palestras', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
--Simpósios
INSERT INTO public.categoria values (gen_random_uuid (), 'Simpósios', 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
-- Mesa Redonda
INSERT INTO public.categoria values (gen_random_uuid (), 'Mesa Redonda', 'href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

-------------------------
-----Insere Eventos-----
-------------------------
INSERT INTO public.evento(
	id, 
	descricao,
	localizacao, datainicial,created_at, titulo,imagem_url,
	criador_id, categoria_id, tipo)
	VALUES 
	(
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-04-22 14:11:13',now()::timestamp, 'Titulo Evento 1', 'https://picsum.photos/200/300',
		'0e8c91e8-1f2f-4285-b898-1ca65116bf04', 'ab3a529e-9ce6-4e5f-b6de-51f45d6ecea7', null
	),
	(
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF II', '2023-05-10 14:11:13',now()::timestamp, 'Titulo Evento 2', 'https://picsum.photos/200/300',
		'409c2cbf-6bbd-4539-b406-4234e40d3529','646db835-dd33-4b94-974b-6db32fbd1316', null
	),
	(
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF VI', '2023-05-22 14:11:13',now()::timestamp, 'Titulo Evento 3', 'https://picsum.photos/200/300',
		'0e8c91e8-1f2f-4285-b898-1ca65116bf04','ab3a529e-9ce6-4e5f-b6de-51f45d6ecea7', null
	),
	(
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-06-22 14:11:13',now()::timestamp, 'Titulo Evento 4', 'https://picsum.photos/200/300',
		'409c2cbf-6bbd-4539-b406-4234e40d3529','646db835-dd33-4b94-974b-6db32fbd1316', null
	),
	(
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF IV', '2023-07-22 14:11:13',now()::timestamp, 'Titulo Evento 5', 'https://picsum.photos/200/300',
		'0e8c91e8-1f2f-4285-b898-1ca65116bf04',null, 'Tipo1'
	),
    (
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-07-29 14:11:13',now()::timestamp, 'Titulo Evento 6', 'https://picsum.photos/200/300',
		'409c2cbf-6bbd-4539-b406-4234e40d3529','646db835-dd33-4b94-974b-6db32fbd1316', null
	),
    (
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-08-20 14:11:13',now()::timestamp, 'Titulo Evento 7', 'https://picsum.photos/200/300',
		'0e8c91e8-1f2f-4285-b898-1ca65116bf04','ab3a529e-9ce6-4e5f-b6de-51f45d6ecea7', null
	),
    (
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-08-29 14:11:13',now()::timestamp, 'Titulo Evento 8', 'https://picsum.photos/200/300',
		'409c2cbf-6bbd-4539-b406-4234e40d3529','646db835-dd33-4b94-974b-6db32fbd1316', null
	),
    (
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-09-15 14:11:13',now()::timestamp, 'Titulo Evento 9', 'https://picsum.photos/200/300',
		'0e8c91e8-1f2f-4285-b898-1ca65116bf04','ab3a529e-9ce6-4e5f-b6de-51f45d6ecea7', null
	),
    (
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-09-16 14:11:13',now()::timestamp, 'Titulo Evento 10', 'https://picsum.photos/200/300',
		'409c2cbf-6bbd-4539-b406-4234e40d3529','38082397-dd7b-4e0e-8291-1cebf891aad4', null
	),
    (
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-10-22 14:11:13',now()::timestamp, 'Titulo Evento 11', 'https://picsum.photos/200/300',
		'0e8c91e8-1f2f-4285-b898-1ca65116bf04','646db835-dd33-4b94-974b-6db32fbd1316', null
	),
    (
		gen_random_uuid(), 
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		'PAF I', '2023-11-15 14:11:13',now()::timestamp, 'Titulo Evento 12', 'https://picsum.photos/200/300',
		'409c2cbf-6bbd-4539-b406-4234e40d3529','38082397-dd7b-4e0e-8291-1cebf891aad4', null
	);