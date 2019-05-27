--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: account_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_profile (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    is_manager boolean NOT NULL,
    phone text NOT NULL,
    company_name text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.account_profile OWNER TO postgres;

--
-- Name: account_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_profile_id_seq OWNER TO postgres;

--
-- Name: account_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_profile_id_seq OWNED BY public.account_profile.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO postgres;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO postgres;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO postgres;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: campaigns_campaign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_campaign (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    "desc" text NOT NULL,
    follow_up_plan_id integer NOT NULL,
    manager_id integer NOT NULL,
    marketing_plan_id integer NOT NULL
);


ALTER TABLE public.campaigns_campaign OWNER TO postgres;

--
-- Name: campaigns_campaign_assigned_to; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_campaign_assigned_to (
    id integer NOT NULL,
    campaign_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.campaigns_campaign_assigned_to OWNER TO postgres;

--
-- Name: campaigns_campaign_assigned_to_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_campaign_assigned_to_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_campaign_assigned_to_id_seq OWNER TO postgres;

--
-- Name: campaigns_campaign_assigned_to_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_campaign_assigned_to_id_seq OWNED BY public.campaigns_campaign_assigned_to.id;


--
-- Name: campaigns_campaign_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_campaign_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_campaign_id_seq OWNER TO postgres;

--
-- Name: campaigns_campaign_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_campaign_id_seq OWNED BY public.campaigns_campaign.id;


--
-- Name: campaigns_campaign_packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_campaign_packages (
    id integer NOT NULL,
    campaign_id integer NOT NULL,
    package_id integer NOT NULL
);


ALTER TABLE public.campaigns_campaign_packages OWNER TO postgres;

--
-- Name: campaigns_campaign_packages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_campaign_packages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_campaign_packages_id_seq OWNER TO postgres;

--
-- Name: campaigns_campaign_packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_campaign_packages_id_seq OWNED BY public.campaigns_campaign_packages.id;


--
-- Name: campaigns_contactmarketing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_contactmarketing (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    status text NOT NULL,
    priority integer NOT NULL,
    job_id character varying(255),
    campaign_id integer NOT NULL,
    contact_id integer NOT NULL,
    marketing_plan_id integer NOT NULL,
    sale_rep_id integer
);


ALTER TABLE public.campaigns_contactmarketing OWNER TO postgres;

--
-- Name: campaigns_contactmarketing_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_contactmarketing_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_contactmarketing_id_seq OWNER TO postgres;

--
-- Name: campaigns_contactmarketing_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_contactmarketing_id_seq OWNED BY public.campaigns_contactmarketing.id;


--
-- Name: campaigns_contactmarketinghistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_contactmarketinghistory (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    action character varying(20) NOT NULL,
    contact_marketing_id integer NOT NULL
);


ALTER TABLE public.campaigns_contactmarketinghistory OWNER TO postgres;

--
-- Name: campaigns_contactmarketinghistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_contactmarketinghistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_contactmarketinghistory_id_seq OWNER TO postgres;

--
-- Name: campaigns_contactmarketinghistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_contactmarketinghistory_id_seq OWNED BY public.campaigns_contactmarketinghistory.id;


--
-- Name: campaigns_followupplan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_followupplan (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    can_modify boolean NOT NULL,
    manager_id integer NOT NULL
);


ALTER TABLE public.campaigns_followupplan OWNER TO postgres;

--
-- Name: campaigns_followupplan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_followupplan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_followupplan_id_seq OWNER TO postgres;

--
-- Name: campaigns_followupplan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_followupplan_id_seq OWNED BY public.campaigns_followupplan.id;


--
-- Name: campaigns_mailtemplate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_mailtemplate (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    template text NOT NULL,
    is_public boolean NOT NULL,
    user_id integer NOT NULL,
    subject character varying(255) NOT NULL
);


ALTER TABLE public.campaigns_mailtemplate OWNER TO postgres;

--
-- Name: campaigns_mailtemplate_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_mailtemplate_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_mailtemplate_id_seq OWNER TO postgres;

--
-- Name: campaigns_mailtemplate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_mailtemplate_id_seq OWNED BY public.campaigns_mailtemplate.id;


--
-- Name: campaigns_marketingplan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_marketingplan (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    condition jsonb NOT NULL,
    actions character varying(50)[] NOT NULL,
    can_modify boolean NOT NULL,
    mail_template_id integer,
    manager_id integer NOT NULL
);


ALTER TABLE public.campaigns_marketingplan OWNER TO postgres;

--
-- Name: campaigns_marketingplan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_marketingplan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_marketingplan_id_seq OWNER TO postgres;

--
-- Name: campaigns_marketingplan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_marketingplan_id_seq OWNED BY public.campaigns_marketingplan.id;


--
-- Name: campaigns_note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns_note (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name text NOT NULL,
    content text,
    _type character varying(20) NOT NULL,
    campaign_id integer,
    contact_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.campaigns_note OWNER TO postgres;

--
-- Name: campaigns_note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_note_id_seq OWNER TO postgres;

--
-- Name: campaigns_note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_note_id_seq OWNED BY public.campaigns_note.id;


--
-- Name: contacts_contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts_contact (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    mail character varying(100),
    phone character varying(15),
    sex character varying(10) NOT NULL,
    address character varying(255),
    country character varying(255),
    state character varying(255),
    city character varying(255),
    zipcode character varying(10),
    org text,
    user_id integer NOT NULL
);


ALTER TABLE public.contacts_contact OWNER TO postgres;

--
-- Name: contacts_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_contact_id_seq OWNER TO postgres;

--
-- Name: contacts_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_contact_id_seq OWNED BY public.contacts_contact.id;


--
-- Name: contacts_contactgroup; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts_contactgroup (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(100) NOT NULL,
    _type character varying(20) NOT NULL,
    editor_id integer,
    user_id integer NOT NULL
);


ALTER TABLE public.contacts_contactgroup OWNER TO postgres;

--
-- Name: contacts_contactgroup_contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contacts_contactgroup_contacts (
    id integer NOT NULL,
    contactgroup_id integer NOT NULL,
    contact_id integer NOT NULL
);


ALTER TABLE public.contacts_contactgroup_contacts OWNER TO postgres;

--
-- Name: contacts_contactgroup_contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_contactgroup_contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_contactgroup_contacts_id_seq OWNER TO postgres;

--
-- Name: contacts_contactgroup_contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_contactgroup_contacts_id_seq OWNED BY public.contacts_contactgroup_contacts.id;


--
-- Name: contacts_contactgroup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contacts_contactgroup_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_contactgroup_id_seq OWNER TO postgres;

--
-- Name: contacts_contactgroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contacts_contactgroup_id_seq OWNED BY public.contacts_contactgroup.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: events_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_event (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    content text NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    name character varying(255) NOT NULL,
    priority integer NOT NULL,
    assigned_to_id integer NOT NULL,
    marketing_id integer,
    order_id integer,
    user_id integer NOT NULL
);


ALTER TABLE public.events_event OWNER TO postgres;

--
-- Name: events_event_contacts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_event_contacts (
    id integer NOT NULL,
    event_id integer NOT NULL,
    contact_id integer NOT NULL
);


ALTER TABLE public.events_event_contacts OWNER TO postgres;

--
-- Name: events_event_contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_event_contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_event_contacts_id_seq OWNER TO postgres;

--
-- Name: events_event_contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_event_contacts_id_seq OWNED BY public.events_event_contacts.id;


--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.events_event_id_seq OWNER TO postgres;

--
-- Name: events_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_event_id_seq OWNED BY public.events_event.id;


--
-- Name: jet_bookmark; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jet_bookmark (
    id integer NOT NULL,
    url character varying(200) NOT NULL,
    title character varying(255) NOT NULL,
    "user" integer NOT NULL,
    date_add timestamp with time zone NOT NULL,
    CONSTRAINT jet_bookmark_user_check CHECK (("user" >= 0))
);


ALTER TABLE public.jet_bookmark OWNER TO postgres;

--
-- Name: jet_bookmark_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jet_bookmark_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jet_bookmark_id_seq OWNER TO postgres;

--
-- Name: jet_bookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jet_bookmark_id_seq OWNED BY public.jet_bookmark.id;


--
-- Name: jet_pinnedapplication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jet_pinnedapplication (
    id integer NOT NULL,
    app_label character varying(255) NOT NULL,
    "user" integer NOT NULL,
    date_add timestamp with time zone NOT NULL,
    CONSTRAINT jet_pinnedapplication_user_check CHECK (("user" >= 0))
);


ALTER TABLE public.jet_pinnedapplication OWNER TO postgres;

--
-- Name: jet_pinnedapplication_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jet_pinnedapplication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jet_pinnedapplication_id_seq OWNER TO postgres;

--
-- Name: jet_pinnedapplication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jet_pinnedapplication_id_seq OWNED BY public.jet_pinnedapplication.id;


--
-- Name: notifications_notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications_notification (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    content text NOT NULL,
    link character varying(255) NOT NULL,
    avatar character varying(255) NOT NULL,
    is_seen boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.notifications_notification OWNER TO postgres;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_notification_id_seq OWNER TO postgres;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications_notification.id;


--
-- Name: orders_license; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_license (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    start_date date NOT NULL,
    duration integer NOT NULL,
    code uuid NOT NULL,
    order_id integer NOT NULL,
    package_id integer NOT NULL
);


ALTER TABLE public.orders_license OWNER TO postgres;

--
-- Name: orders_license_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_license_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_license_id_seq OWNER TO postgres;

--
-- Name: orders_license_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_license_id_seq OWNED BY public.orders_license.id;


--
-- Name: orders_lifetimelicense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_lifetimelicense (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    start_date date NOT NULL,
    code uuid NOT NULL,
    order_id integer NOT NULL,
    package_id integer NOT NULL
);


ALTER TABLE public.orders_lifetimelicense OWNER TO postgres;

--
-- Name: orders_lifetimelicense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_lifetimelicense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_lifetimelicense_id_seq OWNER TO postgres;

--
-- Name: orders_lifetimelicense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_lifetimelicense_id_seq OWNED BY public.orders_lifetimelicense.id;


--
-- Name: orders_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_order (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    status character varying(100) NOT NULL,
    campaign_id integer,
    contacts_id integer NOT NULL,
    sale_rep_id integer NOT NULL
);


ALTER TABLE public.orders_order OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_id_seq OWNER TO postgres;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders_order.id;


--
-- Name: orders_order_packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_order_packages (
    id integer NOT NULL,
    order_id integer NOT NULL,
    package_id integer NOT NULL
);


ALTER TABLE public.orders_order_packages OWNER TO postgres;

--
-- Name: orders_order_packages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_order_packages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_packages_id_seq OWNER TO postgres;

--
-- Name: orders_order_packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_order_packages_id_seq OWNED BY public.orders_order_packages.id;


--
-- Name: orders_orderhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_orderhistory (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    date date NOT NULL,
    action text NOT NULL,
    order_id integer NOT NULL
);


ALTER TABLE public.orders_orderhistory OWNER TO postgres;

--
-- Name: orders_orderhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_orderhistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_orderhistory_id_seq OWNER TO postgres;

--
-- Name: orders_orderhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_orderhistory_id_seq OWNED BY public.orders_orderhistory.id;


--
-- Name: packages_feature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages_feature (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    "desc" text,
    price integer NOT NULL,
    number integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.packages_feature OWNER TO postgres;

--
-- Name: packages_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_feature_id_seq OWNER TO postgres;

--
-- Name: packages_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_feature_id_seq OWNED BY public.packages_feature.id;


--
-- Name: packages_package; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages_package (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    prices jsonb NOT NULL,
    discount integer
);


ALTER TABLE public.packages_package OWNER TO postgres;

--
-- Name: packages_package_features; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages_package_features (
    id integer NOT NULL,
    package_id integer NOT NULL,
    feature_id integer NOT NULL
);


ALTER TABLE public.packages_package_features OWNER TO postgres;

--
-- Name: packages_package_features_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_package_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_package_features_id_seq OWNER TO postgres;

--
-- Name: packages_package_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_package_features_id_seq OWNED BY public.packages_package_features.id;


--
-- Name: packages_package_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_package_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_package_id_seq OWNER TO postgres;

--
-- Name: packages_package_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_package_id_seq OWNED BY public.packages_package.id;


--
-- Name: packages_packagehistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages_packagehistory (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    date date NOT NULL,
    action text NOT NULL,
    package_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.packages_packagehistory OWNER TO postgres;

--
-- Name: packages_packagehistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_packagehistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_packagehistory_id_seq OWNER TO postgres;

--
-- Name: packages_packagehistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_packagehistory_id_seq OWNED BY public.packages_packagehistory.id;


--
-- Name: packages_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages_product (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    "desc" text,
    status text NOT NULL,
    start_sale_date date NOT NULL,
    category_id integer,
    manager_id integer NOT NULL,
    product_type_id integer
);


ALTER TABLE public.packages_product OWNER TO postgres;

--
-- Name: packages_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_product_id_seq OWNER TO postgres;

--
-- Name: packages_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_product_id_seq OWNED BY public.packages_product.id;


--
-- Name: packages_productcategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages_productcategory (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255),
    description text,
    status text NOT NULL
);


ALTER TABLE public.packages_productcategory OWNER TO postgres;

--
-- Name: packages_productcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_productcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_productcategory_id_seq OWNER TO postgres;

--
-- Name: packages_productcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_productcategory_id_seq OWNED BY public.packages_productcategory.id;


--
-- Name: packages_producttype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.packages_producttype (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255),
    description text,
    status text NOT NULL
);


ALTER TABLE public.packages_producttype OWNER TO postgres;

--
-- Name: packages_producttype_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.packages_producttype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.packages_producttype_id_seq OWNER TO postgres;

--
-- Name: packages_producttype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.packages_producttype_id_seq OWNED BY public.packages_producttype.id;


--
-- Name: reports_report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports_report (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    name character varying(255) NOT NULL,
    columns jsonb NOT NULL
);


ALTER TABLE public.reports_report OWNER TO postgres;

--
-- Name: reports_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_report_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_report_id_seq OWNER TO postgres;

--
-- Name: reports_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_report_id_seq OWNED BY public.reports_report.id;


--
-- Name: reports_report_packages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports_report_packages (
    id integer NOT NULL,
    report_id integer NOT NULL,
    package_id integer NOT NULL
);


ALTER TABLE public.reports_report_packages OWNER TO postgres;

--
-- Name: reports_report_packages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_report_packages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_report_packages_id_seq OWNER TO postgres;

--
-- Name: reports_report_packages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_report_packages_id_seq OWNED BY public.reports_report_packages.id;


--
-- Name: reports_report_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports_report_products (
    id integer NOT NULL,
    report_id integer NOT NULL,
    product_id integer NOT NULL
);


ALTER TABLE public.reports_report_products OWNER TO postgres;

--
-- Name: reports_report_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_report_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_report_products_id_seq OWNER TO postgres;

--
-- Name: reports_report_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_report_products_id_seq OWNED BY public.reports_report_products.id;


--
-- Name: reports_report_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports_report_users (
    id integer NOT NULL,
    report_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.reports_report_users OWNER TO postgres;

--
-- Name: reports_report_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_report_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_report_users_id_seq OWNER TO postgres;

--
-- Name: reports_report_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_report_users_id_seq OWNED BY public.reports_report_users.id;


--
-- Name: steps_step; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.steps_step (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    actions jsonb NOT NULL,
    duration integer NOT NULL,
    conditions jsonb,
    follow_up_id integer NOT NULL,
    mail_template_id integer
);


ALTER TABLE public.steps_step OWNER TO postgres;

--
-- Name: steps_step_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.steps_step_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.steps_step_id_seq OWNER TO postgres;

--
-- Name: steps_step_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.steps_step_id_seq OWNED BY public.steps_step.id;


--
-- Name: steps_stepdetail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.steps_stepdetail (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    information jsonb,
    status character varying(50) NOT NULL,
    order_id integer NOT NULL,
    step_id integer,
    thread jsonb NOT NULL
);


ALTER TABLE public.steps_stepdetail OWNER TO postgres;

--
-- Name: steps_stepdetail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.steps_stepdetail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.steps_stepdetail_id_seq OWNER TO postgres;

--
-- Name: steps_stepdetail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.steps_stepdetail_id_seq OWNED BY public.steps_stepdetail.id;


--
-- Name: account_profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_profile ALTER COLUMN id SET DEFAULT nextval('public.account_profile_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: campaigns_campaign id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign ALTER COLUMN id SET DEFAULT nextval('public.campaigns_campaign_id_seq'::regclass);


--
-- Name: campaigns_campaign_assigned_to id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_assigned_to ALTER COLUMN id SET DEFAULT nextval('public.campaigns_campaign_assigned_to_id_seq'::regclass);


--
-- Name: campaigns_campaign_packages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_packages ALTER COLUMN id SET DEFAULT nextval('public.campaigns_campaign_packages_id_seq'::regclass);


--
-- Name: campaigns_contactmarketing id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketing ALTER COLUMN id SET DEFAULT nextval('public.campaigns_contactmarketing_id_seq'::regclass);


--
-- Name: campaigns_contactmarketinghistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketinghistory ALTER COLUMN id SET DEFAULT nextval('public.campaigns_contactmarketinghistory_id_seq'::regclass);


--
-- Name: campaigns_followupplan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_followupplan ALTER COLUMN id SET DEFAULT nextval('public.campaigns_followupplan_id_seq'::regclass);


--
-- Name: campaigns_mailtemplate id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_mailtemplate ALTER COLUMN id SET DEFAULT nextval('public.campaigns_mailtemplate_id_seq'::regclass);


--
-- Name: campaigns_marketingplan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_marketingplan ALTER COLUMN id SET DEFAULT nextval('public.campaigns_marketingplan_id_seq'::regclass);


--
-- Name: campaigns_note id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_note ALTER COLUMN id SET DEFAULT nextval('public.campaigns_note_id_seq'::regclass);


--
-- Name: contacts_contact id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contact ALTER COLUMN id SET DEFAULT nextval('public.contacts_contact_id_seq'::regclass);


--
-- Name: contacts_contactgroup id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup ALTER COLUMN id SET DEFAULT nextval('public.contacts_contactgroup_id_seq'::regclass);


--
-- Name: contacts_contactgroup_contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup_contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_contactgroup_contacts_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: events_event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event ALTER COLUMN id SET DEFAULT nextval('public.events_event_id_seq'::regclass);


--
-- Name: events_event_contacts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event_contacts ALTER COLUMN id SET DEFAULT nextval('public.events_event_contacts_id_seq'::regclass);


--
-- Name: jet_bookmark id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jet_bookmark ALTER COLUMN id SET DEFAULT nextval('public.jet_bookmark_id_seq'::regclass);


--
-- Name: jet_pinnedapplication id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jet_pinnedapplication ALTER COLUMN id SET DEFAULT nextval('public.jet_pinnedapplication_id_seq'::regclass);


--
-- Name: notifications_notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications_notification ALTER COLUMN id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- Name: orders_license id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_license ALTER COLUMN id SET DEFAULT nextval('public.orders_license_id_seq'::regclass);


--
-- Name: orders_lifetimelicense id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_lifetimelicense ALTER COLUMN id SET DEFAULT nextval('public.orders_lifetimelicense_id_seq'::regclass);


--
-- Name: orders_order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order ALTER COLUMN id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: orders_order_packages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order_packages ALTER COLUMN id SET DEFAULT nextval('public.orders_order_packages_id_seq'::regclass);


--
-- Name: orders_orderhistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_orderhistory ALTER COLUMN id SET DEFAULT nextval('public.orders_orderhistory_id_seq'::regclass);


--
-- Name: packages_feature id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_feature ALTER COLUMN id SET DEFAULT nextval('public.packages_feature_id_seq'::regclass);


--
-- Name: packages_package id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_package ALTER COLUMN id SET DEFAULT nextval('public.packages_package_id_seq'::regclass);


--
-- Name: packages_package_features id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_package_features ALTER COLUMN id SET DEFAULT nextval('public.packages_package_features_id_seq'::regclass);


--
-- Name: packages_packagehistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_packagehistory ALTER COLUMN id SET DEFAULT nextval('public.packages_packagehistory_id_seq'::regclass);


--
-- Name: packages_product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_product ALTER COLUMN id SET DEFAULT nextval('public.packages_product_id_seq'::regclass);


--
-- Name: packages_productcategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_productcategory ALTER COLUMN id SET DEFAULT nextval('public.packages_productcategory_id_seq'::regclass);


--
-- Name: packages_producttype id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_producttype ALTER COLUMN id SET DEFAULT nextval('public.packages_producttype_id_seq'::regclass);


--
-- Name: reports_report id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report ALTER COLUMN id SET DEFAULT nextval('public.reports_report_id_seq'::regclass);


--
-- Name: reports_report_packages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_packages ALTER COLUMN id SET DEFAULT nextval('public.reports_report_packages_id_seq'::regclass);


--
-- Name: reports_report_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_products ALTER COLUMN id SET DEFAULT nextval('public.reports_report_products_id_seq'::regclass);


--
-- Name: reports_report_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_users ALTER COLUMN id SET DEFAULT nextval('public.reports_report_users_id_seq'::regclass);


--
-- Name: steps_step id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_step ALTER COLUMN id SET DEFAULT nextval('public.steps_step_id_seq'::regclass);


--
-- Name: steps_stepdetail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_stepdetail ALTER COLUMN id SET DEFAULT nextval('public.steps_stepdetail_id_seq'::regclass);


--
-- Data for Name: account_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) FROM stdin;
1	2019-05-12 18:54:04.13456+00	2019-05-12 18:54:04.142169+00	f	t	123456789	ADMIN	1
5	2019-05-12 18:59:40.387476+00	2019-05-12 18:59:40.397335+00	f	f	01234567u89	SALE	5
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add bookmark	1	add_bookmark
2	Can change bookmark	1	change_bookmark
3	Can delete bookmark	1	delete_bookmark
4	Can view bookmark	1	view_bookmark
5	Can add pinned application	2	add_pinnedapplication
6	Can change pinned application	2	change_pinnedapplication
7	Can delete pinned application	2	delete_pinnedapplication
8	Can view pinned application	2	view_pinnedapplication
9	Can add log entry	3	add_logentry
10	Can change log entry	3	change_logentry
11	Can delete log entry	3	delete_logentry
12	Can view log entry	3	view_logentry
13	Can add permission	4	add_permission
14	Can change permission	4	change_permission
15	Can delete permission	4	delete_permission
16	Can view permission	4	view_permission
17	Can add group	5	add_group
18	Can change group	5	change_group
19	Can delete group	5	delete_group
20	Can view group	5	view_group
21	Can add user	6	add_user
22	Can change user	6	change_user
23	Can delete user	6	delete_user
24	Can view user	6	view_user
25	Can add content type	7	add_contenttype
26	Can change content type	7	change_contenttype
27	Can delete content type	7	delete_contenttype
28	Can view content type	7	view_contenttype
29	Can add session	8	add_session
30	Can change session	8	change_session
31	Can delete session	8	delete_session
32	Can view session	8	view_session
33	Can add profile	9	add_profile
34	Can change profile	9	change_profile
35	Can delete profile	9	delete_profile
36	Can view profile	9	view_profile
37	Can add feature	10	add_feature
38	Can change feature	10	change_feature
39	Can delete feature	10	delete_feature
40	Can view feature	10	view_feature
41	Can add package	11	add_package
42	Can change package	11	change_package
43	Can delete package	11	delete_package
44	Can view package	11	view_package
45	Can add package history	12	add_packagehistory
46	Can change package history	12	change_packagehistory
47	Can delete package history	12	delete_packagehistory
48	Can view package history	12	view_packagehistory
49	Can add product	13	add_product
50	Can change product	13	change_product
51	Can delete product	13	delete_product
52	Can view product	13	view_product
53	Can add product category	14	add_productcategory
54	Can change product category	14	change_productcategory
55	Can delete product category	14	delete_productcategory
56	Can view product category	14	view_productcategory
57	Can add product type	15	add_producttype
58	Can change product type	15	change_producttype
59	Can delete product type	15	delete_producttype
60	Can view product type	15	view_producttype
61	Can add contact	16	add_contact
62	Can change contact	16	change_contact
63	Can delete contact	16	delete_contact
64	Can view contact	16	view_contact
65	Can add contact group	17	add_contactgroup
66	Can change contact group	17	change_contactgroup
67	Can delete contact group	17	delete_contactgroup
68	Can view contact group	17	view_contactgroup
69	Can add campaign	18	add_campaign
70	Can change campaign	18	change_campaign
71	Can delete campaign	18	delete_campaign
72	Can view campaign	18	view_campaign
73	Can add contact marketing	19	add_contactmarketing
74	Can change contact marketing	19	change_contactmarketing
75	Can delete contact marketing	19	delete_contactmarketing
76	Can view contact marketing	19	view_contactmarketing
77	Can add contact marketing history	20	add_contactmarketinghistory
78	Can change contact marketing history	20	change_contactmarketinghistory
79	Can delete contact marketing history	20	delete_contactmarketinghistory
80	Can view contact marketing history	20	view_contactmarketinghistory
81	Can add follow up plan	21	add_followupplan
82	Can change follow up plan	21	change_followupplan
83	Can delete follow up plan	21	delete_followupplan
84	Can view follow up plan	21	view_followupplan
85	Can add mail template	22	add_mailtemplate
86	Can change mail template	22	change_mailtemplate
87	Can delete mail template	22	delete_mailtemplate
88	Can view mail template	22	view_mailtemplate
89	Can add marketing plan	23	add_marketingplan
90	Can change marketing plan	23	change_marketingplan
91	Can delete marketing plan	23	delete_marketingplan
92	Can view marketing plan	23	view_marketingplan
93	Can add note	24	add_note
94	Can change note	24	change_note
95	Can delete note	24	delete_note
96	Can view note	24	view_note
97	Can add license	25	add_license
98	Can change license	25	change_license
99	Can delete license	25	delete_license
100	Can view license	25	view_license
101	Can add lifetime license	26	add_lifetimelicense
102	Can change lifetime license	26	change_lifetimelicense
103	Can delete lifetime license	26	delete_lifetimelicense
104	Can view lifetime license	26	view_lifetimelicense
105	Can add order	27	add_order
106	Can change order	27	change_order
107	Can delete order	27	delete_order
108	Can view order	27	view_order
109	Can add order history	28	add_orderhistory
110	Can change order history	28	change_orderhistory
111	Can delete order history	28	delete_orderhistory
112	Can view order history	28	view_orderhistory
113	Can add step	29	add_step
114	Can change step	29	change_step
115	Can delete step	29	delete_step
116	Can view step	29	view_step
117	Can add step detail	30	add_stepdetail
118	Can change step detail	30	change_stepdetail
119	Can delete step detail	30	delete_stepdetail
120	Can view step detail	30	view_stepdetail
121	Can add report	31	add_report
122	Can change report	31	change_report
123	Can delete report	31	delete_report
124	Can view report	31	view_report
125	Can add event	32	add_event
126	Can change event	32	change_event
127	Can delete event	32	delete_event
128	Can view event	32	view_event
129	Can add notification	33	add_notification
130	Can change notification	33	change_notification
131	Can delete notification	33	delete_notification
132	Can view notification	33	view_notification
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
5	pbkdf2_sha256$120000$LcWkrtUrVXld$gwOUUDbytCajhTPFtQbgzRAOuevYjnyUNdtOGUGKh3U=	\N	f	user234				f	t	2019-05-12 18:59:20.95362+00
1	pbkdf2_sha256$120000$E8elhDh4wHDT$2/a8RigrWvstv1dQNHN4UIpISZz5TFn1XYFCFVJEa7A=	2019-05-22 10:33:36.341379+00	t	admin				t	t	2019-05-12 18:47:07.667847+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: campaigns_campaign; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) FROM stdin;
1	2019-05-12 19:12:08.159525+00	2019-05-14 05:18:35.923151+00	f	New World	2019-05-13	2019-05-18	<p></p>	1	5	1
2	2019-05-22 10:23:36.14444+00	2019-05-22 10:23:36.144805+00	f	OK now ?	2019-05-22	2019-05-25	<p>ONOW</p>	1	5	1
3	2019-05-23 09:40:21.191153+00	2019-05-23 09:40:21.191512+00	f	Can it send?	2019-05-23	2019-05-30	<p></p>	1	5	5
4	2019-05-24 00:07:12.643849+00	2019-05-24 00:07:12.644193+00	f	Can it send 2?	2019-05-24	2019-05-24	<p></p>	1	5	5
5	2019-05-25 00:04:51.102303+00	2019-05-25 00:04:51.102633+00	f	Can it send 3?	2019-05-25	2019-05-25	<p></p>	1	5	5
6	2019-05-25 00:05:08.99756+00	2019-05-25 00:05:08.997884+00	f	Can it send 3?	2019-05-25	2019-05-25	<p></p>	1	5	5
7	2019-05-25 00:07:43.541209+00	2019-05-25 00:07:43.541599+00	f	Can it send 3?	2019-05-25	2019-05-25	<p></p>	1	5	5
8	2019-05-26 00:20:48.754535+00	2019-05-26 00:20:48.75484+00	f	CAn it send 4?	2019-05-26	2019-05-26	<p></p>	1	5	5
9	2019-05-27 00:03:37.935337+00	2019-05-27 00:03:37.935743+00	f	Can it send 5?	2019-05-27	2019-05-27	<p>asfasf</p>	1	5	5
\.


--
-- Data for Name: campaigns_campaign_assigned_to; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_campaign_assigned_to (id, campaign_id, user_id) FROM stdin;
1	1	5
2	2	5
3	3	5
4	4	5
5	5	5
6	6	5
7	7	5
8	8	5
9	9	5
\.


--
-- Data for Name: campaigns_campaign_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_campaign_packages (id, campaign_id, package_id) FROM stdin;
1	1	1
2	1	2
3	2	2
4	3	2
5	4	2
6	5	2
7	6	2
8	7	2
9	8	2
10	9	2
\.


--
-- Data for Name: campaigns_contactmarketing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id) FROM stdin;
1	2019-05-12 19:12:08.322801+00	2019-05-16 05:47:07.290918+00	f	COMPLETED	2	106b757d-b721-4ebe-8ac8-7bc32402bab8	1	1	1	5
2	2019-05-12 19:12:08.337484+00	2019-05-16 05:47:13.185362+00	f	COMPLETED	2	106b757d-b721-4ebe-8ac8-7bc32402bab8	1	2	1	5
3	2019-05-22 10:23:36.708758+00	2019-05-22 10:23:36.709102+00	f	RUNNING	2	369366af-1e40-4010-8684-1f67adae3cc3	2	1	1	5
4	2019-05-23 09:40:21.381696+00	2019-05-23 09:40:21.382015+00	f	RUNNING	2	df942c5a-0b32-42d0-991b-5fd5916fdbb4	3	1	5	5
5	2019-05-23 09:40:21.419285+00	2019-05-23 09:40:21.419609+00	f	RUNNING	2	4da90545-fc24-4881-8488-25190762172a	3	3	5	5
6	2019-05-23 09:40:21.434844+00	2019-05-23 09:40:21.43522+00	f	RUNNING	2	7fb9cfc5-8b3e-43df-a720-e3ccdcd7487a	3	2	5	5
7	2019-05-24 00:07:12.917698+00	2019-05-24 00:07:12.918062+00	f	RUNNING	2	f4573e6a-2592-479b-bf67-db3f5e45e351	4	1	5	5
8	2019-05-24 00:07:12.95443+00	2019-05-24 00:07:12.95478+00	f	RUNNING	2	4518acc7-ccd2-4598-9773-4c92fd24e90c	4	3	5	5
9	2019-05-24 00:07:12.985631+00	2019-05-24 00:07:12.985929+00	f	RUNNING	2	ab5d9157-10fe-4479-8d05-a88a8a6ec844	4	2	5	5
10	2019-05-25 00:07:43.744364+00	2019-05-25 00:07:43.744705+00	f	RUNNING	2	0c15bb59-e154-4a9c-b419-912b7f7d3d54	7	1	5	5
11	2019-05-25 00:07:43.7649+00	2019-05-25 00:07:43.765187+00	f	RUNNING	2	90f4c415-e763-4960-b866-6e239ea3ce88	7	3	5	5
12	2019-05-25 00:07:43.78384+00	2019-05-25 00:07:43.78424+00	f	RUNNING	2	b42b7693-d395-462e-a960-fb4deb126fe6	7	2	5	5
13	2019-05-26 00:20:48.91407+00	2019-05-26 00:20:48.914401+00	f	RUNNING	2	a88b6ec4-7027-465a-b2f1-86516df8f333	8	1	5	5
14	2019-05-26 00:20:48.939551+00	2019-05-26 00:20:48.939944+00	f	RUNNING	2	fc43f7b5-f7fd-4128-88f7-7a1bac76de9a	8	3	5	5
15	2019-05-26 00:20:48.958329+00	2019-05-26 00:20:48.958671+00	f	RUNNING	2	7db67b40-15d1-4ea0-818e-fe2309a79427	8	2	5	5
16	2019-05-27 00:03:38.199443+00	2019-05-27 00:03:38.199906+00	f	RUNNING	2	bd7abc9b-afee-4b82-8b44-bd2ddb76b459	9	1	5	5
17	2019-05-27 00:03:38.222445+00	2019-05-27 00:03:38.222777+00	f	RUNNING	2	f9db3bac-3dbc-47cd-99e6-050124f76497	9	3	5	5
18	2019-05-27 00:03:38.250464+00	2019-05-27 00:03:38.250777+00	f	RUNNING	2	77e52f4b-d499-4e8b-b4e5-8feb2ea2db40	9	2	5	5
\.


--
-- Data for Name: campaigns_contactmarketinghistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) FROM stdin;
\.


--
-- Data for Name: campaigns_followupplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_followupplan (id, created, modified, is_removed, name, can_modify, manager_id) FROM stdin;
1	2019-05-12 19:06:47.484467+00	2019-05-12 19:06:47.484829+00	f	FOllow1	t	5
\.


--
-- Data for Name: campaigns_mailtemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_mailtemplate (id, created, modified, is_removed, name, template, is_public, user_id, subject) FROM stdin;
3	2019-05-22 05:50:13.865082+00	2019-05-22 05:50:13.86544+00	f	TEmp2	<p>OK Chua</p>	f	5	This July
4	2019-05-22 05:55:21.044441+00	2019-05-22 05:55:21.044806+00	f	asf	<p>HIIIIIIIIIIIIII</p>	f	5	aasf
5	2019-05-22 05:55:54.612467+00	2019-05-22 05:55:54.612715+00	f	LLLLLL	<p>alkff</p>	f	5	WOwow
6	2019-05-22 05:57:14.03812+00	2019-05-22 05:57:14.038357+00	f	bbbbb	<p>aaaa</p>	f	5	Oh NO
7	2019-05-22 05:58:17.781928+00	2019-05-22 05:58:17.78215+00	f	Naij la minh	<p>NOOOOOOOOOOOO</p>	f	5	OKKKK
2	2019-05-22 05:47:47.61973+00	2019-05-22 09:56:26.755709+00	f	VU	<p>ababababSPARTANNNNNNNNNNNNN</p>	f	5	This is
1	2019-05-12 19:06:29.83437+00	2019-05-22 09:59:09.025025+00	f	Mail temp11	vvvvvvvvvvvvvvvv	t	5	Subject Template    oooqwwwwwwwwwwwwwwwaslfkasjfl kajslfk asflkjaskflj lkasjflkajsflja alskfjalksjflaksjfj
\.


--
-- Data for Name: campaigns_marketingplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, actions, can_modify, mail_template_id, manager_id) FROM stdin;
4	2019-05-20 05:15:05.81327+00	2019-05-20 05:15:05.813522+00	f	ALOOOOOOOOOOO	{"must": [{"data": ["AL", "AS", "AR"], "operand": "1", "operator": "Equal to"}]}	{}	t	\N	1
3	2019-05-20 05:09:26.484937+00	2019-05-20 05:15:25.130027+00	t	afasg	{"must": [{"data": "", "operand": "", "operator": ""}]}	{}	t	\N	1
2	2019-05-20 05:07:33.881657+00	2019-05-20 05:15:32.372899+00	t	ggg	{"must": [{"data": "", "operand": "", "operator": ""}]}	{}	t	\N	1
1	2019-05-12 19:05:49.35249+00	2019-05-20 05:16:47.092572+00	f	Marketing	{"must": [{"data": ["AK"], "operand": "1", "operator": "Equal to"}]}	{"\\"\\""}	t	\N	5
5	2019-05-23 09:39:12.950956+00	2019-05-23 09:39:12.951243+00	f	With sending auto	{"must": [{"data": ["AL", "AK"], "operand": "1", "operator": "Equal to"}]}	{"Send Email"}	t	3	5
\.


--
-- Data for Name: campaigns_note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_note (id, created, modified, is_removed, name, content, _type, campaign_id, contact_id, user_id) FROM stdin;
\.


--
-- Data for Name: contacts_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) FROM stdin;
1	2019-05-12 19:01:30.28057+00	2019-05-12 19:01:30.28086+00	f	Vu	Dang	hepmy666@gmail.com	0123456789	MALE	02 abc	America	AK	Anchorage	500000	FA	5
3	2019-05-12 19:05:23.249904+00	2019-05-12 19:05:23.250174+00	f	Mac	Demarco	vudangho96@gmail.com	0123456789	MALE		America	AL	Birmingham	054555		5
2	2019-05-12 19:04:50.830978+00	2019-05-15 06:58:42.235728+00	f	John	Wick	deafandblind14@gmail.com	0123456789	OTHER	\N	America	AL	Anchorage	012333		5
\.


