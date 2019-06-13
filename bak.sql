--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

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
    name character varying(150) NOT NULL
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
    sale_rep_id integer,
    thread_ids jsonb NOT NULL
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
    subject character varying(255) NOT NULL,
    template text NOT NULL,
    is_public boolean NOT NULL,
    user_id integer NOT NULL
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
-- Name: inbox_mailbox; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inbox_mailbox (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    user_id character varying(255) NOT NULL,
    message_id character varying(255) NOT NULL,
    thread_id character varying(255) NOT NULL,
    email_type character varying(20) NOT NULL
);


ALTER TABLE public.inbox_mailbox OWNER TO postgres;

--
-- Name: inbox_mailbox_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inbox_mailbox_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inbox_mailbox_id_seq OWNER TO postgres;

--
-- Name: inbox_mailbox_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inbox_mailbox_id_seq OWNED BY public.inbox_mailbox.id;


--
-- Name: inbox_mailhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inbox_mailhistory (
    id integer NOT NULL,
    created timestamp with time zone NOT NULL,
    modified timestamp with time zone NOT NULL,
    is_removed boolean NOT NULL,
    history_id character varying(255) NOT NULL
);


ALTER TABLE public.inbox_mailhistory OWNER TO postgres;

--
-- Name: inbox_mailhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inbox_mailhistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inbox_mailhistory_id_seq OWNER TO postgres;

--
-- Name: inbox_mailhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inbox_mailhistory_id_seq OWNED BY public.inbox_mailhistory.id;


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
    thread jsonb NOT NULL,
    order_id integer NOT NULL,
    step_id integer
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
-- Name: inbox_mailbox id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox_mailbox ALTER COLUMN id SET DEFAULT nextval('public.inbox_mailbox_id_seq'::regclass);


--
-- Name: inbox_mailhistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox_mailhistory ALTER COLUMN id SET DEFAULT nextval('public.inbox_mailhistory_id_seq'::regclass);


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
1	2019-06-11 04:47:56.806943+00	2019-06-11 04:47:56.811175+00	f	t	1674834476	Fetch	1
2	2019-06-11 04:48:54.371316+00	2019-06-11 04:48:54.371712+00	f	f	0123456789	abc	2
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
45	Can add product category	12	add_productcategory
46	Can change product category	12	change_productcategory
47	Can delete product category	12	delete_productcategory
48	Can view product category	12	view_productcategory
49	Can add product type	13	add_producttype
50	Can change product type	13	change_producttype
51	Can delete product type	13	delete_producttype
52	Can view product type	13	view_producttype
53	Can add product	14	add_product
54	Can change product	14	change_product
55	Can delete product	14	delete_product
56	Can view product	14	view_product
57	Can add package history	15	add_packagehistory
58	Can change package history	15	change_packagehistory
59	Can delete package history	15	delete_packagehistory
60	Can view package history	15	view_packagehistory
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
77	Can add mail template	20	add_mailtemplate
78	Can change mail template	20	change_mailtemplate
79	Can delete mail template	20	delete_mailtemplate
80	Can view mail template	20	view_mailtemplate
81	Can add marketing plan	21	add_marketingplan
82	Can change marketing plan	21	change_marketingplan
83	Can delete marketing plan	21	delete_marketingplan
84	Can view marketing plan	21	view_marketingplan
85	Can add follow up plan	22	add_followupplan
86	Can change follow up plan	22	change_followupplan
87	Can delete follow up plan	22	delete_followupplan
88	Can view follow up plan	22	view_followupplan
89	Can add contact marketing history	23	add_contactmarketinghistory
90	Can change contact marketing history	23	change_contactmarketinghistory
91	Can delete contact marketing history	23	delete_contactmarketinghistory
92	Can view contact marketing history	23	view_contactmarketinghistory
93	Can add note	24	add_note
94	Can change note	24	change_note
95	Can delete note	24	delete_note
96	Can view note	24	view_note
97	Can add order	25	add_order
98	Can change order	25	change_order
99	Can delete order	25	delete_order
100	Can view order	25	view_order
101	Can add order history	26	add_orderhistory
102	Can change order history	26	change_orderhistory
103	Can delete order history	26	delete_orderhistory
104	Can view order history	26	view_orderhistory
105	Can add lifetime license	27	add_lifetimelicense
106	Can change lifetime license	27	change_lifetimelicense
107	Can delete lifetime license	27	delete_lifetimelicense
108	Can view lifetime license	27	view_lifetimelicense
109	Can add license	28	add_license
110	Can change license	28	change_license
111	Can delete license	28	delete_license
112	Can view license	28	view_license
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
133	Can add mail box	34	add_mailbox
134	Can change mail box	34	change_mailbox
135	Can delete mail box	34	delete_mailbox
136	Can view mail box	34	view_mailbox
137	Can add mail history	35	add_mailhistory
138	Can change mail history	35	change_mailhistory
139	Can delete mail history	35	delete_mailhistory
140	Can view mail history	35	view_mailhistory
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
2	pbkdf2_sha256$150000$kzR4sq7VHQ2c$8uM7s17DCAfJarpwvAL3HbQBx9A/3Xba6pe/mCqsGjs=	\N	f	salerep			hepmy666@gmail.com	f	t	2019-06-11 04:48:54+00
1	pbkdf2_sha256$150000$G8UG3RgCB4nO$6V1a1vntTlLXAIeskgErvo5ww3Ey6IdXz/L7v+DWlIs=	2019-06-11 09:14:03.158676+00	t	admin				t	t	2019-06-11 04:46:07.129787+00
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
1	2019-06-11 10:37:27.073484+00	2019-06-11 10:37:27.074138+00	f	Campaign 1	2019-06-11	2019-06-29	<p>aalooo</p>	1	2	1
2	2019-06-11 10:37:58.476874+00	2019-06-11 10:37:58.47712+00	f	Campaign 2	2019-06-11	2019-06-29	<p>asdsd</p>	2	2	2
\.


