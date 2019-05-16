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
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (5, 'pbkdf2_sha256$120000$LcWkrtUrVXld$gwOUUDbytCajhTPFtQbgzRAOuevYjnyUNdtOGUGKh3U=', NULL, false, 'user234', '', '', '', false, true, '2019-05-12 18:59:20.95362+00');
INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (1, 'pbkdf2_sha256$120000$E8elhDh4wHDT$2/a8RigrWvstv1dQNHN4UIpISZz5TFn1XYFCFVJEa7A=', '2019-05-14 06:47:26.646989+00', true, 'admin', '', '', '', true, true, '2019-05-12 18:47:07.667847+00');


--
-- Data for Name: account_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) VALUES (1, '2019-05-12 18:54:04.13456+00', '2019-05-12 18:54:04.142169+00', false, true, '123456789', 'ADMIN', 1);
INSERT INTO public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) VALUES (5, '2019-05-12 18:59:40.387476+00', '2019-05-12 18:59:40.397335+00', false, false, '01234567u89', 'SALE', 5);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_content_type (id, app_label, model) VALUES (1, 'jet', 'bookmark');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (2, 'jet', 'pinnedapplication');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (3, 'admin', 'logentry');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (4, 'auth', 'permission');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (5, 'auth', 'group');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (6, 'auth', 'user');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (7, 'contenttypes', 'contenttype');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (8, 'sessions', 'session');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (9, 'account', 'profile');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (10, 'packages', 'producttype');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (11, 'packages', 'productcategory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (12, 'packages', 'product');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (13, 'packages', 'feature');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (14, 'packages', 'package');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (15, 'packages', 'packagehistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (16, 'contacts', 'contact');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (17, 'contacts', 'contactgroup');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (18, 'campaigns', 'mailtemplate');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (19, 'campaigns', 'marketingplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (20, 'campaigns', 'followupplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (21, 'campaigns', 'campaign');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (22, 'campaigns', 'contactmarketing');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (23, 'campaigns', 'contactmarketinghistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (24, 'campaigns', 'note');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (25, 'orders', 'order');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (26, 'orders', 'orderhistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (27, 'orders', 'license');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (28, 'orders', 'lifetimelicense');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (29, 'steps', 'step');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (30, 'steps', 'stepdetail');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (31, 'reports', 'report');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (32, 'events', 'event');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (33, 'notifications', 'notification');


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (1, 'Can add bookmark', 1, 'add_bookmark');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (2, 'Can change bookmark', 1, 'change_bookmark');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (3, 'Can delete bookmark', 1, 'delete_bookmark');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (4, 'Can view bookmark', 1, 'view_bookmark');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (5, 'Can add pinned application', 2, 'add_pinnedapplication');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (6, 'Can change pinned application', 2, 'change_pinnedapplication');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (7, 'Can delete pinned application', 2, 'delete_pinnedapplication');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (8, 'Can view pinned application', 2, 'view_pinnedapplication');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (9, 'Can add log entry', 3, 'add_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (10, 'Can change log entry', 3, 'change_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (11, 'Can delete log entry', 3, 'delete_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (12, 'Can view log entry', 3, 'view_logentry');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (13, 'Can add permission', 4, 'add_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (14, 'Can change permission', 4, 'change_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (15, 'Can delete permission', 4, 'delete_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (16, 'Can view permission', 4, 'view_permission');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (17, 'Can add group', 5, 'add_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (18, 'Can change group', 5, 'change_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (19, 'Can delete group', 5, 'delete_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (20, 'Can view group', 5, 'view_group');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (21, 'Can add user', 6, 'add_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (22, 'Can change user', 6, 'change_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (23, 'Can delete user', 6, 'delete_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (24, 'Can view user', 6, 'view_user');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (25, 'Can add content type', 7, 'add_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (26, 'Can change content type', 7, 'change_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (27, 'Can delete content type', 7, 'delete_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (28, 'Can view content type', 7, 'view_contenttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (29, 'Can add session', 8, 'add_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (30, 'Can change session', 8, 'change_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (31, 'Can delete session', 8, 'delete_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (32, 'Can view session', 8, 'view_session');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (33, 'Can add profile', 9, 'add_profile');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (34, 'Can change profile', 9, 'change_profile');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (35, 'Can delete profile', 9, 'delete_profile');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (36, 'Can view profile', 9, 'view_profile');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (37, 'Can add product type', 10, 'add_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (38, 'Can change product type', 10, 'change_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (39, 'Can delete product type', 10, 'delete_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (40, 'Can view product type', 10, 'view_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (41, 'Can add product category', 11, 'add_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (42, 'Can change product category', 11, 'change_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (43, 'Can delete product category', 11, 'delete_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (44, 'Can view product category', 11, 'view_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (45, 'Can add product', 12, 'add_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (46, 'Can change product', 12, 'change_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (47, 'Can delete product', 12, 'delete_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (48, 'Can view product', 12, 'view_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (49, 'Can add feature', 13, 'add_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (50, 'Can change feature', 13, 'change_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (51, 'Can delete feature', 13, 'delete_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (52, 'Can view feature', 13, 'view_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (53, 'Can add package', 14, 'add_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (54, 'Can change package', 14, 'change_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (55, 'Can delete package', 14, 'delete_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (56, 'Can view package', 14, 'view_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (57, 'Can add package history', 15, 'add_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (58, 'Can change package history', 15, 'change_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (59, 'Can delete package history', 15, 'delete_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (60, 'Can view package history', 15, 'view_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (61, 'Can add contact', 16, 'add_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (62, 'Can change contact', 16, 'change_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (63, 'Can delete contact', 16, 'delete_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (64, 'Can view contact', 16, 'view_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (65, 'Can add contact group', 17, 'add_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (66, 'Can change contact group', 17, 'change_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (67, 'Can delete contact group', 17, 'delete_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (68, 'Can view contact group', 17, 'view_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (69, 'Can add mail template', 18, 'add_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (70, 'Can change mail template', 18, 'change_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (71, 'Can delete mail template', 18, 'delete_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (72, 'Can view mail template', 18, 'view_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (73, 'Can add marketing plan', 19, 'add_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (74, 'Can change marketing plan', 19, 'change_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (75, 'Can delete marketing plan', 19, 'delete_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (76, 'Can view marketing plan', 19, 'view_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (77, 'Can add follow up plan', 20, 'add_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (78, 'Can change follow up plan', 20, 'change_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (79, 'Can delete follow up plan', 20, 'delete_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (80, 'Can view follow up plan', 20, 'view_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (81, 'Can add campaign', 21, 'add_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (82, 'Can change campaign', 21, 'change_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (83, 'Can delete campaign', 21, 'delete_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (84, 'Can view campaign', 21, 'view_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (85, 'Can add contact marketing', 22, 'add_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (86, 'Can change contact marketing', 22, 'change_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (87, 'Can delete contact marketing', 22, 'delete_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (88, 'Can view contact marketing', 22, 'view_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (89, 'Can add contact marketing history', 23, 'add_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (90, 'Can change contact marketing history', 23, 'change_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (91, 'Can delete contact marketing history', 23, 'delete_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (92, 'Can view contact marketing history', 23, 'view_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (93, 'Can add note', 24, 'add_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (94, 'Can change note', 24, 'change_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (95, 'Can delete note', 24, 'delete_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (96, 'Can view note', 24, 'view_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (97, 'Can add order', 25, 'add_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (98, 'Can change order', 25, 'change_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (99, 'Can delete order', 25, 'delete_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (100, 'Can view order', 25, 'view_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (101, 'Can add order history', 26, 'add_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (102, 'Can change order history', 26, 'change_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (103, 'Can delete order history', 26, 'delete_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (104, 'Can view order history', 26, 'view_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (105, 'Can add license', 27, 'add_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (106, 'Can change license', 27, 'change_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (107, 'Can delete license', 27, 'delete_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (108, 'Can view license', 27, 'view_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (109, 'Can add lifetime license', 28, 'add_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (110, 'Can change lifetime license', 28, 'change_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (111, 'Can delete lifetime license', 28, 'delete_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (112, 'Can view lifetime license', 28, 'view_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (113, 'Can add step', 29, 'add_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (114, 'Can change step', 29, 'change_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (115, 'Can delete step', 29, 'delete_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (116, 'Can view step', 29, 'view_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (117, 'Can add step detail', 30, 'add_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (118, 'Can change step detail', 30, 'change_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (119, 'Can delete step detail', 30, 'delete_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (120, 'Can view step detail', 30, 'view_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (121, 'Can add report', 31, 'add_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (122, 'Can change report', 31, 'change_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (123, 'Can delete report', 31, 'delete_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (124, 'Can view report', 31, 'view_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (125, 'Can add event', 32, 'add_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (126, 'Can change event', 32, 'change_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (127, 'Can delete event', 32, 'delete_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (128, 'Can view event', 32, 'view_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (129, 'Can add notification', 33, 'add_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (130, 'Can change notification', 33, 'change_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (131, 'Can delete notification', 33, 'delete_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (132, 'Can view notification', 33, 'view_notification');


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: campaigns_followupplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, can_modify, manager_id) VALUES (1, '2019-05-12 19:06:47.484467+00', '2019-05-12 19:06:47.484829+00', false, 'FOllow1', true, 5);


--
-- Data for Name: campaigns_mailtemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_mailtemplate (id, created, modified, is_removed, name, template, is_public, user_id) VALUES (1, '2019-05-12 19:06:29.83437+00', '2019-05-12 19:06:29.838414+00', false, 'Mail temp', 'vvvvvvvvvvvvvvvv', true, 5);


--
-- Data for Name: campaigns_marketingplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, actions, can_modify, mail_template_id, manager_id) VALUES (1, '2019-05-12 19:05:49.35249+00', '2019-05-12 19:05:49.3531+00', false, 'Marketing', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', '{}', true, NULL, 5);


--
-- Data for Name: campaigns_campaign; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (1, '2019-05-12 19:12:08.159525+00', '2019-05-14 05:18:35.923151+00', false, 'New World', '2019-05-13', '2019-05-18', '<p></p>', 1, 5, 1);


--
-- Data for Name: campaigns_campaign_assigned_to; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (1, 1, 5);


--
-- Data for Name: packages_package; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (1, '2019-05-12 19:09:42.257162+00', '2019-05-14 06:48:37.603794+00', false, 'PackA', '{"1": 144, "6": 115656, "12": 22222, "999999": 6666}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (2, '2019-05-12 19:09:42.614035+00', '2019-05-14 06:48:58.029707+00', false, 'PackB', '{"1": 255, "6": 256, "12": 333, "999999": 8888}', 0);


--
-- Data for Name: campaigns_campaign_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (1, 1, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (2, 1, 2);


--
-- Data for Name: contacts_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (1, '2019-05-12 19:01:30.28057+00', '2019-05-12 19:01:30.28086+00', false, 'Vu', 'Dang', 'hepmy666@gmail.com', '0123456789', 'MALE', '02 abc', 'America', 'AK', 'Anchorage', '500000', 'FA', 5);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (3, '2019-05-12 19:05:23.249904+00', '2019-05-12 19:05:23.250174+00', false, 'Mac', 'Demarco', 'vudangho96@gmail.com', '0123456789', 'MALE', '', 'America', 'AL', 'Birmingham', '054555', '', 5);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (2, '2019-05-12 19:04:50.830978+00', '2019-05-15 06:58:42.235728+00', false, 'John', 'Wick', 'deafandblind14@gmail.com', '0123456789', 'OTHER', NULL, 'America', 'AL', 'Anchorage', '012333', '', 5);


--
-- Data for Name: campaigns_contactmarketing; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id) VALUES (1, '2019-05-12 19:12:08.322801+00', '2019-05-14 05:19:24.93998+00', false, 'COMPLETED', 2, '106b757d-b721-4ebe-8ac8-7bc32402bab8', 1, 1, 1);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id) VALUES (2, '2019-05-12 19:12:08.337484+00', '2019-05-14 06:04:31.115619+00', false, 'COMPLETED', 2, '106b757d-b721-4ebe-8ac8-7bc32402bab8', 1, 2, 1);


--
-- Data for Name: campaigns_contactmarketinghistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: campaigns_note; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: contacts_contactgroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) VALUES (4, '2019-05-12 19:00:29.694296+00', '2019-05-12 19:00:29.705968+00', false, 'All Contacts', 'PRIVATE', NULL, 5);
INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) VALUES (5, '2019-05-12 19:00:44.716839+00', '2019-05-12 19:00:44.723189+00', false, 'All Contacts', 'PRIVATE', NULL, 1);
INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) VALUES (6, '2019-05-12 19:21:31.380524+00', '2019-05-12 19:21:57.993593+00', false, 'Public One', 'PUBLIC', NULL, 5);
INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) VALUES (7, '2019-05-12 19:22:57.575934+00', '2019-05-12 19:22:57.576189+00', false, 'Private', 'PRIVATE', NULL, 5);


--
-- Data for Name: contacts_contactgroup_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (1, 4, 1);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (2, 4, 2);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (3, 4, 3);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (4, 6, 1);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (5, 6, 2);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (6, 6, 3);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (1, '2019-05-12 18:54:04.143493+00', '1', 'Profile object (1)', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (2, '2019-05-12 18:55:25.395194+00', '2', 'user234', 3, '', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (3, '2019-05-12 18:56:26.655155+00', '3', 'user234', 3, '', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (4, '2019-05-12 18:57:03.346927+00', '4', 'user234', 2, '[{"changed": {"fields": ["password"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (5, '2019-05-12 18:57:56.093262+00', '4', 'user234', 2, '[{"changed": {"fields": ["is_staff", "is_superuser"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (6, '2019-05-12 18:59:13.116042+00', '4', 'user234', 3, '', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (7, '2019-05-12 18:59:21.083342+00', '5', 'user234', 1, '[{"added": {}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (8, '2019-05-12 18:59:40.398515+00', '5', 'Profile object (5)', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (9, '2019-05-12 19:00:29.711445+00', '4', 'ContactGroup object (4)', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (10, '2019-05-12 19:00:44.728594+00', '5', 'ContactGroup object (5)', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (11, '2019-05-12 19:06:29.839864+00', '1', 'MailTemplate object (1)', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (12, '2019-05-12 19:07:51.288473+00', '1', 'ProductType object (1)', 1, '[{"added": {}}]', 10, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (13, '2019-05-12 19:08:06.586204+00', '1', 'ProductCategory object (1)', 1, '[{"added": {}}]', 11, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (14, '2019-05-12 19:18:45.340141+00', '1', 'StepDetail object (1)', 2, '[{"changed": {"fields": ["information"]}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (15, '2019-05-12 19:21:57.997786+00', '6', 'ContactGroup object (6)', 2, '[{"changed": {"fields": ["_type"]}}]', 17, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (16, '2019-05-12 19:29:08.915016+00', '1', 'StepDetail object (1)', 2, '[{"changed": {"fields": ["information"]}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (17, '2019-05-12 19:31:58.821665+00', '1', 'StepDetail object (1)', 2, '[{"changed": {"fields": ["information"]}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (18, '2019-05-12 19:34:19.685721+00', '1', 'StepDetail object (1)', 2, '[{"changed": {"fields": ["information"]}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (19, '2019-05-12 19:39:49.836413+00', '1', 'StepDetail object (1)', 2, '[{"changed": {"fields": ["information"]}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (20, '2019-05-12 19:44:02.702594+00', '1', 'StepDetail object (1)', 3, '', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (21, '2019-05-14 05:17:17.193303+00', '1', 'Order object (1)', 3, '', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (22, '2019-05-14 05:18:36.835592+00', '1', 'Campaign object (1)', 2, '[{"changed": {"fields": ["end_date"]}}]', 21, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (23, '2019-05-14 05:22:10.367289+00', '3', 'StepDetail object (3)', 3, '', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (24, '2019-05-14 05:22:20.828271+00', '3', 'Order object (3)', 3, '', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (25, '2019-05-14 05:22:30.796802+00', '2', 'ContactMarketing object (2)', 2, '[{"changed": {"fields": ["status"]}}]', 22, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (26, '2019-05-14 05:24:29.183953+00', '4', 'Order object (4)', 3, '', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (27, '2019-05-14 05:56:56.709915+00', '2', 'StepDetail object (2)', 2, '[{"changed": {"fields": ["order"]}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (28, '2019-05-14 05:58:54.424035+00', '4', 'StepDetail object (4)', 2, '[{"changed": {"fields": ["information"]}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (29, '2019-05-14 06:00:14.138656+00', '4', 'StepDetail object (4)', 3, '', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (30, '2019-05-14 06:00:34.094667+00', '5', 'Order object (5)', 3, '', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (31, '2019-05-14 06:00:47.149589+00', '2', 'ContactMarketing object (2)', 2, '[{"changed": {"fields": ["status"]}}]', 22, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (32, '2019-05-14 06:01:24.889615+00', '2', 'Contact object (2)', 2, '[{"changed": {"fields": ["mail"]}}]', 16, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (33, '2019-05-14 06:04:03.034404+00', '6', 'Order object (6)', 3, '', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (34, '2019-05-14 06:04:11.301604+00', '5', 'StepDetail object (5)', 3, '', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (35, '2019-05-14 06:04:21.368822+00', '2', 'ContactMarketing object (2)', 2, '[{"changed": {"fields": ["status"]}}]', 22, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (36, '2019-05-14 06:48:37.690285+00', '1', 'Package object (1)', 2, '[{"changed": {"fields": ["prices"]}}]', 14, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (37, '2019-05-14 06:48:58.119028+00', '2', 'Package object (2)', 2, '[{"changed": {"fields": ["prices"]}}]', 14, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (38, '2019-05-15 06:58:42.906286+00', '2', 'Contact object (2)', 2, '[{"changed": {"fields": ["state"]}}]', 16, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (39, '2019-05-15 06:59:48.83054+00', '8', 'Order object (8)', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (40, '2019-05-15 07:00:30.948737+00', '8', 'Order object (8)', 3, '', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (41, '2019-05-15 11:51:55.477033+00', '2', 'Order object (2)', 2, '[{"changed": {"fields": ["name", "status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (42, '2019-05-15 11:52:26.04356+00', '2', 'Order object (2)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_migrations (id, app, name, applied) VALUES (1, 'contenttypes', '0001_initial', '2019-05-12 18:33:53.575152+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (2, 'auth', '0001_initial', '2019-05-12 18:33:53.746582+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (3, 'admin', '0001_initial', '2019-05-12 18:33:53.807118+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (4, 'admin', '0002_logentry_remove_auto_add', '2019-05-12 18:33:53.826109+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (5, 'admin', '0003_logentry_add_action_flag_choices', '2019-05-12 18:33:53.846368+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (6, 'contenttypes', '0002_remove_content_type_name', '2019-05-12 18:33:53.92631+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (7, 'auth', '0002_alter_permission_name_max_length', '2019-05-12 18:33:53.946016+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (8, 'auth', '0003_alter_user_email_max_length', '2019-05-12 18:33:53.966734+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (9, 'auth', '0004_alter_user_username_opts', '2019-05-12 18:33:53.984621+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (10, 'auth', '0005_alter_user_last_login_null', '2019-05-12 18:33:54.004967+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (11, 'auth', '0006_require_contenttypes_0002', '2019-05-12 18:33:54.01101+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (12, 'auth', '0007_alter_validators_add_error_messages', '2019-05-12 18:33:54.029033+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (13, 'auth', '0008_alter_user_username_max_length', '2019-05-12 18:33:54.066984+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (14, 'auth', '0009_alter_user_last_name_max_length', '2019-05-12 18:33:54.099488+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (15, 'jet', '0001_initial', '2019-05-12 18:33:54.141551+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (16, 'jet', '0002_delete_userdashboardmodule', '2019-05-12 18:33:54.156232+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (17, 'sessions', '0001_initial', '2019-05-12 18:33:54.205675+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (18, 'account', '0001_initial', '2019-05-12 18:45:54.960905+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (19, 'packages', '0001_initial', '2019-05-12 18:45:55.18103+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (20, 'contacts', '0001_initial', '2019-05-12 18:45:55.309663+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (21, 'campaigns', '0001_initial', '2019-05-12 18:45:55.974479+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (22, 'orders', '0001_initial', '2019-05-12 18:45:56.305905+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (23, 'events', '0001_initial', '2019-05-12 18:45:56.44919+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (24, 'notifications', '0001_initial', '2019-05-12 18:45:56.532937+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (25, 'reports', '0001_initial', '2019-05-12 18:45:56.672319+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (26, 'steps', '0001_initial', '2019-05-12 18:45:56.823375+00');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('1w9k342z2juqfqs0yc4fz1yi9tq6fnnh', 'YWUwNGJlMjM5NThmNDU3Njc4ODczNWYxMzljMzAyYmZhNTEzZDY0OTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzJmZGVhOWM0MTNjYjQ4ZGE0YzUzMmEwNjkyNDBmZTViMTIxMGE3In0=', '2019-05-27 04:26:27.019268+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('gp6j91n5z4nt2wlwocsmyik9m06dor27', 'YWUwNGJlMjM5NThmNDU3Njc4ODczNWYxMzljMzAyYmZhNTEzZDY0OTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJjNzJmZGVhOWM0MTNjYjQ4ZGE0YzUzMmEwNjkyNDBmZTViMTIxMGE3In0=', '2019-05-28 06:47:26.651016+00');


--
-- Data for Name: orders_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (1, '2019-05-12 19:12:26.592743+00', '2019-05-12 19:19:26.697132+00', true, '', 'RUNNING', 1, 2, 5);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (3, '2019-05-14 05:19:24.945476+00', '2019-05-14 05:22:20.831769+00', true, '', 'RUNNING', 1, 1, 5);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (4, '2019-05-14 05:22:42.711225+00', '2019-05-14 05:24:29.185851+00', true, '', 'RUNNING', 1, 2, 5);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (5, '2019-05-14 05:23:18.608027+00', '2019-05-14 05:23:18.608395+00', true, '', 'RUNNING', 1, 2, 5);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (6, '2019-05-14 06:01:34.245196+00', '2019-05-14 06:04:03.035842+00', true, '', 'RUNNING', 1, 2, 5);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (7, '2019-05-14 06:04:31.121716+00', '2019-05-14 06:45:21.350181+00', false, '', 'COMPLETED', 1, 2, 5);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (8, '2019-05-15 06:59:48.760588+00', '2019-05-15 06:59:48.813131+00', true, 'OO', 'COMPLETED', 1, 3, 1);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (2, '2019-05-14 05:18:47.081065+00', '2019-05-15 11:52:26.029687+00', false, 'Woo', 'COMPLETED', 1, 1, 5);


--
-- Data for Name: events_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (1, '2019-05-12 19:12:08.326384+00', '2019-05-12 19:12:08.326667+00', false, 'Contact Vu Dang', '2019-05-12 17:00:00+00', '2019-05-12 17:00:00+00', 'Start contacting Vu Dang', 0, 5, 1, NULL, 5);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (2, '2019-05-12 19:12:08.341488+00', '2019-05-12 19:12:08.341748+00', false, 'Contact John Wick', '2019-05-12 17:00:00+00', '2019-05-12 17:00:00+00', 'Start contacting John Wick', 0, 5, 2, NULL, 5);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (3, '2019-05-14 05:12:05.713836+00', '2019-05-14 05:12:05.714138+00', false, '<p>One two</p>', '2019-05-14 17:00:00+00', '2019-05-15 17:00:00+00', 'Wow', 2, 5, NULL, NULL, 5);


--
-- Data for Name: events_event_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (1, 1, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (2, 2, 2);


--
-- Data for Name: jet_bookmark; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: jet_pinnedapplication; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notifications_notification; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders_license; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_license (id, created, modified, is_removed, start_date, duration, code, order_id, package_id) VALUES (1, '2019-05-14 06:45:10.098753+00', '2019-05-14 06:45:10.099999+00', false, '2019-05-14', 1, '5c05dba1-5351-4384-844d-94553fc01ac8', 2, 1);
INSERT INTO public.orders_license (id, created, modified, is_removed, start_date, duration, code, order_id, package_id) VALUES (2, '2019-05-14 06:45:10.113416+00', '2019-05-14 06:45:10.113776+00', false, '2019-05-14', 6, 'a9655d0c-49d6-4a89-8b0b-b8fdf8161db7', 2, 2);


--
-- Data for Name: orders_lifetimelicense; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_lifetimelicense (id, created, modified, is_removed, start_date, code, order_id, package_id) VALUES (1, '2019-05-14 06:45:21.265869+00', '2019-05-14 06:45:21.266367+00', false, '2019-05-14', '79728da8-fce4-4e32-a532-da3f3eb656eb', 7, 1);
INSERT INTO public.orders_lifetimelicense (id, created, modified, is_removed, start_date, code, order_id, package_id) VALUES (2, '2019-05-14 06:45:21.31838+00', '2019-05-14 06:45:21.318738+00', false, '2019-05-14', 'fe5a4b13-5efe-48b3-a139-d71bd91c7e60', 7, 2);


--
-- Data for Name: orders_order_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_order_packages (id, order_id, package_id) VALUES (1, 2, 1);
INSERT INTO public.orders_order_packages (id, order_id, package_id) VALUES (2, 2, 2);
INSERT INTO public.orders_order_packages (id, order_id, package_id) VALUES (3, 7, 1);
INSERT INTO public.orders_order_packages (id, order_id, package_id) VALUES (4, 7, 2);
INSERT INTO public.orders_order_packages (id, order_id, package_id) VALUES (5, 8, 1);


--
-- Data for Name: orders_orderhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_orderhistory (id, created, modified, is_removed, date, action, order_id) VALUES (1, '2019-05-12 19:19:26.704456+00', '2019-05-12 19:19:26.704861+00', false, '2019-05-13', 'Call Client', 1);


--
-- Data for Name: packages_productcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (1, '2019-05-12 19:08:06.582929+00', '2019-05-12 19:08:06.583484+00', false, 'Game', '', 'ACTIVE');


--
-- Data for Name: packages_producttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_producttype (id, created, modified, is_removed, name, description, status) VALUES (1, '2019-05-12 19:07:51.286051+00', '2019-05-12 19:07:51.286661+00', false, 'Mobile', '', 'ACTIVE');


--
-- Data for Name: packages_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (1, '2019-05-12 19:09:41.889359+00', '2019-05-12 19:09:41.889653+00', false, 'Product NA', '', 'ACTIVE', '2019-05-13', 1, 5, 1);


--
-- Data for Name: packages_feature; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (1, '2019-05-12 19:09:42.2498+00', '2019-05-12 19:09:42.250114+00', false, 'Big1', '', 111111111, 1, 1);
INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (2, '2019-05-12 19:09:42.253465+00', '2019-05-12 19:09:42.253846+00', false, 'Big2', '', 11111111, 2, 1);


--
-- Data for Name: packages_package_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (1, 1, 1);
INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (2, 2, 1);
INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (3, 2, 2);


--
-- Data for Name: packages_packagehistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: reports_report; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: reports_report_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: reports_report_products; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: reports_report_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: steps_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.steps_step (id, created, modified, is_removed, actions, duration, conditions, follow_up_id, mail_template_id) VALUES (1, '2019-05-12 19:06:47.491713+00', '2019-05-12 19:06:47.49239+00', false, '["Send Email"]', 10, '[{"name": "Choose Packages", "type": "final"}]', 1, 1);


--
-- Data for Name: steps_stepdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, order_id, step_id) VALUES (1, '2019-05-12 19:12:26.602629+00', '2019-05-12 19:39:49.834772+00', true, '[{"type": "final", "result": {"1": {"type": 6}}}]', 'COMPLETED', 1, 1);
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, order_id, step_id) VALUES (3, '2019-05-14 05:19:24.954499+00', '2019-05-14 05:22:10.373803+00', true, '{"1": {"type": "", "price": ""}, "2": {"type": "", "price": ""}}', 'RUNNING', 3, 1);
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, order_id, step_id) VALUES (2, '2019-05-12 19:44:16.691028+00', '2019-05-14 05:56:56.707398+00', false, '{"Choose Packages": {"type": "final", "result": {"1": {"type": 1, "price": "144"}, "2": {"type": 6, "price": "256"}}}}', 'COMPLETED', 2, 1);
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, order_id, step_id) VALUES (4, '2019-05-14 05:23:18.617965+00', '2019-05-14 06:00:14.140276+00', true, '{"Choose Packages": {"type": "final", "result": {"1": {"type": "", "price": ""}, "2": {"type": "", "price": ""}}}}', 'RUNNING', 5, 1);
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, order_id, step_id) VALUES (5, '2019-05-14 06:01:34.254+00', '2019-05-14 06:04:11.30326+00', true, '{"Choose Packages": {"type": "final", "result": {"2": {"type": "", "price": ""}}}}', 'RUNNING', 6, 1);
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, order_id, step_id) VALUES (6, '2019-05-14 06:04:31.13076+00', '2019-05-14 06:45:17.800205+00', false, '{"Choose Packages": {"type": "final", "result": {"1": {"type": 999999, "price": "6666"}, "2": {"type": 999999, "price": "8888"}}}}', 'COMPLETED', 7, 1);


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

SELECT pg_catalog.setval('public.campaigns_campaign_assigned_to_id_seq', 1, true);


--
-- Name: campaigns_campaign_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_id_seq', 1, true);


--
-- Name: campaigns_campaign_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_packages_id_seq', 2, true);


--
-- Name: campaigns_contactmarketing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketing_id_seq', 2, true);


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

SELECT pg_catalog.setval('public.campaigns_mailtemplate_id_seq', 1, true);


--
-- Name: campaigns_marketingplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_marketingplan_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 42, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 33, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 26, true);


--
-- Name: events_event_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_contacts_id_seq', 2, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 3, true);


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
-- PostgreSQL database dump complete
--