--
-- Data for Name: contacts_contactgroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) FROM stdin;
4	2019-05-12 19:00:29.694296+00	2019-05-12 19:00:29.705968+00	f	All Contacts	PRIVATE	\N	5
5	2019-05-12 19:00:44.716839+00	2019-05-12 19:00:44.723189+00	f	All Contacts	PRIVATE	\N	1
6	2019-05-12 19:21:31.380524+00	2019-05-12 19:21:57.993593+00	f	Public One	PUBLIC	\N	5
7	2019-05-12 19:22:57.575934+00	2019-05-12 19:22:57.576189+00	f	Private	PRIVATE	\N	5
\.


--
-- Data for Name: contacts_contactgroup_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) FROM stdin;
1	4	1
2	4	2
3	4	3
4	6	1
5	6	2
6	6	3
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2019-05-12 18:54:04.143493+00	1	Profile object (1)	1	[{"added": {}}]	9	1
2	2019-05-12 18:55:25.395194+00	2	user234	3		6	1
3	2019-05-12 18:56:26.655155+00	3	user234	3		6	1
4	2019-05-12 18:57:03.346927+00	4	user234	2	[{"changed": {"fields": ["password"]}}]	6	1
5	2019-05-12 18:57:56.093262+00	4	user234	2	[{"changed": {"fields": ["is_staff", "is_superuser"]}}]	6	1
6	2019-05-12 18:59:13.116042+00	4	user234	3		6	1
7	2019-05-12 18:59:21.083342+00	5	user234	1	[{"added": {}}]	6	1
8	2019-05-12 18:59:40.398515+00	5	Profile object (5)	1	[{"added": {}}]	9	1
9	2019-05-12 19:00:29.711445+00	4	ContactGroup object (4)	1	[{"added": {}}]	17	1
10	2019-05-12 19:00:44.728594+00	5	ContactGroup object (5)	1	[{"added": {}}]	17	1
11	2019-05-12 19:06:29.839864+00	1	MailTemplate object (1)	1	[{"added": {}}]	18	1
12	2019-05-12 19:07:51.288473+00	1	ProductType object (1)	1	[{"added": {}}]	10	1
13	2019-05-12 19:08:06.586204+00	1	ProductCategory object (1)	1	[{"added": {}}]	11	1
14	2019-05-12 19:18:45.340141+00	1	StepDetail object (1)	2	[{"changed": {"fields": ["information"]}}]	30	1
15	2019-05-12 19:21:57.997786+00	6	ContactGroup object (6)	2	[{"changed": {"fields": ["_type"]}}]	17	1
16	2019-05-12 19:29:08.915016+00	1	StepDetail object (1)	2	[{"changed": {"fields": ["information"]}}]	30	1
17	2019-05-12 19:31:58.821665+00	1	StepDetail object (1)	2	[{"changed": {"fields": ["information"]}}]	30	1
18	2019-05-12 19:34:19.685721+00	1	StepDetail object (1)	2	[{"changed": {"fields": ["information"]}}]	30	1
19	2019-05-12 19:39:49.836413+00	1	StepDetail object (1)	2	[{"changed": {"fields": ["information"]}}]	30	1
20	2019-05-12 19:44:02.702594+00	1	StepDetail object (1)	3		30	1
21	2019-05-14 05:17:17.193303+00	1	Order object (1)	3		25	1
22	2019-05-14 05:18:36.835592+00	1	Campaign object (1)	2	[{"changed": {"fields": ["end_date"]}}]	21	1
23	2019-05-14 05:22:10.367289+00	3	StepDetail object (3)	3		30	1
24	2019-05-14 05:22:20.828271+00	3	Order object (3)	3		25	1
25	2019-05-14 05:22:30.796802+00	2	ContactMarketing object (2)	2	[{"changed": {"fields": ["status"]}}]	22	1
26	2019-05-14 05:24:29.183953+00	4	Order object (4)	3		25	1
27	2019-05-14 05:56:56.709915+00	2	StepDetail object (2)	2	[{"changed": {"fields": ["order"]}}]	30	1
28	2019-05-14 05:58:54.424035+00	4	StepDetail object (4)	2	[{"changed": {"fields": ["information"]}}]	30	1
29	2019-05-14 06:00:14.138656+00	4	StepDetail object (4)	3		30	1
30	2019-05-14 06:00:34.094667+00	5	Order object (5)	3		25	1
31	2019-05-14 06:00:47.149589+00	2	ContactMarketing object (2)	2	[{"changed": {"fields": ["status"]}}]	22	1
32	2019-05-14 06:01:24.889615+00	2	Contact object (2)	2	[{"changed": {"fields": ["mail"]}}]	16	1
33	2019-05-14 06:04:03.034404+00	6	Order object (6)	3		25	1
34	2019-05-14 06:04:11.301604+00	5	StepDetail object (5)	3		30	1
35	2019-05-14 06:04:21.368822+00	2	ContactMarketing object (2)	2	[{"changed": {"fields": ["status"]}}]	22	1
36	2019-05-14 06:48:37.690285+00	1	Package object (1)	2	[{"changed": {"fields": ["prices"]}}]	14	1
37	2019-05-14 06:48:58.119028+00	2	Package object (2)	2	[{"changed": {"fields": ["prices"]}}]	14	1
38	2019-05-15 06:58:42.906286+00	2	Contact object (2)	2	[{"changed": {"fields": ["state"]}}]	16	1
39	2019-05-15 06:59:48.83054+00	8	Order object (8)	1	[{"added": {}}]	25	1
40	2019-05-15 07:00:30.948737+00	8	Order object (8)	3		25	1
41	2019-05-15 11:51:55.477033+00	2	Order object (2)	2	[{"changed": {"fields": ["name", "status"]}}]	25	1
42	2019-05-15 11:52:26.04356+00	2	Order object (2)	2	[{"changed": {"fields": ["status"]}}]	25	1
43	2019-05-16 05:47:07.293637+00	1	ContactMarketing object (1)	2	[{"changed": {"fields": ["sale_rep"]}}]	19	1
44	2019-05-16 05:47:13.186908+00	2	ContactMarketing object (2)	2	[{"changed": {"fields": ["sale_rep"]}}]	19	1
45	2019-05-20 05:15:25.12255+00	3	MarketingPlan object (3)	3		23	1
46	2019-05-20 05:15:32.371227+00	2	MarketingPlan object (2)	3		23	1
47	2019-05-20 05:16:38.591795+00	1	MarketingPlan object (1)	2	[{"changed": {"fields": ["actions"]}}]	23	1
48	2019-05-20 05:16:47.230995+00	1	MarketingPlan object (1)	2	[{"changed": {"fields": ["condition"]}}]	23	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	jet	bookmark
2	jet	pinnedapplication
3	admin	logentry
4	auth	permission
5	auth	group
6	auth	user
7	contenttypes	contenttype
8	sessions	session
9	account	profile
10	packages	feature
11	packages	package
12	packages	packagehistory
13	packages	product
14	packages	productcategory
15	packages	producttype
16	contacts	contact
17	contacts	contactgroup
18	campaigns	campaign
19	campaigns	contactmarketing
20	campaigns	contactmarketinghistory
21	campaigns	followupplan
22	campaigns	mailtemplate
23	campaigns	marketingplan
24	campaigns	note
25	orders	license
26	orders	lifetimelicense
27	orders	order
28	orders	orderhistory
29	steps	step
30	steps	stepdetail
31	reports	report
32	events	event
33	notifications	notification
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2019-05-16 05:40:49.1038+00
2	auth	0001_initial	2019-05-16 05:40:49.288093+00
3	account	0001_initial	2019-05-16 05:40:49.317189+00
4	admin	0001_initial	2019-05-16 05:40:49.355307+00
5	admin	0002_logentry_remove_auto_add	2019-05-16 05:40:49.372074+00
6	admin	0003_logentry_add_action_flag_choices	2019-05-16 05:40:49.392666+00
7	contenttypes	0002_remove_content_type_name	2019-05-16 05:40:49.433976+00
8	auth	0002_alter_permission_name_max_length	2019-05-16 05:40:49.449264+00
9	auth	0003_alter_user_email_max_length	2019-05-16 05:40:49.467806+00
10	auth	0004_alter_user_username_opts	2019-05-16 05:40:49.483679+00
11	auth	0005_alter_user_last_login_null	2019-05-16 05:40:49.502569+00
12	auth	0006_require_contenttypes_0002	2019-05-16 05:40:49.506906+00
13	auth	0007_alter_validators_add_error_messages	2019-05-16 05:40:49.526369+00
14	auth	0008_alter_user_username_max_length	2019-05-16 05:40:49.550771+00
15	auth	0009_alter_user_last_name_max_length	2019-05-16 05:40:49.566144+00
16	packages	0001_initial	2019-05-16 05:40:49.823495+00
17	contacts	0001_initial	2019-05-16 05:40:49.973339+00
22	jet	0001_initial	2019-05-16 05:40:51.482954+00
23	jet	0002_delete_userdashboardmodule	2019-05-16 05:40:51.509554+00
24	notifications	0001_initial	2019-05-16 05:40:51.574615+00
25	reports	0001_initial	2019-05-16 05:40:51.750783+00
26	sessions	0001_initial	2019-05-16 05:40:51.780694+00
28	campaigns	0001_initial	2019-05-17 11:28:55.803238+00
29	orders	0001_initial	2019-05-17 11:28:55.945917+00
30	events	0001_initial	2019-05-17 11:28:55.964637+00
31	events	0002_auto_20190517_1828	2019-05-17 11:28:55.971245+00
32	campaigns	0002_auto_20190517_1833	2019-05-17 11:33:16.732224+00
33	steps	0001_initial	2019-05-17 11:34:36.23202+00
34	campaigns	0002_mailtemplate_subject	2019-05-17 11:40:30.324746+00
35	steps	0002_stepdetail_thread	2019-05-22 05:22:36.440101+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
1w9k342z2juqfqs0yc4fz1yi9tq6fnnh	YWUwNGJlMjM5NThmNDU3Njc4ODczNWYxMzljMzAyYmZhNTEzZDY0OTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzJmZGVhOWM0MTNjYjQ4ZGE0YzUzMmEwNjkyNDBmZTViMTIxMGE3In0=	2019-05-27 04:26:27.019268+00
v83nex9mxot2zcerxc4qvtsv9aybaj2s	YWUwNGJlMjM5NThmNDU3Njc4ODczNWYxMzljMzAyYmZhNTEzZDY0OTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzJmZGVhOWM0MTNjYjQ4ZGE0YzUzMmEwNjkyNDBmZTViMTIxMGE3In0=	2019-06-05 10:33:36.351817+00
\.