--
-- Data for Name: campaigns_campaign_assigned_to; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_campaign_assigned_to (id, campaign_id, user_id) FROM stdin;
1	1	2
2	2	2
\.


--
-- Data for Name: campaigns_campaign_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_campaign_packages (id, campaign_id, package_id) FROM stdin;
1	1	15
2	2	15
\.


--
-- Data for Name: campaigns_contactmarketing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) FROM stdin;
2	2019-06-11 10:37:27.244436+00	2019-06-11 10:37:27.247308+00	f	RUNNING	2	7ed29257-567d-48a7-b5b5-2c6def89bc36	1	3	1	2	[]
1	2019-06-11 10:37:27.222757+00	2019-06-11 17:47:20.218725+00	f	RUNNING	2	553b9777-f2cc-41c0-9c84-764cfccf93a5	1	2	1	2	[{"type": "Send Email", "thread_id": "16b47a6c2449e5a8"}]
3	2019-06-11 10:37:27.254909+00	2019-06-11 17:47:21.192278+00	f	RUNNING	2	5d546250-7048-4f99-a918-c235a2e91266	1	4	1	2	[{"type": "Send Email", "thread_id": "16b47a6c7ae35301"}]
7	2019-06-11 10:37:27.299871+00	2019-06-11 17:47:22.217681+00	f	RUNNING	2	75631f9b-ec29-42a7-8e4c-bb943cf3725c	1	8	1	2	[{"type": "Send Email", "thread_id": "16b47a6ca092dbc2"}]
5	2019-06-11 10:37:27.277602+00	2019-06-11 17:47:29.759669+00	f	RUNNING	2	9b06799e-3f13-4b0b-b6df-9a18fd6e51e6	1	6	1	2	[{"type": "Send Email", "thread_id": "16b47a6e8347a85d"}]
4	2019-06-11 10:37:27.266374+00	2019-06-11 17:47:31.108125+00	f	RUNNING	2	c2915f0a-86f0-4fa4-8cae-f013c96f9901	1	5	1	2	[{"type": "Send Email", "thread_id": "16b47a6ee4fa4f3e"}]
8	2019-06-11 10:37:58.587935+00	2019-06-11 17:47:32.250725+00	f	COMPLETED	2	db2219c3-9c80-454b-aeaf-e7721b4ff0da	2	1	2	2	[{"type": "Send Email", "thread_id": "16b47a6f2101b416"}]
6	2019-06-11 10:37:27.288053+00	2019-06-12 07:11:43.573125+00	f	RUNNING	2	1f7acb09-9aad-40e8-95f9-1e1cb4391cf8	1	7	1	2	[{"type": "Send Email", "thread_id": "16b47a6bd7063e9a"}, {"note": "", "type": "Call Client", "date_created": "2019-06-12 14:11"}]
\.


