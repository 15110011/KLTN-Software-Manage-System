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

--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (2, 'pbkdf2_sha256$150000$ynZ2E5Lnml6m$d0NL6jsF6pMo8vY17LiS1fnIQW0AtknmfW+Xy9EHg10=', NULL, false, 'user1', '', '', 'theaqvteam@gmail.com', false, true, '2019-05-09 11:27:51+00');
INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (1, 'pbkdf2_sha256$150000$IiULpvHi1tem$lKn/j4wXkzJB4iPgiFI91ZBvSIA36EH5ZSzvL9Xs04A=', '2019-05-11 09:07:37.334974+00', true, 'quang', '', '', '', true, true, '2019-05-09 11:24:00.860601+00');


--
-- Data for Name: account_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) VALUES (1, '2019-05-09 11:28:15.44259+00', '2019-05-09 11:28:15.455205+00', false, false, '012331555', 'Xtek', 2);


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
INSERT INTO public.django_content_type (id, app_label, model) VALUES (10, 'notifications', 'notification');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (11, 'contacts', 'contactgroup');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (12, 'packages', 'feature');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (13, 'packages', 'package');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (14, 'packages', 'productcategory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (15, 'packages', 'producttype');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (16, 'packages', 'product');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (17, 'packages', 'packagehistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (18, 'contacts', 'contact');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (19, 'campaigns', 'campaign');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (20, 'campaigns', 'contactmarketing');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (21, 'campaigns', 'marketingplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (22, 'campaigns', 'mailtemplate');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (23, 'campaigns', 'followupplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (24, 'campaigns', 'contactmarketinghistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (25, 'campaigns', 'note');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (26, 'orders', 'license');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (27, 'orders', 'lifetimelicense');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (28, 'orders', 'order');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (29, 'orders', 'orderhistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (30, 'steps', 'step');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (31, 'steps', 'stepdetail');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (32, 'reports', 'report');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (33, 'events', 'event');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (34, 'inbox', 'mailbox');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (35, 'inbox', 'mailhistory');


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
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (37, 'Can add notification', 10, 'add_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (38, 'Can change notification', 10, 'change_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (39, 'Can delete notification', 10, 'delete_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (40, 'Can view notification', 10, 'view_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (41, 'Can add feature', 12, 'add_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (42, 'Can change feature', 12, 'change_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (43, 'Can delete feature', 12, 'delete_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (44, 'Can view feature', 12, 'view_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (45, 'Can add package', 13, 'add_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (46, 'Can change package', 13, 'change_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (47, 'Can delete package', 13, 'delete_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (48, 'Can view package', 13, 'view_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (49, 'Can add product category', 14, 'add_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (50, 'Can change product category', 14, 'change_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (51, 'Can delete product category', 14, 'delete_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (52, 'Can view product category', 14, 'view_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (53, 'Can add product type', 15, 'add_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (54, 'Can change product type', 15, 'change_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (55, 'Can delete product type', 15, 'delete_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (56, 'Can view product type', 15, 'view_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (57, 'Can add product', 16, 'add_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (58, 'Can change product', 16, 'change_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (59, 'Can delete product', 16, 'delete_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (60, 'Can view product', 16, 'view_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (61, 'Can add package history', 17, 'add_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (62, 'Can change package history', 17, 'change_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (63, 'Can delete package history', 17, 'delete_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (64, 'Can view package history', 17, 'view_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (65, 'Can add contact', 18, 'add_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (66, 'Can change contact', 18, 'change_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (67, 'Can delete contact', 18, 'delete_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (68, 'Can view contact', 18, 'view_contact');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (69, 'Can add contact group', 11, 'add_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (70, 'Can change contact group', 11, 'change_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (71, 'Can delete contact group', 11, 'delete_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (72, 'Can view contact group', 11, 'view_contactgroup');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (73, 'Can add campaign', 19, 'add_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (74, 'Can change campaign', 19, 'change_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (75, 'Can delete campaign', 19, 'delete_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (76, 'Can view campaign', 19, 'view_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (77, 'Can add contact marketing', 20, 'add_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (78, 'Can change contact marketing', 20, 'change_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (79, 'Can delete contact marketing', 20, 'delete_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (80, 'Can view contact marketing', 20, 'view_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (81, 'Can add marketing plan', 21, 'add_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (82, 'Can change marketing plan', 21, 'change_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (83, 'Can delete marketing plan', 21, 'delete_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (84, 'Can view marketing plan', 21, 'view_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (85, 'Can add mail template', 22, 'add_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (86, 'Can change mail template', 22, 'change_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (87, 'Can delete mail template', 22, 'delete_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (88, 'Can view mail template', 22, 'view_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (89, 'Can add follow up plan', 23, 'add_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (90, 'Can change follow up plan', 23, 'change_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (91, 'Can delete follow up plan', 23, 'delete_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (92, 'Can view follow up plan', 23, 'view_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (93, 'Can add contact marketing history', 24, 'add_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (94, 'Can change contact marketing history', 24, 'change_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (95, 'Can delete contact marketing history', 24, 'delete_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (96, 'Can view contact marketing history', 24, 'view_contactmarketinghistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (97, 'Can add note', 25, 'add_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (98, 'Can change note', 25, 'change_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (99, 'Can delete note', 25, 'delete_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (100, 'Can view note', 25, 'view_note');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (101, 'Can add license', 26, 'add_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (102, 'Can change license', 26, 'change_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (103, 'Can delete license', 26, 'delete_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (104, 'Can view license', 26, 'view_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (105, 'Can add lifetime license', 27, 'add_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (106, 'Can change lifetime license', 27, 'change_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (107, 'Can delete lifetime license', 27, 'delete_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (108, 'Can view lifetime license', 27, 'view_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (109, 'Can add order', 28, 'add_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (110, 'Can change order', 28, 'change_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (111, 'Can delete order', 28, 'delete_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (112, 'Can view order', 28, 'view_order');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (113, 'Can add order history', 29, 'add_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (114, 'Can change order history', 29, 'change_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (115, 'Can delete order history', 29, 'delete_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (116, 'Can view order history', 29, 'view_orderhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (117, 'Can add step', 30, 'add_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (118, 'Can change step', 30, 'change_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (119, 'Can delete step', 30, 'delete_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (120, 'Can view step', 30, 'view_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (121, 'Can add step detail', 31, 'add_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (122, 'Can change step detail', 31, 'change_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (123, 'Can delete step detail', 31, 'delete_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (124, 'Can view step detail', 31, 'view_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (125, 'Can add report', 32, 'add_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (126, 'Can change report', 32, 'change_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (127, 'Can delete report', 32, 'delete_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (128, 'Can view report', 32, 'view_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (129, 'Can add event', 33, 'add_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (130, 'Can change event', 33, 'change_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (131, 'Can delete event', 33, 'delete_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (132, 'Can view event', 33, 'view_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (133, 'Can add mail box', 34, 'add_mailbox');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (134, 'Can change mail box', 34, 'change_mailbox');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (135, 'Can delete mail box', 34, 'delete_mailbox');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (136, 'Can view mail box', 34, 'view_mailbox');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (137, 'Can add mail history', 35, 'add_mailhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (138, 'Can change mail history', 35, 'change_mailhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (139, 'Can delete mail history', 35, 'delete_mailhistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (140, 'Can view mail history', 35, 'view_mailhistory');


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

INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, can_modify, manager_id) VALUES (1, '2019-05-09 11:36:08.37017+00', '2019-05-09 11:36:08.378798+00', false, 'Gói Vũ Múp', true, 2);


--
-- Data for Name: campaigns_mailtemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: campaigns_marketingplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, actions, can_modify, manager_id, mail_template_id) VALUES (1, '2019-05-09 11:36:22.365888+00', '2019-05-09 11:36:22.383568+00', false, 'Software Management', '{"1": 1}', '{"Send Email"}', true, 2, NULL);


--
-- Data for Name: campaigns_campaign; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (1, '2019-05-09 11:36:40.888537+00', '2019-05-09 11:36:40.93274+00', false, 'Campaign 1', '2019-05-09', '2019-05-09', 'dsfsdf', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (2, '2019-05-09 12:04:16.547017+00', '2019-05-09 12:04:16.547535+00', false, 'Khoan khoan da', '2019-05-08', '2020-04-05', 'Vu va Khoan', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (3, '2019-05-09 12:04:35.051694+00', '2019-05-09 12:04:35.052379+00', false, 'Khoan khoan da', '2019-05-08', '2020-04-05', 'Vu va Khoan', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (4, '2019-05-09 12:06:09.653768+00', '2019-05-09 12:06:09.654998+00', false, 'Khoan khoan da', '2019-05-08', '2020-04-05', 'Vu va Khoan', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (5, '2019-05-09 12:09:29.136564+00', '2019-05-09 12:09:29.137384+00', false, 'Khoan khoan da', '2019-05-08', '2020-04-05', 'Vu va Khoan', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (6, '2019-05-09 12:17:42.075657+00', '2019-05-09 12:17:42.076814+00', false, 'Khoan khoan da', '2019-05-08', '2020-04-05', 'Vu va Khoan', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (7, '2019-05-09 12:19:15.688058+00', '2019-05-09 12:19:15.689565+00', false, 'Khoan khoan da', '2019-05-08', '2020-04-05', 'Vu va Khoan', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (8, '2019-05-10 02:40:26.404775+00', '2019-05-10 02:40:26.405268+00', false, 'Khoan khoan da', '2019-05-08', '2020-04-05', 'Vu va Khoan', 1, 2, 1);


--
-- Data for Name: campaigns_campaign_assigned_to; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (1, 1, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (2, 2, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (3, 3, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (4, 4, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (5, 5, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (6, 6, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (7, 7, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (8, 8, 2);


--
-- Data for Name: packages_package; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (1, '2019-05-09 11:35:51.669322+00', '2019-05-09 11:35:51.683338+00', false, 'Gói Vũ Múp', '{"1": 1}', 10);


--
-- Data for Name: campaigns_campaign_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (1, 1, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (2, 2, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (3, 3, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (4, 4, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (5, 5, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (6, 6, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (7, 7, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (8, 8, 1);


--
-- Data for Name: contacts_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (1, '2019-05-09 11:34:21.747024+00', '2019-05-09 11:34:21.757127+00', false, 'Quang', 'Day', 'quangvo@gmail.com', '0123301505', 'OTHER', '69 Van Kiep', 'America', 'California', 'Chicago', '500000', '', 2);


--
-- Data for Name: campaigns_contactmarketing; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, campaign_id, contact_id, marketing_plan_id, job_id) VALUES (1, '2019-05-09 12:04:17.944513+00', '2019-05-09 12:04:17.944986+00', false, 'RUNNING', 2, 2, 1, 1, NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, campaign_id, contact_id, marketing_plan_id, job_id) VALUES (2, '2019-05-09 12:04:35.863562+00', '2019-05-09 12:04:35.864489+00', false, 'RUNNING', 2, 3, 1, 1, NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, campaign_id, contact_id, marketing_plan_id, job_id) VALUES (3, '2019-05-09 12:06:12.063195+00', '2019-05-09 12:06:12.064225+00', false, 'RUNNING', 2, 4, 1, 1, NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, campaign_id, contact_id, marketing_plan_id, job_id) VALUES (4, '2019-05-09 12:09:29.879308+00', '2019-05-09 12:09:29.880303+00', false, 'RUNNING', 2, 5, 1, 1, NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, campaign_id, contact_id, marketing_plan_id, job_id) VALUES (5, '2019-05-09 12:17:43.18499+00', '2019-05-10 08:31:35.754003+00', false, 'RUNNING', 2, 6, 1, 1, NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, campaign_id, contact_id, marketing_plan_id, job_id) VALUES (7, '2019-05-10 02:40:30.397107+00', '2019-05-11 08:02:44.78123+00', false, 'COMPLETED', 2, 8, 1, 1, 'd31e77b4-85e5-4650-b6ba-9f840a7fbb97');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, campaign_id, contact_id, marketing_plan_id, job_id) VALUES (6, '2019-05-09 12:19:16.532767+00', '2019-05-11 10:00:27.02494+00', false, 'RUNNING', 2, 7, 1, 1, NULL);


--
-- Data for Name: campaigns_contactmarketinghistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (1, '2019-05-10 08:22:17.73166+00', '2019-05-10 08:22:17.732489+00', false, 'Send Email Manually', 5);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (2, '2019-05-10 08:31:35.784813+00', '2019-05-10 08:31:35.785257+00', false, 'Send Email Manually', 5);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (3, '2019-05-10 08:35:47.748012+00', '2019-05-10 08:35:47.748471+00', false, 'Send Email Manually', 7);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (4, '2019-05-10 08:36:50.1144+00', '2019-05-10 08:36:50.115356+00', false, 'Send Email Manually', 7);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (5, '2019-05-10 08:38:40.937607+00', '2019-05-10 08:38:40.93792+00', false, 'Send Email Manually', 6);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (6, '2019-05-11 10:00:27.228248+00', '2019-05-11 10:00:27.228973+00', false, 'Send Email Manually', 6);


--
-- Data for Name: campaigns_note; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: contacts_contactgroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) VALUES (1, '2019-05-09 11:34:29.859114+00', '2019-05-09 11:34:29.891479+00', false, 'All Contacts', 'PRIVATE', 2, 2);


--
-- Data for Name: contacts_contactgroup_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (1, 1, 1);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (1, '2019-05-09 11:27:51.316389+00', '2', 'user1', 1, '[{"added": {}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (2, '2019-05-09 11:28:00.38563+00', '2', 'user1', 2, '[{"changed": {"fields": ["email"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (3, '2019-05-09 11:28:15.462178+00', '1', 'Profile object (1)', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (4, '2019-05-09 11:34:25.134936+00', '1', 'Contact object (1)', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (5, '2019-05-09 11:34:29.914633+00', '1', 'ContactGroup object (1)', 1, '[{"added": {}}]', 11, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (6, '2019-05-09 11:35:40.779483+00', '1', 'Product object (1)', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (7, '2019-05-09 11:35:49.398486+00', '1', 'Feature object (1)', 1, '[{"added": {}}]', 12, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (8, '2019-05-09 11:35:52.232898+00', '1', 'Package object (1)', 1, '[{"added": {}}]', 13, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (9, '2019-05-09 11:36:08.382097+00', '1', 'FollowUpPlan object (1)', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (10, '2019-05-09 11:36:22.685951+00', '1', 'MarketingPlan object (1)', 1, '[{"added": {}}]', 21, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (11, '2019-05-09 11:36:42.485777+00', '1', 'Campaign object (1)', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (12, '2019-05-09 12:10:36.898235+00', '1', 'Order object (1)', 1, '[{"added": {}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (13, '2019-05-09 12:10:57.457425+00', '1', 'License object (1)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (14, '2019-05-09 12:12:32.424962+00', '1', 'Order object (1)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (15, '2019-05-09 12:13:49.607917+00', '1', 'Step object (1)', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (16, '2019-05-10 08:35:18.48844+00', '2', 'user1', 2, '[{"changed": {"fields": ["email"]}}]', 6, 1);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_migrations (id, app, name, applied) VALUES (1, 'contenttypes', '0001_initial', '2019-05-09 11:19:56.73403+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (2, 'auth', '0001_initial', '2019-05-09 11:19:57.578344+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (3, 'account', '0001_initial', '2019-05-09 11:19:59.010124+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (4, 'account', '0002_auto_20190321_2256', '2019-05-09 11:19:59.341114+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (5, 'account', '0003_remove_profile_manager', '2019-05-09 11:19:59.410106+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (6, 'admin', '0001_initial', '2019-05-09 11:19:59.637148+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (7, 'admin', '0002_logentry_remove_auto_add', '2019-05-09 11:19:59.905389+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (8, 'admin', '0003_logentry_add_action_flag_choices', '2019-05-09 11:19:59.959249+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (9, 'contenttypes', '0002_remove_content_type_name', '2019-05-09 11:20:00.059533+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (10, 'auth', '0002_alter_permission_name_max_length', '2019-05-09 11:20:00.146279+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (11, 'auth', '0003_alter_user_email_max_length', '2019-05-09 11:20:00.243279+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (12, 'auth', '0004_alter_user_username_opts', '2019-05-09 11:20:00.30105+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (13, 'auth', '0005_alter_user_last_login_null', '2019-05-09 11:20:00.364229+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (14, 'auth', '0006_require_contenttypes_0002', '2019-05-09 11:20:00.403259+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (15, 'auth', '0007_alter_validators_add_error_messages', '2019-05-09 11:20:00.502149+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (16, 'auth', '0008_alter_user_username_max_length', '2019-05-09 11:20:00.619256+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (17, 'auth', '0009_alter_user_last_name_max_length', '2019-05-09 11:20:00.668917+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (18, 'auth', '0010_alter_group_name_max_length', '2019-05-09 11:20:00.72436+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (19, 'auth', '0011_update_proxy_permissions', '2019-05-09 11:20:00.788082+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (20, 'jet', '0001_initial', '2019-05-09 11:20:01.203197+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (21, 'jet', '0002_delete_userdashboardmodule', '2019-05-09 11:20:01.249992+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (22, 'notifications', '0001_initial', '2019-05-09 11:20:01.420172+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (23, 'sessions', '0001_initial', '2019-05-09 11:20:01.786969+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (24, 'packages', '0001_initial', '2019-05-09 11:32:37.417131+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (25, 'contacts', '0001_initial', '2019-05-09 11:32:39.267298+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (26, 'campaigns', '0001_initial', '2019-05-09 11:32:42.955315+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (27, 'orders', '0001_initial', '2019-05-09 11:32:45.239093+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (28, 'events', '0001_initial', '2019-05-09 11:32:45.70647+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (29, 'events', '0002_auto_20190509_1832', '2019-05-09 11:32:46.304678+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (30, 'steps', '0001_initial', '2019-05-09 11:32:46.99263+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (31, 'orders', '0002_auto_20190509_1832', '2019-05-09 11:32:48.688642+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (32, 'reports', '0001_initial', '2019-05-09 11:32:50.231114+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (33, 'campaigns', '0002_auto_20190510_0824', '2019-05-10 01:24:44.059106+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (34, 'steps', '0002_auto_20190510_0824', '2019-05-10 01:24:44.577793+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (35, 'inbox', '0001_initial', '2019-05-13 15:33:15.712327+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (36, 'inbox', '0002_mailbox_thread_id', '2019-05-15 07:11:37.006171+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (37, 'inbox', '0003_auto_20190516_2017', '2019-05-16 13:18:10.087258+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (38, 'inbox', '0004_auto_20190516_2039', '2019-05-16 13:40:23.649747+00');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('kpb3bv2icnaw8z1qhkf5zerdjjsmxdvy', 'ODEzZWY0NDQyOWRmYzM2OTlhYTE5YjE4NTFiYWM2YTBlYzdmYjIwNDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2ZGY2ZDhjODY3N2I0MmJmZmUwYWZkYjExY2RlYjNjYzdmOTlhNDY3In0=', '2019-05-23 11:33:33.087808+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('lakhhn9cr50zx925ep8hje57qkuu607q', 'ODEzZWY0NDQyOWRmYzM2OTlhYTE5YjE4NTFiYWM2YTBlYzdmYjIwNDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2ZGY2ZDhjODY3N2I0MmJmZmUwYWZkYjExY2RlYjNjYzdmOTlhNDY3In0=', '2019-05-24 08:34:50.933344+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('tn92damh36d3hx7x2s1x4m6xdstm8cat', 'ODEzZWY0NDQyOWRmYzM2OTlhYTE5YjE4NTFiYWM2YTBlYzdmYjIwNDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiI2ZGY2ZDhjODY3N2I0MmJmZmUwYWZkYjExY2RlYjNjYzdmOTlhNDY3In0=', '2019-05-25 09:07:37.385351+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('bph6nodtjxkx46y7r8a8vdhlpf9pnoqv', 'NjRjYmM4YTM4ZDc3OWEzYTIzZWFhNzIxYTI0Y2Q5YjI0OGQxZTBhYTp7ImFjY2Vzc190b2tlbiI6InlhMjkuR2xzR0I0bzI4bG5yVGhBNElqZ1BQemxaN1FCSndrSkhINTdMTHhYMkVHTXdTa2M4RlBfbzlwQS1SRjVXd1BsODlJcFNZZHRHdXB1Y01FVy1wcTJqVGFGVjBwOGk0NU55X1UtZWlWSEx5ZVloOGxiUFh1dHp5d0NieFdlLSIsInJlZnJlc2hfdG9rZW4iOiIxL3ppWkhQczcxdHEyUEdTNnlLVDkwNFhneHhnSVNKbDVBTjdwWFltdV9uRlpJdmJPQldJWHItcDhKWmtwXzRKZTMifQ==', '2019-05-25 09:59:56.320103+00');


--
-- Data for Name: orders_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (1, '2019-05-09 12:10:36.843897+00', '2019-05-09 12:12:32.410174+00', false, 'License 1', 'COMPLETED', 1, 1, 2);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (2, '2019-05-11 08:00:13.567683+00', '2019-05-11 08:00:13.568235+00', false, '', 'RUNNING', 8, 1, 2);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (3, '2019-05-11 08:00:16.423497+00', '2019-05-11 08:00:16.424296+00', false, '', 'RUNNING', 8, 1, 2);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (4, '2019-05-11 08:02:15.180624+00', '2019-05-11 08:02:15.181303+00', false, '', 'RUNNING', 8, 1, 2);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (5, '2019-05-11 08:02:44.807501+00', '2019-05-11 08:02:44.808392+00', false, '', 'RUNNING', 8, 1, 2);


--
-- Data for Name: events_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (1, '2019-05-09 12:04:18.000592+00', '2019-05-09 12:04:18.001117+00', false, 'Contact Quang Day', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Quang Day', 0, 2, 1, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (2, '2019-05-09 12:04:35.941733+00', '2019-05-09 12:04:35.942143+00', false, 'Contact Quang Day', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Quang Day', 0, 2, 2, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (3, '2019-05-09 12:06:12.100577+00', '2019-05-09 12:06:12.101842+00', false, 'Contact Quang Day', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Quang Day', 0, 2, 3, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (4, '2019-05-09 12:09:29.964753+00', '2019-05-09 12:09:29.965631+00', false, 'Contact Quang Day', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Quang Day', 0, 2, 4, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (5, '2019-05-09 12:17:43.234723+00', '2019-05-09 12:17:43.235616+00', false, 'Contact Quang Day', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Quang Day', 0, 2, 5, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (6, '2019-05-09 12:19:16.568801+00', '2019-05-09 12:19:16.570002+00', false, 'Contact Quang Day', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Quang Day', 0, 2, 6, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (7, '2019-05-10 02:40:30.433356+00', '2019-05-10 02:40:30.434377+00', false, 'Contact Quang Day', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Quang Day', 0, 2, 7, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (8, '2019-05-13 01:40:43.129289+00', '2019-05-13 01:40:43.145075+00', false, '<p>ngon</p>', '2019-05-13 01:39:00+00', '2019-05-13 01:39:00+00', 'Nhac nho', 0, 2, 3, NULL, 2);


--
-- Data for Name: events_event_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (1, 1, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (2, 2, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (3, 3, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (4, 4, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (5, 5, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (6, 6, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (7, 7, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (8, 8, 1);


--
-- Data for Name: inbox_mailbox; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: inbox_mailhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (1, '54867', '2019-05-16 14:02:19.958485+00', false, '2019-05-16 14:02:19.959127+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (2, '54867', '2019-05-16 14:05:47.274895+00', false, '2019-05-16 14:05:47.275292+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (3, '54905', '2019-05-16 14:05:47.145353+00', false, '2019-05-16 14:05:47.145942+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (4, '54905', '2019-05-16 14:05:49.976004+00', false, '2019-05-16 14:05:49.976669+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (5, '54867', '2019-05-16 14:05:49.977658+00', false, '2019-05-16 14:05:49.978095+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (6, '54867', '2019-05-16 14:05:52.390198+00', false, '2019-05-16 14:05:52.390894+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (7, '54905', '2019-05-16 14:05:52.942716+00', false, '2019-05-16 14:05:52.943367+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (8, '55055', '2019-05-16 22:51:56.669067+00', false, '2019-05-16 22:51:56.670044+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (9, '55218', '2019-05-17 02:29:29.718494+00', false, '2019-05-17 02:29:29.71884+00');
INSERT INTO public.inbox_mailhistory (id, history_id, created, is_removed, modified) VALUES (10, '55266', '2019-05-17 02:31:57.333688+00', false, '2019-05-17 02:31:57.334098+00');


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

INSERT INTO public.orders_license (id, created, modified, is_removed, start_date, duration, code, order_id, package_id) VALUES (1, '2019-05-09 12:10:57.413901+00', '2019-05-09 12:10:57.453473+00', false, '2019-05-09', 50, 'fe8f32e6-b0a1-46d0-8a84-d33fd38f002b', 1, 1);


--
-- Data for Name: orders_lifetimelicense; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders_order_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_order_packages (id, order_id, package_id) VALUES (1, 1, 1);


--
-- Data for Name: steps_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.steps_step (id, created, modified, is_removed, actions, duration, conditions, follow_up_id, mail_template_id) VALUES (1, '2019-05-09 12:13:49.582669+00', '2019-05-09 12:13:49.601549+00', false, '{"Send email": "Send email"}', 50, '{"1": 1}', 1, NULL);


--
-- Data for Name: steps_stepdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders_orderhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: packages_productcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: packages_producttype; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: packages_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (1, '2019-05-09 11:35:40.552871+00', '2019-05-09 11:35:40.564105+00', false, 'Plan 2', 'sdfsdf', 'ACTIVE', '2019-05-09', NULL, 1, NULL);


--
-- Data for Name: packages_feature; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (1, '2019-05-09 11:35:49.386114+00', '2019-05-09 11:35:49.395917+00', false, 'Gói Vũ Múp', 'sdfsdf', 10, 1, 1);


--
-- Data for Name: packages_package_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (1, 1, 1);


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
-- Name: account_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_profile_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.auth_user_id_seq', 2, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: campaigns_campaign_assigned_to_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_assigned_to_id_seq', 8, true);


--
-- Name: campaigns_campaign_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_id_seq', 8, true);


--
-- Name: campaigns_campaign_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_packages_id_seq', 8, true);


--
-- Name: campaigns_contactmarketing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketing_id_seq', 7, true);


--
-- Name: campaigns_contactmarketinghistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketinghistory_id_seq', 6, true);


--
-- Name: campaigns_followupplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_followupplan_id_seq', 1, true);


--
-- Name: campaigns_mailtemplate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_mailtemplate_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.contacts_contact_id_seq', 1, true);


--
-- Name: contacts_contactgroup_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_contacts_id_seq', 1, true);


--
-- Name: contacts_contactgroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_id_seq', 1, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 16, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 35, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 38, true);


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

SELECT pg_catalog.setval('public.inbox_mailbox_id_seq', 1, false);


--
-- Name: inbox_mailhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inbox_mailhistory_id_seq', 10, true);


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

SELECT pg_catalog.setval('public.orders_license_id_seq', 1, true);


--
-- Name: orders_lifetimelicense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_lifetimelicense_id_seq', 1, false);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 5, true);


--
-- Name: orders_order_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_packages_id_seq', 1, true);


--
-- Name: orders_orderhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_orderhistory_id_seq', 1, false);


--
-- Name: packages_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_feature_id_seq', 1, true);


--
-- Name: packages_package_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_features_id_seq', 1, true);


--
-- Name: packages_package_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.packages_productcategory_id_seq', 1, false);


--
-- Name: packages_producttype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_producttype_id_seq', 1, false);


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

SELECT pg_catalog.setval('public.steps_stepdetail_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