--
-- Data for Name: events_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) FROM stdin;
1	2019-05-12 19:12:08.326384+00	2019-05-12 19:12:08.326667+00	f	Contact Vu Dang	2019-05-12 17:00:00+00	2019-05-12 17:00:00+00	Start contacting Vu Dang	0	5	1	\N	5
2	2019-05-12 19:12:08.341488+00	2019-05-12 19:12:08.341748+00	f	Contact John Wick	2019-05-12 17:00:00+00	2019-05-12 17:00:00+00	Start contacting John Wick	0	5	2	\N	5
3	2019-05-14 05:12:05.713836+00	2019-05-14 05:12:05.714138+00	f	<p>One two</p>	2019-05-14 17:00:00+00	2019-05-15 17:00:00+00	Wow	2	5	\N	\N	5
4	2019-05-22 10:23:36.724347+00	2019-05-22 10:23:36.724713+00	f	Contact Vu Dang	2019-05-21 17:00:00+00	2019-05-21 17:00:00+00	Start contacting Vu Dang	0	5	3	\N	5
5	2019-05-23 09:40:21.388723+00	2019-05-23 09:40:21.389163+00	f	Contact Vu Dang	2019-05-22 17:00:00+00	2019-05-22 17:00:00+00	Start contacting Vu Dang	0	5	4	\N	5
6	2019-05-23 09:40:21.422535+00	2019-05-23 09:40:21.422844+00	f	Contact Mac Demarco	2019-05-22 17:00:00+00	2019-05-22 17:00:00+00	Start contacting Mac Demarco	0	5	5	\N	5
7	2019-05-23 09:40:21.438824+00	2019-05-23 09:40:21.439196+00	f	Contact John Wick	2019-05-22 17:00:00+00	2019-05-22 17:00:00+00	Start contacting John Wick	0	5	6	\N	5
8	2019-05-24 00:07:12.926863+00	2019-05-24 00:07:12.928622+00	f	Contact Vu Dang	2019-05-23 17:00:00+00	2019-05-23 17:00:00+00	Start contacting Vu Dang	0	5	7	\N	5
9	2019-05-24 00:07:12.964715+00	2019-05-24 00:07:12.964979+00	f	Contact Mac Demarco	2019-05-23 17:00:00+00	2019-05-23 17:00:00+00	Start contacting Mac Demarco	0	5	8	\N	5
10	2019-05-24 00:07:12.98921+00	2019-05-24 00:07:12.989596+00	f	Contact John Wick	2019-05-23 17:00:00+00	2019-05-23 17:00:00+00	Start contacting John Wick	0	5	9	\N	5
11	2019-05-25 00:07:43.750068+00	2019-05-25 00:07:43.750474+00	f	Contact Vu Dang	2019-05-24 17:00:00+00	2019-05-24 17:00:00+00	Start contacting Vu Dang	0	5	10	\N	5
12	2019-05-25 00:07:43.770291+00	2019-05-25 00:07:43.770593+00	f	Contact Mac Demarco	2019-05-24 17:00:00+00	2019-05-24 17:00:00+00	Start contacting Mac Demarco	0	5	11	\N	5
13	2019-05-25 00:07:43.789247+00	2019-05-25 00:07:43.789525+00	f	Contact John Wick	2019-05-24 17:00:00+00	2019-05-24 17:00:00+00	Start contacting John Wick	0	5	12	\N	5
14	2019-05-26 00:20:48.920281+00	2019-05-26 00:20:48.920823+00	f	Contact Vu Dang	2019-05-25 17:00:00+00	2019-05-25 17:00:00+00	Start contacting Vu Dang	0	5	13	\N	5
15	2019-05-26 00:20:48.943554+00	2019-05-26 00:20:48.943828+00	f	Contact Mac Demarco	2019-05-25 17:00:00+00	2019-05-25 17:00:00+00	Start contacting Mac Demarco	0	5	14	\N	5
16	2019-05-26 00:20:48.961253+00	2019-05-26 00:20:48.961535+00	f	Contact John Wick	2019-05-25 17:00:00+00	2019-05-25 17:00:00+00	Start contacting John Wick	0	5	15	\N	5
17	2019-05-27 00:03:38.203923+00	2019-05-27 00:03:38.204319+00	f	Contact Vu Dang	2019-05-26 17:00:00+00	2019-05-26 17:00:00+00	Start contacting Vu Dang	0	5	16	\N	5
18	2019-05-27 00:03:38.22886+00	2019-05-27 00:03:38.229158+00	f	Contact Mac Demarco	2019-05-26 17:00:00+00	2019-05-26 17:00:00+00	Start contacting Mac Demarco	0	5	17	\N	5
19	2019-05-27 00:03:38.254033+00	2019-05-27 00:03:38.254576+00	f	Contact John Wick	2019-05-26 17:00:00+00	2019-05-26 17:00:00+00	Start contacting John Wick	0	5	18	\N	5
\.