--
-- Data for Name: campaigns_contactmarketinghistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) FROM stdin;
1	2019-06-12 07:11:35.257219+00	2019-06-12 07:11:35.25751+00	f	Call Client	6
2	2019-06-12 07:11:43.565894+00	2019-06-12 07:11:43.566335+00	f	Call Client	6
\.


--
-- Data for Name: campaigns_followupplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_followupplan (id, created, modified, is_removed, name, can_modify, manager_id) FROM stdin;
1	2019-06-11 10:33:58.836971+00	2019-06-11 10:33:58.837334+00	f	Follow Up Plan 1	t	2
2	2019-06-11 10:34:42.322789+00	2019-06-11 10:34:42.323021+00	f	Follow Up Plan 2	t	2
\.


--
-- Data for Name: campaigns_mailtemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_mailtemplate (id, created, modified, is_removed, name, subject, template, is_public, user_id) FROM stdin;
1	2019-06-11 10:28:56.113752+00	2019-06-11 10:28:56.114124+00	f	Mail template 1	Marketing Mail	<p>Dear, <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">$contact_name$</span></p>\n<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Would you like to buy this package?</span></p>\n<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Tks</span></p>	f	2
2	2019-06-11 10:32:42.03735+00	2019-06-11 10:32:42.037693+00	f	Mail template 2	Follow Up Plan	<p>Hello, <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">$contact_name$</span></p>\n<p></p>\n<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Follow up you</span></p>\n<p></p>\n<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Love</span></p>	f	2
3	2019-06-11 10:33:14.146513+00	2019-06-11 10:33:14.146757+00	f	Mail template 3	Private Mail	<p>Hello nek</p>	f	2
\.


--
-- Data for Name: campaigns_marketingplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, actions, can_modify, mail_template_id, manager_id) FROM stdin;
1	2019-06-11 10:29:30.437144+00	2019-06-11 10:29:30.437428+00	f	Marketing Plan 1	{"must": [{"data": ["AK"], "operand": "1", "operator": "Equal to"}]}	{"Send Email"}	t	1	2
2	2019-06-11 10:29:52.370722+00	2019-06-11 10:29:52.370959+00	f	Marketing Plan 2	{"must": [{"data": ["CA"], "operand": "1", "operator": "Equal to"}]}	{"Send Email"}	t	1	2
3	2019-06-11 10:30:12.739286+00	2019-06-11 10:30:12.739601+00	f	Marketing Plan 3	{"must": [{"data": ["AK", "CA"], "operand": "1", "operator": "Equal to"}]}	{"Send Email"}	t	1	2
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
1	2019-06-11 07:00:04.991044+00	2019-06-11 07:00:04.99139+00	f	Duc Anh	Tran	hepmy666@gmail.com	1234567897	MALE	123 Block B	America	CA	San Diego	70000	Fetch	2
2	2019-06-11 07:02:45.944133+00	2019-06-11 07:02:45.944488+00	f	Ariana	Gwwww	badboy2k@gmail.com	0134523691	MALE	011 AB STREET	USA	AK	Anchorage	23133	FA	2
3	2019-06-11 07:02:46.071341+00	2019-06-11 07:02:46.071579+00	f	Tony	Stark	hepmy777gmail.com	0134523690	FEMALE	12 AB STREET	USA	AK	Anchorage	13334	FA	2
4	2019-06-11 07:02:46.157721+00	2019-06-11 07:02:46.158258+00	f	Steve	Rogers	steve123@gmail.com	0134523691	MALE	13 AB STREET	USA	AK	Anchorage	42333	FA	2
5	2019-06-11 07:02:46.243904+00	2019-06-11 07:02:46.244187+00	f	Nick	Fury	nickfury@gmail.com	0134523692	FEMALE	14 AB STREET	USA	AK	Anchorage	66777	FA	2
6	2019-06-11 07:02:46.324895+00	2019-06-11 07:02:46.325172+00	f	War	Machine	warcraft@gmail.com	0134523693	MALE	15 AB STREET	USA	AK	Anchorage	65555	FA	2
7	2019-06-11 07:02:46.65806+00	2019-06-11 07:02:46.658339+00	f	Scott	Lang	nguoikien@gmail.com	0134523694	MALE	16 AB STREET	USA	AK	Anchorage	33333	FA	2
8	2019-06-11 07:02:46.771245+00	2019-06-11 07:02:46.771543+00	f	Vu	Dang Ho	vudangho96@gmail.com	0134523695	MALE	17 AB STREET	USA	AK	Anchorage	78888	FA	2
\.


