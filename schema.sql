--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-14 14:46:08 MSK

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

DROP DATABASE typoteka;
--
-- TOC entry 3626 (class 1262 OID 16387)
-- Name: typoteka; Type: DATABASE; Schema: -; Owner: academy
--

CREATE DATABASE typoteka WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'UTF-8';


ALTER DATABASE typoteka OWNER TO academy;

\connect typoteka

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16452)
-- Name: article_category; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.article_category (
    id bigint NOT NULL,
    article_id bigint NOT NULL,
    category_id bigint NOT NULL
);


ALTER TABLE public.article_category OWNER TO academy;

--
-- TOC entry 219 (class 1259 OID 16451)
-- Name: article_category_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.article_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.article_category_id_seq OWNER TO academy;

--
-- TOC entry 3627 (class 0 OID 0)
-- Dependencies: 219
-- Name: article_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.article_category_id_seq OWNED BY public.article_category.id;


--
-- TOC entry 214 (class 1259 OID 16412)
-- Name: articles; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.articles (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    title character varying(250) NOT NULL,
    anonce character varying(250) NOT NULL,
    text character varying(1000),
    date date NOT NULL,
    picture character varying(300)
);


ALTER TABLE public.articles OWNER TO academy;

--
-- TOC entry 213 (class 1259 OID 16411)
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.articles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.articles_id_seq OWNER TO academy;

--
-- TOC entry 3628 (class 0 OID 0)
-- Dependencies: 213
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- TOC entry 218 (class 1259 OID 16445)
-- Name: categories; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(40) NOT NULL
);


ALTER TABLE public.categories OWNER TO academy;

--
-- TOC entry 217 (class 1259 OID 16444)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO academy;

--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 217
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 216 (class 1259 OID 16426)
-- Name: comments; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    article_id bigint NOT NULL,
    text character varying(1000) NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.comments OWNER TO academy;

--
-- TOC entry 215 (class 1259 OID 16425)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO academy;

--
-- TOC entry 3630 (class 0 OID 0)
-- Dependencies: 215
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 210 (class 1259 OID 16389)
-- Name: roles; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    type character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO academy;

--
-- TOC entry 209 (class 1259 OID 16388)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO academy;

--
-- TOC entry 3631 (class 0 OID 0)
-- Dependencies: 209
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 212 (class 1259 OID 16398)
-- Name: users; Type: TABLE; Schema: public; Owner: academy
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    role_id bigint NOT NULL,
    first_name character varying(100),
    last_name character varying(100),
    registration_date timestamp without time zone NOT NULL,
    avatar character varying(300),
    email character varying NOT NULL,
    password character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO academy;

--
-- TOC entry 211 (class 1259 OID 16397)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: academy
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO academy;

--
-- TOC entry 3632 (class 0 OID 0)
-- Dependencies: 211
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: academy
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3465 (class 2604 OID 16455)
-- Name: article_category id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.article_category ALTER COLUMN id SET DEFAULT nextval('public.article_category_id_seq'::regclass);


--
-- TOC entry 3462 (class 2604 OID 16415)
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- TOC entry 3464 (class 2604 OID 16448)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3463 (class 2604 OID 16429)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3460 (class 2604 OID 16392)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 3461 (class 2604 OID 16401)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3471 (class 2606 OID 16419)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- TOC entry 3475 (class 2606 OID 16450)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3473 (class 2606 OID 16433)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3467 (class 2606 OID 16396)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 3469 (class 2606 OID 16405)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3480 (class 2606 OID 16456)
-- Name: article_category article_category_articles; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.article_category
    ADD CONSTRAINT article_category_articles FOREIGN KEY (article_id) REFERENCES public.articles(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3481 (class 2606 OID 16461)
-- Name: article_category article_category_categories; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.article_category
    ADD CONSTRAINT article_category_categories FOREIGN KEY (category_id) REFERENCES public.categories(id) MATCH FULL;


--
-- TOC entry 3477 (class 2606 OID 16420)
-- Name: articles articles_users; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_users FOREIGN KEY (user_id) REFERENCES public.users(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3479 (class 2606 OID 16439)
-- Name: comments comments_articles; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_articles FOREIGN KEY (article_id) REFERENCES public.articles(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3478 (class 2606 OID 16434)
-- Name: comments comments_users; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_users FOREIGN KEY (user_id) REFERENCES public.users(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3476 (class 2606 OID 16406)
-- Name: users users_roles; Type: FK CONSTRAINT; Schema: public; Owner: academy
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_roles FOREIGN KEY (role_id) REFERENCES public.roles(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-06-14 14:46:08 MSK

--
-- PostgreSQL database dump complete
--