--
-- Data for Name: events_event_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_event_contacts (id, event_id, contact_id) FROM stdin;
1	1	1
2	2	2
3	4	1
4	5	1
5	6	3
6	7	2
7	8	1
8	9	3
9	10	2
10	11	1
11	12	3
12	13	2
13	14	1
14	15	3
15	16	2
16	17	1
17	18	3
18	19	2
\.


--
-- Data for Name: jet_bookmark; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jet_bookmark (id, url, title, "user", date_add) FROM stdin;
\.


--
-- Data for Name: jet_pinnedapplication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jet_pinnedapplication (id, app_label, "user", date_add) FROM stdin;
\.


--
-- Data for Name: notifications_notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) FROM stdin;
\.


--
-- Data for Name: orders_license; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_license (id, created, modified, is_removed, start_date, duration, code, order_id, package_id) FROM stdin;
1	2019-05-14 06:45:10.098753+00	2019-05-14 06:45:10.099999+00	f	2019-05-14	1	5c05dba1-5351-4384-844d-94553fc01ac8	2	1
2	2019-05-14 06:45:10.113416+00	2019-05-14 06:45:10.113776+00	f	2019-05-14	6	a9655d0c-49d6-4a89-8b0b-b8fdf8161db7	2	2
\.


--
-- Data for Name: orders_lifetimelicense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_lifetimelicense (id, created, modified, is_removed, start_date, code, order_id, package_id) FROM stdin;
1	2019-05-14 06:45:21.265869+00	2019-05-14 06:45:21.266367+00	f	2019-05-14	79728da8-fce4-4e32-a532-da3f3eb656eb	7	1
2	2019-05-14 06:45:21.31838+00	2019-05-14 06:45:21.318738+00	f	2019-05-14	fe5a4b13-5efe-48b3-a139-d71bd91c7e60	7	2
\.