--
-- Data for Name: contacts_contactgroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) FROM stdin;
1	2019-06-11 04:48:54.373678+00	2019-06-11 04:48:54.374011+00	f	All Contacts		\N	2
11	2019-06-11 07:13:37.453884+00	2019-06-11 07:13:37.454147+00	f	Private Group	PRIVATE	\N	2
\.


--
-- Data for Name: contacts_contactgroup_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2019-06-11 04:47:56.812595+00	1	Profile object (1)	1	[{"added": {}}]	9	1
2	2019-06-11 05:32:58.107939+00	2	salerep	2	[{"changed": {"fields": ["password"]}}]	6	1
3	2019-06-11 05:37:25.989567+00	2	salerep	2	[]	6	1
4	2019-06-11 05:38:05.084696+00	2	salerep	2	[{"changed": {"fields": ["password"]}}]	6	1
5	2019-06-11 05:38:16.991726+00	2	salerep	2	[{"changed": {"fields": ["password"]}}]	6	1
6	2019-06-11 05:41:11.305703+00	2	salerep	2	[{"changed": {"fields": ["is_active"]}}]	6	1
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
12	packages	productcategory
13	packages	producttype
14	packages	product
15	packages	packagehistory
16	contacts	contact
17	contacts	contactgroup
18	campaigns	campaign
19	campaigns	contactmarketing
20	campaigns	mailtemplate
21	campaigns	marketingplan
22	campaigns	followupplan
23	campaigns	contactmarketinghistory
24	campaigns	note
25	orders	order
26	orders	orderhistory
27	orders	lifetimelicense
28	orders	license
29	steps	step
30	steps	stepdetail
31	reports	report
32	events	event
33	notifications	notification
34	inbox	mailbox
35	inbox	mailhistory
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2019-06-11 04:45:21.407885+00
2	auth	0001_initial	2019-06-11 04:45:21.451918+00
3	account	0001_initial	2019-06-11 04:45:21.503495+00
4	admin	0001_initial	2019-06-11 04:45:21.52204+00
5	admin	0002_logentry_remove_auto_add	2019-06-11 04:45:21.541687+00
6	admin	0003_logentry_add_action_flag_choices	2019-06-11 04:45:21.553615+00
7	contenttypes	0002_remove_content_type_name	2019-06-11 04:45:21.577313+00
8	auth	0002_alter_permission_name_max_length	2019-06-11 04:45:21.585876+00
9	auth	0003_alter_user_email_max_length	2019-06-11 04:45:21.598446+00
10	auth	0004_alter_user_username_opts	2019-06-11 04:45:21.609451+00
11	auth	0005_alter_user_last_login_null	2019-06-11 04:45:21.623772+00
12	auth	0006_require_contenttypes_0002	2019-06-11 04:45:21.627053+00
13	auth	0007_alter_validators_add_error_messages	2019-06-11 04:45:21.638463+00
14	auth	0008_alter_user_username_max_length	2019-06-11 04:45:21.653441+00
15	auth	0009_alter_user_last_name_max_length	2019-06-11 04:45:21.66591+00
16	auth	0010_alter_group_name_max_length	2019-06-11 04:45:21.678501+00
17	auth	0011_update_proxy_permissions	2019-06-11 04:45:21.696575+00
18	packages	0001_initial	2019-06-11 04:45:21.796214+00
19	contacts	0001_initial	2019-06-11 04:45:21.896993+00
20	campaigns	0001_initial	2019-06-11 04:45:22.335523+00
21	campaigns	0002_contactmarketing_thread_ids	2019-06-11 04:45:22.425563+00
22	campaigns	0003_remove_contactmarketing_thread_ids	2019-06-11 04:45:22.450644+00
23	campaigns	0004_contactmarketing_thread_ids	2019-06-11 04:45:22.479529+00
24	campaigns	0005_auto_20190611_1143	2019-06-11 04:45:22.503853+00
25	contacts	0002_auto_20190611_1143	2019-06-11 04:45:22.531162+00
26	orders	0001_initial	2019-06-11 04:45:22.667251+00
27	events	0001_initial	2019-06-11 04:45:22.744367+00
28	events	0002_auto_20190529_1209	2019-06-11 04:45:22.836202+00
29	jet	0001_initial	2019-06-11 04:45:22.872412+00
30	jet	0002_delete_userdashboardmodule	2019-06-11 04:45:22.883253+00
31	notifications	0001_initial	2019-06-11 04:45:22.93329+00
32	reports	0001_initial	2019-06-11 04:45:23.024072+00
33	sessions	0001_initial	2019-06-11 04:45:23.069727+00
34	steps	0001_initial	2019-06-11 04:45:23.179748+00
35	steps	0002_auto_20190611_1143	2019-06-11 04:45:23.281007+00
36	inbox	0001_initial	2019-06-11 04:46:53.136087+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
89gqsrobtmuj33pjdtvtwq6zh4c1lqfp	Y2Q0NWY2ZmFkMWUxZWI2NDdiMTczNDYzNmJjY2IxOTM1NTJkMDhjMzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzNmFjZGI3NDdmYzUyMjEyZjE4OWU2YjgwM2Q5OTA1MzY5MDVlZmI4In0=	2019-06-25 09:14:03.161416+00
\.


