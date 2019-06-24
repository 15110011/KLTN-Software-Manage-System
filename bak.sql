--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

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
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (2, 'pbkdf2_sha256$150000$kzR4sq7VHQ2c$8uM7s17DCAfJarpwvAL3HbQBx9A/3Xba6pe/mCqsGjs=', NULL, false, 'salerep', '', '', 'hepmy666@gmail.com', false, true, '2019-06-11 04:48:54+00');
INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (1, 'pbkdf2_sha256$150000$G8UG3RgCB4nO$6V1a1vntTlLXAIeskgErvo5ww3Ey6IdXz/L7v+DWlIs=', '2019-06-19 05:18:45.897012+00', true, 'admin', '', '', '', true, true, '2019-06-11 04:46:07.129787+00');


--
-- Data for Name: account_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) VALUES (1, '2019-06-11 04:47:56.806943+00', '2019-06-11 04:47:56.811175+00', false, true, '1674834476', 'Fetch', 1);
INSERT INTO public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) VALUES (2, '2019-06-11 04:48:54.371316+00', '2019-06-11 04:48:54.371712+00', false, false, '0123456789', 'abc', 2);


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
INSERT INTO public.django_content_type (id, app_label, model) VALUES (10, 'packages', 'feature');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (11, 'packages', 'package');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (12, 'packages', 'productcategory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (13, 'packages', 'producttype');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (14, 'packages', 'product');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (15, 'packages', 'packagehistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (16, 'contacts', 'contact');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (17, 'contacts', 'contactgroup');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (18, 'campaigns', 'campaign');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (19, 'campaigns', 'contactmarketing');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (20, 'campaigns', 'mailtemplate');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (21, 'campaigns', 'marketingplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (22, 'campaigns', 'followupplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (23, 'campaigns', 'contactmarketinghistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (24, 'campaigns', 'note');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (25, 'orders', 'order');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (26, 'orders', 'orderhistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (27, 'orders', 'lifetimelicense');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (28, 'orders', 'license');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (29, 'steps', 'step');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (30, 'steps', 'stepdetail');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (31, 'reports', 'report');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (32, 'events', 'event');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (33, 'notifications', 'notification');
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
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (37, 'Can add feature', 10, 'add_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (38, 'Can change feature', 10, 'change_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (39, 'Can delete feature', 10, 'delete_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (40, 'Can view feature', 10, 'view_feature');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (41, 'Can add package', 11, 'add_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (42, 'Can change package', 11, 'change_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (43, 'Can delete package', 11, 'delete_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (44, 'Can view package', 11, 'view_package');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (45, 'Can add product category', 12, 'add_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (46, 'Can change product category', 12, 'change_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (47, 'Can delete product category', 12, 'delete_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (48, 'Can view product category', 12, 'view_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (49, 'Can add product type', 13, 'add_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (50, 'Can change product type', 13, 'change_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (51, 'Can delete product type', 13, 'delete_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (52, 'Can view product type', 13, 'view_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (53, 'Can add product', 14, 'add_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (54, 'Can change product', 14, 'change_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (55, 'Can delete product', 14, 'delete_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (56, 'Can view product', 14, 'view_product');
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
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (69, 'Can add campaign', 18, 'add_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (70, 'Can change campaign', 18, 'change_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (71, 'Can delete campaign', 18, 'delete_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (72, 'Can view campaign', 18, 'view_campaign');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (73, 'Can add contact marketing', 19, 'add_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (74, 'Can change contact marketing', 19, 'change_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (75, 'Can delete contact marketing', 19, 'delete_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (76, 'Can view contact marketing', 19, 'view_contactmarketing');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (77, 'Can add mail template', 20, 'add_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (78, 'Can change mail template', 20, 'change_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (79, 'Can delete mail template', 20, 'delete_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (80, 'Can view mail template', 20, 'view_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (81, 'Can add marketing plan', 21, 'add_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (82, 'Can change marketing plan', 21, 'change_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (83, 'Can delete marketing plan', 21, 'delete_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (84, 'Can view marketing plan', 21, 'view_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (85, 'Can add follow up plan', 22, 'add_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (86, 'Can change follow up plan', 22, 'change_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (87, 'Can delete follow up plan', 22, 'delete_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (88, 'Can view follow up plan', 22, 'view_followupplan');
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
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (105, 'Can add lifetime license', 27, 'add_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (106, 'Can change lifetime license', 27, 'change_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (107, 'Can delete lifetime license', 27, 'delete_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (108, 'Can view lifetime license', 27, 'view_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (109, 'Can add license', 28, 'add_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (110, 'Can change license', 28, 'change_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (111, 'Can delete license', 28, 'delete_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (112, 'Can view license', 28, 'view_license');
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

INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, can_modify, manager_id) VALUES (1, '2019-06-11 10:33:58.836971+00', '2019-06-11 10:33:58.837334+00', false, 'Follow Up Plan 1', true, 2);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, can_modify, manager_id) VALUES (2, '2019-06-11 10:34:42.322789+00', '2019-06-11 10:34:42.323021+00', false, 'Follow Up Plan 2', true, 2);


--
-- Data for Name: campaigns_mailtemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_mailtemplate (id, created, modified, is_removed, name, subject, template, is_public, user_id) VALUES (1, '2019-06-11 10:28:56.113752+00', '2019-06-11 10:28:56.114124+00', false, 'Mail template 1', 'Marketing Mail', '<p>Dear, <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">$contact_name$</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Would you like to buy this package?</span></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Tks</span></p>', false, 2);
INSERT INTO public.campaigns_mailtemplate (id, created, modified, is_removed, name, subject, template, is_public, user_id) VALUES (2, '2019-06-11 10:32:42.03735+00', '2019-06-11 10:32:42.037693+00', false, 'Mail template 2', 'Follow Up Plan', '<p>Hello, <span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">$contact_name$</span></p>
<p></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Follow up you</span></p>
<p></p>
<p><span style="color: rgb(33,37,41);background-color: rgb(255,255,255);font-size: 16px;font-family: Helvatica, sans-serif;">Love</span></p>', false, 2);
INSERT INTO public.campaigns_mailtemplate (id, created, modified, is_removed, name, subject, template, is_public, user_id) VALUES (3, '2019-06-11 10:33:14.146513+00', '2019-06-11 10:33:14.146757+00', false, 'Mail template 3', 'Private Mail', '<p>Hello nek</p>', false, 2);


--
-- Data for Name: campaigns_marketingplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, actions, can_modify, mail_template_id, manager_id) VALUES (1, '2019-06-11 10:29:30.437144+00', '2019-06-11 10:29:30.437428+00', false, 'Marketing Plan 1', '{"must": [{"data": ["AK"], "operand": "1", "operator": "Equal to"}]}', '{"Send Email"}', true, 1, 2);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, actions, can_modify, mail_template_id, manager_id) VALUES (2, '2019-06-11 10:29:52.370722+00', '2019-06-11 10:29:52.370959+00', false, 'Marketing Plan 2', '{"must": [{"data": ["CA"], "operand": "1", "operator": "Equal to"}]}', '{"Send Email"}', true, 1, 2);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, actions, can_modify, mail_template_id, manager_id) VALUES (3, '2019-06-11 10:30:12.739286+00', '2019-06-11 10:30:12.739601+00', false, 'Marketing Plan 3', '{"must": [{"data": ["AK", "CA"], "operand": "1", "operator": "Equal to"}]}', '{"Send Email"}', true, 1, 2);


--
-- Data for Name: campaigns_campaign; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (1, '2019-06-11 10:37:27.073484+00', '2019-06-11 10:37:27.074138+00', false, 'Campaign 1', '2019-06-11', '2019-06-29', '<p>aalooo</p>', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (2, '2019-06-11 10:37:58.476874+00', '2019-06-11 10:37:58.47712+00', false, 'Campaign 2', '2019-06-11', '2019-06-29', '<p>asdsd</p>', 2, 2, 2);


--
-- Data for Name: campaigns_campaign_assigned_to; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (1, 1, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (2, 2, 2);


--
-- Data for Name: packages_package; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (2, '2019-06-11 09:08:36.197319+00', '2019-06-11 09:08:36.197583+00', false, 'Package 1', '{"1": 123244, "6": 1444, "12": 22, "999999": 33}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (3, '2019-06-11 09:10:04.162456+00', '2019-06-11 09:10:04.162753+00', false, 'Package 1', '{"1": 22, "6": 33, "12": 44, "999999": 44}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (4, '2019-06-11 09:16:16.601311+00', '2019-06-11 09:16:16.601531+00', false, 'ALu', '{"1": 222, "6": "", "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (5, '2019-06-11 09:17:08.009179+00', '2019-06-11 09:17:08.009979+00', false, '222', '{"1": 23, "6": "", "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (6, '2019-06-11 09:20:06.999751+00', '2019-06-11 09:20:06.999952+00', false, 'asdasd', '{"1": 244, "6": 4444, "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (7, '2019-06-11 09:21:20.885234+00', '2019-06-11 09:21:20.885894+00', false, 'ALLLLPPPP', '{"1": 312, "6": 4444, "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (8, '2019-06-11 09:23:32.545124+00', '2019-06-11 09:23:32.545449+00', false, 'Big Package', '{"1": 112, "6": 12444, "12": 5125, "999999": 4444}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (9, '2019-06-11 09:24:56.913112+00', '2019-06-11 09:24:56.913701+00', false, 'BIg Package', '{"1": 1123, "6": 4444, "12": 12422, "999999": 124124}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (10, '2019-06-11 09:28:44.11114+00', '2019-06-11 09:28:44.111445+00', false, 'ALO', '{"1": 12, "6": 233, "12": 4444, "999999": 55677}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (11, '2019-06-11 09:30:11.609973+00', '2019-06-11 09:30:11.610485+00', false, 'LOOO', '{"1": 2, "6": 12, "12": 24, "999999": 4444}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (12, '2019-06-11 09:31:11.323845+00', '2019-06-11 09:31:11.324568+00', false, 'ALO', '{"1": 23123, "6": 4444, "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (13, '2019-06-11 09:40:09.16199+00', '2019-06-11 09:40:09.162293+00', false, 'Big Package', '{"1": 1112, "6": 3333, "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (1, '2019-06-11 08:32:53.014452+00', '2019-06-11 10:15:45.266263+00', false, 'Package 1', '{"1": 123244, "6": "", "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (14, '2019-06-11 10:17:22.735841+00', '2019-06-11 10:17:27.882974+00', false, 'package A', '{"1": "", "6": "", "12": "", "999999": ""}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (15, '2019-06-11 10:18:31.643857+00', '2019-06-11 10:18:33.686455+00', false, 'Package 1', '{"1": 22, "6": 222, "12": 333, "999999": 2222}', 0);


--
-- Data for Name: campaigns_campaign_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (1, 1, 15);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (2, 2, 15);


--
-- Data for Name: contacts_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (1, '2019-06-11 07:00:04.991044+00', '2019-06-11 07:00:04.99139+00', false, 'Duc Anh', 'Tran', 'hepmy666@gmail.com', '1234567897', 'MALE', '123 Block B', 'America', 'CA', 'San Diego', '70000', 'Fetch', 2);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (2, '2019-06-11 07:02:45.944133+00', '2019-06-11 07:02:45.944488+00', false, 'Ariana', 'Gwwww', 'badboy2k@gmail.com', '0134523691', 'MALE', '011 AB STREET', 'USA', 'AK', 'Anchorage', '23133', 'FA', 2);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (3, '2019-06-11 07:02:46.071341+00', '2019-06-11 07:02:46.071579+00', false, 'Tony', 'Stark', 'hepmy777gmail.com', '0134523690', 'FEMALE', '12 AB STREET', 'USA', 'AK', 'Anchorage', '13334', 'FA', 2);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (4, '2019-06-11 07:02:46.157721+00', '2019-06-11 07:02:46.158258+00', false, 'Steve', 'Rogers', 'steve123@gmail.com', '0134523691', 'MALE', '13 AB STREET', 'USA', 'AK', 'Anchorage', '42333', 'FA', 2);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (5, '2019-06-11 07:02:46.243904+00', '2019-06-11 07:02:46.244187+00', false, 'Nick', 'Fury', 'nickfury@gmail.com', '0134523692', 'FEMALE', '14 AB STREET', 'USA', 'AK', 'Anchorage', '66777', 'FA', 2);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (6, '2019-06-11 07:02:46.324895+00', '2019-06-11 07:02:46.325172+00', false, 'War', 'Machine', 'warcraft@gmail.com', '0134523693', 'MALE', '15 AB STREET', 'USA', 'AK', 'Anchorage', '65555', 'FA', 2);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (7, '2019-06-11 07:02:46.65806+00', '2019-06-11 07:02:46.658339+00', false, 'Scott', 'Lang', 'nguoikien@gmail.com', '0134523694', 'MALE', '16 AB STREET', 'USA', 'AK', 'Anchorage', '33333', 'FA', 2);
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, state, city, zipcode, org, user_id) VALUES (8, '2019-06-11 07:02:46.771245+00', '2019-06-11 07:02:46.771543+00', false, 'Vu', 'Dang Ho', 'vudangho96@gmail.com', '0134523695', 'MALE', '17 AB STREET', 'USA', 'AK', 'Anchorage', '78888', 'FA', 2);


--
-- Data for Name: campaigns_contactmarketing; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (2, '2019-06-11 10:37:27.244436+00', '2019-06-11 10:37:27.247308+00', false, 'RUNNING', 2, '7ed29257-567d-48a7-b5b5-2c6def89bc36', 1, 3, 1, 2, '[]');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (1, '2019-06-11 10:37:27.222757+00', '2019-06-11 17:47:20.218725+00', false, 'RUNNING', 2, '553b9777-f2cc-41c0-9c84-764cfccf93a5', 1, 2, 1, 2, '[{"type": "Send Email", "thread_id": "16b47a6c2449e5a8"}]');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (3, '2019-06-11 10:37:27.254909+00', '2019-06-11 17:47:21.192278+00', false, 'RUNNING', 2, '5d546250-7048-4f99-a918-c235a2e91266', 1, 4, 1, 2, '[{"type": "Send Email", "thread_id": "16b47a6c7ae35301"}]');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (5, '2019-06-11 10:37:27.277602+00', '2019-06-11 17:47:29.759669+00', false, 'RUNNING', 2, '9b06799e-3f13-4b0b-b6df-9a18fd6e51e6', 1, 6, 1, 2, '[{"type": "Send Email", "thread_id": "16b47a6e8347a85d"}]');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (4, '2019-06-11 10:37:27.266374+00', '2019-06-11 17:47:31.108125+00', false, 'RUNNING', 2, 'c2915f0a-86f0-4fa4-8cae-f013c96f9901', 1, 5, 1, 2, '[{"type": "Send Email", "thread_id": "16b47a6ee4fa4f3e"}]');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (8, '2019-06-11 10:37:58.587935+00', '2019-06-11 17:47:32.250725+00', false, 'COMPLETED', 2, 'db2219c3-9c80-454b-aeaf-e7721b4ff0da', 2, 1, 2, 2, '[{"type": "Send Email", "thread_id": "16b47a6f2101b416"}]');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (6, '2019-06-11 10:37:27.288053+00', '2019-06-12 07:11:43.573125+00', false, 'RUNNING', 2, '1f7acb09-9aad-40e8-95f9-1e1cb4391cf8', 1, 7, 1, 2, '[{"type": "Send Email", "thread_id": "16b47a6bd7063e9a"}, {"note": "", "type": "Call Client", "date_created": "2019-06-12 14:11"}]');
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, status, priority, job_id, campaign_id, contact_id, marketing_plan_id, sale_rep_id, thread_ids) VALUES (7, '2019-06-11 10:37:27.299871+00', '2019-06-20 08:12:53.517577+00', false, 'RUNNING', 2, '75631f9b-ec29-42a7-8e4c-bb943cf3725c', 1, 8, 1, 2, '[{"note": "", "type": "Send Email Manually", "thread_id": "16b6e2e0cc26bedd"}, {"note": "", "type": "Call Client", "date_created": "2019-06-19 12:26"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6eab7e0422449"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6ebc67bc5d9c8"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6ebdb38b1c102"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6efdfc93d15e9"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6eff3cb789ab3"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f1fac6f9b0dc"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f216561c1eed"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f269784dd7db"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f312fb8b3a3c"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f35ff6bca1eb"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f375707ad6e3"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f37f1796be73"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f3c46f4fff9c"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b6f4240db6937f"}]');


--
-- Data for Name: campaigns_contactmarketinghistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (1, '2019-06-12 07:11:35.257219+00', '2019-06-12 07:11:35.25751+00', false, 'Call Client', 6);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (2, '2019-06-12 07:11:43.565894+00', '2019-06-12 07:11:43.566335+00', false, 'Call Client', 6);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (3, '2019-06-19 05:26:38.237454+00', '2019-06-19 05:26:38.237693+00', false, 'Call Client', 7);


--
-- Data for Name: campaigns_note; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: contacts_contactgroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) VALUES (1, '2019-06-11 04:48:54.373678+00', '2019-06-11 04:48:54.374011+00', false, 'All Contacts', '', NULL, 2);
INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, _type, editor_id, user_id) VALUES (11, '2019-06-11 07:13:37.453884+00', '2019-06-11 07:13:37.454147+00', false, 'Private Group', 'PRIVATE', NULL, 2);


--
-- Data for Name: contacts_contactgroup_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (1, 1, 1);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (2, 1, 2);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (3, 1, 3);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (4, 1, 4);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (5, 1, 5);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (6, 1, 6);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (7, 1, 7);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (8, 1, 8);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (1, '2019-06-11 04:47:56.812595+00', '1', 'Profile object (1)', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (2, '2019-06-11 05:32:58.107939+00', '2', 'salerep', 2, '[{"changed": {"fields": ["password"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (3, '2019-06-11 05:37:25.989567+00', '2', 'salerep', 2, '[]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (4, '2019-06-11 05:38:05.084696+00', '2', 'salerep', 2, '[{"changed": {"fields": ["password"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (5, '2019-06-11 05:38:16.991726+00', '2', 'salerep', 2, '[{"changed": {"fields": ["password"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (6, '2019-06-11 05:41:11.305703+00', '2', 'salerep', 2, '[{"changed": {"fields": ["is_active"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (7, '2019-06-19 05:19:43.461271+00', '7', 'ContactMarketing object (7)', 2, '[{"changed": {"fields": ["thread_ids"]}}]', 19, 1);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_migrations (id, app, name, applied) VALUES (1, 'contenttypes', '0001_initial', '2019-06-11 04:45:21.407885+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (2, 'auth', '0001_initial', '2019-06-11 04:45:21.451918+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (3, 'account', '0001_initial', '2019-06-11 04:45:21.503495+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (4, 'admin', '0001_initial', '2019-06-11 04:45:21.52204+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (5, 'admin', '0002_logentry_remove_auto_add', '2019-06-11 04:45:21.541687+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (6, 'admin', '0003_logentry_add_action_flag_choices', '2019-06-11 04:45:21.553615+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (7, 'contenttypes', '0002_remove_content_type_name', '2019-06-11 04:45:21.577313+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (8, 'auth', '0002_alter_permission_name_max_length', '2019-06-11 04:45:21.585876+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (9, 'auth', '0003_alter_user_email_max_length', '2019-06-11 04:45:21.598446+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (10, 'auth', '0004_alter_user_username_opts', '2019-06-11 04:45:21.609451+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (11, 'auth', '0005_alter_user_last_login_null', '2019-06-11 04:45:21.623772+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (12, 'auth', '0006_require_contenttypes_0002', '2019-06-11 04:45:21.627053+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (13, 'auth', '0007_alter_validators_add_error_messages', '2019-06-11 04:45:21.638463+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (14, 'auth', '0008_alter_user_username_max_length', '2019-06-11 04:45:21.653441+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (15, 'auth', '0009_alter_user_last_name_max_length', '2019-06-11 04:45:21.66591+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (16, 'auth', '0010_alter_group_name_max_length', '2019-06-11 04:45:21.678501+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (17, 'auth', '0011_update_proxy_permissions', '2019-06-11 04:45:21.696575+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (18, 'packages', '0001_initial', '2019-06-11 04:45:21.796214+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (19, 'contacts', '0001_initial', '2019-06-11 04:45:21.896993+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (20, 'campaigns', '0001_initial', '2019-06-11 04:45:22.335523+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (21, 'campaigns', '0002_contactmarketing_thread_ids', '2019-06-11 04:45:22.425563+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (22, 'campaigns', '0003_remove_contactmarketing_thread_ids', '2019-06-11 04:45:22.450644+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (23, 'campaigns', '0004_contactmarketing_thread_ids', '2019-06-11 04:45:22.479529+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (24, 'campaigns', '0005_auto_20190611_1143', '2019-06-11 04:45:22.503853+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (25, 'contacts', '0002_auto_20190611_1143', '2019-06-11 04:45:22.531162+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (26, 'orders', '0001_initial', '2019-06-11 04:45:22.667251+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (27, 'events', '0001_initial', '2019-06-11 04:45:22.744367+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (28, 'events', '0002_auto_20190529_1209', '2019-06-11 04:45:22.836202+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (29, 'jet', '0001_initial', '2019-06-11 04:45:22.872412+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (30, 'jet', '0002_delete_userdashboardmodule', '2019-06-11 04:45:22.883253+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (31, 'notifications', '0001_initial', '2019-06-11 04:45:22.93329+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (32, 'reports', '0001_initial', '2019-06-11 04:45:23.024072+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (33, 'sessions', '0001_initial', '2019-06-11 04:45:23.069727+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (34, 'steps', '0001_initial', '2019-06-11 04:45:23.179748+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (35, 'steps', '0002_auto_20190611_1143', '2019-06-11 04:45:23.281007+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (36, 'inbox', '0001_initial', '2019-06-11 04:46:53.136087+00');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('89gqsrobtmuj33pjdtvtwq6zh4c1lqfp', 'Y2Q0NWY2ZmFkMWUxZWI2NDdiMTczNDYzNmJjY2IxOTM1NTJkMDhjMzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzNmFjZGI3NDdmYzUyMjEyZjE4OWU2YjgwM2Q5OTA1MzY5MDVlZmI4In0=', '2019-06-25 09:14:03.161416+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('1dsw19zkj8t0c98921j9zz2ldtathokw', 'Y2Q0NWY2ZmFkMWUxZWI2NDdiMTczNDYzNmJjY2IxOTM1NTJkMDhjMzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIzNmFjZGI3NDdmYzUyMjEyZjE4OWU2YjgwM2Q5OTA1MzY5MDVlZmI4In0=', '2019-07-03 05:18:45.899447+00');


--
-- Data for Name: orders_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, campaign_id, contacts_id, sale_rep_id) VALUES (1, '2019-06-11 10:39:27.20264+00', '2019-06-20 08:11:13.555375+00', false, '', 'RUNNING', 2, 1, 2);


--
-- Data for Name: events_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (1, '2019-06-11 10:37:27.232778+00', '2019-06-11 10:37:27.23314+00', false, 'Contact Ariana Gwwww', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting Ariana Gwwww', 0, 2, 1, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (2, '2019-06-11 10:37:27.248741+00', '2019-06-11 10:37:27.24899+00', false, 'Contact Tony Stark', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting Tony Stark', 0, 2, 2, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (3, '2019-06-11 10:37:27.25989+00', '2019-06-11 10:37:27.260189+00', false, 'Contact Steve Rogers', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting Steve Rogers', 0, 2, 3, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (4, '2019-06-11 10:37:27.270451+00', '2019-06-11 10:37:27.270671+00', false, 'Contact Nick Fury', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting Nick Fury', 0, 2, 4, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (5, '2019-06-11 10:37:27.281948+00', '2019-06-11 10:37:27.282306+00', false, 'Contact War Machine', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting War Machine', 0, 2, 5, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (6, '2019-06-11 10:37:27.293215+00', '2019-06-11 10:37:27.293515+00', false, 'Contact Scott Lang', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting Scott Lang', 0, 2, 6, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (7, '2019-06-11 10:37:27.303941+00', '2019-06-11 10:37:27.30415+00', false, 'Contact Vu Dang Ho', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting Vu Dang Ho', 0, 2, 7, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (8, '2019-06-11 10:37:58.596981+00', '2019-06-11 10:37:58.598384+00', false, 'Contact Duc Anh Tran', '2019-06-10 17:00:00+00', '2019-06-10 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 8, NULL, 2);


--
-- Data for Name: events_event_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (1, 1, 2);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (2, 2, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (3, 3, 4);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (4, 4, 5);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (5, 5, 6);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (6, 6, 7);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (7, 7, 8);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (8, 8, 1);


--
-- Data for Name: inbox_mailbox; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (1, '2019-06-11 10:39:28.234293+00', '2019-06-11 10:39:28.240269+00', false, '2', '16b461f0bac8561c', '16b461f0bac8561c', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (2, '2019-06-11 17:47:18.384904+00', '2019-06-11 17:47:18.455069+00', false, '2', '16b47a6bd7063e9a', '16b47a6bd7063e9a', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (3, '2019-06-11 17:47:20.048492+00', '2019-06-11 17:47:20.066616+00', false, '2', '16b47a6c2449e5a8', '16b47a6c2449e5a8', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (4, '2019-06-11 17:47:21.09704+00', '2019-06-11 17:47:21.097936+00', false, '2', '16b47a6c7ae35301', '16b47a6c7ae35301', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (5, '2019-06-11 17:47:22.094142+00', '2019-06-11 17:47:22.113113+00', false, '2', '16b47a6ca092dbc2', '16b47a6ca092dbc2', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (6, '2019-06-11 17:47:29.620824+00', '2019-06-11 17:47:29.649804+00', false, '2', '16b47a6e8347a85d', '16b47a6e8347a85d', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (7, '2019-06-11 17:47:30.957695+00', '2019-06-11 17:47:30.99013+00', false, '2', '16b47a6ee4fa4f3e', '16b47a6ee4fa4f3e', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (8, '2019-06-11 17:47:32.10636+00', '2019-06-11 17:47:32.12888+00', false, '2', '16b47a6f2101b416', '16b47a6f2101b416', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (9, '2019-06-12 07:11:32.304922+00', '2019-06-12 07:11:32.310831+00', false, '2', '16b4a8709233470b', '16b4a8709233470b', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (10, '2019-06-18 13:44:50.912509+00', '2019-06-18 13:44:50.915831+00', false, '2', '16b6ad546d51cc68', '16b6ad546d51cc68', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (11, '2019-06-18 13:45:48.859325+00', '2019-06-18 13:45:48.868315+00', false, '2', '16b6ad62989861b1', '16b6ad62989861b1', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (12, '2019-06-18 13:46:53.58211+00', '2019-06-18 13:46:53.591003+00', false, '2', '16b6ad7259305882', '16b6ad7259305882', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (13, '2019-06-18 13:47:56.137404+00', '2019-06-18 13:47:56.140444+00', false, '2', '16b6ad81bfbc9bf2', '16b6ad81bfbc9bf2', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (14, '2019-06-18 13:50:02.634595+00', '2019-06-18 13:50:02.637995+00', false, '2', '16b6ada09eb06505', '16b6ada09eb06505', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (15, '2019-06-18 13:51:04.594228+00', '2019-06-18 13:51:04.599091+00', false, '2', '16b6adafb39859e0', '16b6adafb39859e0', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (16, '2019-06-18 13:52:36.027861+00', '2019-06-18 13:52:36.03651+00', false, '2', '16b6adc5f2bd0670', '16b6adc5f2bd0670', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (17, '2019-06-18 13:53:19.929272+00', '2019-06-18 13:53:19.93335+00', false, '2', '16b6add0b108f114', '16b6add0b108f114', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (18, '2019-06-18 13:54:45.628293+00', '2019-06-18 13:54:45.634298+00', false, '2', '16b6ade5920f4011', '16b6ade5920f4011', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (19, '2019-06-18 14:13:05.67066+00', '2019-06-18 14:13:05.67977+00', false, '2', '16b6aef2375b2741', '16b6add0b108f114', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (20, '2019-06-18 14:17:33.952797+00', '2019-06-18 14:17:33.961458+00', false, '2', '16b6af3376cc3811', '16b6adc5f2bd0670', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (21, '2019-06-18 14:24:27.244269+00', '2019-06-18 14:24:27.24875+00', false, '2', '16b6af988d31ad75', '16b6adc5f2bd0670', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (22, '2019-06-18 14:25:13.014433+00', '2019-06-18 14:25:13.017598+00', false, '2', '16b6afa3b2e94aad', '16b6adc5f2bd0670', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (23, '2019-06-18 14:56:11.293721+00', '2019-06-18 14:56:11.3031+00', false, '2', '16b6b169645edd06', '16b6adafb39859e0', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (56, '2019-06-19 05:06:09.967255+00', '2019-06-19 05:06:09.976119+00', false, '2', '16b6e20c561e8c81', '16b6ada09eb06505', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (57, '2019-06-19 05:20:40.847471+00', '2019-06-19 05:20:40.85082+00', false, '2', '16b6e2e0cc26bedd', '16b6e2e0cc26bedd', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (58, '2019-06-19 05:25:48.782812+00', '2019-06-19 05:25:48.792192+00', false, '2', '16b6e32beded8876', '16b6e2e0cc26bedd', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (59, '2019-06-19 07:37:41.73415+00', '2019-06-19 07:37:41.742862+00', false, '2', '16b6eab7e0422449', '16b6eab7e0422449', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (60, '2019-06-19 07:56:10.095121+00', '2019-06-19 07:56:10.105431+00', false, '2', '16b6ebc67bc5d9c8', '16b6ebc67bc5d9c8', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (61, '2019-06-19 07:57:34.355302+00', '2019-06-19 07:57:34.365751+00', false, '2', '16b6ebdb38b1c102', '16b6ebdb38b1c102', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (62, '2019-06-19 08:04:55.75675+00', '2019-06-19 08:04:55.767147+00', false, '2', '16b6ec46f9760842', '16b6ebdb38b1c102', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (63, '2019-06-19 09:07:47.955146+00', '2019-06-19 09:07:47.965516+00', false, '2', '16b6efdfc93d15e9', '16b6efdfc93d15e9', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (64, '2019-06-19 09:09:09.787545+00', '2019-06-19 09:09:09.791676+00', false, '2', '16b6eff3cb789ab3', '16b6eff3cb789ab3', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (65, '2019-06-19 09:44:36.011613+00', '2019-06-19 09:44:36.020058+00', false, '2', '16b6f1fac6f9b0dc', '16b6f1fac6f9b0dc', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (66, '2019-06-19 09:46:29.545991+00', '2019-06-19 09:46:29.550533+00', false, '2', '16b6f216561c1eed', '16b6f216561c1eed', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (67, '2019-06-19 09:52:08.654945+00', '2019-06-19 09:52:08.664781+00', false, '2', '16b6f269784dd7db', '16b6f269784dd7db', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (68, '2019-06-19 10:03:43.548178+00', '2019-06-19 10:03:43.557547+00', false, '2', '16b6f312fb8b3a3c', '16b6f312fb8b3a3c', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (69, '2019-06-19 10:08:58.723337+00', '2019-06-19 10:08:58.72638+00', false, '2', '16b6f35ff6bca1eb', '16b6f35ff6bca1eb', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (70, '2019-06-19 10:10:26.322253+00', '2019-06-19 10:10:26.325689+00', false, '2', '16b6f375707ad6e3', '16b6f375707ad6e3', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (71, '2019-06-19 10:11:05.66147+00', '2019-06-19 10:11:05.669966+00', false, '2', '16b6f37f1796be73', '16b6f37f1796be73', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (72, '2019-06-19 10:15:50.313333+00', '2019-06-19 10:15:50.3217+00', false, '2', '16b6f3c46f4fff9c', '16b6f3c46f4fff9c', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (73, '2019-06-19 10:22:21.870782+00', '2019-06-19 10:22:21.874092+00', false, '2', '16b6f4240db6937f', '16b6f4240db6937f', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (74, '2019-06-19 10:25:28.002717+00', '2019-06-19 10:25:28.006814+00', false, '2', '16b6f4519e6ac483', '16b6f4240db6937f', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (75, '2019-06-20 07:59:06.794035+00', '2019-06-20 07:59:06.80359+00', false, '2', '16b73e576f655e75', '16b73e576f655e75', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (76, '2019-06-20 08:01:33.475214+00', '2019-06-20 08:01:33.484102+00', false, '2', '16b73e7b33bbef21', '16b73e7b33bbef21', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (77, '2019-06-20 08:03:32.320136+00', '2019-06-20 08:03:32.32979+00', false, '2', '16b73e985d066944', '16b73e985d066944', 'SENT');
INSERT INTO public.inbox_mailbox (id, created, modified, is_removed, user_id, message_id, thread_id, email_type) VALUES (78, '2019-06-20 08:11:12.504785+00', '2019-06-20 08:11:12.513346+00', false, '2', '16b73f089479ef61', '16b73f089479ef61', 'SENT');


--
-- Data for Name: inbox_mailhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (1, '2019-06-18 13:41:50.951618+00', '2019-06-18 13:41:50.951847+00', false, '89510');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (1, '2019-06-11 04:49:47.397838+00', '2019-06-11 04:49:47.398373+00', false, '83757');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (2, '2019-06-11 04:49:47.399453+00', '2019-06-11 04:49:47.400089+00', false, '83518');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (3, '2019-06-18 14:22:11.979393+00', '2019-06-18 14:22:11.979751+00', false, '87154');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (4, '2019-06-18 14:22:12.343397+00', '2019-06-18 14:22:12.343662+00', false, '87324');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (5, '2019-06-18 14:22:12.520169+00', '2019-06-18 14:22:12.520369+00', false, '87392');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (6, '2019-06-18 14:22:12.759824+00', '2019-06-18 14:22:12.760068+00', false, '87409');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (7, '2019-06-18 14:22:12.850456+00', '2019-06-18 14:22:12.850678+00', false, '87443');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (8, '2019-06-18 14:22:12.988224+00', '2019-06-18 14:22:12.988414+00', false, '87780');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (9, '2019-06-18 14:22:15.227482+00', '2019-06-18 14:22:15.227681+00', false, '87899');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (10, '2019-06-18 14:22:15.579095+00', '2019-06-18 14:22:15.579454+00', false, '87831');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (11, '2019-06-18 14:22:15.585679+00', '2019-06-18 14:22:15.585936+00', false, '87865');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (12, '2019-06-18 14:22:15.707272+00', '2019-06-18 14:22:15.707505+00', false, '87967');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (13, '2019-06-18 14:22:15.719997+00', '2019-06-18 14:22:15.720288+00', false, '87950');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (14, '2019-06-18 14:22:15.793504+00', '2019-06-18 14:22:15.793727+00', false, '87848');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (15, '2019-06-18 14:22:16.126811+00', '2019-06-18 14:22:16.127145+00', false, '88813');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (16, '2019-06-18 14:22:16.185163+00', '2019-06-18 14:22:16.18535+00', false, '88001');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (17, '2019-06-18 14:22:16.223219+00', '2019-06-18 14:22:16.223402+00', false, '88795');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (18, '2019-06-18 14:22:16.339304+00', '2019-06-18 14:22:16.339525+00', false, '87984');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (19, '2019-06-18 14:22:17.753694+00', '2019-06-18 14:22:17.753904+00', false, '88830');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (20, '2019-06-18 14:22:17.949276+00', '2019-06-18 14:22:17.949501+00', false, '88103');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (21, '2019-06-18 14:22:18.110243+00', '2019-06-18 14:22:18.11043+00', false, '88086');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (22, '2019-06-18 14:22:18.162162+00', '2019-06-18 14:22:18.162414+00', false, '88052');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (23, '2019-06-18 14:22:18.193985+00', '2019-06-18 14:22:18.194225+00', false, '88018');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (24, '2019-06-18 14:22:18.499552+00', '2019-06-18 14:22:18.500084+00', false, '88864');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (25, '2019-06-18 14:22:18.516007+00', '2019-06-18 14:22:18.517223+00', false, '88847');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (26, '2019-06-18 14:22:18.532795+00', '2019-06-18 14:22:18.532983+00', false, '88069');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (27, '2019-06-18 14:22:19.0123+00', '2019-06-18 14:22:19.012495+00', false, '88881');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (28, '2019-06-18 14:22:19.209767+00', '2019-06-18 14:22:19.209976+00', false, '88898');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (29, '2019-06-18 14:22:19.631637+00', '2019-06-18 14:22:19.631957+00', false, '88120');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (30, '2019-06-18 14:22:20.251411+00', '2019-06-18 14:22:20.251686+00', false, '88171');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (31, '2019-06-18 14:22:20.278534+00', '2019-06-18 14:22:20.278743+00', false, '88949');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (32, '2019-06-18 14:22:20.519973+00', '2019-06-18 14:22:20.520182+00', false, '88188');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (33, '2019-06-18 14:22:20.947208+00', '2019-06-18 14:22:20.947438+00', false, '88983');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (34, '2019-06-18 14:22:20.954608+00', '2019-06-18 14:22:20.954943+00', false, '88915');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (35, '2019-06-18 14:22:21.305549+00', '2019-06-18 14:22:21.305801+00', false, '88137');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (36, '2019-06-18 14:22:21.357469+00', '2019-06-18 14:22:21.35773+00', false, '88154');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (37, '2019-06-18 14:22:21.395062+00', '2019-06-18 14:22:21.395314+00', false, '88932');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (38, '2019-06-18 14:22:21.432936+00', '2019-06-18 14:22:21.433188+00', false, '88966');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (39, '2019-06-18 14:22:21.987275+00', '2019-06-18 14:22:21.987462+00', false, '88222');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (40, '2019-06-18 14:22:22.428148+00', '2019-06-18 14:22:22.428352+00', false, '88205');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (41, '2019-06-18 14:22:22.640283+00', '2019-06-18 14:22:22.640669+00', false, '89034');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (42, '2019-06-18 14:22:22.653688+00', '2019-06-18 14:22:22.654128+00', false, '88239');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (43, '2019-06-18 14:22:23.099396+00', '2019-06-18 14:22:23.100188+00', false, '88273');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (44, '2019-06-18 14:22:23.131326+00', '2019-06-18 14:22:23.131857+00', false, '89000');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (45, '2019-06-18 14:22:23.251159+00', '2019-06-18 14:22:23.251487+00', false, '89068');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (46, '2019-06-18 14:22:23.778184+00', '2019-06-18 14:22:23.778382+00', false, '89017');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (47, '2019-06-18 14:22:24.277783+00', '2019-06-18 14:22:24.277972+00', false, '88256');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (48, '2019-06-18 14:22:24.319381+00', '2019-06-18 14:22:24.31958+00', false, '88307');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (49, '2019-06-18 14:22:24.392719+00', '2019-06-18 14:22:24.392916+00', false, '89051');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (50, '2019-06-18 14:22:24.731378+00', '2019-06-18 14:22:24.732083+00', false, '89119');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (51, '2019-06-18 14:22:24.752934+00', '2019-06-18 14:22:24.753206+00', false, '88290');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (52, '2019-06-18 14:22:24.909045+00', '2019-06-18 14:22:24.909254+00', false, '88341');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (53, '2019-06-18 14:22:24.95836+00', '2019-06-18 14:22:24.958565+00', false, '88324');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (54, '2019-06-18 14:22:25.174549+00', '2019-06-18 14:22:25.174946+00', false, '89085');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (55, '2019-06-18 14:22:25.417078+00', '2019-06-18 14:22:25.41734+00', false, '89102');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (56, '2019-06-18 14:22:25.461545+00', '2019-06-18 14:22:25.461733+00', false, '89136');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (57, '2019-06-18 14:22:25.986084+00', '2019-06-18 14:22:25.986378+00', false, '89170');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (58, '2019-06-18 14:22:26.327694+00', '2019-06-18 14:22:26.328228+00', false, '88375');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (59, '2019-06-18 14:22:26.858511+00', '2019-06-18 14:22:26.858859+00', false, '88358');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (60, '2019-06-18 14:22:26.903496+00', '2019-06-18 14:22:26.903822+00', false, '88409');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (61, '2019-06-18 14:22:26.924451+00', '2019-06-18 14:22:26.924785+00', false, '89153');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (62, '2019-06-18 14:22:27.212608+00', '2019-06-18 14:22:27.212907+00', false, '89221');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (63, '2019-06-18 14:22:27.223028+00', '2019-06-18 14:22:27.223404+00', false, '88426');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (64, '2019-06-18 14:22:27.505509+00', '2019-06-18 14:22:27.505873+00', false, '89187');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (65, '2019-06-18 14:22:27.640004+00', '2019-06-18 14:22:27.640195+00', false, '88392');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (66, '2019-06-18 14:22:27.687405+00', '2019-06-18 14:22:27.687599+00', false, '89238');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (67, '2019-06-18 14:22:27.769425+00', '2019-06-18 14:22:27.769613+00', false, '89204');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (68, '2019-06-18 14:22:28.539083+00', '2019-06-18 14:22:28.539635+00', false, '89272');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (69, '2019-06-18 14:22:28.991698+00', '2019-06-18 14:22:28.992218+00', false, '88477');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (70, '2019-06-18 14:22:29.248129+00', '2019-06-18 14:22:29.248666+00', false, '88443');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (71, '2019-06-18 14:22:29.45377+00', '2019-06-18 14:22:29.454303+00', false, '88494');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (72, '2019-06-18 14:22:29.492395+00', '2019-06-18 14:22:29.492931+00', false, '88511');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (73, '2019-06-18 14:22:29.707718+00', '2019-06-18 14:22:29.708262+00', false, '88460');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (74, '2019-06-18 14:22:29.793375+00', '2019-06-18 14:22:29.79357+00', false, '89323');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (75, '2019-06-18 14:22:29.827372+00', '2019-06-18 14:22:29.827571+00', false, '89255');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (76, '2019-06-18 14:22:30.251409+00', '2019-06-18 14:22:30.251713+00', false, '88528');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (77, '2019-06-18 14:22:30.367386+00', '2019-06-18 14:22:30.367643+00', false, '89289');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (78, '2019-06-18 14:22:30.570192+00', '2019-06-18 14:22:30.570738+00', false, '89306');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (79, '2019-06-18 14:22:31.548072+00', '2019-06-18 14:22:31.549235+00', false, '89391');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (80, '2019-06-18 14:22:31.611116+00', '2019-06-18 14:22:31.611306+00', false, '88601');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (81, '2019-06-18 14:22:31.647273+00', '2019-06-18 14:22:31.647459+00', false, '89340');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (82, '2019-06-18 14:22:32.020027+00', '2019-06-18 14:22:32.020215+00', false, '89408');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (83, '2019-06-18 14:22:32.107717+00', '2019-06-18 14:22:32.108016+00', false, '88661');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (84, '2019-06-18 14:22:32.139622+00', '2019-06-18 14:22:32.139844+00', false, '88584');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (85, '2019-06-18 14:22:32.144519+00', '2019-06-18 14:22:32.144723+00', false, '89357');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (86, '2019-06-18 14:22:32.27325+00', '2019-06-18 14:22:32.273453+00', false, '88565');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (87, '2019-06-18 14:22:32.513482+00', '2019-06-18 14:22:32.513867+00', false, '89374');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (88, '2019-06-18 14:22:33.041584+00', '2019-06-18 14:22:33.04178+00', false, '89425');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (89, '2019-06-18 14:22:33.260034+00', '2019-06-18 14:22:33.260255+00', false, '88693');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (90, '2019-06-18 14:22:33.491867+00', '2019-06-18 14:22:33.492661+00', false, '88618');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (91, '2019-06-18 14:22:33.545247+00', '2019-06-18 14:22:33.54545+00', false, '88710');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (92, '2019-06-18 14:22:33.722343+00', '2019-06-18 14:22:33.722914+00', false, '89442');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (93, '2019-06-18 14:22:33.786898+00', '2019-06-18 14:22:33.787087+00', false, '88744');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (94, '2019-06-18 14:22:33.80593+00', '2019-06-18 14:22:33.806114+00', false, '88676');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (95, '2019-06-18 14:22:34.11461+00', '2019-06-18 14:22:34.114826+00', false, '88761');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (96, '2019-06-18 14:22:34.489889+00', '2019-06-18 14:22:34.490188+00', false, '89459');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (97, '2019-06-18 14:22:34.519771+00', '2019-06-18 14:22:34.520061+00', false, '88727');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (98, '2019-06-18 14:22:34.537192+00', '2019-06-18 14:22:34.537648+00', false, '89476');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (99, '2019-06-18 14:22:34.875402+00', '2019-06-18 14:22:34.875752+00', false, '88778');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (100, '2019-06-18 14:22:35.164212+00', '2019-06-18 14:22:35.164623+00', false, '89510');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (101, '2019-06-18 14:22:35.38092+00', '2019-06-18 14:22:35.381321+00', false, '89544');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (102, '2019-06-18 14:22:35.412284+00', '2019-06-18 14:22:35.412673+00', false, '89527');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (103, '2019-06-18 14:22:35.443051+00', '2019-06-18 14:22:35.44325+00', false, '89561');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (104, '2019-06-18 14:22:35.678162+00', '2019-06-18 14:22:35.678557+00', false, '89493');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (105, '2019-06-18 14:22:35.704968+00', '2019-06-18 14:22:35.705163+00', false, '89578');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (106, '2019-06-18 14:22:35.944023+00', '2019-06-18 14:22:35.94431+00', false, '89595');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (107, '2019-06-18 14:22:36.083011+00', '2019-06-18 14:22:36.08356+00', false, '89612');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (108, '2019-06-18 14:22:36.146828+00', '2019-06-18 14:22:36.147019+00', false, '89629');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (109, '2019-06-18 14:22:36.463581+00', '2019-06-18 14:22:36.463885+00', false, '89646');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (110, '2019-06-18 14:22:36.56698+00', '2019-06-18 14:22:36.567209+00', false, '89663');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (111, '2019-06-18 14:22:36.889881+00', '2019-06-18 14:22:36.89009+00', false, '89680');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (112, '2019-06-18 14:22:36.896394+00', '2019-06-18 14:22:36.896586+00', false, '89697');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (113, '2019-06-18 14:22:36.964182+00', '2019-06-18 14:22:36.964382+00', false, '89714');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (114, '2019-06-18 14:22:37.271226+00', '2019-06-18 14:22:37.271848+00', false, '89731');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (115, '2019-06-18 14:22:37.312014+00', '2019-06-18 14:22:37.313222+00', false, '89748');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (116, '2019-06-18 14:22:37.548883+00', '2019-06-18 14:22:37.549089+00', false, '89765');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (117, '2019-06-18 14:22:37.699838+00', '2019-06-18 14:22:37.700091+00', false, '89782');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (118, '2019-06-18 14:22:37.709333+00', '2019-06-18 14:22:37.709519+00', false, '89799');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (119, '2019-06-18 14:22:38.265025+00', '2019-06-18 14:22:38.265558+00', false, '89833');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (120, '2019-06-18 14:22:38.374996+00', '2019-06-18 14:22:38.375645+00', false, '89816');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (121, '2019-06-18 14:22:38.559464+00', '2019-06-18 14:22:38.559656+00', false, '89850');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (122, '2019-06-18 14:22:38.76399+00', '2019-06-18 14:22:38.764175+00', false, '89884');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (123, '2019-06-18 14:22:38.805941+00', '2019-06-18 14:22:38.806136+00', false, '89867');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (124, '2019-06-18 14:22:38.993926+00', '2019-06-18 14:22:38.994449+00', false, '89901');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (125, '2019-06-18 14:22:38.995194+00', '2019-06-18 14:22:38.995744+00', false, '89918');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (126, '2019-06-18 14:22:39.332372+00', '2019-06-18 14:22:39.333345+00', false, '89969');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (127, '2019-06-18 14:22:39.37917+00', '2019-06-18 14:22:39.379582+00', false, '89952');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (128, '2019-06-18 14:22:39.405779+00', '2019-06-18 14:22:39.406079+00', false, '89935');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (129, '2019-06-18 14:22:40.114211+00', '2019-06-18 14:22:40.114399+00', false, '89986');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (130, '2019-06-18 14:22:40.130929+00', '2019-06-18 14:22:40.13113+00', false, '90020');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (131, '2019-06-18 14:22:40.141696+00', '2019-06-18 14:22:40.141922+00', false, '90003');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (132, '2019-06-18 14:22:40.655791+00', '2019-06-18 14:22:40.656056+00', false, '90088');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (133, '2019-06-18 14:22:40.685367+00', '2019-06-18 14:22:40.685584+00', false, '90054');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (134, '2019-06-18 14:22:40.687425+00', '2019-06-18 14:22:40.687609+00', false, '90037');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (135, '2019-06-18 14:22:40.690185+00', '2019-06-18 14:22:40.690354+00', false, '90071');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (136, '2019-06-18 14:22:41.133581+00', '2019-06-18 14:22:41.133779+00', false, '90123');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (146, '2019-06-18 14:22:42.802738+00', '2019-06-18 14:22:42.802945+00', false, '90276');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (156, '2019-06-18 14:22:44.320796+00', '2019-06-18 14:22:44.32106+00', false, '90446');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (166, '2019-06-18 14:22:45.88495+00', '2019-06-18 14:22:45.885147+00', false, '90582');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (174, '2019-06-18 14:22:47.870607+00', '2019-06-18 14:22:47.870866+00', false, '90754');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (186, '2019-06-18 14:22:49.704743+00', '2019-06-18 14:22:49.704981+00', false, '90941');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (197, '2019-06-18 14:22:51.346475+00', '2019-06-18 14:22:51.346668+00', false, '91144');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (205, '2019-06-18 14:22:52.884163+00', '2019-06-18 14:22:52.884403+00', false, '91331');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (215, '2019-06-18 14:22:54.430662+00', '2019-06-18 14:22:54.430969+00', false, '91479');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (226, '2019-06-18 14:22:55.977972+00', '2019-06-18 14:22:55.978176+00', false, '91756');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (241, '2019-06-18 14:22:59.082199+00', '2019-06-18 14:22:59.082382+00', false, '87239');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (252, '2019-06-18 14:23:01.984031+00', '2019-06-18 14:23:01.984285+00', false, '87609');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (259, '2019-06-18 14:23:04.744534+00', '2019-06-18 14:23:04.744879+00', false, '86387');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (137, '2019-06-18 14:22:41.201382+00', '2019-06-18 14:22:41.201714+00', false, '90140');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (148, '2019-06-18 14:22:43.06497+00', '2019-06-18 14:22:43.065175+00', false, '90310');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (158, '2019-06-18 14:22:44.802863+00', '2019-06-18 14:22:44.803066+00', false, '90480');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (168, '2019-06-18 14:22:46.398313+00', '2019-06-18 14:22:46.398834+00', false, '90617');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (176, '2019-06-18 14:22:47.95681+00', '2019-06-18 14:22:47.956998+00', false, '90788');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (184, '2019-06-18 14:22:49.436484+00', '2019-06-18 14:22:49.436681+00', false, '90975');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (194, '2019-06-18 14:22:51.061669+00', '2019-06-18 14:22:51.061858+00', false, '91110');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (207, '2019-06-18 14:22:52.964748+00', '2019-06-18 14:22:52.964978+00', false, '91280');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (217, '2019-06-18 14:22:54.620749+00', '2019-06-18 14:22:54.620941+00', false, '91511');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (227, '2019-06-18 14:22:56.120555+00', '2019-06-18 14:22:56.12083+00', false, '90890');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (235, '2019-06-18 14:22:57.709612+00', '2019-06-18 14:22:57.709802+00', false, '87222');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (246, '2019-06-18 14:23:00.522857+00', '2019-06-18 14:23:00.523255+00', false, '87558');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (255, '2019-06-18 14:23:03.2655+00', '2019-06-18 14:23:03.26567+00', false, '87507');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (138, '2019-06-18 14:22:41.202398+00', '2019-06-18 14:22:41.202564+00', false, '90106');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (147, '2019-06-18 14:22:43.063971+00', '2019-06-18 14:22:43.064167+00', false, '90293');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (157, '2019-06-18 14:22:44.7381+00', '2019-06-18 14:22:44.738351+00', false, '90463');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (167, '2019-06-18 14:22:46.255373+00', '2019-06-18 14:22:46.255597+00', false, '90600');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (175, '2019-06-18 14:22:47.882509+00', '2019-06-18 14:22:47.882844+00', false, '90771');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (185, '2019-06-18 14:22:49.501208+00', '2019-06-18 14:22:49.501487+00', false, '90958');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (195, '2019-06-18 14:22:51.063124+00', '2019-06-18 14:22:51.063342+00', false, '91127');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (204, '2019-06-18 14:22:52.519512+00', '2019-06-18 14:22:52.5197+00', false, '91297');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (214, '2019-06-18 14:22:53.96998+00', '2019-06-18 14:22:53.970188+00', false, '91458');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (223, '2019-06-18 14:22:55.372173+00', '2019-06-18 14:22:55.372695+00', false, '91686');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (232, '2019-06-18 14:22:56.464843+00', '2019-06-18 14:22:56.465212+00', false, '87120');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (239, '2019-06-18 14:22:59.011902+00', '2019-06-18 14:22:59.012121+00', false, '87458');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (248, '2019-06-18 14:23:01.489597+00', '2019-06-18 14:23:01.489804+00', false, '87358');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (257, '2019-06-18 14:23:04.035478+00', '2019-06-18 14:23:04.03572+00', false, '87660');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (139, '2019-06-18 14:22:41.759559+00', '2019-06-18 14:22:41.759756+00', false, '90174');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (149, '2019-06-18 14:22:43.29992+00', '2019-06-18 14:22:43.300451+00', false, '90327');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (159, '2019-06-18 14:22:45.058681+00', '2019-06-18 14:22:45.058898+00', false, '86889');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (181, '2019-06-18 14:22:48.86741+00', '2019-06-18 14:22:48.867711+00', false, '90634');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (191, '2019-06-18 14:22:50.44323+00', '2019-06-18 14:22:50.443558+00', false, '91059');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (201, '2019-06-18 14:22:52.115845+00', '2019-06-18 14:22:52.116096+00', false, '91229');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (211, '2019-06-18 14:22:53.552212+00', '2019-06-18 14:22:53.552399+00', false, '91407');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (220, '2019-06-18 14:22:54.928383+00', '2019-06-18 14:22:54.928569+00', false, '91587');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (229, '2019-06-18 14:22:56.442178+00', '2019-06-18 14:22:56.442381+00', false, '87273');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (243, '2019-06-18 14:22:59.538969+00', '2019-06-18 14:22:59.539489+00', false, '86352');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (140, '2019-06-18 14:22:41.808436+00', '2019-06-18 14:22:41.808628+00', false, '90191');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (151, '2019-06-18 14:22:43.695076+00', '2019-06-18 14:22:43.695289+00', false, '90344');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (161, '2019-06-18 14:22:45.329843+00', '2019-06-18 14:22:45.330194+00', false, '90497');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (169, '2019-06-18 14:22:46.760433+00', '2019-06-18 14:22:46.761238+00', false, '90668');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (177, '2019-06-18 14:22:48.37519+00', '2019-06-18 14:22:48.375517+00', false, '90805');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (187, '2019-06-18 14:22:49.917883+00', '2019-06-18 14:22:49.918079+00', false, '90992');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (196, '2019-06-18 14:22:51.328771+00', '2019-06-18 14:22:51.328981+00', false, '91161');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (206, '2019-06-18 14:22:52.940929+00', '2019-06-18 14:22:52.941343+00', false, '91314');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (216, '2019-06-18 14:22:54.455218+00', '2019-06-18 14:22:54.455432+00', false, '91495');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (225, '2019-06-18 14:22:55.95966+00', '2019-06-18 14:22:55.959986+00', false, '87933');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (238, '2019-06-18 14:22:58.662267+00', '2019-06-18 14:22:58.662496+00', false, '87171');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (249, '2019-06-18 14:23:01.596197+00', '2019-06-18 14:23:01.596733+00', false, '87307');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (258, '2019-06-18 14:23:04.370332+00', '2019-06-18 14:23:04.370793+00', false, '87694');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (141, '2019-06-18 14:22:41.839022+00', '2019-06-18 14:22:41.839232+00', false, '90157');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (150, '2019-06-18 14:22:43.622345+00', '2019-06-18 14:22:43.622538+00', false, '90361');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (160, '2019-06-18 14:22:45.197625+00', '2019-06-18 14:22:45.197821+00', false, '86921');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (183, '2019-06-18 14:22:49.169672+00', '2019-06-18 14:22:49.170022+00', false, '90651');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (193, '2019-06-18 14:22:50.762989+00', '2019-06-18 14:22:50.763311+00', false, '91093');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (203, '2019-06-18 14:22:52.425722+00', '2019-06-18 14:22:52.426786+00', false, '91263');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (213, '2019-06-18 14:22:53.897785+00', '2019-06-18 14:22:53.898299+00', false, '91441');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (224, '2019-06-18 14:22:55.425353+00', '2019-06-18 14:22:55.425558+00', false, '91675');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (228, '2019-06-18 14:22:56.406174+00', '2019-06-18 14:22:56.406531+00', false, '87137');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (240, '2019-06-18 14:22:59.074832+00', '2019-06-18 14:22:59.075026+00', false, '87916');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (251, '2019-06-18 14:23:01.973209+00', '2019-06-18 14:23:01.973435+00', false, '86560');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (142, '2019-06-18 14:22:42.272945+00', '2019-06-18 14:22:42.273481+00', false, '90208');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (152, '2019-06-18 14:22:43.991944+00', '2019-06-18 14:22:43.992135+00', false, '90378');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (162, '2019-06-18 14:22:45.562734+00', '2019-06-18 14:22:45.56332+00', false, '90514');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (170, '2019-06-18 14:22:47.029094+00', '2019-06-18 14:22:47.029347+00', false, '90685');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (178, '2019-06-18 14:22:48.632796+00', '2019-06-18 14:22:48.633336+00', false, '90822');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (188, '2019-06-18 14:22:50.258242+00', '2019-06-18 14:22:50.25844+00', false, '91009');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (199, '2019-06-18 14:22:51.92634+00', '2019-06-18 14:22:51.926525+00', false, '91178');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (208, '2019-06-18 14:22:53.389119+00', '2019-06-18 14:22:53.389421+00', false, '91369');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (219, '2019-06-18 14:22:54.913862+00', '2019-06-18 14:22:54.914088+00', false, '91531');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (230, '2019-06-18 14:22:56.445551+00', '2019-06-18 14:22:56.445714+00', false, '87069');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (237, '2019-06-18 14:22:58.03721+00', '2019-06-18 14:22:58.037529+00', false, '87256');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (247, '2019-06-18 14:23:00.559095+00', '2019-06-18 14:23:00.559329+00', false, '87592');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (256, '2019-06-18 14:23:03.366868+00', '2019-06-18 14:23:03.367721+00', false, '87643');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (143, '2019-06-18 14:22:42.314522+00', '2019-06-18 14:22:42.314761+00', false, '90225');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (153, '2019-06-18 14:22:44.075372+00', '2019-06-18 14:22:44.075759+00', false, '90395');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (163, '2019-06-18 14:22:45.695149+00', '2019-06-18 14:22:45.695663+00', false, '90531');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (173, '2019-06-18 14:22:47.365941+00', '2019-06-18 14:22:47.366352+00', false, '90702');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (182, '2019-06-18 14:22:48.913585+00', '2019-06-18 14:22:48.913843+00', false, '90924');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (190, '2019-06-18 14:22:50.320923+00', '2019-06-18 14:22:50.321124+00', false, '91076');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (198, '2019-06-18 14:22:51.921481+00', '2019-06-18 14:22:51.921707+00', false, '91212');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (210, '2019-06-18 14:22:53.424975+00', '2019-06-18 14:22:53.425176+00', false, '91352');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (221, '2019-06-18 14:22:55.147491+00', '2019-06-18 14:22:55.147769+00', false, '91567');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (234, '2019-06-18 14:22:56.757552+00', '2019-06-18 14:22:56.757841+00', false, '87003');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (244, '2019-06-18 14:22:59.587768+00', '2019-06-18 14:22:59.58799+00', false, '87524');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (253, '2019-06-18 14:23:02.493369+00', '2019-06-18 14:23:02.493905+00', false, '87490');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (144, '2019-06-18 14:22:42.32501+00', '2019-06-18 14:22:42.325205+00', false, '90242');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (154, '2019-06-18 14:22:44.141671+00', '2019-06-18 14:22:44.14198+00', false, '90412');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (164, '2019-06-18 14:22:45.732587+00', '2019-06-18 14:22:45.732983+00', false, '90548');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (171, '2019-06-18 14:22:47.181567+00', '2019-06-18 14:22:47.181825+00', false, '90720');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (180, '2019-06-18 14:22:48.858363+00', '2019-06-18 14:22:48.858708+00', false, '90839');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (189, '2019-06-18 14:22:50.306547+00', '2019-06-18 14:22:50.306732+00', false, '91042');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (200, '2019-06-18 14:22:51.953557+00', '2019-06-18 14:22:51.953825+00', false, '91195');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (209, '2019-06-18 14:22:53.394321+00', '2019-06-18 14:22:53.394565+00', false, '91385');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (218, '2019-06-18 14:22:54.856651+00', '2019-06-18 14:22:54.857527+00', false, '91551');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (231, '2019-06-18 14:22:56.446124+00', '2019-06-18 14:22:56.446277+00', false, '90907');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (236, '2019-06-18 14:22:57.969497+00', '2019-06-18 14:22:57.969902+00', false, '87426');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (245, '2019-06-18 14:23:00.515898+00', '2019-06-18 14:23:00.516291+00', false, '87575');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (254, '2019-06-18 14:23:03.263693+00', '2019-06-18 14:23:03.263881+00', false, '87541');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (145, '2019-06-18 14:22:42.36356+00', '2019-06-18 14:22:42.363784+00', false, '90259');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (155, '2019-06-18 14:22:44.249772+00', '2019-06-18 14:22:44.249992+00', false, '90429');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (165, '2019-06-18 14:22:45.76589+00', '2019-06-18 14:22:45.76608+00', false, '90565');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (172, '2019-06-18 14:22:47.239641+00', '2019-06-18 14:22:47.239883+00', false, '90737');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (179, '2019-06-18 14:22:48.755591+00', '2019-06-18 14:22:48.756151+00', false, '90856');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (192, '2019-06-18 14:22:50.502122+00', '2019-06-18 14:22:50.502326+00', false, '91025');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (202, '2019-06-18 14:22:52.156376+00', '2019-06-18 14:22:52.156584+00', false, '91246');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (212, '2019-06-18 14:22:53.579956+00', '2019-06-18 14:22:53.580142+00', false, '91424');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (222, '2019-06-18 14:22:55.148954+00', '2019-06-18 14:22:55.149115+00', false, '91605');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (233, '2019-06-18 14:22:56.636972+00', '2019-06-18 14:22:56.637288+00', false, '87103');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (242, '2019-06-18 14:22:59.125384+00', '2019-06-18 14:22:59.125581+00', false, '87475');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (250, '2019-06-18 14:23:01.962482+00', '2019-06-18 14:23:01.962815+00', false, '86369');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (260, '2019-06-18 14:23:05.543589+00', '2019-06-18 14:23:05.543999+00', false, '87626');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (261, '2019-06-18 14:23:06.045157+00', '2019-06-18 14:23:06.04534+00', false, '87677');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (262, '2019-06-18 14:23:06.138526+00', '2019-06-18 14:23:06.13872+00', false, '87728');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (263, '2019-06-18 14:23:06.410345+00', '2019-06-18 14:23:06.410534+00', false, '86438');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (264, '2019-06-18 14:23:06.961324+00', '2019-06-18 14:23:06.961512+00', false, '87745');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (265, '2019-06-18 14:23:06.961796+00', '2019-06-18 14:23:06.961953+00', false, '86489');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (266, '2019-06-18 14:23:08.496488+00', '2019-06-18 14:23:08.4967+00', false, '87814');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (267, '2019-06-18 14:23:08.538066+00', '2019-06-18 14:23:08.538407+00', false, '87052');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (268, '2019-06-18 14:23:08.935206+00', '2019-06-18 14:23:08.935397+00', false, '87882');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (269, '2019-06-18 14:23:09.113456+00', '2019-06-18 14:23:09.113646+00', false, '88035');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (270, '2019-06-18 14:23:10.675186+00', '2019-06-18 14:23:10.675399+00', false, '87711');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (271, '2019-06-18 14:23:11.33538+00', '2019-06-18 14:23:11.335603+00', false, '87086');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (272, '2019-06-18 14:23:11.667188+00', '2019-06-18 14:23:11.667416+00', false, '86421');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (273, '2019-06-18 14:23:11.717048+00', '2019-06-18 14:23:11.717351+00', false, '86404');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (274, '2019-06-18 14:23:11.838624+00', '2019-06-18 14:23:11.838835+00', false, '90873');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (275, '2019-06-18 14:23:12.145054+00', '2019-06-18 14:23:12.145325+00', false, '86643');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (276, '2019-06-18 14:23:13.299816+00', '2019-06-18 14:23:13.300023+00', false, '86543');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (277, '2019-06-18 14:23:13.890493+00', '2019-06-18 14:23:13.890687+00', false, '86523');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (278, '2019-06-18 14:23:13.947352+00', '2019-06-18 14:23:13.947553+00', false, '87797');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (279, '2019-06-18 14:23:14.758328+00', '2019-06-18 14:23:14.758579+00', false, '86472');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (280, '2019-06-18 14:23:16.507111+00', '2019-06-18 14:23:16.507309+00', false, '86455');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (281, '2019-06-18 14:23:16.679539+00', '2019-06-18 14:23:16.67992+00', false, '87763');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (282, '2019-06-18 14:23:16.944943+00', '2019-06-18 14:23:16.945164+00', false, '87341');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (283, '2019-06-18 14:23:17.228129+00', '2019-06-18 14:23:17.228315+00', false, '86329');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (284, '2019-06-18 14:23:21.256012+00', '2019-06-18 14:23:21.256233+00', false, '86506');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (285, '2019-06-18 14:23:21.347734+00', '2019-06-18 14:23:21.347995+00', false, '87035');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (286, '2019-06-18 14:23:21.884272+00', '2019-06-18 14:23:21.884835+00', false, '87018');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (287, '2019-06-18 14:23:23.106655+00', '2019-06-18 14:23:23.106867+00', false, '87188');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (288, '2019-06-18 14:23:23.746516+00', '2019-06-18 14:23:23.746967+00', false, '87290');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (289, '2019-06-18 14:23:24.908071+00', '2019-06-18 14:23:24.90828+00', false, '87375');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (290, '2019-06-18 14:24:33.124101+00', '2019-06-18 14:24:33.124566+00', false, '91768');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (291, '2019-06-18 14:24:38.963497+00', '2019-06-18 14:24:38.964744+00', false, '87205');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (292, '2019-06-18 14:25:19.222089+00', '2019-06-18 14:25:19.222294+00', false, '91785');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (293, '2019-06-18 14:26:12.6767+00', '2019-06-18 14:26:12.676969+00', false, '91834');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (294, '2019-06-18 14:28:08.55834+00', '2019-06-18 14:28:08.558713+00', false, '91875');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (295, '2019-06-18 14:29:36.064084+00', '2019-06-18 14:29:36.06428+00', false, '91918');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (296, '2019-06-18 14:31:32.572657+00', '2019-06-18 14:31:32.573249+00', false, '91958');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (297, '2019-06-18 14:31:36.438625+00', '2019-06-18 14:31:36.438881+00', false, '91973');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (298, '2019-06-18 14:33:16.427405+00', '2019-06-18 14:33:16.427934+00', false, '92033');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (299, '2019-06-18 14:34:40.550181+00', '2019-06-18 14:34:40.550418+00', false, '92074');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (300, '2019-06-18 14:34:44.302391+00', '2019-06-18 14:34:44.302952+00', false, '92089');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (301, '2019-06-18 14:45:16.696883+00', '2019-06-18 14:45:16.697417+00', false, '92150');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (302, '2019-06-18 14:47:06.945455+00', '2019-06-18 14:47:06.945981+00', false, '92191');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (303, '2019-06-18 14:47:10.908847+00', '2019-06-18 14:47:10.909065+00', false, '92206');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (304, '2019-06-18 14:51:13.369676+00', '2019-06-18 14:51:13.370552+00', false, '92267');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (305, '2019-06-18 14:51:16.999919+00', '2019-06-18 14:51:17.000658+00', false, '92282');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (306, '2019-06-18 14:52:29.528978+00', '2019-06-18 14:52:29.52917+00', false, '92342');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (307, '2019-06-18 14:54:04.0937+00', '2019-06-18 14:54:04.094286+00', false, '92383');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (308, '2019-06-18 14:54:07.693389+00', '2019-06-18 14:54:07.69392+00', false, '92398');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (309, '2019-06-18 14:55:22.666612+00', '2019-06-18 14:55:22.66691+00', false, '92458');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (340, '2019-06-19 04:55:57.547021+00', '2019-06-19 04:55:57.547371+00', false, '92299');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (341, '2019-06-19 04:55:58.742251+00', '2019-06-19 04:55:58.742448+00', false, '92223');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (342, '2019-06-19 04:55:58.879164+00', '2019-06-19 04:55:58.879703+00', false, '92106');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (343, '2019-06-19 04:55:59.703829+00', '2019-06-19 04:55:59.704225+00', false, '92415');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (344, '2019-06-19 04:55:59.740355+00', '2019-06-19 04:55:59.740606+00', false, '92471');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (345, '2019-06-19 04:56:00.379306+00', '2019-06-19 04:56:00.380161+00', false, '91990');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (346, '2019-06-19 05:06:32.281362+00', '2019-06-19 05:06:32.281596+00', false, '93368');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (347, '2019-06-19 05:25:05.839183+00', '2019-06-19 05:25:05.839704+00', false, '93459');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (348, '2019-06-19 05:25:51.689095+00', '2019-06-19 05:25:51.689345+00', false, '93473');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (349, '2019-06-19 05:32:53.18217+00', '2019-06-19 05:32:53.18258+00', false, '93392');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (350, '2019-06-19 06:02:45.874515+00', '2019-06-19 06:02:45.875411+00', false, '93532');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (351, '2019-06-19 07:37:10.235628+00', '2019-06-19 07:37:10.235936+00', false, '93587');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (352, '2019-06-19 07:39:37.363214+00', '2019-06-19 07:39:37.3634+00', false, '93672');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (353, '2019-06-19 07:51:08.379984+00', '2019-06-19 07:51:08.380536+00', false, '93712');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (354, '2019-06-19 07:53:49.893074+00', '2019-06-19 07:53:49.893275+00', false, '93753');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (355, '2019-06-19 07:55:39.962186+00', '2019-06-19 07:55:39.962415+00', false, '93793');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (356, '2019-06-19 07:58:17.382999+00', '2019-06-19 07:58:17.383181+00', false, '93894');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (357, '2019-06-19 08:01:43.150224+00', '2019-06-19 08:01:43.150921+00', false, '93955');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (358, '2019-06-19 08:04:58.8373+00', '2019-06-19 08:04:58.837637+00', false, '93966');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (359, '2019-06-19 09:07:49.512978+00', '2019-06-19 09:07:49.513209+00', false, '93989');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (360, '2019-06-19 09:10:21.513598+00', '2019-06-19 09:10:21.514266+00', false, '94078');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (361, '2019-06-19 09:47:14.584718+00', '2019-06-19 09:47:14.585241+00', false, '94181');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (362, '2019-06-19 10:05:13.27498+00', '2019-06-19 10:05:13.275175+00', false, '94281');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (363, '2019-06-19 10:12:18.68529+00', '2019-06-19 10:12:18.685511+00', false, '94402');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (364, '2019-06-19 10:16:32.486698+00', '2019-06-19 10:16:32.486923+00', false, '94481');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (365, '2019-06-19 10:23:45.249159+00', '2019-06-19 10:23:45.249379+00', false, '94560');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (366, '2019-06-19 10:25:30.385646+00', '2019-06-19 10:25:30.385939+00', false, '94571');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (367, '2019-06-19 11:09:51.856499+00', '2019-06-19 11:09:51.857024+00', false, '94010');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (368, '2019-06-19 11:39:43.09772+00', '2019-06-19 11:39:43.097921+00', false, '93602');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (369, '2019-06-19 11:45:34.016187+00', '2019-06-19 11:45:34.016437+00', false, '94090');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (370, '2019-06-19 11:47:15.415057+00', '2019-06-19 11:47:15.415246+00', false, '94113');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (371, '2019-06-19 17:58:03.018011+00', '2019-06-19 17:58:03.018373+00', false, '94215');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (372, '2019-06-19 17:58:03.151758+00', '2019-06-19 17:58:03.151955+00', false, '94316');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (373, '2019-06-19 17:58:03.610049+00', '2019-06-19 17:58:03.610412+00', false, '94416');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (374, '2019-06-19 17:58:03.84336+00', '2019-06-19 17:58:03.843553+00', false, '94495');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (375, '2019-06-19 17:58:03.936158+00', '2019-06-19 17:58:03.936416+00', false, '94295');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (376, '2019-06-19 17:58:04.125631+00', '2019-06-19 17:58:04.125941+00', false, '93807');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (377, '2019-06-19 17:58:04.177319+00', '2019-06-19 17:58:04.177507+00', false, '94337');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (378, '2019-06-19 17:58:04.202435+00', '2019-06-19 17:58:04.20262+00', false, '93909');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (379, '2019-06-19 17:58:04.339994+00', '2019-06-19 17:58:04.340191+00', false, '93828');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (380, '2019-06-19 17:58:04.751311+00', '2019-06-19 17:58:04.751504+00', false, '94195');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (381, '2019-06-19 18:47:24.50268+00', '2019-06-19 18:47:24.503227+00', false, '94597');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (382, '2019-06-20 06:26:20.085626+00', '2019-06-20 06:26:20.085911+00', false, '94680');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (383, '2019-06-20 06:26:29.353804+00', '2019-06-20 06:26:29.354568+00', false, '94700');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (384, '2019-06-20 06:26:59.633543+00', '2019-06-20 06:26:59.63373+00', false, '94717');
INSERT INTO public.inbox_mailhistory (id, created, modified, is_removed, history_id) VALUES (385, '2019-06-20 08:12:53.535471+00', '2019-06-20 08:12:53.536002+00', false, '94908');


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



--
-- Data for Name: orders_lifetimelicense; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders_order_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: orders_orderhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: packages_productcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (1, '2019-06-11 04:49:47.385371+00', '2019-06-11 04:49:47.38566+00', false, 'Category 1', 'category', 'ACTIVE');


--
-- Data for Name: packages_producttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_producttype (id, created, modified, is_removed, name, description, status) VALUES (1, '2019-06-11 04:49:58.334224+00', '2019-06-11 04:49:58.334489+00', false, 'Product Type 1', 'productype', 'ACTIVE');


--
-- Data for Name: packages_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (2, '2019-06-11 08:05:37.953027+00', '2019-06-11 08:05:37.95328+00', false, 'Product 2', '<p>ádsad</p>', 'ACTIVE', '2019-06-11', NULL, 2, NULL);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (4, '2019-06-11 08:07:59.225053+00', '2019-06-11 08:07:59.225369+00', false, 'Product 4', '<p>ádasd</p>', 'ACTIVE', '2019-06-11', NULL, 2, NULL);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (5, '2019-06-11 08:10:02.627962+00', '2019-06-11 08:10:02.628298+00', false, 'Product 5', '<p>ddddd</p>', 'ACTIVE', '2019-06-11', 1, 2, 1);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (1, '2019-06-11 08:05:05.498116+00', '2019-06-11 08:12:34.911851+00', false, 'Product 1', '<p>Product</p>', 'ACTIVE', '2019-06-11', NULL, 2, NULL);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (3, '2019-06-11 08:07:06.193159+00', '2019-06-11 09:40:09.116032+00', false, 'Product 3', '<p>đasad</p>', 'ACTIVE', '2019-06-11', NULL, 2, NULL);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, category_id, manager_id, product_type_id) VALUES (6, '2019-06-11 08:32:52.966548+00', '2019-06-11 10:18:33.643391+00', false, 'Product 6', '<p>sdd</p>', 'ACTIVE', '2019-06-11', 1, 2, 1);


--
-- Data for Name: packages_feature; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (2, '2019-06-11 09:00:41.84901+00', '2019-06-11 09:40:09.155646+00', false, 'Feature 1', '', 1111122, 1, 3);
INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (3, '2019-06-11 09:59:21.782599+00', '2019-06-11 10:18:33.67717+00', false, 'Feature 2', '', 12333, 2, 6);
INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (1, '2019-06-11 08:32:53.008969+00', '2019-06-11 10:18:33.679714+00', false, 'Feature 1', '222', 11, 1, 6);


--
-- Data for Name: packages_package_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (2, 13, 2);
INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (5, 15, 1);
INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (6, 15, 3);


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

INSERT INTO public.steps_step (id, created, modified, is_removed, actions, duration, conditions, follow_up_id, mail_template_id) VALUES (1, '2019-06-11 10:33:58.841345+00', '2019-06-11 10:33:58.841791+00', false, '["Send Email"]', 20, '[]', 1, 2);
INSERT INTO public.steps_step (id, created, modified, is_removed, actions, duration, conditions, follow_up_id, mail_template_id) VALUES (2, '2019-06-11 10:33:58.841417+00', '2019-06-11 10:33:58.841856+00', false, '[]', 0, '[{"name": "Choose Packages", "type": "final"}]', 1, NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, actions, duration, conditions, follow_up_id, mail_template_id) VALUES (3, '2019-06-11 10:34:42.326802+00', '2019-06-11 10:34:42.327263+00', false, '["Send Email"]', 10, '[]', 2, 1);
INSERT INTO public.steps_step (id, created, modified, is_removed, actions, duration, conditions, follow_up_id, mail_template_id) VALUES (4, '2019-06-11 10:34:42.326869+00', '2019-06-11 10:34:42.327333+00', false, '[]', 20, '[{"name": "Choose Packages", "type": "final"}]', 2, 1);


--
-- Data for Name: steps_stepdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, thread, order_id, step_id) VALUES (2, '2019-06-11 10:39:27.20932+00', '2019-06-11 10:39:27.211322+00', false, '{"Choose Packages": {"type": "final", "result": {"15": {}}}}', 'RUNNING', '[]', 1, 4);
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, status, thread, order_id, step_id) VALUES (1, '2019-06-11 10:39:27.209242+00', '2019-06-20 08:11:13.560116+00', false, '{}', 'RUNNING', '[{"type": "Send Email", "thread_id": "16b461f0bac8561c"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b73e576f655e75"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b73e7b33bbef21"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b73e985d066944"}, {"note": "", "type": "Send Email Manually", "thread_id": "16b73f089479ef61"}]', 1, 3);


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

SELECT pg_catalog.setval('public.campaigns_contactmarketinghistory_id_seq', 3, true);


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

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 7, true);


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

SELECT pg_catalog.setval('public.inbox_mailbox_id_seq', 78, true);


--
-- Name: inbox_mailhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inbox_mailhistory_id_seq', 385, true);


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
-- PostgreSQL database dump complete
--