--
-- Data for Name: orders_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) FROM stdin;
1	2019-05-12 19:12:26.592743+00	2019-05-12 19:19:26.697132+00	t		RUNNING	1	2	5
3	2019-05-14 05:19:24.945476+00	2019-05-14 05:22:20.831769+00	t		RUNNING	1	1	5
4	2019-05-14 05:22:42.711225+00	2019-05-14 05:24:29.185851+00	t		RUNNING	1	2	5
5	2019-05-14 05:23:18.608027+00	2019-05-14 05:23:18.608395+00	t		RUNNING	1	2	5
6	2019-05-14 06:01:34.245196+00	2019-05-14 06:04:03.035842+00	t		RUNNING	1	2	5
7	2019-05-14 06:04:31.121716+00	2019-05-14 06:45:21.350181+00	f		COMPLETED	1	2	5
8	2019-05-15 06:59:48.760588+00	2019-05-15 06:59:48.813131+00	t	OO	COMPLETED	1	3	1
2	2019-05-14 05:18:47.081065+00	2019-05-15 11:52:26.029687+00	f	Woo	COMPLETED	1	1	5
\.


--
-- Data for Name: orders_order_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_order_packages (id, order_id, package_id) FROM stdin;
1	2	1
2	2	2
3	7	1
4	7	2
5	8	1
\.


--
-- Data for Name: orders_orderhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_orderhistory (id, created, modified, is_removed, date, action, order_id) FROM stdin;
1	2019-05-12 19:19:26.704456+00	2019-05-12 19:19:26.704861+00	f	2019-05-13	Call Client	1
\.


--
-- Data for Name: packages_feature; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) FROM stdin;
1	2019-05-12 19:09:42.2498+00	2019-05-12 19:09:42.250114+00	f	Big1		111111111	1	1
2	2019-05-12 19:09:42.253465+00	2019-05-12 19:09:42.253846+00	f	Big2		11111111	2	1
\.


--
-- Data for Name: packages_package; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_package (id, created, modified, is_removed, name, prices, discount) FROM stdin;
1	2019-05-12 19:09:42.257162+00	2019-05-14 06:48:37.603794+00	f	PackA	{"1": 144, "6": 115656, "12": 22222, "999999": 6666}	0
2	2019-05-12 19:09:42.614035+00	2019-05-14 06:48:58.029707+00	f	PackB	{"1": 255, "6": 256, "12": 333, "999999": 8888}	0
\.


--
-- Data for Name: packages_package_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_package_features (id, package_id, feature_id) FROM stdin;
1	1	1
2	2	1
3	2	2
\.


--
-- Data for Name: packages_packagehistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_packagehistory (id, created, modified, is_removed, date, action, package_id, user_id) FROM stdin;
\.


--
-- Data for Name: packages_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) FROM stdin;
1	2019-05-12 19:09:41.889359+00	2019-05-12 19:09:41.889653+00	f	Product NA		ACTIVE	2019-05-13	1	5	1
\.


--
-- Data for Name: packages_productcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_productcategory (id, created, modified, is_removed, name, description, status) FROM stdin;
1	2019-05-12 19:08:06.582929+00	2019-05-12 19:08:06.583484+00	f	Game		ACTIVE
\.


--
-- Data for Name: packages_producttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_producttype (id, created, modified, is_removed, name, description, status) FROM stdin;
1	2019-05-12 19:07:51.286051+00	2019-05-12 19:07:51.286661+00	f	Mobile		ACTIVE
\.


--
-- Data for Name: reports_report; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports_report (id, created, modified, is_removed, name, columns) FROM stdin;
\.


--
-- Data for Name: reports_report_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports_report_packages (id, report_id, package_id) FROM stdin;
\.


--
-- Data for Name: reports_report_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports_report_products (id, report_id, product_id) FROM stdin;
\.


--
-- Data for Name: reports_report_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports_report_users (id, report_id, user_id) FROM stdin;
\.


--
-- Data for Name: steps_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.steps_step (id, created, modified, is_removed, actions, duration, conditions, follow_up_id, mail_template_id) FROM stdin;
1	2019-05-12 19:06:47.491713+00	2019-05-12 19:06:47.49239+00	f	["Send Email"]	10	[{"name": "Choose Packages", "type": "final"}]	1	1
\.


--
-- Data for Name: steps_stepdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.steps_stepdetail (id, created, modified, is_removed, information, status, order_id, step_id, thread) FROM stdin;
1	2019-05-12 19:12:26.602629+00	2019-05-12 19:39:49.834772+00	t	[{"type": "final", "result": {"1": {"type": 6}}}]	COMPLETED	1	1	[]
3	2019-05-14 05:19:24.954499+00	2019-05-14 05:22:10.373803+00	t	{"1": {"type": "", "price": ""}, "2": {"type": "", "price": ""}}	RUNNING	3	1	[]
2	2019-05-12 19:44:16.691028+00	2019-05-14 05:56:56.707398+00	f	{"Choose Packages": {"type": "final", "result": {"1": {"type": 1, "price": "144"}, "2": {"type": 6, "price": "256"}}}}	COMPLETED	2	1	[]
4	2019-05-14 05:23:18.617965+00	2019-05-14 06:00:14.140276+00	t	{"Choose Packages": {"type": "final", "result": {"1": {"type": "", "price": ""}, "2": {"type": "", "price": ""}}}}	RUNNING	5	1	[]
5	2019-05-14 06:01:34.254+00	2019-05-14 06:04:11.30326+00	t	{"Choose Packages": {"type": "final", "result": {"2": {"type": "", "price": ""}}}}	RUNNING	6	1	[]
6	2019-05-14 06:04:31.13076+00	2019-05-14 06:45:17.800205+00	f	{"Choose Packages": {"type": "final", "result": {"1": {"type": 999999, "price": "6666"}, "2": {"type": 999999, "price": "8888"}}}}	COMPLETED	7	1	[]
\.