--
-- Data for Name: events_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) FROM stdin;
1	2019-06-11 10:37:27.232778+00	2019-06-11 10:37:27.23314+00	f	Contact Ariana Gwwww	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting Ariana Gwwww	0	2	1	\N	2
2	2019-06-11 10:37:27.248741+00	2019-06-11 10:37:27.24899+00	f	Contact Tony Stark	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting Tony Stark	0	2	2	\N	2
3	2019-06-11 10:37:27.25989+00	2019-06-11 10:37:27.260189+00	f	Contact Steve Rogers	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting Steve Rogers	0	2	3	\N	2
4	2019-06-11 10:37:27.270451+00	2019-06-11 10:37:27.270671+00	f	Contact Nick Fury	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting Nick Fury	0	2	4	\N	2
5	2019-06-11 10:37:27.281948+00	2019-06-11 10:37:27.282306+00	f	Contact War Machine	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting War Machine	0	2	5	\N	2
6	2019-06-11 10:37:27.293215+00	2019-06-11 10:37:27.293515+00	f	Contact Scott Lang	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting Scott Lang	0	2	6	\N	2
7	2019-06-11 10:37:27.303941+00	2019-06-11 10:37:27.30415+00	f	Contact Vu Dang Ho	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting Vu Dang Ho	0	2	7	\N	2
8	2019-06-11 10:37:58.596981+00	2019-06-11 10:37:58.598384+00	f	Contact Duc Anh Tran	2019-06-10 17:00:00+00	2019-06-10 17:00:00+00	Start contacting Duc Anh Tran	0	2	8	\N	2
\.


