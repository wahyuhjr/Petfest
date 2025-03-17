--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Animal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Animal" (
    id integer NOT NULL,
    name text NOT NULL,
    "imageUrl" text NOT NULL,
    "clickCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Animal" OWNER TO postgres;

--
-- Name: Animal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Animal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Animal_id_seq" OWNER TO postgres;

--
-- Name: Animal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Animal_id_seq" OWNED BY public."Animal".id;


--
-- Name: Brand; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Brand" (
    id integer NOT NULL,
    name text NOT NULL,
    "logoUrl" text,
    "websiteUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Brand" OWNER TO postgres;

--
-- Name: Brand_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Brand_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Brand_id_seq" OWNER TO postgres;

--
-- Name: Brand_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Brand_id_seq" OWNED BY public."Brand".id;


--
-- Name: SEO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SEO" (
    id integer NOT NULL,
    "pageType" text NOT NULL,
    "entityId" integer,
    title text NOT NULL,
    description text NOT NULL,
    keywords text NOT NULL,
    "ogTitle" text,
    "ogDescription" text,
    "ogImage" text,
    canonical text,
    "structuredData" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SEO" OWNER TO postgres;

--
-- Name: SEO_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SEO_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SEO_id_seq" OWNER TO postgres;

--
-- Name: SEO_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SEO_id_seq" OWNED BY public."SEO".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text,
    role text DEFAULT 'user'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Animal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Animal" ALTER COLUMN id SET DEFAULT nextval('public."Animal_id_seq"'::regclass);


--
-- Name: Brand id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Brand" ALTER COLUMN id SET DEFAULT nextval('public."Brand_id_seq"'::regclass);


--
-- Name: SEO id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SEO" ALTER COLUMN id SET DEFAULT nextval('public."SEO_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Animal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Animal" (id, name, "imageUrl", "clickCount", "createdAt", "updatedAt") FROM stdin;
6	Cat	/uploads/ff135641-20b9-4859-9816-fbade3fa2f4f.png	0	2025-03-17 08:05:37.354	2025-03-17 08:05:37.354
7	Dog	/uploads/2edb0e11-ca7e-4225-b385-92ffa30e7a18.png	0	2025-03-17 08:05:56.022	2025-03-17 08:05:56.022
9	Fish	/uploads/aef0a38c-46e5-4fec-936e-5f5b051731ae.png	0	2025-03-17 08:09:55.163	2025-03-17 08:09:55.163
10	Small Animal	/uploads/65436e05-6cad-49e1-b0a3-14578f649db5.png	0	2025-03-17 08:10:16.119	2025-03-17 08:10:16.119
11	Reptile	/uploads/271b0dbe-0428-46e2-b3df-66674a5f1a2c.png	0	2025-03-17 08:10:36.864	2025-03-17 08:10:36.864
8	Aviary	/uploads/52601547-07db-4ed2-84b1-8f41c45c8708.png	1	2025-03-17 08:06:14.376	2025-03-17 08:48:38.454
\.


--
-- Data for Name: Brand; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Brand" (id, name, "logoUrl", "websiteUrl", "createdAt", "updatedAt") FROM stdin;
1	1	/uploads/brands/brand-e910fbce-38d2-4073-ae0e-b9d45e22c3d3.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 22:15:28.479
3	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 21:18:11.809
4	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 21:18:11.809
5	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 21:18:11.809
6	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 21:18:11.809
7	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 21:18:11.809
8	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 21:18:11.809
9	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-16 21:18:11.809
2	test	/uploads/brands/brand-7b9e1266-8ab2-42c9-bc75-531896a1c8ad.png	https://github.com/wahyuhjr/Petfest/blob/master/petfest/src/components/sections/Hero.jsx	2025-03-16 21:18:11.809	2025-03-17 12:44:17.019
\.


--
-- Data for Name: SEO; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SEO" (id, "pageType", "entityId", title, description, keywords, "ogTitle", "ogDescription", "ogImage", canonical, "structuredData", "createdAt", "updatedAt") FROM stdin;
1	global	\N	Test	Test	Test	Test	Test	Test	Test	\N	2025-03-11 04:45:46.325	2025-03-11 04:45:46.325
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, name, role, "createdAt", "updatedAt") FROM stdin;
1	admin@example.com	$2b$10$/RdxAO2G.1DXZRdfRhkSye1ZC.u3XxxSHQZ40dVRM5440.MrS3m6e	\N	admin	2025-03-10 18:42:18.485	2025-03-10 18:42:18.485
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
c460d5c2-66f3-4f96-9dcb-a3064994d24c	d79cfbb076c932ec3e5ef8498cb7bf10dbd229d5951d94f6351259025387f7a0	2025-03-11 01:41:58.449292+07	20250310184158_add_brand_model	\N	\N	2025-03-11 01:41:58.370122+07	1
2a8a1ea0-36a1-4556-b0d1-232dae157089	10a34bc8ed1b991e059d68b0f9e3e089d9f4acf35985a0f0aa927fdc7c5cc812	2025-03-11 11:29:30.189457+07	20250311042930_add_seo_model	\N	\N	2025-03-11 11:29:30.151391+07	1
\.


--
-- Name: Animal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Animal_id_seq"', 11, true);


--
-- Name: Brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Brand_id_seq"', 3, true);


--
-- Name: SEO_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SEO_id_seq"', 1, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Animal Animal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Animal"
    ADD CONSTRAINT "Animal_pkey" PRIMARY KEY (id);


--
-- Name: Brand Brand_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Brand"
    ADD CONSTRAINT "Brand_pkey" PRIMARY KEY (id);


--
-- Name: SEO SEO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SEO"
    ADD CONSTRAINT "SEO_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