--
-- Name: account_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_profile_id_seq', 5, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 132, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 5, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: campaigns_campaign_assigned_to_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_assigned_to_id_seq', 9, true);


--
-- Name: campaigns_campaign_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_id_seq', 9, true);


--
-- Name: campaigns_campaign_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_packages_id_seq', 10, true);


--
-- Name: campaigns_contactmarketing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketing_id_seq', 18, true);


--
-- Name: campaigns_contactmarketinghistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketinghistory_id_seq', 1, false);


--
-- Name: campaigns_followupplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_followupplan_id_seq', 1, true);


--
-- Name: campaigns_mailtemplate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_mailtemplate_id_seq', 7, true);


--
-- Name: campaigns_marketingplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_marketingplan_id_seq', 5, true);


--
-- Name: campaigns_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_note_id_seq', 1, false);


--
-- Name: contacts_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contact_id_seq', 3, true);


--
-- Name: contacts_contactgroup_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_contacts_id_seq', 6, true);


--
-- Name: contacts_contactgroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_id_seq', 7, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 48, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 33, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 35, true);


--
-- Name: events_event_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_contacts_id_seq', 18, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 19, true);


--
-- Name: jet_bookmark_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jet_bookmark_id_seq', 1, false);


--
-- Name: jet_pinnedapplication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jet_pinnedapplication_id_seq', 1, false);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 1, false);


--
-- Name: orders_license_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_license_id_seq', 2, true);


--
-- Name: orders_lifetimelicense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_lifetimelicense_id_seq', 2, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 8, true);


--
-- Name: orders_order_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_packages_id_seq', 5, true);


--
-- Name: orders_orderhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_orderhistory_id_seq', 1, true);


--
-- Name: packages_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_feature_id_seq', 2, true);


--
-- Name: packages_package_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_features_id_seq', 3, true);


--
-- Name: packages_package_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_id_seq', 2, true);


--
-- Name: packages_packagehistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_packagehistory_id_seq', 1, false);


--
-- Name: packages_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_product_id_seq', 1, true);


--
-- Name: packages_productcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_productcategory_id_seq', 1, true);


--
-- Name: packages_producttype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_producttype_id_seq', 1, true);


--
-- Name: reports_report_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_report_id_seq', 1, false);


--
-- Name: reports_report_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_report_packages_id_seq', 1, false);


--
-- Name: reports_report_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_report_products_id_seq', 1, false);


--
-- Name: reports_report_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_report_users_id_seq', 1, false);


--
-- Name: steps_step_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.steps_step_id_seq', 1, true);


--
-- Name: steps_stepdetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.steps_stepdetail_id_seq', 6, true);


--
-- Name: account_profile account_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_profile
    ADD CONSTRAINT account_profile_pkey PRIMARY KEY (id);