--
-- Data for Name: events_event_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_event_contacts (id, event_id, contact_id) FROM stdin;
1	1	2
2	2	3
3	3	4
4	4	5
5	5	6
6	6	7
7	7	8
8	8	1
\.


--
-- Data for Name: inbox_mailbox; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) FROM stdin;
1	2019-06-11 10:39:28.234293+00	2019-06-11 10:39:28.240269+00	f	2	16b461f0bac8561c	16b461f0bac8561c	SENT
2	2019-06-11 17:47:18.384904+00	2019-06-11 17:47:18.455069+00	f	2	16b47a6bd7063e9a	16b47a6bd7063e9a	SENT
3	2019-06-11 17:47:20.048492+00	2019-06-11 17:47:20.066616+00	f	2	16b47a6c2449e5a8	16b47a6c2449e5a8	SENT
4	2019-06-11 17:47:21.09704+00	2019-06-11 17:47:21.097936+00	f	2	16b47a6c7ae35301	16b47a6c7ae35301	SENT
5	2019-06-11 17:47:22.094142+00	2019-06-11 17:47:22.113113+00	f	2	16b47a6ca092dbc2	16b47a6ca092dbc2	SENT
6	2019-06-11 17:47:29.620824+00	2019-06-11 17:47:29.649804+00	f	2	16b47a6e8347a85d	16b47a6e8347a85d	SENT
7	2019-06-11 17:47:30.957695+00	2019-06-11 17:47:30.99013+00	f	2	16b47a6ee4fa4f3e	16b47a6ee4fa4f3e	SENT
8	2019-06-11 17:47:32.10636+00	2019-06-11 17:47:32.12888+00	f	2	16b47a6f2101b416	16b47a6f2101b416	SENT
9	2019-06-12 07:11:32.304922+00	2019-06-12 07:11:32.310831+00	f	2	16b4a8709233470b	16b4a8709233470b	SENT
\.


--
-- Data for Name: inbox_mailhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inbox_mailhistory (id, created, modified, is_removed, history_id) FROM stdin;
1	2019-06-11 04:49:47.397838+00	2019-06-11 04:49:47.398373+00	f	83757
2	2019-06-11 04:49:47.399453+00	2019-06-11 04:49:47.400089+00	f	83518
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
\.


--
-- Data for Name: orders_lifetimelicense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_lifetimelicense (id, created, modified, is_removed, start_date, code, order_id, package_id) FROM stdin;
\.


--
-- Data for Name: orders_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) FROM stdin;
1	2019-06-11 10:39:27.20264+00	2019-06-11 10:39:27.203009+00	f		RUNNING	2	1	2
\.


--
-- Data for Name: orders_order_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_order_packages (id, order_id, package_id) FROM stdin;
\.


--
-- Data for Name: orders_orderhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_orderhistory (id, created, modified, is_removed, date, action, order_id) FROM stdin;
\.


--
-- Data for Name: packages_feature; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) FROM stdin;
2	2019-06-11 09:00:41.84901+00	2019-06-11 09:40:09.155646+00	f	Feature 1		1111122	1	3
3	2019-06-11 09:59:21.782599+00	2019-06-11 10:18:33.67717+00	f	Feature 2		12333	2	6
1	2019-06-11 08:32:53.008969+00	2019-06-11 10:18:33.679714+00	f	Feature 1	222	11	1	6
\.


