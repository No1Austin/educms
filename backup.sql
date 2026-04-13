--
-- PostgreSQL database dump
--

\restrict hu7UHrgcq08E01KoF774IrfmIJSjoWiLEE0xxwFyOx9K1gR4xPdoi9noGgfP6sV

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_category_id_seq OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    post_id integer,
    user_id integer,
    content text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(20) DEFAULT 'pending'::character varying
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_comment_id_seq OWNER TO postgres;

--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    media_id integer NOT NULL,
    filename character varying(255),
    file_path character varying(255),
    uploaded_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    original_name character varying(255),
    file_type character varying(50),
    file_size integer,
    mime_type character varying(100),
    alt_text character varying(255),
    caption text,
    width integer,
    height integer
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.media_media_id_seq OWNER TO postgres;

--
-- Name: media_media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_media_id_seq OWNED BY public.media.media_id;


--
-- Name: post_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_tags (
    post_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.post_tags OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    post_id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    content text NOT NULL,
    author_id integer,
    category_id integer,
    status character varying(20) DEFAULT 'draft'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    published_at timestamp without time zone
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.posts_post_id_seq OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    tag_id integer NOT NULL,
    name character varying(50) NOT NULL,
    slug character varying(50) NOT NULL,
    description text
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_tag_id_seq OWNER TO postgres;

--
-- Name: tags_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_tag_id_seq OWNED BY public.tags.tag_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    role character varying(20) DEFAULT 'subscriber'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: media media_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN media_id SET DEFAULT nextval('public.media_media_id_seq'::regclass);


--
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- Name: tags tag_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN tag_id SET DEFAULT nextval('public.tags_tag_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, name, slug, description, created_at) FROM stdin;
4	Austin	now er are here	marketing post	2026-04-09 10:04:49.897497
7	bestie	nestiest	nestiest search	2026-04-09 10:22:27.015131
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (comment_id, post_id, user_id, content, created_at, status) FROM stdin;
2	2	4	uhhfhfhfhfhfhfhf	2026-04-11 22:59:13.604239	pending
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (media_id, filename, file_path, uploaded_by, created_at, original_name, file_type, file_size, mime_type, alt_text, caption, width, height) FROM stdin;
1	1775889819296-WhatsApp-Image-2025-10-30-at-2.41.10-PM.jpeg	C:\\Users\\No1Austin\\Desktop\\MscSE-Day-4\\educms\\educms-backend\\uploads\\1775889819296-WhatsApp-Image-2025-10-30-at-2.41.10-PM.jpeg	4	2026-04-11 02:43:39.400315	WhatsApp Image 2025-10-30 at 2.41.10 PM.jpeg	image	259301	image/jpeg	\N	\N	\N	\N
2	1775962797676-881d7d7623683dde8ea2c5f437bd9251.jpg	C:\\Users\\No1Austin\\Desktop\\MscSE-Day-4\\educms\\educms-backend\\uploads\\1775962797676-881d7d7623683dde8ea2c5f437bd9251.jpg	4	2026-04-11 22:59:57.770495	881d7d7623683dde8ea2c5f437bd9251.jpg	image	77011	image/jpeg	\N	\N	\N	\N
\.


--
-- Data for Name: post_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_tags (post_id, tag_id) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (post_id, title, slug, content, author_id, category_id, status, created_at, updated_at, published_at) FROM stdin;
1	weee	eeeeeee	eeeeeeeeeeeeeeeeeeeeeeeee	\N	4	draft	2026-04-10 00:26:09.849317	2026-04-10 00:26:09.849317	\N
2	Ben book	Religious Ethics	Book for all advanced spirits	\N	4	draft	2026-04-10 23:19:01.323327	2026-04-10 23:19:01.323327	\N
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (tag_id, name, slug, description) FROM stdin;
3	SSSSSS	SSSS	\N
4	ssssssssssssss	sssssssssssssssss	ssssssssssssssssssssssssssssss
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password_hash, first_name, last_name, role, created_at, updated_at) FROM stdin;
2	austinamadi	austinamadi.e@gmail.com	$2b$10$RctwKbRwFU26BL1F7Y6NlOVTuVZL92uBOhEodaoG6O/mGKSKQFXvG	\N	\N	subscriber	2026-04-08 16:28:23.560357	2026-04-08 16:28:23.560357
1	testuser	test@example.com	123456	Test	User	admin	2026-04-08 13:10:31.12957	2026-04-08 13:10:31.12957
3	austin	edmarkaustin@gmail.com	$2b$10$6Mi55GEv.FgGeQAKEkeu8u3ublAfFTqQx93Xr5wRSgzVDSbIsUtE2	\N	\N	admin	2026-04-08 23:55:37.98827	2026-04-08 23:55:37.98827
4	No1Austin	admin@test.com	$2b$10$B0OFaId/vQaQeZFcr5.QJ.FtZPQYWR/fOMoUKoaB9PncyyA7Qo1D.	\N	\N	admin	2026-04-09 07:12:54.671705	2026-04-09 07:12:54.671705
\.


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 22, true);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 2, true);


--
-- Name: media_media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_media_id_seq', 2, true);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 2, true);


--
-- Name: tags_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_tag_id_seq', 5, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 4, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: categories categories_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_key UNIQUE (slug);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (media_id);


--
-- Name: post_tags post_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_pkey PRIMARY KEY (post_id, tag_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: posts posts_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_slug_key UNIQUE (slug);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


--
-- Name: tags tags_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_slug_key UNIQUE (slug);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: media media_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(user_id);


--
-- Name: post_tags post_tags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(post_id) ON DELETE CASCADE;


--
-- Name: post_tags post_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags
    ADD CONSTRAINT post_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(tag_id) ON DELETE CASCADE;


--
-- Name: posts posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(user_id);


--
-- Name: posts posts_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- PostgreSQL database dump complete
--

\unrestrict hu7UHrgcq08E01KoF774IrfmIJSjoWiLEE0xxwFyOx9K1gR4xPdoi9noGgfP6sV