--
-- Name: account_profile account_profile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_profile
    ADD CONSTRAINT account_profile_user_id_key UNIQUE (user_id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: campaigns_campaign_assigned_to campaigns_campaign_assig_campaign_id_user_id_69c3834f_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_assigned_to
    ADD CONSTRAINT campaigns_campaign_assig_campaign_id_user_id_69c3834f_uniq UNIQUE (campaign_id, user_id);


--
-- Name: campaigns_campaign_assigned_to campaigns_campaign_assigned_to_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_assigned_to
    ADD CONSTRAINT campaigns_campaign_assigned_to_pkey PRIMARY KEY (id);


--
-- Name: campaigns_campaign_packages campaigns_campaign_packa_campaign_id_package_id_9ce3548c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_packages
    ADD CONSTRAINT campaigns_campaign_packa_campaign_id_package_id_9ce3548c_uniq UNIQUE (campaign_id, package_id);


--
-- Name: campaigns_campaign_packages campaigns_campaign_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_packages
    ADD CONSTRAINT campaigns_campaign_packages_pkey PRIMARY KEY (id);


--
-- Name: campaigns_campaign campaigns_campaign_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign
    ADD CONSTRAINT campaigns_campaign_pkey PRIMARY KEY (id);


--
-- Name: campaigns_contactmarketing campaigns_contactmarketing_campaign_id_contact_id_083bf8ae_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketing
    ADD CONSTRAINT campaigns_contactmarketing_campaign_id_contact_id_083bf8ae_uniq UNIQUE (campaign_id, contact_id);


--
-- Name: campaigns_contactmarketing campaigns_contactmarketing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketing
    ADD CONSTRAINT campaigns_contactmarketing_pkey PRIMARY KEY (id);


--
-- Name: campaigns_contactmarketinghistory campaigns_contactmarketinghistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketinghistory
    ADD CONSTRAINT campaigns_contactmarketinghistory_pkey PRIMARY KEY (id);


--
-- Name: campaigns_followupplan campaigns_followupplan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_followupplan
    ADD CONSTRAINT campaigns_followupplan_pkey PRIMARY KEY (id);


--
-- Name: campaigns_mailtemplate campaigns_mailtemplate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_mailtemplate
    ADD CONSTRAINT campaigns_mailtemplate_pkey PRIMARY KEY (id);


--
-- Name: campaigns_marketingplan campaigns_marketingplan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_marketingplan
    ADD CONSTRAINT campaigns_marketingplan_pkey PRIMARY KEY (id);


--
-- Name: campaigns_note campaigns_note_campaign_id__type_contact_id_e64ba5ec_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_note
    ADD CONSTRAINT campaigns_note_campaign_id__type_contact_id_e64ba5ec_uniq UNIQUE (campaign_id, _type, contact_id);


--
-- Name: campaigns_note campaigns_note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_note
    ADD CONSTRAINT campaigns_note_pkey PRIMARY KEY (id);


--
-- Name: contacts_contact contacts_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contact
    ADD CONSTRAINT contacts_contact_pkey PRIMARY KEY (id);


--
-- Name: contacts_contactgroup_contacts contacts_contactgroup_co_contactgroup_id_contact__0f909f73_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup_contacts
    ADD CONSTRAINT contacts_contactgroup_co_contactgroup_id_contact__0f909f73_uniq UNIQUE (contactgroup_id, contact_id);


--
-- Name: contacts_contactgroup_contacts contacts_contactgroup_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup_contacts
    ADD CONSTRAINT contacts_contactgroup_contacts_pkey PRIMARY KEY (id);


--
-- Name: contacts_contactgroup contacts_contactgroup_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup
    ADD CONSTRAINT contacts_contactgroup_pkey PRIMARY KEY (id);


--
-- Name: contacts_contactgroup contacts_contactgroup_user_id_name_6ad56520_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup
    ADD CONSTRAINT contacts_contactgroup_user_id_name_6ad56520_uniq UNIQUE (user_id, name);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: events_event_contacts events_event_contacts_event_id_contact_id_a262e2d5_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event_contacts
    ADD CONSTRAINT events_event_contacts_event_id_contact_id_a262e2d5_uniq UNIQUE (event_id, contact_id);


--
-- Name: events_event_contacts events_event_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event_contacts
    ADD CONSTRAINT events_event_contacts_pkey PRIMARY KEY (id);


--
-- Name: events_event events_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event
    ADD CONSTRAINT events_event_pkey PRIMARY KEY (id);


--
-- Name: jet_bookmark jet_bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jet_bookmark
    ADD CONSTRAINT jet_bookmark_pkey PRIMARY KEY (id);


--
-- Name: jet_pinnedapplication jet_pinnedapplication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jet_pinnedapplication
    ADD CONSTRAINT jet_pinnedapplication_pkey PRIMARY KEY (id);


--
-- Name: notifications_notification notifications_notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications_notification
    ADD CONSTRAINT notifications_notification_pkey PRIMARY KEY (id);


--
-- Name: orders_license orders_license_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_license
    ADD CONSTRAINT orders_license_code_key UNIQUE (code);


--
-- Name: orders_license orders_license_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_license
    ADD CONSTRAINT orders_license_pkey PRIMARY KEY (id);


--
-- Name: orders_lifetimelicense orders_lifetimelicense_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_lifetimelicense
    ADD CONSTRAINT orders_lifetimelicense_code_key UNIQUE (code);


--
-- Name: orders_lifetimelicense orders_lifetimelicense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_lifetimelicense
    ADD CONSTRAINT orders_lifetimelicense_pkey PRIMARY KEY (id);


--
-- Name: orders_order_packages orders_order_packages_order_id_package_id_b1db02a6_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order_packages
    ADD CONSTRAINT orders_order_packages_order_id_package_id_b1db02a6_uniq UNIQUE (order_id, package_id);


--
-- Name: orders_order_packages orders_order_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order_packages
    ADD CONSTRAINT orders_order_packages_pkey PRIMARY KEY (id);


--
-- Name: orders_order orders_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order
    ADD CONSTRAINT orders_order_pkey PRIMARY KEY (id);


--
-- Name: orders_orderhistory orders_orderhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_orderhistory
    ADD CONSTRAINT orders_orderhistory_pkey PRIMARY KEY (id);


--
-- Name: packages_feature packages_feature_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_feature
    ADD CONSTRAINT packages_feature_pkey PRIMARY KEY (id);


--
-- Name: packages_package_features packages_package_features_package_id_feature_id_9c450d7c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_package_features
    ADD CONSTRAINT packages_package_features_package_id_feature_id_9c450d7c_uniq UNIQUE (package_id, feature_id);


--
-- Name: packages_package_features packages_package_features_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_package_features
    ADD CONSTRAINT packages_package_features_pkey PRIMARY KEY (id);


--
-- Name: packages_package packages_package_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_package
    ADD CONSTRAINT packages_package_pkey PRIMARY KEY (id);


--
-- Name: packages_packagehistory packages_packagehistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_packagehistory
    ADD CONSTRAINT packages_packagehistory_pkey PRIMARY KEY (id);


--
-- Name: packages_product packages_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_product
    ADD CONSTRAINT packages_product_pkey PRIMARY KEY (id);


--
-- Name: packages_productcategory packages_productcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_productcategory
    ADD CONSTRAINT packages_productcategory_pkey PRIMARY KEY (id);


--
-- Name: packages_producttype packages_producttype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_producttype
    ADD CONSTRAINT packages_producttype_pkey PRIMARY KEY (id);


--
-- Name: reports_report_packages reports_report_packages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_packages
    ADD CONSTRAINT reports_report_packages_pkey PRIMARY KEY (id);


--
-- Name: reports_report_packages reports_report_packages_report_id_package_id_43057ff5_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_packages
    ADD CONSTRAINT reports_report_packages_report_id_package_id_43057ff5_uniq UNIQUE (report_id, package_id);


--
-- Name: reports_report reports_report_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report
    ADD CONSTRAINT reports_report_pkey PRIMARY KEY (id);


--
-- Name: reports_report_products reports_report_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_products
    ADD CONSTRAINT reports_report_products_pkey PRIMARY KEY (id);


--
-- Name: reports_report_products reports_report_products_report_id_product_id_c9a94e7b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_products
    ADD CONSTRAINT reports_report_products_report_id_product_id_c9a94e7b_uniq UNIQUE (report_id, product_id);


--
-- Name: reports_report_users reports_report_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_users
    ADD CONSTRAINT reports_report_users_pkey PRIMARY KEY (id);


--
-- Name: reports_report_users reports_report_users_report_id_user_id_8e2e04b2_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_users
    ADD CONSTRAINT reports_report_users_report_id_user_id_8e2e04b2_uniq UNIQUE (report_id, user_id);


--
-- Name: steps_step steps_step_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_step
    ADD CONSTRAINT steps_step_pkey PRIMARY KEY (id);


--
-- Name: steps_stepdetail steps_stepdetail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_stepdetail
    ADD CONSTRAINT steps_stepdetail_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: campaigns_campaign_assigned_to_campaign_id_77f3e7d1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_campaign_assigned_to_campaign_id_77f3e7d1 ON public.campaigns_campaign_assigned_to USING btree (campaign_id);


--
-- Name: campaigns_campaign_assigned_to_user_id_a5a96f39; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_campaign_assigned_to_user_id_a5a96f39 ON public.campaigns_campaign_assigned_to USING btree (user_id);


--
-- Name: campaigns_campaign_follow_up_plan_id_c953919a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_campaign_follow_up_plan_id_c953919a ON public.campaigns_campaign USING btree (follow_up_plan_id);


--
-- Name: campaigns_campaign_manager_id_f51e4f3b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_campaign_manager_id_f51e4f3b ON public.campaigns_campaign USING btree (manager_id);


--
-- Name: campaigns_campaign_marketing_plan_id_4ed57a1e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_campaign_marketing_plan_id_4ed57a1e ON public.campaigns_campaign USING btree (marketing_plan_id);


--
-- Name: campaigns_campaign_packages_campaign_id_c5c5ed06; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_campaign_packages_campaign_id_c5c5ed06 ON public.campaigns_campaign_packages USING btree (campaign_id);


--
-- Name: campaigns_campaign_packages_package_id_af73c395; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_campaign_packages_package_id_af73c395 ON public.campaigns_campaign_packages USING btree (package_id);


--
-- Name: campaigns_contactmarketing_campaign_id_7ea6b276; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_contactmarketing_campaign_id_7ea6b276 ON public.campaigns_contactmarketing USING btree (campaign_id);


--
-- Name: campaigns_contactmarketing_contact_id_e5888075; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_contactmarketing_contact_id_e5888075 ON public.campaigns_contactmarketing USING btree (contact_id);


--
-- Name: campaigns_contactmarketing_marketing_plan_id_672bd66f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_contactmarketing_marketing_plan_id_672bd66f ON public.campaigns_contactmarketing USING btree (marketing_plan_id);


--
-- Name: campaigns_contactmarketing_sale_rep_id_b0edb874; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_contactmarketing_sale_rep_id_b0edb874 ON public.campaigns_contactmarketing USING btree (sale_rep_id);


--
-- Name: campaigns_contactmarketinghistory_contact_marketing_id_dd7f951c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_contactmarketinghistory_contact_marketing_id_dd7f951c ON public.campaigns_contactmarketinghistory USING btree (contact_marketing_id);


--
-- Name: campaigns_followupplan_manager_id_a6b18470; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_followupplan_manager_id_a6b18470 ON public.campaigns_followupplan USING btree (manager_id);


--
-- Name: campaigns_mailtemplate_user_id_e99dbac0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_mailtemplate_user_id_e99dbac0 ON public.campaigns_mailtemplate USING btree (user_id);


--
-- Name: campaigns_marketingplan_mail_template_id_d8af507b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_marketingplan_mail_template_id_d8af507b ON public.campaigns_marketingplan USING btree (mail_template_id);


--
-- Name: campaigns_marketingplan_manager_id_6a2d7662; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_marketingplan_manager_id_6a2d7662 ON public.campaigns_marketingplan USING btree (manager_id);


--
-- Name: campaigns_note_campaign_id_5ae3f114; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_note_campaign_id_5ae3f114 ON public.campaigns_note USING btree (campaign_id);


--
-- Name: campaigns_note_contact_id_1f2accfb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_note_contact_id_1f2accfb ON public.campaigns_note USING btree (contact_id);


--
-- Name: campaigns_note_user_id_0f12e98e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_note_user_id_0f12e98e ON public.campaigns_note USING btree (user_id);


--
-- Name: contacts_contact_user_id_cff1a837; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_contact_user_id_cff1a837 ON public.contacts_contact USING btree (user_id);


--
-- Name: contacts_contactgroup_contacts_contact_id_572f6e61; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_contactgroup_contacts_contact_id_572f6e61 ON public.contacts_contactgroup_contacts USING btree (contact_id);


--
-- Name: contacts_contactgroup_contacts_contactgroup_id_4366e864; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_contactgroup_contacts_contactgroup_id_4366e864 ON public.contacts_contactgroup_contacts USING btree (contactgroup_id);


--
-- Name: contacts_contactgroup_editor_id_0cc26659; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_contactgroup_editor_id_0cc26659 ON public.contacts_contactgroup USING btree (editor_id);


--
-- Name: contacts_contactgroup_user_id_cf9c2ea9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contacts_contactgroup_user_id_cf9c2ea9 ON public.contacts_contactgroup USING btree (user_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: events_event_assigned_to_id_3414da5a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_event_assigned_to_id_3414da5a ON public.events_event USING btree (assigned_to_id);


--
-- Name: events_event_contacts_contact_id_de30d576; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_event_contacts_contact_id_de30d576 ON public.events_event_contacts USING btree (contact_id);


--
-- Name: events_event_contacts_event_id_3da8569b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_event_contacts_event_id_3da8569b ON public.events_event_contacts USING btree (event_id);


--
-- Name: events_event_marketing_id_7f04bfaa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_event_marketing_id_7f04bfaa ON public.events_event USING btree (marketing_id);


--
-- Name: events_event_order_id_41fb2395; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_event_order_id_41fb2395 ON public.events_event USING btree (order_id);


--
-- Name: events_event_user_id_39865209; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX events_event_user_id_39865209 ON public.events_event USING btree (user_id);


--
-- Name: notifications_notification_user_id_b5e8c0ff; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notifications_notification_user_id_b5e8c0ff ON public.notifications_notification USING btree (user_id);


--
-- Name: orders_license_order_id_ecbf7808; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_license_order_id_ecbf7808 ON public.orders_license USING btree (order_id);


--
-- Name: orders_license_package_id_735c1847; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_license_package_id_735c1847 ON public.orders_license USING btree (package_id);


--
-- Name: orders_lifetimelicense_order_id_4b7183d9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_lifetimelicense_order_id_4b7183d9 ON public.orders_lifetimelicense USING btree (order_id);


--
-- Name: orders_lifetimelicense_package_id_b8de4eae; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_lifetimelicense_package_id_b8de4eae ON public.orders_lifetimelicense USING btree (package_id);


--
-- Name: orders_order_campaign_id_8d0f6aef; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_order_campaign_id_8d0f6aef ON public.orders_order USING btree (campaign_id);


--
-- Name: orders_order_contacts_id_79aab201; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_order_contacts_id_79aab201 ON public.orders_order USING btree (contacts_id);


--
-- Name: orders_order_packages_order_id_5e5fe1e3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_order_packages_order_id_5e5fe1e3 ON public.orders_order_packages USING btree (order_id);


--
-- Name: orders_order_packages_package_id_da629081; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_order_packages_package_id_da629081 ON public.orders_order_packages USING btree (package_id);


--
-- Name: orders_order_sale_rep_id_9b9b98f0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_order_sale_rep_id_9b9b98f0 ON public.orders_order USING btree (sale_rep_id);


--
-- Name: orders_orderhistory_order_id_04c27f47; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX orders_orderhistory_order_id_04c27f47 ON public.orders_orderhistory USING btree (order_id);


--
-- Name: packages_feature_product_id_5ab70713; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_feature_product_id_5ab70713 ON public.packages_feature USING btree (product_id);


--
-- Name: packages_package_features_feature_id_44187e53; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_package_features_feature_id_44187e53 ON public.packages_package_features USING btree (feature_id);


--
-- Name: packages_package_features_package_id_417852ac; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_package_features_package_id_417852ac ON public.packages_package_features USING btree (package_id);


--
-- Name: packages_packagehistory_package_id_5ec21986; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_packagehistory_package_id_5ec21986 ON public.packages_packagehistory USING btree (package_id);


--
-- Name: packages_packagehistory_user_id_0a8b32af; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_packagehistory_user_id_0a8b32af ON public.packages_packagehistory USING btree (user_id);


--
-- Name: packages_product_category_id_a02d0a92; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_product_category_id_a02d0a92 ON public.packages_product USING btree (category_id);


--
-- Name: packages_product_manager_id_d0f05a31; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_product_manager_id_d0f05a31 ON public.packages_product USING btree (manager_id);


--
-- Name: packages_product_product_type_id_4ea91609; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX packages_product_product_type_id_4ea91609 ON public.packages_product USING btree (product_type_id);


--
-- Name: reports_report_packages_package_id_f19c5a18; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reports_report_packages_package_id_f19c5a18 ON public.reports_report_packages USING btree (package_id);


--
-- Name: reports_report_packages_report_id_31a659af; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reports_report_packages_report_id_31a659af ON public.reports_report_packages USING btree (report_id);


--
-- Name: reports_report_products_product_id_556cf4e9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reports_report_products_product_id_556cf4e9 ON public.reports_report_products USING btree (product_id);


--
-- Name: reports_report_products_report_id_51649efa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reports_report_products_report_id_51649efa ON public.reports_report_products USING btree (report_id);


--
-- Name: reports_report_users_report_id_e41786a7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reports_report_users_report_id_e41786a7 ON public.reports_report_users USING btree (report_id);


--
-- Name: reports_report_users_user_id_735fb1f7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reports_report_users_user_id_735fb1f7 ON public.reports_report_users USING btree (user_id);


--
-- Name: steps_step_follow_up_id_495b4dbc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX steps_step_follow_up_id_495b4dbc ON public.steps_step USING btree (follow_up_id);


--
-- Name: steps_step_mail_template_id_965a0c17; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX steps_step_mail_template_id_965a0c17 ON public.steps_step USING btree (mail_template_id);


--
-- Name: steps_stepdetail_order_id_bba5f581; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX steps_stepdetail_order_id_bba5f581 ON public.steps_stepdetail USING btree (order_id);


--
-- Name: steps_stepdetail_step_id_66271f57; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX steps_stepdetail_step_id_66271f57 ON public.steps_stepdetail USING btree (step_id);


--
-- Name: account_profile account_profile_user_id_bdd52018_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_profile
    ADD CONSTRAINT account_profile_user_id_bdd52018_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_campaign_assigned_to campaigns_campaign_a_campaign_id_77f3e7d1_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_assigned_to
    ADD CONSTRAINT campaigns_campaign_a_campaign_id_77f3e7d1_fk_campaigns FOREIGN KEY (campaign_id) REFERENCES public.campaigns_campaign(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_campaign_assigned_to campaigns_campaign_assigned_to_user_id_a5a96f39_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_assigned_to
    ADD CONSTRAINT campaigns_campaign_assigned_to_user_id_a5a96f39_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_campaign campaigns_campaign_follow_up_plan_id_c953919a_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign
    ADD CONSTRAINT campaigns_campaign_follow_up_plan_id_c953919a_fk_campaigns FOREIGN KEY (follow_up_plan_id) REFERENCES public.campaigns_followupplan(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_campaign campaigns_campaign_manager_id_f51e4f3b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign
    ADD CONSTRAINT campaigns_campaign_manager_id_f51e4f3b_fk_auth_user_id FOREIGN KEY (manager_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_campaign campaigns_campaign_marketing_plan_id_4ed57a1e_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign
    ADD CONSTRAINT campaigns_campaign_marketing_plan_id_4ed57a1e_fk_campaigns FOREIGN KEY (marketing_plan_id) REFERENCES public.campaigns_marketingplan(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_campaign_packages campaigns_campaign_p_campaign_id_c5c5ed06_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_packages
    ADD CONSTRAINT campaigns_campaign_p_campaign_id_c5c5ed06_fk_campaigns FOREIGN KEY (campaign_id) REFERENCES public.campaigns_campaign(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_campaign_packages campaigns_campaign_p_package_id_af73c395_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_campaign_packages
    ADD CONSTRAINT campaigns_campaign_p_package_id_af73c395_fk_packages_ FOREIGN KEY (package_id) REFERENCES public.packages_package(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_contactmarketing campaigns_contactmar_campaign_id_7ea6b276_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketing
    ADD CONSTRAINT campaigns_contactmar_campaign_id_7ea6b276_fk_campaigns FOREIGN KEY (campaign_id) REFERENCES public.campaigns_campaign(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_contactmarketing campaigns_contactmar_contact_id_e5888075_fk_contacts_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketing
    ADD CONSTRAINT campaigns_contactmar_contact_id_e5888075_fk_contacts_ FOREIGN KEY (contact_id) REFERENCES public.contacts_contact(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_contactmarketinghistory campaigns_contactmar_contact_marketing_id_dd7f951c_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketinghistory
    ADD CONSTRAINT campaigns_contactmar_contact_marketing_id_dd7f951c_fk_campaigns FOREIGN KEY (contact_marketing_id) REFERENCES public.campaigns_contactmarketing(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_contactmarketing campaigns_contactmar_marketing_plan_id_672bd66f_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketing
    ADD CONSTRAINT campaigns_contactmar_marketing_plan_id_672bd66f_fk_campaigns FOREIGN KEY (marketing_plan_id) REFERENCES public.campaigns_marketingplan(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_contactmarketing campaigns_contactmarketing_sale_rep_id_b0edb874_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_contactmarketing
    ADD CONSTRAINT campaigns_contactmarketing_sale_rep_id_b0edb874_fk_auth_user_id FOREIGN KEY (sale_rep_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_followupplan campaigns_followupplan_manager_id_a6b18470_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_followupplan
    ADD CONSTRAINT campaigns_followupplan_manager_id_a6b18470_fk_auth_user_id FOREIGN KEY (manager_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_mailtemplate campaigns_mailtemplate_user_id_e99dbac0_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_mailtemplate
    ADD CONSTRAINT campaigns_mailtemplate_user_id_e99dbac0_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_marketingplan campaigns_marketingp_mail_template_id_d8af507b_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_marketingplan
    ADD CONSTRAINT campaigns_marketingp_mail_template_id_d8af507b_fk_campaigns FOREIGN KEY (mail_template_id) REFERENCES public.campaigns_mailtemplate(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_marketingplan campaigns_marketingplan_manager_id_6a2d7662_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_marketingplan
    ADD CONSTRAINT campaigns_marketingplan_manager_id_6a2d7662_fk_auth_user_id FOREIGN KEY (manager_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_note campaigns_note_campaign_id_5ae3f114_fk_campaigns_campaign_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_note
    ADD CONSTRAINT campaigns_note_campaign_id_5ae3f114_fk_campaigns_campaign_id FOREIGN KEY (campaign_id) REFERENCES public.campaigns_campaign(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_note campaigns_note_contact_id_1f2accfb_fk_contacts_contact_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_note
    ADD CONSTRAINT campaigns_note_contact_id_1f2accfb_fk_contacts_contact_id FOREIGN KEY (contact_id) REFERENCES public.contacts_contact(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns_note campaigns_note_user_id_0f12e98e_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns_note
    ADD CONSTRAINT campaigns_note_user_id_0f12e98e_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: contacts_contact contacts_contact_user_id_cff1a837_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contact
    ADD CONSTRAINT contacts_contact_user_id_cff1a837_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: contacts_contactgroup_contacts contacts_contactgrou_contact_id_572f6e61_fk_contacts_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup_contacts
    ADD CONSTRAINT contacts_contactgrou_contact_id_572f6e61_fk_contacts_ FOREIGN KEY (contact_id) REFERENCES public.contacts_contact(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: contacts_contactgroup_contacts contacts_contactgrou_contactgroup_id_4366e864_fk_contacts_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup_contacts
    ADD CONSTRAINT contacts_contactgrou_contactgroup_id_4366e864_fk_contacts_ FOREIGN KEY (contactgroup_id) REFERENCES public.contacts_contactgroup(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: contacts_contactgroup contacts_contactgroup_editor_id_0cc26659_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup
    ADD CONSTRAINT contacts_contactgroup_editor_id_0cc26659_fk_auth_user_id FOREIGN KEY (editor_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: contacts_contactgroup contacts_contactgroup_user_id_cf9c2ea9_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contacts_contactgroup
    ADD CONSTRAINT contacts_contactgroup_user_id_cf9c2ea9_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: events_event events_event_assigned_to_id_3414da5a_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event
    ADD CONSTRAINT events_event_assigned_to_id_3414da5a_fk_auth_user_id FOREIGN KEY (assigned_to_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: events_event_contacts events_event_contact_contact_id_de30d576_fk_contacts_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event_contacts
    ADD CONSTRAINT events_event_contact_contact_id_de30d576_fk_contacts_ FOREIGN KEY (contact_id) REFERENCES public.contacts_contact(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: events_event_contacts events_event_contacts_event_id_3da8569b_fk_events_event_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event_contacts
    ADD CONSTRAINT events_event_contacts_event_id_3da8569b_fk_events_event_id FOREIGN KEY (event_id) REFERENCES public.events_event(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: events_event events_event_marketing_id_7f04bfaa_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event
    ADD CONSTRAINT events_event_marketing_id_7f04bfaa_fk_campaigns FOREIGN KEY (marketing_id) REFERENCES public.campaigns_contactmarketing(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: events_event events_event_order_id_41fb2395_fk_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event
    ADD CONSTRAINT events_event_order_id_41fb2395_fk_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: events_event events_event_user_id_39865209_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_event
    ADD CONSTRAINT events_event_user_id_39865209_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: notifications_notification notifications_notification_user_id_b5e8c0ff_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications_notification
    ADD CONSTRAINT notifications_notification_user_id_b5e8c0ff_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_license orders_license_order_id_ecbf7808_fk_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_license
    ADD CONSTRAINT orders_license_order_id_ecbf7808_fk_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_license orders_license_package_id_735c1847_fk_packages_package_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_license
    ADD CONSTRAINT orders_license_package_id_735c1847_fk_packages_package_id FOREIGN KEY (package_id) REFERENCES public.packages_package(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_lifetimelicense orders_lifetimelicen_package_id_b8de4eae_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_lifetimelicense
    ADD CONSTRAINT orders_lifetimelicen_package_id_b8de4eae_fk_packages_ FOREIGN KEY (package_id) REFERENCES public.packages_package(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_lifetimelicense orders_lifetimelicense_order_id_4b7183d9_fk_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_lifetimelicense
    ADD CONSTRAINT orders_lifetimelicense_order_id_4b7183d9_fk_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_order orders_order_campaign_id_8d0f6aef_fk_campaigns_campaign_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order
    ADD CONSTRAINT orders_order_campaign_id_8d0f6aef_fk_campaigns_campaign_id FOREIGN KEY (campaign_id) REFERENCES public.campaigns_campaign(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_order orders_order_contacts_id_79aab201_fk_contacts_contact_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order
    ADD CONSTRAINT orders_order_contacts_id_79aab201_fk_contacts_contact_id FOREIGN KEY (contacts_id) REFERENCES public.contacts_contact(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_order_packages orders_order_package_package_id_da629081_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order_packages
    ADD CONSTRAINT orders_order_package_package_id_da629081_fk_packages_ FOREIGN KEY (package_id) REFERENCES public.packages_package(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_order_packages orders_order_packages_order_id_5e5fe1e3_fk_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order_packages
    ADD CONSTRAINT orders_order_packages_order_id_5e5fe1e3_fk_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_order orders_order_sale_rep_id_9b9b98f0_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_order
    ADD CONSTRAINT orders_order_sale_rep_id_9b9b98f0_fk_auth_user_id FOREIGN KEY (sale_rep_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: orders_orderhistory orders_orderhistory_order_id_04c27f47_fk_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_orderhistory
    ADD CONSTRAINT orders_orderhistory_order_id_04c27f47_fk_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_feature packages_feature_product_id_5ab70713_fk_packages_product_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_feature
    ADD CONSTRAINT packages_feature_product_id_5ab70713_fk_packages_product_id FOREIGN KEY (product_id) REFERENCES public.packages_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_package_features packages_package_fea_feature_id_44187e53_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_package_features
    ADD CONSTRAINT packages_package_fea_feature_id_44187e53_fk_packages_ FOREIGN KEY (feature_id) REFERENCES public.packages_feature(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_package_features packages_package_fea_package_id_417852ac_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_package_features
    ADD CONSTRAINT packages_package_fea_package_id_417852ac_fk_packages_ FOREIGN KEY (package_id) REFERENCES public.packages_package(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_packagehistory packages_packagehist_package_id_5ec21986_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_packagehistory
    ADD CONSTRAINT packages_packagehist_package_id_5ec21986_fk_packages_ FOREIGN KEY (package_id) REFERENCES public.packages_package(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_packagehistory packages_packagehistory_user_id_0a8b32af_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_packagehistory
    ADD CONSTRAINT packages_packagehistory_user_id_0a8b32af_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_product packages_product_category_id_a02d0a92_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_product
    ADD CONSTRAINT packages_product_category_id_a02d0a92_fk_packages_ FOREIGN KEY (category_id) REFERENCES public.packages_productcategory(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_product packages_product_manager_id_d0f05a31_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_product
    ADD CONSTRAINT packages_product_manager_id_d0f05a31_fk_auth_user_id FOREIGN KEY (manager_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: packages_product packages_product_product_type_id_4ea91609_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.packages_product
    ADD CONSTRAINT packages_product_product_type_id_4ea91609_fk_packages_ FOREIGN KEY (product_type_id) REFERENCES public.packages_producttype(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reports_report_packages reports_report_packa_package_id_f19c5a18_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_packages
    ADD CONSTRAINT reports_report_packa_package_id_f19c5a18_fk_packages_ FOREIGN KEY (package_id) REFERENCES public.packages_package(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reports_report_packages reports_report_packages_report_id_31a659af_fk_reports_report_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_packages
    ADD CONSTRAINT reports_report_packages_report_id_31a659af_fk_reports_report_id FOREIGN KEY (report_id) REFERENCES public.reports_report(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reports_report_products reports_report_produ_product_id_556cf4e9_fk_packages_; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_products
    ADD CONSTRAINT reports_report_produ_product_id_556cf4e9_fk_packages_ FOREIGN KEY (product_id) REFERENCES public.packages_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reports_report_products reports_report_products_report_id_51649efa_fk_reports_report_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_products
    ADD CONSTRAINT reports_report_products_report_id_51649efa_fk_reports_report_id FOREIGN KEY (report_id) REFERENCES public.reports_report(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reports_report_users reports_report_users_report_id_e41786a7_fk_reports_report_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_users
    ADD CONSTRAINT reports_report_users_report_id_e41786a7_fk_reports_report_id FOREIGN KEY (report_id) REFERENCES public.reports_report(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reports_report_users reports_report_users_user_id_735fb1f7_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports_report_users
    ADD CONSTRAINT reports_report_users_user_id_735fb1f7_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: steps_step steps_step_follow_up_id_495b4dbc_fk_campaigns_followupplan_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_step
    ADD CONSTRAINT steps_step_follow_up_id_495b4dbc_fk_campaigns_followupplan_id FOREIGN KEY (follow_up_id) REFERENCES public.campaigns_followupplan(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: steps_step steps_step_mail_template_id_965a0c17_fk_campaigns; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_step
    ADD CONSTRAINT steps_step_mail_template_id_965a0c17_fk_campaigns FOREIGN KEY (mail_template_id) REFERENCES public.campaigns_mailtemplate(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: steps_stepdetail steps_stepdetail_order_id_bba5f581_fk_orders_order_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_stepdetail
    ADD CONSTRAINT steps_stepdetail_order_id_bba5f581_fk_orders_order_id FOREIGN KEY (order_id) REFERENCES public.orders_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: steps_stepdetail steps_stepdetail_step_id_66271f57_fk_steps_step_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.steps_stepdetail
    ADD CONSTRAINT steps_stepdetail_step_id_66271f57_fk_steps_step_id FOREIGN KEY (step_id) REFERENCES public.steps_step(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