--
-- Data for Name: packages_package; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_package (id, created, modified, is_removed, name, prices, discount) FROM stdin;
2	2019-06-11 09:08:36.197319+00	2019-06-11 09:08:36.197583+00	f	Package 1	{"1": 123244, "6": 1444, "12": 22, "999999": 33}	0
3	2019-06-11 09:10:04.162456+00	2019-06-11 09:10:04.162753+00	f	Package 1	{"1": 22, "6": 33, "12": 44, "999999": 44}	0
4	2019-06-11 09:16:16.601311+00	2019-06-11 09:16:16.601531+00	f	ALu	{"1": 222, "6": "", "12": "", "999999": ""}	0
5	2019-06-11 09:17:08.009179+00	2019-06-11 09:17:08.009979+00	f	222	{"1": 23, "6": "", "12": "", "999999": ""}	0
6	2019-06-11 09:20:06.999751+00	2019-06-11 09:20:06.999952+00	f	asdasd	{"1": 244, "6": 4444, "12": "", "999999": ""}	0
7	2019-06-11 09:21:20.885234+00	2019-06-11 09:21:20.885894+00	f	ALLLLPPPP	{"1": 312, "6": 4444, "12": "", "999999": ""}	0
8	2019-06-11 09:23:32.545124+00	2019-06-11 09:23:32.545449+00	f	Big Package	{"1": 112, "6": 12444, "12": 5125, "999999": 4444}	0
9	2019-06-11 09:24:56.913112+00	2019-06-11 09:24:56.913701+00	f	BIg Package	{"1": 1123, "6": 4444, "12": 12422, "999999": 124124}	0
10	2019-06-11 09:28:44.11114+00	2019-06-11 09:28:44.111445+00	f	ALO	{"1": 12, "6": 233, "12": 4444, "999999": 55677}	0
11	2019-06-11 09:30:11.609973+00	2019-06-11 09:30:11.610485+00	f	LOOO	{"1": 2, "6": 12, "12": 24, "999999": 4444}	0
12	2019-06-11 09:31:11.323845+00	2019-06-11 09:31:11.324568+00	f	ALO	{"1": 23123, "6": 4444, "12": "", "999999": ""}	0
13	2019-06-11 09:40:09.16199+00	2019-06-11 09:40:09.162293+00	f	Big Package	{"1": 1112, "6": 3333, "12": "", "999999": ""}	0
1	2019-06-11 08:32:53.014452+00	2019-06-11 10:15:45.266263+00	f	Package 1	{"1": 123244, "6": "", "12": "", "999999": ""}	0
14	2019-06-11 10:17:22.735841+00	2019-06-11 10:17:27.882974+00	f	package A	{"1": "", "6": "", "12": "", "999999": ""}	0
15	2019-06-11 10:18:31.643857+00	2019-06-11 10:18:33.686455+00	f	Package 1	{"1": 22, "6": 222, "12": 333, "999999": 2222}	0
\.


--
-- Data for Name: packages_package_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_package_features (id, package_id, feature_id) FROM stdin;
2	13	2
5	15	1
6	15	3
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
2	2019-06-11 08:05:37.953027+00	2019-06-11 08:05:37.95328+00	f	Product 2	<p>ádsad</p>	ACTIVE	2019-06-11	\N	2	\N
4	2019-06-11 08:07:59.225053+00	2019-06-11 08:07:59.225369+00	f	Product 4	<p>ádasd</p>	ACTIVE	2019-06-11	\N	2	\N
5	2019-06-11 08:10:02.627962+00	2019-06-11 08:10:02.628298+00	f	Product 5	<p>ddddd</p>	ACTIVE	2019-06-11	1	2	1
1	2019-06-11 08:05:05.498116+00	2019-06-11 08:12:34.911851+00	f	Product 1	<p>Product</p>	ACTIVE	2019-06-11	\N	2	\N
3	2019-06-11 08:07:06.193159+00	2019-06-11 09:40:09.116032+00	f	Product 3	<p>đasad</p>	ACTIVE	2019-06-11	\N	2	\N
6	2019-06-11 08:32:52.966548+00	2019-06-11 10:18:33.643391+00	f	Product 6	<p>sdd</p>	ACTIVE	2019-06-11	1	2	1
\.


--
-- Data for Name: packages_productcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_productcategory (id, created, modified, is_removed, name, description, status) FROM stdin;
1	2019-06-11 04:49:47.385371+00	2019-06-11 04:49:47.38566+00	f	Category 1	category	ACTIVE
\.


--
-- Data for Name: packages_producttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.packages_producttype (id, created, modified, is_removed, name, description, status) FROM stdin;
1	2019-06-11 04:49:58.334224+00	2019-06-11 04:49:58.334489+00	f	Product Type 1	productype	ACTIVE
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
1	2019-06-11 10:33:58.841345+00	2019-06-11 10:33:58.841791+00	f	["Send Email"]	20	[]	1	2
2	2019-06-11 10:33:58.841417+00	2019-06-11 10:33:58.841856+00	f	[]	0	[{"name": "Choose Packages", "type": "final"}]	1	\N
3	2019-06-11 10:34:42.326802+00	2019-06-11 10:34:42.327263+00	f	["Send Email"]	10	[]	2	1
4	2019-06-11 10:34:42.326869+00	2019-06-11 10:34:42.327333+00	f	[]	20	[{"name": "Choose Packages", "type": "final"}]	2	1
\.


--
-- Data for Name: steps_stepdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.steps_stepdetail (id, created, modified, is_removed, information, status, thread, order_id, step_id) FROM stdin;
2	2019-06-11 10:39:27.20932+00	2019-06-11 10:39:27.211322+00	f	{"Choose Packages": {"type": "final", "result": {"15": {}}}}	RUNNING	[]	1	4
1	2019-06-11 10:39:27.209242+00	2019-06-11 10:39:28.345893+00	f	{}	RUNNING	[{"type": "Send Email", "thread_id": "16b461f0bac8561c"}]	1	3
\.


--
-- Name: account_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_profile_id_seq', 11, true);


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

SELECT pg_catalog.setval('public.auth_permission_id_seq', 140, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 11, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: campaigns_campaign_assigned_to_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_assigned_to_id_seq', 2, true);


--
-- Name: campaigns_campaign_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_id_seq', 2, true);


--
-- Name: campaigns_campaign_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_packages_id_seq', 2, true);


--
-- Name: campaigns_contactmarketing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketing_id_seq', 8, true);


--
-- Name: campaigns_contactmarketinghistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketinghistory_id_seq', 2, true);


--
-- Name: campaigns_followupplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_followupplan_id_seq', 2, true);


--
-- Name: campaigns_mailtemplate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_mailtemplate_id_seq', 3, true);


--
-- Name: campaigns_marketingplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_marketingplan_id_seq', 3, true);


--
-- Name: campaigns_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_note_id_seq', 1, false);


--
-- Name: contacts_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contact_id_seq', 8, true);


--
-- Name: contacts_contactgroup_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_contacts_id_seq', 8, true);


--
-- Name: contacts_contactgroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_id_seq', 11, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 6, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 35, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 36, true);


--
-- Name: events_event_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_contacts_id_seq', 8, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 8, true);


--
-- Name: inbox_mailbox_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inbox_mailbox_id_seq', 9, true);


--
-- Name: inbox_mailhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inbox_mailhistory_id_seq', 2, true);


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

SELECT pg_catalog.setval('public.orders_license_id_seq', 1, false);


--
-- Name: orders_lifetimelicense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_lifetimelicense_id_seq', 1, false);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, true);


--
-- Name: orders_order_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_packages_id_seq', 1, false);


--
-- Name: orders_orderhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_orderhistory_id_seq', 1, false);


--
-- Name: packages_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_feature_id_seq', 3, true);


--
-- Name: packages_package_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_features_id_seq', 6, true);


--
-- Name: packages_package_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_id_seq', 15, true);


--
-- Name: packages_packagehistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_packagehistory_id_seq', 1, false);


--
-- Name: packages_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_product_id_seq', 6, true);


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

SELECT pg_catalog.setval('public.steps_step_id_seq', 4, true);


--
-- Name: steps_stepdetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.steps_stepdetail_id_seq', 2, true);


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
-- Name: inbox_mailbox inbox_mailbox_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox_mailbox
    ADD CONSTRAINT inbox_mailbox_pkey PRIMARY KEY (id);


--
-- Name: inbox_mailhistory inbox_mailhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox_mailhistory
    ADD CONSTRAINT inbox_mailhistory_pkey PRIMARY KEY (id);


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
-- Name: contact_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX contact_unique ON public.contacts_contact USING btree (user_id, first_name, last_name) WHERE (is_removed = false);


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

