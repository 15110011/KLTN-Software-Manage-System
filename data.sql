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

INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (2, 'pbkdf2_sha256$150000$T6Hdsm1TwTQt$UPRCBV68OzNjSnU/5vCN20Bcn2RiJOI97fY8Z0kIku8=', NULL, false, 'vuthao', '', '', 'hepmy666@gmail.com', false, true, '2019-04-18 11:34:19+00');
INSERT INTO public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) VALUES (1, 'pbkdf2_sha256$150000$mLVdL4uXrr3a$6mPVqasfSBNezE9pKWFFi2pxZCtHrlgRMNbSlVWX674=', '2019-05-03 03:07:55.22209+00', true, 'admin', '', '', '', true, true, '2019-04-18 11:33:52.439754+00');


--
-- Data for Name: account_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) VALUES (1, '2019-04-18 11:34:37.98804+00', '2019-04-18 11:34:37.993945+00', false, false, '1674834476', 'Fetch', 2);
INSERT INTO public.account_profile (id, created, modified, is_removed, is_manager, phone, company_name, user_id) VALUES (2, '2019-04-18 11:34:59.140786+00', '2019-04-18 11:34:59.146964+00', false, true, '1678344762', 'Admin', 1);


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
INSERT INTO public.django_content_type (id, app_label, model) VALUES (12, 'packages', 'packagehistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (13, 'packages', 'product');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (14, 'packages', 'productcategory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (15, 'packages', 'producttype');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (16, 'contacts', 'contact');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (17, 'contacts', 'contactgroup');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (18, 'campaigns', 'campaign');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (19, 'campaigns', 'followupplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (20, 'campaigns', 'marketingplan');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (21, 'campaigns', 'mailtemplate');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (22, 'campaigns', 'contactmarketing');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (23, 'campaigns', 'contactmarketinghistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (24, 'campaigns', 'note');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (25, 'orders', 'order');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (26, 'orders', 'orderhistory');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (27, 'steps', 'step');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (28, 'steps', 'stepdetail');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (29, 'reports', 'report');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (30, 'events', 'event');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (31, 'notifications', 'notification');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (32, 'orders', 'lifetimelicense');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (33, 'orders', 'license');
INSERT INTO public.django_content_type (id, app_label, model) VALUES (34, 'orders', 'orderpackages');


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
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (45, 'Can add package history', 12, 'add_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (46, 'Can change package history', 12, 'change_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (47, 'Can delete package history', 12, 'delete_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (48, 'Can view package history', 12, 'view_packagehistory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (49, 'Can add product', 13, 'add_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (50, 'Can change product', 13, 'change_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (51, 'Can delete product', 13, 'delete_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (52, 'Can view product', 13, 'view_product');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (53, 'Can add product category', 14, 'add_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (54, 'Can change product category', 14, 'change_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (55, 'Can delete product category', 14, 'delete_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (56, 'Can view product category', 14, 'view_productcategory');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (57, 'Can add product type', 15, 'add_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (58, 'Can change product type', 15, 'change_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (59, 'Can delete product type', 15, 'delete_producttype');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (60, 'Can view product type', 15, 'view_producttype');
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
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (73, 'Can add follow up plan', 19, 'add_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (74, 'Can change follow up plan', 19, 'change_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (75, 'Can delete follow up plan', 19, 'delete_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (76, 'Can view follow up plan', 19, 'view_followupplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (77, 'Can add marketing plan', 20, 'add_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (78, 'Can change marketing plan', 20, 'change_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (79, 'Can delete marketing plan', 20, 'delete_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (80, 'Can view marketing plan', 20, 'view_marketingplan');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (81, 'Can add mail template', 21, 'add_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (82, 'Can change mail template', 21, 'change_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (83, 'Can delete mail template', 21, 'delete_mailtemplate');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (84, 'Can view mail template', 21, 'view_mailtemplate');
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
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (105, 'Can add step', 27, 'add_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (106, 'Can change step', 27, 'change_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (107, 'Can delete step', 27, 'delete_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (108, 'Can view step', 27, 'view_step');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (109, 'Can add step detail', 28, 'add_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (110, 'Can change step detail', 28, 'change_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (111, 'Can delete step detail', 28, 'delete_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (112, 'Can view step detail', 28, 'view_stepdetail');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (113, 'Can add report', 29, 'add_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (114, 'Can change report', 29, 'change_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (115, 'Can delete report', 29, 'delete_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (116, 'Can view report', 29, 'view_report');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (117, 'Can add event', 30, 'add_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (118, 'Can change event', 30, 'change_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (119, 'Can delete event', 30, 'delete_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (120, 'Can view event', 30, 'view_event');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (121, 'Can add notification', 31, 'add_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (122, 'Can change notification', 31, 'change_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (123, 'Can delete notification', 31, 'delete_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (124, 'Can view notification', 31, 'view_notification');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (125, 'Can add lifetime license', 32, 'add_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (126, 'Can change lifetime license', 32, 'change_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (127, 'Can delete lifetime license', 32, 'delete_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (128, 'Can view lifetime license', 32, 'view_lifetimelicense');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (129, 'Can add license', 33, 'add_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (130, 'Can change license', 33, 'change_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (131, 'Can delete license', 33, 'delete_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (132, 'Can view license', 33, 'view_license');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (133, 'Can add order packages', 34, 'add_orderpackages');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (134, 'Can change order packages', 34, 'change_orderpackages');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (135, 'Can delete order packages', 34, 'delete_orderpackages');
INSERT INTO public.auth_permission (id, name, content_type_id, codename) VALUES (136, 'Can view order packages', 34, 'view_orderpackages');


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

INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (1, '2019-04-19 11:29:09.84677+00', '2019-04-19 11:29:09.850224+00', false, 'Fl1', 1, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (2, '2019-04-20 07:14:44.932917+00', '2019-04-20 07:15:58.9556+00', false, 'Follow plan3', 1, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (3, '2019-04-21 15:16:35.164603+00', '2019-04-24 06:10:16.145017+00', false, 'Anhasfasfasfasf', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (4, '2019-04-24 10:01:40.341462+00', '2019-04-24 10:01:40.341959+00', false, 'Tien Va Ken', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (5, '2019-04-24 10:08:28.07811+00', '2019-04-24 10:08:28.078623+00', false, 'dfdsf', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (6, '2019-04-24 10:22:16.185293+00', '2019-04-24 10:22:16.185545+00', false, 'Tien Cua Ken', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (7, '2019-04-24 10:25:50.038383+00', '2019-04-24 10:25:50.038671+00', false, 'neu roi thi lam 1 ly', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (8, '2019-04-24 10:30:08.154694+00', '2019-04-24 10:30:08.154956+00', false, 'sadsd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (9, '2019-04-24 10:34:36.418329+00', '2019-04-24 10:34:36.418745+00', false, 'Act cool Dung hinh mat 5s', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (10, '2019-04-24 10:35:35.024142+00', '2019-04-24 10:35:35.024593+00', false, 'anh nha o dau the', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (11, '2019-04-24 10:36:05.543302+00', '2019-04-24 10:36:05.543658+00', false, 'aaa', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (12, '2019-04-24 10:37:21.482586+00', '2019-04-24 10:37:21.482921+00', false, 'asdasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (13, '2019-04-24 10:38:02.053336+00', '2019-04-24 10:38:02.053675+00', false, 'sadasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (14, '2019-04-24 10:46:50.324036+00', '2019-04-24 10:46:50.324428+00', false, 'dasdasdasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (15, '2019-04-24 10:54:16.45743+00', '2019-04-24 10:54:16.458109+00', false, 'sadasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (16, '2019-04-24 10:56:27.852915+00', '2019-04-24 10:56:27.853335+00', false, 'sdsadasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (17, '2019-04-24 10:57:57.394979+00', '2019-04-24 10:57:57.39526+00', false, 'sadasdasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (18, '2019-04-24 10:59:26.147426+00', '2019-04-24 10:59:26.14776+00', false, 'sefsdfsdf', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (19, '2019-04-24 11:01:45.868513+00', '2019-04-24 11:01:45.869521+00', false, 'dasdasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (20, '2019-04-24 11:02:58.158339+00', '2019-04-24 11:02:58.158646+00', false, 'dsadasdasdasdasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (21, '2019-04-24 11:03:31.551043+00', '2019-04-24 11:03:31.55131+00', false, 'sdadsad', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (22, '2019-04-24 11:07:49.401463+00', '2019-04-24 11:07:49.401935+00', false, 'Anh dep try', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (24, '2019-04-24 11:27:18.683458+00', '2019-04-24 11:27:18.684122+00', false, 'Anh dep try23', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (23, '2019-04-24 11:22:41.800372+00', '2019-04-24 11:35:32.876722+00', false, 'Anh dep try243', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (25, '2019-04-24 11:37:54.146419+00', '2019-04-24 11:42:10.092492+00', false, 'khoaito23', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (26, '2019-04-24 12:09:58.724349+00', '2019-04-24 12:09:58.725384+00', false, 'asfasf', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (27, '2019-04-24 12:12:52.923852+00', '2019-04-24 12:12:52.924174+00', false, 'asf122', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (28, '2019-04-24 12:14:18.004574+00', '2019-04-24 12:14:18.00485+00', false, 'asdasdasdasd', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (29, '2019-04-24 12:15:04.885569+00', '2019-05-02 16:05:54.701355+00', false, 'asdasdasdasd1', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (31, '2019-05-02 16:50:58.998771+00', '2019-05-02 16:50:58.999458+00', false, 'Test123123123', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (32, '2019-05-02 16:51:26.184314+00', '2019-05-02 16:51:26.184801+00', false, 'GNGN123', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (33, '2019-05-02 16:58:16.006903+00', '2019-05-02 16:58:16.007149+00', false, '111www', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (30, '2019-05-02 16:50:35.673644+00', '2019-05-06 14:18:21.232399+00', false, 'Anh8', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (34, '2019-05-07 06:13:19.309219+00', '2019-05-07 06:13:19.30952+00', false, 'naruto', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (35, '2019-05-07 06:15:41.734419+00', '2019-05-07 06:15:41.734775+00', false, 'beb', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (37, '2019-05-07 06:17:30.640921+00', '2019-05-07 06:17:30.641286+00', false, 'Lewlew', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (38, '2019-05-07 06:19:20.224781+00', '2019-05-07 06:19:28.012247+00', false, 'Phong Vu2', 2, true);
INSERT INTO public.campaigns_followupplan (id, created, modified, is_removed, name, manager_id, can_modify) VALUES (36, '2019-05-07 06:16:59.843138+00', '2019-05-07 06:20:21.918493+00', false, 'khoatoo223', 2, true);


--
-- Data for Name: campaigns_mailtemplate; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: campaigns_marketingplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (3, '2019-04-19 11:15:37.614747+00', '2019-04-19 11:15:37.615305+00', false, 'Marketing', '{"must": [{"data": "CA", "operand": "1", "operator": "Equal to"}]}', 1, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (4, '2019-04-19 15:15:29.718705+00', '2019-04-19 15:15:29.71901+00', false, 'alo', '{"must": [{"data": "3", "operand": "2", "operator": "Equal To"}]}', 1, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (5, '2019-04-19 15:27:52.473145+00', '2019-04-20 08:30:41.351212+00', false, 'Anh', '{"must": [{"data": "2", "operand": "2", "operator": "Less than"}]}', 1, '{"Call Client","Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (40, '2019-05-06 14:16:49.334733+00', '2019-05-06 14:16:49.3355+00', false, 'Anhkute', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (27, '2019-04-24 08:07:27.364068+00', '2019-04-24 08:07:27.364334+00', false, '333vv', '{"must": [{"data": "2", "operand": "2", "operator": "Greater than"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (28, '2019-04-24 08:08:05.694384+00', '2019-04-24 08:08:05.694894+00', false, 'vdvd', '{"must": [{"data": "3", "operand": "2", "operator": "Less than"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (29, '2019-04-24 08:09:28.724595+00', '2019-04-24 08:09:28.725208+00', false, 'aloooooo', '{"must": [{"data": "333", "operand": "2", "operator": "Less than"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (30, '2019-04-24 08:11:40.08102+00', '2019-04-24 08:11:40.081304+00', false, 'vu va tien', '{"must": [{"data": "334", "operand": "2", "operator": "Less than"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (31, '2019-04-24 09:23:12.757455+00', '2019-04-24 09:23:12.758064+00', false, 'sadsdsds333', '{"must": [{"data": "22", "operand": "2", "operator": "Less than"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (33, '2019-04-26 04:19:36.043244+00', '2019-04-26 04:19:36.043728+00', false, 'khochiu', '{"must": [{"data": "AK", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (34, '2019-04-26 04:34:03.300759+00', '2019-04-26 04:34:03.301638+00', false, 'TienCuaVuNe', '{"must": [{"data": "AS", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Send Email","Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (35, '2019-04-26 04:35:09.654651+00', '2019-04-26 04:35:09.654959+00', false, 'AnhdepTry', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (6, '2019-04-20 09:50:48.685719+00', '2019-04-24 06:20:17.284773+00', false, 'Plan 333', '{"must": [{"data": "552", "operand": "2", "operator": "Greater than"}]}', 2, '{"Call Client","Send Email Manually"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (7, '2019-04-24 07:03:14.502459+00', '2019-04-24 07:03:14.502795+00', false, 'aaa', '{"must": [{"data": "AK", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (8, '2019-04-24 07:07:56.564508+00', '2019-04-24 07:07:56.564804+00', false, 'pờ nen 4', '{"must": [{"data": "222", "operand": "2", "operator": "Equal To"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (9, '2019-04-24 07:09:14.590378+00', '2019-04-24 07:09:14.590701+00', false, 'aaa', '{"must": [{"data": "3333", "operand": "2", "operator": "Equal To"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (10, '2019-04-24 07:09:20.850672+00', '2019-04-24 07:09:20.851532+00', false, 'aaa333', '{"must": [{"data": "3333", "operand": "2", "operator": "Equal To"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (11, '2019-04-24 07:11:50.698385+00', '2019-04-24 07:11:50.698645+00', false, 'anh dep try', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (12, '2019-04-24 07:12:06.635108+00', '2019-04-24 07:12:06.635538+00', false, 'anh dep try', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (13, '2019-04-24 07:13:07.620685+00', '2019-04-24 07:13:07.621236+00', false, 'alolo', '{"must": [{"data": "2", "operand": "2", "operator": "Less than"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (14, '2019-04-24 07:14:40.251877+00', '2019-04-24 07:14:40.252261+00', false, 'aaa', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (15, '2019-04-24 07:16:13.739865+00', '2019-04-24 07:16:13.740159+00', false, 'asdasd', '{"must": [{"data": "22", "operand": "2", "operator": "Less than"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (16, '2019-04-24 07:16:53.564489+00', '2019-04-24 07:16:53.565013+00', false, 'avvvvv', '{"must": [{"data": "AL", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (17, '2019-04-24 07:18:39.735188+00', '2019-04-24 07:18:39.73576+00', false, 'test thoi', '{"must": [{"data": "AL", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (18, '2019-04-24 07:22:25.254437+00', '2019-04-24 07:22:25.25495+00', false, 'aaaa', '{"must": [{"data": "AK", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (20, '2019-04-24 07:39:15.605354+00', '2019-04-24 07:39:15.605667+00', false, '123', '{"must": []}', 2, '{}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (21, '2019-04-24 07:39:31.482954+00', '2019-04-24 07:39:31.483254+00', false, '222', '{"must": [{"data": "22", "operand": "2", "operator": "Not equal to"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (22, '2019-04-24 07:40:02.745687+00', '2019-04-24 07:40:02.746008+00', false, '1232concc', '{"must": [{"data": "AK", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Send Email Manually"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (23, '2019-04-24 08:02:10.668937+00', '2019-04-24 08:02:10.669219+00', false, 'til', '{"must": [{"data": "33", "operand": "2", "operator": "Greater than"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (24, '2019-04-24 08:03:48.528281+00', '2019-04-24 08:03:48.528781+00', false, 'asdasd', '{"must": [{"data": "22", "operand": "2", "operator": "Less than"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (25, '2019-04-24 08:04:24.258548+00', '2019-04-24 08:04:24.259063+00', false, '123fff', '{"must": [{"data": "22", "operand": "2", "operator": "Less than"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (26, '2019-04-24 08:05:21.376099+00', '2019-04-24 08:05:21.376582+00', false, 'metgi', '{"must": [{"data": "33", "operand": "2", "operator": "Less than"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (2, '2019-04-18 12:01:12.803064+00', '2019-04-29 11:25:28.457597+00', false, 'aaaa', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (32, '2019-04-24 09:36:42.290088+00', '2019-04-24 09:37:15.415781+00', false, '222vutien2', '{"must": [{"data": "22", "operand": "2", "operator": "Greater than"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (36, '2019-05-06 12:48:51.529037+00', '2019-05-06 12:48:51.529393+00', false, 'lamsaotui biet', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email","Send Email Manually"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (19, '2019-04-24 07:36:58.396655+00', '2019-04-24 09:42:29.723636+00', false, 'ALo2334456', '{"must": [{"data": "AK", "operand": "1", "operator": "Not equal to"}]}', 2, '{"Call Client","Send Email Manually"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (38, '2019-05-06 13:54:47.292423+00', '2019-05-06 13:54:47.2927+00', false, 'asdasd', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (39, '2019-05-06 14:07:18.203177+00', '2019-05-06 14:07:18.203535+00', false, 'vvvvvv33', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (1, '2019-04-18 11:37:34.012046+00', '2019-05-06 14:15:05.931501+00', false, 'aaa3', '{"must": [{"data": "22", "operand": "2", "operator": "Not equal to"}]}', 2, '{"Call Client","Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (41, '2019-05-06 14:18:03.065952+00', '2019-05-06 14:18:03.066468+00', false, 'anhketu', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (42, '2019-05-06 14:18:53.803609+00', '2019-05-06 14:18:53.804029+00', false, 'Vukute', '{"must": [{"data": "AS", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (43, '2019-05-06 14:20:46.755466+00', '2019-05-06 14:20:46.755842+00', false, 'Bbebeb', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (44, '2019-05-06 14:23:34.09207+00', '2019-05-06 14:23:34.092441+00', false, 'BEBEBEBEB', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (45, '2019-05-06 14:25:21.694667+00', '2019-05-06 14:25:21.694987+00', false, 'sdsdsd3d3d', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (46, '2019-05-06 14:29:54.648133+00', '2019-05-06 14:29:54.648558+00', false, 'khongcoloi', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (47, '2019-05-06 14:31:06.469108+00', '2019-05-06 14:31:06.469487+00', false, 'vuku', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (48, '2019-05-06 14:32:00.365586+00', '2019-05-06 14:32:00.366037+00', false, 'likek', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (49, '2019-05-06 14:33:00.446449+00', '2019-05-06 14:33:00.446733+00', false, 'inkow', '{"must": [{"data": "AL", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (50, '2019-05-07 07:58:04.507583+00', '2019-05-07 07:58:04.507929+00', false, 'Anhkute3', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email","Call Client"}', true, NULL);
INSERT INTO public.campaigns_marketingplan (id, created, modified, is_removed, name, condition, manager_id, actions, can_modify, mail_template_id) VALUES (37, '2019-05-06 13:49:46.47742+00', '2019-05-07 11:44:51.354742+00', false, '3ABCS2345', '{"must": [{"data": "AK", "operand": "1", "operator": "Equal to"}]}', 2, '{"Send Email","Call Client"}', true, NULL);


--
-- Data for Name: campaigns_campaign; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (1, '2019-04-19 11:29:46.778739+00', '2019-04-19 11:29:46.839625+00', false, 'AAC', '2019-04-17', '2019-04-25', 'asdasd', 1, 1, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (2, '2019-04-20 08:22:27.550934+00', '2019-04-20 08:22:27.582222+00', false, 'Campagin 1', '2019-04-12', '2019-04-30', 'iyiihkjhkjh', 1, 2, 1);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (3, '2019-04-24 06:29:42.701761+00', '2019-04-24 06:29:42.702376+00', false, 'asdasd', '2019-04-24', '2019-04-27', '<p>sadasd</p>', 3, 2, 6);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (4, '2019-04-24 06:34:15.607632+00', '2019-04-24 06:34:15.608107+00', false, 'aaa', '2019-04-24', '2019-04-19', '<p>dsadsd</p>', 3, 2, 6);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (5, '2019-04-24 07:21:44.643026+00', '2019-04-24 07:21:44.643341+00', false, '222', '2019-04-25', '2019-04-19', '<p></p>', 3, 2, 6);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (6, '2019-04-26 03:41:30.225239+00', '2019-04-26 03:41:30.225641+00', false, 'Test1123', '2019-04-26', '2019-04-27', '<p>asdasdas</p>', 29, 2, 19);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (7, '2019-04-26 03:46:38.785609+00', '2019-04-26 03:46:38.785918+00', false, 'aaa', '2019-04-26', '2019-04-28', '<p>sad</p>', 29, 2, 19);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (8, '2019-04-26 03:51:49.954469+00', '2019-04-26 03:51:49.954915+00', false, 'nhanhlen', '2019-04-26', '2019-04-28', '<p>sd</p>', 29, 2, 19);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (9, '2019-04-26 03:54:18.950981+00', '2019-04-26 04:05:04.533782+00', false, 'hayqua hay', '2019-04-26', '2019-04-27', '<p>dasdasd</p>', 29, 2, 19);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (10, '2019-04-26 04:21:59.199517+00', '2019-04-26 04:24:47.200274+00', false, 'sao', '2019-04-26', '2019-04-27', '<p>a</p>', 29, 2, 19);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (12, '2019-04-26 04:39:25.614184+00', '2019-04-29 08:24:22.723322+00', false, 'aaaatoi nghi ls dc', '2019-04-26', '2019-04-27', '<p>aaa</p>', 29, 2, 35);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (11, '2019-04-26 04:25:30.020429+00', '2019-04-29 09:01:15.101602+00', false, 'Tienkute', '2019-04-26', '2019-06-01', '<p>sdad</p>', 29, 2, 19);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (13, '2019-05-06 12:43:57.950685+00', '2019-05-06 12:45:00.024857+00', false, 'Campaign moi', '2019-05-06', '2019-06-07', '<p>dsd</p>', 30, 2, 35);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (16, '2019-05-06 14:01:08.367493+00', '2019-05-06 14:01:08.367788+00', false, 'toto', '2019-05-04', '2019-05-23', '<p>ff</p>', 30, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (14, '2019-05-06 12:50:04.63162+00', '2019-05-07 07:58:38.95538+00', false, 'Demo', '2019-05-07', '2019-06-20', '<p>vvv</p>', 30, 2, 36);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (15, '2019-05-06 14:00:24.386678+00', '2019-05-07 07:58:42.871757+00', false, '222', '2019-05-07', '2019-05-22', '<p>ddd</p>', 30, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (18, '2019-05-07 10:43:55.035043+00', '2019-05-07 10:45:07.129804+00', false, 'Campaign Test', '2019-05-07', '2019-05-25', '<p>sdsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (17, '2019-05-06 14:03:23.381974+00', '2019-05-07 10:50:18.136534+00', false, 'blo', '2019-05-07', '2019-05-16', '<p>dddd</p>', 29, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (19, '2019-05-07 10:51:07.880502+00', '2019-05-07 10:51:07.880937+00', false, 'ABC', '2019-05-07', '2019-05-12', '<p>dd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (20, '2019-05-07 10:54:24.732409+00', '2019-05-07 10:54:24.732761+00', false, 'ADC', '2019-05-07', '2019-05-17', '<p>ddd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (21, '2019-05-07 10:57:05.565731+00', '2019-05-07 10:57:05.566227+00', false, 'qua dung', '2019-05-07', '2019-05-25', '<p>dd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (22, '2019-05-07 10:59:48.996729+00', '2019-05-07 10:59:49.000944+00', false, 'ALO', '2019-05-07', '2019-05-18', '<p>dsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (23, '2019-05-07 11:02:30.627848+00', '2019-05-07 11:02:30.628253+00', false, 'BBB', '2019-05-07', '2019-05-19', '<p>sdsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (24, '2019-05-07 11:05:11.954448+00', '2019-05-07 11:05:11.95518+00', false, 'SSSS', '2019-05-07', '2019-05-23', '<p>sdsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (25, '2019-05-07 11:10:50.449498+00', '2019-05-07 11:11:16.022155+00', false, '1 campain nao do', '2019-05-07', '2019-05-24', '<p>sdsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (26, '2019-05-07 11:12:52.895781+00', '2019-05-07 11:16:28.523727+00', true, 'asdasd', '2019-05-09', '2019-05-17', '<p>dsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (27, '2019-05-07 11:18:28.710338+00', '2019-05-07 11:18:44.958738+00', true, 'aaa22', '2019-05-17', '2019-05-25', '<p>s</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (28, '2019-05-07 11:45:44.875287+00', '2019-05-07 12:44:35.119857+00', false, 'Phong Vu 1', '2019-05-07', '2019-05-23', '<p>ss</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (29, '2019-05-07 12:44:23.083783+00', '2019-05-07 12:46:52.190071+00', false, 'vege', '2019-05-07', '2019-05-23', '<p>sdasd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (30, '2019-05-07 12:51:47.032673+00', '2019-05-07 12:52:09.417119+00', false, 'lewlew222', '2019-05-07', '2019-05-24', '<p>sd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (31, '2019-05-07 12:57:04.147054+00', '2019-05-07 13:00:33.311016+00', false, 'sdsdsdsd', '2019-05-07', '2019-05-18', '<p>dsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (32, '2019-05-07 13:15:27.020337+00', '2019-05-07 13:15:27.021027+00', false, 'dongian', '2019-05-07', '2019-05-16', '<p></p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (33, '2019-05-07 13:25:10.719734+00', '2019-05-07 13:25:10.720304+00', false, 'wowow', '2019-05-07', '2019-05-17', '<p>sd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (34, '2019-05-07 13:27:52.253781+00', '2019-05-07 13:27:52.254229+00', false, 'back end', '2019-05-07', '2019-05-17', '<p>sasd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (35, '2019-05-07 13:36:42.187493+00', '2019-05-07 13:36:58.25003+00', false, 'Vuvatien', '2019-05-07', '2019-05-31', '<p>sdd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (36, '2019-05-07 13:39:37.323747+00', '2019-05-07 13:39:37.324041+00', false, 'asdasd', '2019-05-07', '2019-05-23', '<p>vv</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (37, '2019-05-08 03:15:32.28063+00', '2019-05-08 03:15:32.280956+00', false, 'asdasd', '2019-05-08', '2019-05-23', '<p>sdsd</p>', 36, 2, 37);
INSERT INTO public.campaigns_campaign (id, created, modified, is_removed, name, start_date, end_date, "desc", follow_up_plan_id, manager_id, marketing_plan_id) VALUES (38, '2019-05-08 03:36:20.07134+00', '2019-05-08 03:36:20.072083+00', false, 'CLO', '2019-05-08', '2019-05-23', '<p>dsadsad</p>', 36, 2, 37);


--
-- Data for Name: campaigns_campaign_assigned_to; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (1, 1, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (2, 2, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (3, 3, 1);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (4, 4, 1);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (5, 5, 1);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (6, 6, 1);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (7, 7, 1);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (8, 8, 1);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (10, 9, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (12, 10, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (13, 11, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (14, 12, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (15, 13, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (16, 14, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (17, 15, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (18, 16, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (19, 17, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (20, 18, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (21, 19, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (22, 20, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (23, 21, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (24, 22, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (25, 23, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (26, 24, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (27, 25, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (28, 26, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (29, 27, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (30, 28, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (31, 29, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (32, 30, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (33, 31, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (34, 32, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (35, 33, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (36, 34, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (37, 35, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (38, 36, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (39, 37, 2);
INSERT INTO public.campaigns_campaign_assigned_to (id, campaign_id, user_id) VALUES (40, 38, 2);


--
-- Data for Name: packages_package; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (1, '2019-04-19 11:31:01.034115+00', '2019-04-19 11:31:01.03704+00', false, 'aaa', '1000', 1);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (2, '2019-04-29 11:23:49.178607+00', '2019-04-29 11:23:49.179408+00', false, 'aaaaa', '{"1": "22", "6": "22", "12": "33", "999999": "444"}', 0);
INSERT INTO public.packages_package (id, created, modified, is_removed, name, prices, discount) VALUES (3, '2019-05-03 10:53:18.585092+00', '2019-05-03 10:53:18.585777+00', false, 'P1', '{"1": "400", "6": "400", "12": "109", "999999": "2323"}', 0);


--
-- Data for Name: campaigns_campaign_packages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (1, 2, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (2, 3, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (3, 4, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (4, 5, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (5, 6, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (6, 7, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (7, 8, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (8, 9, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (9, 10, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (10, 11, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (11, 12, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (12, 13, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (13, 14, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (14, 15, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (15, 16, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (16, 17, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (17, 18, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (18, 19, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (19, 20, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (20, 21, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (21, 22, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (22, 23, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (23, 24, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (24, 25, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (25, 26, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (26, 27, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (27, 28, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (28, 29, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (29, 30, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (30, 31, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (31, 32, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (32, 33, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (33, 34, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (34, 35, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (35, 36, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (36, 37, 1);
INSERT INTO public.campaigns_campaign_packages (id, campaign_id, package_id) VALUES (37, 38, 1);


--
-- Data for Name: contacts_contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (1, '2019-04-19 11:28:22.771325+00', '2019-04-19 11:32:30.783642+00', false, 'Duc Anh', 'Tran', 'alo@gmail.com', '1674834476', 'MALE', '29, street 14, district 2', 'Vietnam', '700000', 1, 'Ho Chi Minh', 'dsadasd', 'CA');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (2, '2019-04-19 11:42:20.270311+00', '2019-04-19 15:03:20.926227+00', false, 'Duc Anh3', 'Tran', 'alo@gmail.com', '1674834476', 'OTHER', '29, street 14, district 2', 'America', '700000', 1, 'San Jose', 'Fetch', 'CA');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (3, '2019-04-21 15:38:19.701825+00', '2019-04-21 15:38:19.702485+00', false, 'Duc Anh', 'Tran', 'alo@gmail.com', '1674834476', 'OTHER', '29, street 14, district 2', 'America', '700000', 2, 'Anchorage', 'Fetch', 'AK');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (4, '2019-04-21 15:39:28.551406+00', '2019-04-21 15:39:28.551707+00', false, 'Duc Anh2', 'Tran', 'al2o@gmail.com', '1674834476', 'OTHER', '29, street 14, district 2', 'America', '700000', 2, 'Chandler', 'Fetch', 'AZ');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (5, '2019-04-21 15:39:34.958105+00', '2019-04-21 15:39:34.958403+00', false, 'Duc Anh2w', 'Tran', 'al2o@gmail.com', '1674834476', 'OTHER', '29, street 14, district 2', 'America', '700000', 2, 'Chandler', 'Fetch', 'AZ');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (6, '2019-04-21 15:39:41.728107+00', '2019-04-21 15:39:41.72838+00', false, 'Duc Anh2w', 'Trans', 'al2o@gmail.com', '1678344762', 'OTHER', '29, street 14, district 2', 'America', '700000', 2, 'Chandler', 'Fetch', 'AZ');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (7, '2019-04-21 15:40:15.736084+00', '2019-04-21 15:40:15.736489+00', false, 'Duc2222 Anh', 'Tran', 'al2o@gmail.com', '0374834477', 'OTHER', '29, street 14, district 2asdasdasd', 'America', '700000', 2, 'Little Rock', 'Fetch', 'AR');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (8, '2019-04-21 15:40:21.99721+00', '2019-04-21 15:40:21.997597+00', false, 'ANHHNHNH', 'Tran', 'al2o@gmail.com', '0374834477', 'OTHER', '29, street 14, district 2asdasdasd', 'America', '700000', 2, 'Little Rock', 'Fetch', 'AR');
INSERT INTO public.contacts_contact (id, created, modified, is_removed, first_name, last_name, mail, phone, sex, address, country, zipcode, user_id, city, org, state) VALUES (9, '2019-05-07 11:02:01.286616+00', '2019-05-07 11:02:01.28709+00', false, 'Duc Anh3', 'Tran', 'alo@gmail.com', '1674834476', 'OTHER', '29, street 14, district 2', 'America', '700000', 2, 'Anchorage', 'Fetch', 'AK');


--
-- Data for Name: campaigns_contactmarketing; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (1, '2019-04-20 08:24:11.245957+00', '2019-04-29 07:03:59.27703+00', false, 2, 2, 1, 1, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (45, '2019-05-07 13:15:27.238702+00', '2019-05-07 13:20:11.121612+00', false, 2, 32, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (18, '2019-04-26 04:25:30.17444+00', '2019-05-02 12:01:05.133964+00', false, 2, 11, 4, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (44, '2019-05-07 13:15:27.212891+00', '2019-05-07 13:21:14.644486+00', false, 2, 32, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (37, '2019-05-07 11:12:53.033492+00', '2019-05-07 13:21:51.810324+00', false, 2, 26, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (16, '2019-04-26 04:25:30.150529+00', '2019-05-06 12:13:19.893652+00', false, 2, 11, 1, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (22, '2019-04-26 04:25:30.216948+00', '2019-04-26 04:39:42.01309+00', false, 2, 11, 8, 19, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (19, '2019-04-26 04:25:30.186314+00', '2019-05-06 12:13:25.486101+00', false, 2, 11, 5, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (3, '2019-04-26 03:54:19.263644+00', '2019-04-26 04:52:31.372369+00', false, 2, 9, 2, 19, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (23, '2019-04-26 04:39:25.743385+00', '2019-04-26 04:52:54.856771+00', false, 2, 12, 3, 35, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (36, '2019-05-07 11:12:53.01749+00', '2019-05-07 13:22:18.400534+00', false, 2, 26, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (5, '2019-04-26 03:54:19.294229+00', '2019-04-26 04:54:06.991177+00', false, 2, 9, 5, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (6, '2019-04-26 03:54:19.307267+00', '2019-04-26 04:55:40.21024+00', false, 2, 9, 6, 19, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (20, '2019-04-26 04:25:30.195987+00', '2019-05-06 12:13:38.804709+00', false, 2, 11, 6, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (9, '2019-04-26 04:21:59.340522+00', '2019-04-26 04:58:04.694906+00', false, 2, 10, 1, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (8, '2019-04-26 03:54:19.340676+00', '2019-04-26 05:46:27.353063+00', false, 2, 9, 8, 19, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (21, '2019-04-26 04:25:30.205775+00', '2019-05-06 12:19:32.497657+00', false, 2, 11, 7, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (17, '2019-04-26 04:25:30.163904+00', '2019-05-06 13:22:34.3091+00', false, 2, 11, 2, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (10, '2019-04-26 04:21:59.355408+00', '2019-04-26 05:46:42.7771+00', false, 2, 10, 2, 19, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (24, '2019-05-06 14:00:24.614005+00', '2019-05-07 10:12:05.07921+00', false, 2, 15, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (38, '2019-05-07 11:18:28.833975+00', '2019-05-07 13:22:45.71011+00', false, 2, 27, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (11, '2019-04-26 04:21:59.36774+00', '2019-04-26 06:25:51.58699+00', false, 2, 10, 4, 19, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (4, '2019-04-26 03:54:19.279962+00', '2019-04-29 04:20:13.59567+00', false, 2, 9, 4, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (25, '2019-05-07 10:43:55.253311+00', '2019-05-07 10:45:27.55447+00', false, 2, 18, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (26, '2019-05-07 10:51:08.019882+00', '2019-05-07 10:51:23.47384+00', false, 2, 19, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (7, '2019-04-26 03:54:19.324377+00', '2019-04-29 04:33:56.571409+00', false, 2, 9, 7, 19, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (27, '2019-05-07 10:54:24.873262+00', '2019-05-07 10:54:35.637936+00', false, 2, 20, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (28, '2019-05-07 10:57:05.764632+00', '2019-05-07 10:59:06.457622+00', false, 2, 21, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (29, '2019-05-07 10:59:49.230323+00', '2019-05-07 11:00:03.280923+00', false, 2, 22, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (30, '2019-05-07 11:02:30.789956+00', '2019-05-07 11:02:40.382671+00', false, 2, 23, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (39, '2019-05-07 11:18:28.850466+00', '2019-05-07 13:22:59.119355+00', false, 2, 27, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (2, '2019-04-26 03:54:19.241113+00', '2019-04-29 06:05:43.827476+00', false, 2, 9, 1, 19, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (31, '2019-05-07 11:02:30.80676+00', '2019-05-07 11:04:33.356959+00', false, 2, 23, 9, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (33, '2019-05-07 11:05:12.154376+00', '2019-05-07 11:05:26.983625+00', false, 2, 24, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (12, '2019-04-26 04:21:59.379703+00', '2019-04-29 06:29:37.713398+00', false, 2, 10, 5, 19, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (13, '2019-04-26 04:21:59.394558+00', '2019-04-29 06:53:20.143951+00', false, 2, 10, 6, 19, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (14, '2019-04-26 04:21:59.410398+00', '2019-04-29 07:01:29.614866+00', false, 2, 10, 7, 19, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (15, '2019-04-26 04:21:59.425771+00', '2019-04-29 07:02:53.319198+00', false, 2, 10, 8, 19, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (46, '2019-05-07 13:25:10.994002+00', '2019-05-07 13:25:33.494854+00', false, 2, 33, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (47, '2019-05-07 13:25:11.030756+00', '2019-05-07 13:27:07.859363+00', false, 2, 33, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (49, '2019-05-07 13:27:52.429036+00', '2019-05-07 13:28:02.801558+00', false, 2, 34, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (32, '2019-05-07 11:05:12.133058+00', '2019-05-07 12:08:46.359627+00', false, 2, 24, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (34, '2019-05-07 11:10:50.71501+00', '2019-05-07 12:11:38.17393+00', false, 2, 25, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (35, '2019-05-07 11:10:50.741844+00', '2019-05-07 12:27:29.517358+00', false, 2, 25, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (48, '2019-05-07 13:27:52.408529+00', '2019-05-07 13:28:08.56742+00', false, 2, 34, 3, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (40, '2019-05-07 11:45:45.024809+00', '2019-05-07 12:45:12.120715+00', false, 2, 28, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (41, '2019-05-07 11:45:45.041377+00', '2019-05-07 12:46:34.74311+00', false, 2, 28, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (42, '2019-05-07 12:44:23.295656+00', '2019-05-07 12:47:12.436792+00', false, 2, 29, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (43, '2019-05-07 12:44:23.316494+00', '2019-05-07 12:49:31.583638+00', false, 2, 29, 9, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (51, '2019-05-07 13:36:42.330155+00', '2019-05-07 13:37:28.821951+00', false, 2, 35, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (50, '2019-05-07 13:36:42.316529+00', '2019-05-07 13:38:01.801148+00', false, 2, 35, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (53, '2019-05-07 13:39:37.444594+00', '2019-05-07 13:39:47.306469+00', false, 2, 36, 9, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (54, '2019-05-08 03:15:32.398151+00', '2019-05-08 03:15:32.398527+00', false, 2, 37, 3, 37, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (57, '2019-05-08 03:36:20.293372+00', '2019-05-08 03:45:48.620564+00', false, 2, 38, 9, 37, 'FAILED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (56, '2019-05-08 03:36:20.263501+00', '2019-05-08 03:45:54.243377+00', false, 2, 38, 3, 37, 'COMPLETED', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (55, '2019-05-08 03:15:32.414061+00', '2019-05-09 11:33:23.515558+00', false, 2, 37, 9, 37, 'RUNNING', NULL);
INSERT INTO public.campaigns_contactmarketing (id, created, modified, is_removed, priority, campaign_id, contact_id, marketing_plan_id, status, job_id) VALUES (52, '2019-05-07 13:39:37.429211+00', '2019-05-09 11:35:29.709224+00', false, 2, 36, 3, 37, 'FAILED', NULL);


--
-- Data for Name: campaigns_contactmarketinghistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (1, '2019-04-20 08:34:54.364056+00', '2019-04-20 08:34:54.364683+00', false, 'Send Email Manually', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (2, '2019-04-20 08:35:46.277487+00', '2019-04-20 08:35:46.27787+00', false, 'Send Email Manually', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (3, '2019-04-25 13:34:54.869273+00', '2019-04-25 13:34:54.869737+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (4, '2019-04-25 13:34:56.670003+00', '2019-04-25 13:34:56.67043+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (5, '2019-04-25 13:34:57.164227+00', '2019-04-25 13:34:57.164925+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (6, '2019-04-25 13:34:57.323221+00', '2019-04-25 13:34:57.32349+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (7, '2019-04-25 13:34:57.49672+00', '2019-04-25 13:34:57.497088+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (8, '2019-04-25 15:57:57.763271+00', '2019-04-25 15:57:57.763498+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (9, '2019-04-26 05:46:27.356015+00', '2019-04-26 05:46:27.356414+00', false, 'Call Client', 8);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (10, '2019-04-26 05:46:42.368436+00', '2019-04-26 05:46:42.368746+00', false, 'Call Client', 10);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (11, '2019-04-26 05:46:42.628082+00', '2019-04-26 05:46:42.628409+00', false, 'Call Client', 10);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (12, '2019-04-26 05:46:42.780994+00', '2019-04-26 05:46:42.781434+00', false, 'Call Client', 10);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (13, '2019-04-26 05:47:54.75338+00', '2019-04-26 05:47:54.753801+00', false, 'Call Client', 18);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (14, '2019-04-26 06:10:17.276171+00', '2019-04-26 06:10:17.276427+00', false, 'Call Client', 18);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (15, '2019-04-26 06:19:23.712943+00', '2019-04-26 06:19:23.713214+00', false, 'Call Client', 18);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (16, '2019-04-26 06:25:51.591424+00', '2019-04-26 06:25:51.591709+00', false, 'Call Client', 11);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (17, '2019-04-29 04:20:00.86742+00', '2019-04-29 04:20:00.867775+00', false, 'Call Client', 4);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (18, '2019-04-29 04:20:13.602263+00', '2019-04-29 04:20:13.602759+00', false, 'Call Client', 4);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (19, '2019-04-29 04:21:28.317679+00', '2019-04-29 04:21:28.317913+00', false, 'Call Client', 2);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (20, '2019-04-29 04:21:41.490487+00', '2019-04-29 04:21:41.490766+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (21, '2019-04-29 04:21:52.232758+00', '2019-04-29 04:21:52.232992+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (22, '2019-04-29 04:33:56.574074+00', '2019-04-29 04:33:56.574341+00', false, 'Call Client', 7);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (23, '2019-04-29 04:35:38.725543+00', '2019-04-29 04:35:38.725826+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (24, '2019-04-29 04:35:48.01896+00', '2019-04-29 04:35:48.019228+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (25, '2019-04-29 04:36:08.17131+00', '2019-04-29 04:36:08.171833+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (26, '2019-04-29 05:41:42.940775+00', '2019-04-29 05:41:42.941016+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (27, '2019-04-29 05:41:48.310436+00', '2019-04-29 05:41:48.310697+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (28, '2019-04-29 05:42:09.56469+00', '2019-04-29 05:42:09.564945+00', false, 'Call Client', 2);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (29, '2019-04-29 05:43:07.771899+00', '2019-04-29 05:43:07.772221+00', false, 'Call Client', 2);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (30, '2019-04-29 05:58:46.508326+00', '2019-04-29 05:58:46.508642+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (31, '2019-04-29 06:05:20.00462+00', '2019-04-29 06:05:20.005159+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (32, '2019-04-29 06:05:25.408438+00', '2019-04-29 06:05:25.408919+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (33, '2019-04-29 06:05:43.832449+00', '2019-04-29 06:05:43.832796+00', false, 'Call Client', 2);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (34, '2019-04-29 06:15:07.989259+00', '2019-04-29 06:15:07.990164+00', false, 'Call Client', 20);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (35, '2019-04-29 06:15:13.943298+00', '2019-04-29 06:15:13.943563+00', false, 'Call Client', 20);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (36, '2019-04-29 06:21:12.572122+00', '2019-04-29 06:21:12.57238+00', false, 'Call Client', 20);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (37, '2019-04-29 06:22:30.718176+00', '2019-04-29 06:22:30.718531+00', false, 'Call Client', 20);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (38, '2019-04-29 06:25:36.637513+00', '2019-04-29 06:25:36.637833+00', false, 'Call Client', 21);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (39, '2019-04-29 06:27:21.129123+00', '2019-04-29 06:27:21.129778+00', false, 'Call Client', 21);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (40, '2019-04-29 06:28:08.387474+00', '2019-04-29 06:28:08.387833+00', false, 'Call Client', 21);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (41, '2019-04-29 06:29:32.259906+00', '2019-04-29 06:29:32.260238+00', false, 'Call Client', 12);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (42, '2019-04-29 06:29:37.718031+00', '2019-04-29 06:29:37.71843+00', false, 'Call Client', 12);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (43, '2019-04-29 06:36:54.094567+00', '2019-04-29 06:36:54.094807+00', false, 'Call Client', 21);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (44, '2019-04-29 06:53:20.14946+00', '2019-04-29 06:53:20.150315+00', false, 'Call Client', 13);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (45, '2019-04-29 07:01:29.620353+00', '2019-04-29 07:01:29.62064+00', false, 'Call Client', 14);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (46, '2019-04-29 07:02:53.326436+00', '2019-04-29 07:02:53.326788+00', false, 'Call Client', 15);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (47, '2019-04-29 07:03:34.864051+00', '2019-04-29 07:03:34.864363+00', false, 'Call Client', 16);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (48, '2019-04-29 07:03:59.281414+00', '2019-04-29 07:03:59.281774+00', false, 'Call Client', 1);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (49, '2019-04-29 09:37:05.453309+00', '2019-04-29 09:37:05.454141+00', false, 'Call Client', 19);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (50, '2019-04-29 09:37:10.602002+00', '2019-04-29 09:37:10.602348+00', false, 'Call Client', 19);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (51, '2019-04-29 09:56:26.983566+00', '2019-04-29 09:56:26.983946+00', false, 'Call Client', 17);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (52, '2019-05-04 05:02:22.99333+00', '2019-05-04 05:02:22.993652+00', false, 'Call Client', 16);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (53, '2019-05-07 11:45:55.599085+00', '2019-05-07 11:45:55.599397+00', false, 'Call Client', 32);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (54, '2019-05-07 11:46:32.132641+00', '2019-05-07 11:46:32.132885+00', false, 'Call Client', 32);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (55, '2019-05-07 11:52:17.447244+00', '2019-05-07 11:52:17.447488+00', false, 'Call Client', 32);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (56, '2019-05-07 11:53:03.592141+00', '2019-05-07 11:53:03.592383+00', false, 'Call Client', 32);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (57, '2019-05-07 12:44:51.114471+00', '2019-05-07 12:44:51.114767+00', false, 'Call Client', 40);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (58, '2019-05-07 13:01:52.559755+00', '2019-05-07 13:01:52.560107+00', false, 'Call Client', 37);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (59, '2019-05-09 11:33:14.142967+00', '2019-05-09 11:33:14.143458+00', false, 'Call Client', 52);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (60, '2019-05-09 11:33:23.521162+00', '2019-05-09 11:33:23.521598+00', false, 'Call Client', 55);
INSERT INTO public.campaigns_contactmarketinghistory (id, created, modified, is_removed, action, contact_marketing_id) VALUES (61, '2019-05-09 11:33:48.242411+00', '2019-05-09 11:33:48.242641+00', false, 'Call Client', 52);


--
-- Data for Name: campaigns_note; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.campaigns_note (id, created, modified, is_removed, name, content, _type, campaign_id, contact_id, user_id) VALUES (3, '2019-04-26 07:32:30.259923+00', '2019-04-26 07:32:30.26033+00', false, 'Default Title', '', 'MARKETING', 11, 6, 2);
INSERT INTO public.campaigns_note (id, created, modified, is_removed, name, content, _type, campaign_id, contact_id, user_id) VALUES (2, '2019-04-26 07:28:53.902516+00', '2019-04-26 07:37:05.422496+00', false, 'Default Title', '<p>asfasf</p>', 'MARKETING', 11, 5, 2);
INSERT INTO public.campaigns_note (id, created, modified, is_removed, name, content, _type, campaign_id, contact_id, user_id) VALUES (1, '2019-04-26 07:18:15.340513+00', '2019-04-26 08:52:16.83201+00', false, 'Alo', '<p>sadasd</p>', 'MARKETING', 11, 4, 2);
INSERT INTO public.campaigns_note (id, created, modified, is_removed, name, content, _type, campaign_id, contact_id, user_id) VALUES (4, '2019-04-29 04:33:00.288327+00', '2019-04-29 04:33:11.580123+00', false, 'Vutien', '<p>dasdasd</p>', 'MARKETING', 2, 1, 2);
INSERT INTO public.campaigns_note (id, created, modified, is_removed, name, content, _type, campaign_id, contact_id, user_id) VALUES (5, '2019-04-29 06:12:30.856222+00', '2019-04-29 06:12:30.8568+00', false, 'Default Title', '<p>sadasdsad</p>', 'MARKETING', 11, 7, 2);


--
-- Data for Name: contacts_contactgroup; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, user_id, _type, editor_id) VALUES (1, '2019-04-18 11:36:29.574144+00', '2019-04-18 11:36:29.58533+00', false, 'All Contacts', 1, 'PRIVATE', 1);
INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, user_id, _type, editor_id) VALUES (2, '2019-04-18 11:36:46.716935+00', '2019-04-18 11:36:46.726461+00', false, 'All Contacts', 2, 'PRIVATE', 2);
INSERT INTO public.contacts_contactgroup (id, created, modified, is_removed, name, user_id, _type, editor_id) VALUES (3, '2019-04-19 05:24:29.965148+00', '2019-04-19 05:24:29.965585+00', false, 'Test', 2, 'PRIVATE', NULL);


--
-- Data for Name: contacts_contactgroup_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (1, 1, 2);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (2, 2, 3);
INSERT INTO public.contacts_contactgroup_contacts (id, contactgroup_id, contact_id) VALUES (13, 2, 9);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (1, '2019-04-18 11:34:19.753635+00', '2', 'vuthao', 1, '[{"added": {}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (2, '2019-04-18 11:34:37.995867+00', '1', 'Profile object (1)', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (3, '2019-04-18 11:34:59.148729+00', '2', 'Profile object (2)', 1, '[{"added": {}}]', 9, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (4, '2019-04-18 11:36:29.591257+00', '1', 'ContactGroup object (1)', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (5, '2019-04-18 11:36:46.730978+00', '2', 'ContactGroup object (2)', 1, '[{"added": {}}]', 17, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (6, '2019-04-19 11:28:22.840723+00', '1', 'Contact object (1)', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (7, '2019-04-19 11:29:09.851782+00', '1', 'FollowUpPlan object (1)', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (8, '2019-04-19 11:29:46.938237+00', '1', 'Campaign object (1)', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (9, '2019-04-19 11:30:49.085369+00', '1', 'Product object (1)', 1, '[{"added": {}}]', 13, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (10, '2019-04-19 11:30:57.449576+00', '1', 'Feature object (1)', 1, '[{"added": {}}]', 10, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (11, '2019-04-19 11:31:01.124809+00', '1', 'Package object (1)', 1, '[{"added": {}}]', 11, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (12, '2019-04-19 11:31:15.203653+00', '1', 'Order object (1)', 1, '[{"added": {}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (13, '2019-04-19 11:32:30.83632+00', '1', 'Contact object (1)', 2, '[{"changed": {"fields": ["state"]}}]', 16, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (14, '2019-04-20 08:22:27.72724+00', '2', 'Campaign object (2)', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (15, '2019-04-20 08:24:11.262073+00', '1', 'ContactMarketing object (1)', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (16, '2019-04-20 08:24:25.608755+00', '1', 'Event object (1)', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (17, '2019-04-20 08:30:41.389712+00', '5', 'MarketingPlan object (5)', 2, '[{"changed": {"fields": ["actions"]}}]', 20, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (18, '2019-04-20 08:33:15.203067+00', '1', 'MarketingPlan object (1)', 2, '[{"changed": {"fields": ["actions"]}}]', 20, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (19, '2019-04-20 08:34:09.999319+00', '2', 'vuthao', 2, '[{"changed": {"fields": ["email"]}}]', 6, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (20, '2019-04-24 03:05:43.419633+00', '1', 'Notification object (1)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (21, '2019-04-24 03:19:30.465478+00', '2', 'Notification object (2)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (22, '2019-04-24 03:19:38.096465+00', '3', 'Notification object (3)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (23, '2019-04-24 03:19:48.017784+00', '4', 'Notification object (4)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (24, '2019-04-24 03:20:05.991931+00', '5', 'Notification object (5)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (25, '2019-04-24 03:22:29.060422+00', '6', 'Notification object (6)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (26, '2019-04-24 03:22:34.452656+00', '7', 'Notification object (7)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (27, '2019-04-24 03:22:40.187196+00', '8', 'Notification object (8)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (28, '2019-04-24 03:22:47.042918+00', '9', 'Notification object (9)', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (29, '2019-04-26 04:01:10.90113+00', '9', 'Campaign object (9)', 2, '[{"changed": {"fields": ["manager", "assigned_to"]}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (30, '2019-04-26 04:05:04.581342+00', '9', 'Campaign object (9)', 2, '[{"changed": {"fields": ["manager"]}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (31, '2019-04-26 04:24:47.302987+00', '10', 'Campaign object (10)', 2, '[{"changed": {"fields": ["assigned_to"]}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (32, '2019-04-29 09:01:15.200878+00', '11', 'Campaign object (11)', 2, '[{"changed": {"fields": ["end_date"]}}]', 18, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (33, '2019-05-03 05:46:34.742772+00', '20', 'Step object (20)', 2, '[{"changed": {"fields": ["conditions"]}}]', 27, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (34, '2019-05-03 06:14:13.699751+00', '20', 'Step object (20)', 2, '[{"changed": {"fields": ["conditions"]}}]', 27, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (35, '2019-05-03 06:20:54.2496+00', '20', 'Step object (20)', 2, '[{"changed": {"fields": ["conditions"]}}]', 27, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (36, '2019-05-03 06:47:12.778932+00', '27', 'Step object (27)', 2, '[{"changed": {"fields": ["follow_up"]}}]', 27, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (37, '2019-05-03 08:17:20.200402+00', '3', 'StepDetail object (3)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (38, '2019-05-03 08:17:20.204857+00', '2', 'StepDetail object (2)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (39, '2019-05-03 08:17:20.206999+00', '1', 'StepDetail object (1)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (40, '2019-05-03 08:19:17.108281+00', '5', 'StepDetail object (5)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (41, '2019-05-03 08:19:17.112589+00', '4', 'StepDetail object (4)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (42, '2019-05-03 08:25:39.328393+00', '7', 'StepDetail object (7)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (43, '2019-05-03 08:25:39.332945+00', '6', 'StepDetail object (6)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (44, '2019-05-03 08:40:04.873375+00', '9', 'StepDetail object (9)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (45, '2019-05-03 08:40:04.876424+00', '8', 'StepDetail object (8)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (46, '2019-05-03 08:44:35.16425+00', '10', 'StepDetail object (10)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (47, '2019-05-03 08:51:40.601253+00', '12', 'StepDetail object (12)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (48, '2019-05-03 08:51:40.605241+00', '11', 'StepDetail object (11)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (49, '2019-05-03 08:54:59.573728+00', '14', 'StepDetail object (14)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (50, '2019-05-03 08:54:59.577891+00', '13', 'StepDetail object (13)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (51, '2019-05-03 08:56:16.712062+00', '15', 'StepDetail object (15)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (52, '2019-05-03 08:56:47.836569+00', '16', 'StepDetail object (16)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (53, '2019-05-03 08:57:59.078302+00', '17', 'StepDetail object (17)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (54, '2019-05-03 08:58:45.286765+00', '18', 'StepDetail object (18)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (55, '2019-05-03 09:01:09.365006+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (56, '2019-05-03 09:02:27.157139+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (57, '2019-05-03 09:05:35.008699+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (58, '2019-05-03 09:06:44.747291+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (59, '2019-05-03 09:09:05.867683+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (60, '2019-05-03 09:09:39.269807+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (61, '2019-05-03 09:10:56.807419+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (62, '2019-05-03 09:15:17.606943+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (63, '2019-05-03 09:16:01.175565+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (64, '2019-05-03 09:18:00.066775+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (65, '2019-05-03 09:20:21.319247+00', '19', 'StepDetail object (19)', 2, '[{"changed": {"fields": ["status"]}}]', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (66, '2019-05-03 09:53:05.957744+00', '20', 'StepDetail object (20)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (67, '2019-05-03 09:53:05.965563+00', '19', 'StepDetail object (19)', 3, '', 28, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (68, '2019-05-03 10:23:49.442032+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["name", "status", "packages"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (69, '2019-05-03 10:24:02.775827+00', '6', 'Order object (6)', 2, '[{"changed": {"fields": ["name", "status", "packages"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (70, '2019-05-03 10:29:34.458537+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (71, '2019-05-03 10:30:39.702202+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (72, '2019-05-03 10:31:27.23103+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (73, '2019-05-03 10:31:50.485822+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (74, '2019-05-03 10:32:14.847805+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (75, '2019-05-03 10:32:44.011356+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (76, '2019-05-03 10:32:50.979835+00', '6', 'Order object (6)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (77, '2019-05-03 10:42:21.611242+00', '6', 'Order object (6)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (78, '2019-05-03 10:44:45.834436+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (79, '2019-05-03 10:44:49.841635+00', '6', 'Order object (6)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (80, '2019-05-03 11:34:39.565863+00', '7', 'Order object (7)', 2, '[{"changed": {"fields": ["status"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (81, '2019-05-03 11:37:23.949648+00', '1', 'OrderPackages object (1)', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (82, '2019-05-03 11:37:40.881211+00', '2', 'OrderPackages object (2)', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (83, '2019-05-03 12:04:05.480338+00', '13', 'Order object (13)', 2, '[{"changed": {"fields": ["campaign"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (84, '2019-05-03 12:04:10.552498+00', '12', 'Order object (12)', 2, '[{"changed": {"fields": ["campaign"]}}]', 25, 1);
INSERT INTO public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) VALUES (85, '2019-05-03 12:04:15.874091+00', '11', 'Order object (11)', 2, '[{"changed": {"fields": ["campaign"]}}]', 25, 1);


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_migrations (id, app, name, applied) VALUES (1, 'contenttypes', '0001_initial', '2019-04-18 11:33:27.238337+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (2, 'auth', '0001_initial', '2019-04-18 11:33:27.294499+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (3, 'account', '0001_initial', '2019-04-18 11:33:27.380597+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (4, 'account', '0002_auto_20190321_2256', '2019-04-18 11:33:27.411601+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (5, 'account', '0003_remove_profile_manager', '2019-04-18 11:33:27.430524+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (6, 'admin', '0001_initial', '2019-04-18 11:33:27.453586+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (7, 'admin', '0002_logentry_remove_auto_add', '2019-04-18 11:33:27.477785+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (8, 'admin', '0003_logentry_add_action_flag_choices', '2019-04-18 11:33:27.490549+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (9, 'contenttypes', '0002_remove_content_type_name', '2019-04-18 11:33:27.518431+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (10, 'auth', '0002_alter_permission_name_max_length', '2019-04-18 11:33:27.527996+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (11, 'auth', '0003_alter_user_email_max_length', '2019-04-18 11:33:27.542742+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (12, 'auth', '0004_alter_user_username_opts', '2019-04-18 11:33:27.557989+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (13, 'auth', '0005_alter_user_last_login_null', '2019-04-18 11:33:27.573974+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (14, 'auth', '0006_require_contenttypes_0002', '2019-04-18 11:33:27.577625+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (15, 'auth', '0007_alter_validators_add_error_messages', '2019-04-18 11:33:27.590642+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (16, 'auth', '0008_alter_user_username_max_length', '2019-04-18 11:33:27.607533+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (17, 'auth', '0009_alter_user_last_name_max_length', '2019-04-18 11:33:27.620592+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (18, 'auth', '0010_alter_group_name_max_length', '2019-04-18 11:33:27.632277+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (19, 'auth', '0011_update_proxy_permissions', '2019-04-18 11:33:27.64532+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (20, 'contacts', '0001_initial', '2019-04-18 11:33:27.728255+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (21, 'contacts', '0002_auto_20190405_1827', '2019-04-18 11:33:27.829601+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (22, 'contacts', '0003_auto_20190410_1332', '2019-04-18 11:33:27.92534+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (23, 'packages', '0001_initial', '2019-04-18 11:33:28.014428+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (24, 'packages', '0002_auto_20190415_1027', '2019-04-18 11:33:28.10039+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (25, 'campaigns', '0001_initial', '2019-04-18 11:33:28.187855+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (26, 'campaigns', '0002_followupplan_manager', '2019-04-18 11:33:28.232669+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (27, 'campaigns', '0003_auto_20190405_1827', '2019-04-18 11:33:28.31851+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (28, 'campaigns', '0004_auto_20190410_1332', '2019-04-18 11:33:28.395585+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (29, 'campaigns', '0005_auto_20190415_1347', '2019-04-18 11:33:28.698178+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (30, 'campaigns', '0006_auto_20190415_1348', '2019-04-18 11:33:28.750846+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (31, 'campaigns', '0007_auto_20190418_1826', '2019-04-18 11:33:28.917496+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (32, 'orders', '0001_initial', '2019-04-18 11:33:28.97362+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (33, 'steps', '0001_initial', '2019-04-18 11:33:29.056006+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (34, 'orders', '0002_auto_20190415_1350', '2019-04-18 11:33:29.240714+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (35, 'orders', '0003_auto_20190418_1827', '2019-04-18 11:33:29.349686+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (36, 'contacts', '0004_auto_20190418_1827', '2019-04-18 11:33:29.436206+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (37, 'contacts', '0005_delete_note', '2019-04-18 11:33:29.445143+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (38, 'events', '0001_initial', '2019-04-18 11:33:29.494032+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (39, 'events', '0002_auto_20190415_1350', '2019-04-18 11:33:29.588794+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (40, 'jet', '0001_initial', '2019-04-18 11:33:29.636569+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (41, 'jet', '0002_delete_userdashboardmodule', '2019-04-18 11:33:29.647733+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (42, 'sessions', '0001_initial', '2019-04-18 11:33:29.663508+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (43, 'steps', '0002_auto_20190418_1826', '2019-04-18 11:33:29.727732+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (44, 'packages', '0003_auto_20190419_1727', '2019-04-19 10:28:04.145497+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (45, 'steps', '0003_auto_20190419_1727', '2019-04-19 10:28:04.189415+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (46, 'notifications', '0001_initial', '2019-04-24 03:02:00.589521+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (47, 'campaigns', '0008_auto_20190424_1039', '2019-04-24 03:39:21.880504+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (48, 'campaigns', '0009_remove_marketingplan_contacts', '2019-04-26 04:17:12.41074+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (49, 'packages', '0004_auto_20190426_1117', '2019-04-26 04:17:12.484047+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (50, 'events', '0003_auto_20190502_1749', '2019-05-02 10:49:38.415109+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (51, 'orders', '0004_license_lifetimelicense', '2019-05-02 10:49:38.551674+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (52, 'steps', '0004_stepdetail_status', '2019-05-02 11:18:00.944521+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (53, 'orders', '0005_auto_20190503_1827', '2019-05-03 11:27:35.550308+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (54, 'orders', '0006_order_packages', '2019-05-03 11:31:52.4699+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (55, 'orders', '0007_auto_20190506_1918', '2019-05-06 12:18:35.816366+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (56, 'steps', '0005_auto_20190506_1917', '2019-05-06 12:18:35.845759+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (57, 'orders', '0008_order_packages', '2019-05-06 12:18:50.45793+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (58, 'campaigns', '0010_auto_20190510_1102', '2019-05-10 04:02:48.268651+00');
INSERT INTO public.django_migrations (id, app, name, applied) VALUES (59, 'steps', '0006_auto_20190510_1102', '2019-05-10 04:02:48.406967+00');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('4ot0z7l691ulri9gscm6c7o9iy0loo99', 'NzQ3YTc4YzBmZTFjMGM5YzY2YzdmZDQ2MGYwOTk4YmM2ZjAzMzAyZDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxOGZhZWFjYzc3OGIzYTA1YjNkOWNhZWFmNmFmNWU5MzFkMzIxODkyIn0=', '2019-05-03 10:46:50.525961+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('9jvvxeon6o7v0qorkngbedvjck6hgn90', 'YmEzZjI2NmRhMDljY2I2ZjliNmU4YzIxMGFhODI0N2Y0YWM3MTI4Zjp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxOGZhZWFjYzc3OGIzYTA1YjNkOWNhZWFmNmFmNWU5MzFkMzIxODkyIiwiYWNjZXNzX3Rva2VuIjoieWEyOS5HbHZ4Qmh5aERlT25aZXNYS3F4bF81MmJ1amRNZzNwc3lHdkw0ZmhxMmFrNERkR01YR1NUUXdjODZwM1pHanBQZk1TRzRDT1Nqdzc3Rm5LTHU5cWJ6UFZUby13SGJFSVVTNm5PanlyeFJ2cFRySDlKR1UwMDlHUTlUZ1I5IiwicmVmcmVzaF90b2tlbiI6IjEvX2ZGOEsyc2dYRGI1aVJ6Qi05bFhmemtaNzFhNEZ6TjJ3X2ZxaFcyY3NUQSJ9', '2019-05-04 08:31:17.731956+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('xvas1k96ztagyb1zbramnym8zj718n82', 'NzQ3YTc4YzBmZTFjMGM5YzY2YzdmZDQ2MGYwOTk4YmM2ZjAzMzAyZDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxOGZhZWFjYzc3OGIzYTA1YjNkOWNhZWFmNmFmNWU5MzFkMzIxODkyIn0=', '2019-05-08 03:02:50.856757+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('p64ckafzot936bxx2qm0w4fht66pfc1d', 'NzQ3YTc4YzBmZTFjMGM5YzY2YzdmZDQ2MGYwOTk4YmM2ZjAzMzAyZDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxOGZhZWFjYzc3OGIzYTA1YjNkOWNhZWFmNmFmNWU5MzFkMzIxODkyIn0=', '2019-05-13 09:00:36.873726+00');
INSERT INTO public.django_session (session_key, session_data, expire_date) VALUES ('mw4l80c4kctcewwo37ms704broww2nus', 'NzQ3YTc4YzBmZTFjMGM5YzY2YzdmZDQ2MGYwOTk4YmM2ZjAzMzAyZDp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiIxOGZhZWFjYzc3OGIzYTA1YjNkOWNhZWFmNmFmNWU5MzFkMzIxODkyIn0=', '2019-05-17 03:07:55.226842+00');


--
-- Data for Name: orders_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (1, '2019-04-19 11:31:15.180841+00', '2019-04-19 11:31:15.192184+00', false, 'asdsdsd', 'RUNNING', 1, 2, 1);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (2, '2019-04-26 04:53:51.023123+00', '2019-04-26 04:53:51.024068+00', false, '', 'RUNNING', 4, 2, 9);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (3, '2019-04-26 04:54:06.995495+00', '2019-04-26 04:54:06.995766+00', false, '', 'RUNNING', 5, 2, 9);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (4, '2019-04-26 04:57:43.367486+00', '2019-04-26 04:57:43.367874+00', false, '', 'RUNNING', 7, 2, 9);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (5, '2019-04-26 04:58:04.699629+00', '2019-04-26 04:58:04.699905+00', false, '', 'RUNNING', 1, 2, 10);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (33, '2019-05-07 13:25:33.501617+00', '2019-05-07 13:25:33.502472+00', false, '', 'RUNNING', 3, 2, 33);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (34, '2019-05-07 13:27:07.86564+00', '2019-05-07 13:27:07.866078+00', false, '', 'RUNNING', 9, 2, 33);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (35, '2019-05-07 13:28:02.811578+00', '2019-05-07 13:28:02.813406+00', false, '', 'RUNNING', 9, 2, 34);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (36, '2019-05-07 13:37:28.827084+00', '2019-05-07 13:37:28.82737+00', false, '', 'RUNNING', 9, 2, 35);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (37, '2019-05-07 13:38:01.806777+00', '2019-05-07 13:38:01.807215+00', false, '', 'RUNNING', 3, 2, 35);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (38, '2019-05-07 13:39:47.31059+00', '2019-05-07 13:39:47.31124+00', false, '', 'RUNNING', 9, 2, 36);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (39, '2019-05-08 03:45:54.247769+00', '2019-05-08 03:45:54.248393+00', false, '', 'RUNNING', 3, 2, 38);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (8, '2019-05-03 11:45:42.549544+00', '2019-05-03 11:45:42.549928+00', false, 'Order so 10', 'RUNNING', 1, 1, 1);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (9, '2019-05-03 11:45:48.60078+00', '2019-05-03 11:45:48.601094+00', false, 'Order so 10', 'RUNNING', 1, 1, 1);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (10, '2019-05-03 11:46:28.058492+00', '2019-05-03 11:46:28.058984+00', false, 'Order so 10', 'RUNNING', 1, 1, 1);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (6, '2019-05-02 12:00:29.142875+00', '2019-05-04 05:11:50.526938+00', false, 'bbbb', 'FAILED', 1, 2, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (7, '2019-05-02 12:01:05.138613+00', '2019-05-04 05:11:56.004001+00', false, 'asfa', 'FAILED', 4, 2, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (13, '2019-05-03 11:58:14.883759+00', '2019-05-04 05:12:16.88129+00', false, 'Order so 10', 'FAILED', 1, 1, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (12, '2019-05-03 11:49:05.083819+00', '2019-05-04 05:13:14.658454+00', false, 'Order so 10', 'FAILED', 1, 1, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (16, '2019-05-06 12:13:38.809204+00', '2019-05-06 12:19:24.684193+00', false, '', 'FAILED', 6, 2, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (11, '2019-05-03 11:46:33.632182+00', '2019-05-06 12:19:28.318532+00', false, 'Order so 10', 'FAILED', 1, 1, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (21, '2019-05-07 11:05:26.988672+00', '2019-05-07 11:05:48.544356+00', false, '', 'FAILED', 9, 2, 24);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (14, '2019-05-06 12:13:19.898065+00', '2019-05-07 12:24:55.94348+00', false, '', 'FAILED', 1, 2, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (15, '2019-05-06 12:13:25.488973+00', '2019-05-07 12:31:12.431215+00', false, '', 'FAILED', 5, 2, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (17, '2019-05-06 12:19:32.502946+00', '2019-05-07 12:31:21.309458+00', false, '', 'FAILED', 7, 2, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (18, '2019-05-06 13:22:34.314184+00', '2019-05-07 12:31:35.307671+00', false, '', 'FAILED', 2, 2, 11);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (19, '2019-05-07 11:00:03.285385+00', '2019-05-07 12:32:03.275305+00', false, '', 'FAILED', 3, 2, 22);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (20, '2019-05-07 11:02:40.387108+00', '2019-05-07 12:32:40.067296+00', false, '', 'FAILED', 3, 2, 23);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (22, '2019-05-07 12:08:46.363525+00', '2019-05-07 12:39:34.460501+00', false, '', 'FAILED', 3, 2, 24);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (23, '2019-05-07 12:11:38.178172+00', '2019-05-07 12:42:39.599415+00', false, '', 'FAILED', 3, 2, 25);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (26, '2019-05-07 12:46:34.748682+00', '2019-05-07 12:46:34.748999+00', false, '', 'RUNNING', 9, 2, 28);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (27, '2019-05-07 12:47:12.440564+00', '2019-05-07 12:47:12.440881+00', false, '', 'RUNNING', 3, 2, 29);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (24, '2019-05-07 12:27:29.52252+00', '2019-05-07 12:53:38.019108+00', false, '', 'FAILED', 9, 2, 25);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (25, '2019-05-07 12:45:12.125942+00', '2019-05-07 12:53:56.270635+00', false, '', 'FAILED', 3, 2, 28);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (28, '2019-05-07 13:20:11.127391+00', '2019-05-07 13:20:11.127996+00', false, '', 'RUNNING', 9, 2, 32);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (29, '2019-05-07 13:21:13.105028+00', '2019-05-07 13:21:13.105499+00', false, '', 'RUNNING', 3, 2, 32);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (30, '2019-05-07 13:21:14.65547+00', '2019-05-07 13:21:14.655914+00', false, '', 'RUNNING', 3, 2, 32);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (31, '2019-05-07 13:21:51.816057+00', '2019-05-07 13:21:51.816473+00', false, '', 'RUNNING', 9, 2, 26);
INSERT INTO public.orders_order (id, created, modified, is_removed, name, status, contacts_id, sale_rep_id, campaign_id) VALUES (32, '2019-05-07 13:22:59.127604+00', '2019-05-07 13:22:59.128246+00', false, '', 'RUNNING', 9, 2, 27);


--
-- Data for Name: events_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (1, '2019-04-20 08:24:25.581338+00', '2019-04-20 08:24:25.5979+00', false, 'sdvdsf', '2019-04-19 17:00:00+00', '2019-04-29 17:00:00+00', 'sadasd', 0, 2, 1, 1, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (2, '2019-04-20 08:27:51.78515+00', '2019-04-20 08:27:51.785468+00', false, '<p>khiutihoi</p>', '2019-04-19 17:00:00+00', '2019-04-26 17:00:00+00', 'hui', 0, 2, 1, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (3, '2019-04-26 03:54:19.246179+00', '2019-04-26 03:54:19.246913+00', false, 'Contact Duc Anh Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 0', 0, 1, 2, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (4, '2019-04-26 03:54:19.265922+00', '2019-04-26 03:54:19.266607+00', false, 'Contact Duc Anh3 Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 1', 0, 1, 3, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (5, '2019-04-26 03:54:19.281967+00', '2019-04-26 03:54:19.282418+00', false, 'Contact Duc Anh2 Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 2', 0, 1, 4, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (6, '2019-04-26 03:54:19.296665+00', '2019-04-26 03:54:19.297142+00', false, 'Contact Duc Anh2w Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 3', 0, 1, 5, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (7, '2019-04-26 03:54:19.309706+00', '2019-04-26 03:54:19.31019+00', false, 'Contact Duc Anh2w Trans', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 4', 0, 1, 6, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (8, '2019-04-26 03:54:19.326876+00', '2019-04-26 03:54:19.327206+00', false, 'Contact Duc2222 Anh Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 5', 0, 1, 7, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (9, '2019-04-26 03:54:19.343005+00', '2019-04-26 03:54:19.34326+00', false, 'Contact ANHHNHNH Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 6', 0, 1, 8, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (10, '2019-04-26 04:21:59.343068+00', '2019-04-26 04:21:59.343463+00', false, 'Contact Duc Anh Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 0', 0, 1, 9, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (11, '2019-04-26 04:21:59.357336+00', '2019-04-26 04:21:59.357605+00', false, 'Contact Duc Anh3 Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 1', 0, 1, 10, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (12, '2019-04-26 04:21:59.369887+00', '2019-04-26 04:21:59.370164+00', false, 'Contact Duc Anh2 Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 2', 0, 1, 11, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (13, '2019-04-26 04:21:59.381819+00', '2019-04-26 04:21:59.382076+00', false, 'Contact Duc Anh2w Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 3', 0, 1, 12, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (14, '2019-04-26 04:21:59.396968+00', '2019-04-26 04:21:59.397429+00', false, 'Contact Duc Anh2w Trans', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 4', 0, 1, 13, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (15, '2019-04-26 04:21:59.412745+00', '2019-04-26 04:21:59.413257+00', false, 'Contact Duc2222 Anh Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 5', 0, 1, 14, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (16, '2019-04-26 04:21:59.428713+00', '2019-04-26 04:21:59.429177+00', false, 'Contact ANHHNHNH Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 6', 0, 1, 15, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (17, '2019-04-26 04:25:30.153257+00', '2019-04-26 04:25:30.153663+00', false, 'Contact Duc Anh Tran', '2019-04-25 17:00:00+00', '2019-04-27 17:00:00+00', 'Event 0', 0, 2, 16, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (18, '2019-04-26 04:25:30.165772+00', '2019-04-26 04:25:30.166168+00', false, 'Contact Duc Anh3 Tran', '2019-04-25 17:00:00+00', '2019-04-27 17:00:00+00', 'Event 1', 0, 2, 17, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (19, '2019-04-26 04:25:30.176401+00', '2019-04-26 04:25:30.176729+00', false, 'Contact Duc Anh2 Tran', '2019-04-25 17:00:00+00', '2019-04-27 17:00:00+00', 'Event 2', 0, 2, 18, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (20, '2019-04-26 04:25:30.188189+00', '2019-04-26 04:25:30.188462+00', false, 'Contact Duc Anh2w Tran', '2019-04-25 17:00:00+00', '2019-04-27 17:00:00+00', 'Event 3', 0, 2, 19, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (21, '2019-04-26 04:25:30.197624+00', '2019-04-26 04:25:30.197877+00', false, 'Contact Duc Anh2w Trans', '2019-04-25 17:00:00+00', '2019-04-27 17:00:00+00', 'Event 4', 0, 2, 20, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (22, '2019-04-26 04:25:30.207714+00', '2019-04-26 04:25:30.20818+00', false, 'Contact Duc2222 Anh Tran', '2019-04-25 17:00:00+00', '2019-04-27 17:00:00+00', 'Event 5', 0, 2, 21, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (23, '2019-04-26 04:25:30.218956+00', '2019-04-26 04:25:30.219401+00', false, 'Contact ANHHNHNH Tran', '2019-04-25 17:00:00+00', '2019-04-27 17:00:00+00', 'Event 6', 0, 2, 22, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (24, '2019-04-26 04:39:25.746839+00', '2019-04-26 04:39:25.747292+00', false, 'Contact Duc Anh Tran', '2019-04-25 17:00:00+00', '2019-04-26 17:00:00+00', 'Event 0', 0, 2, 23, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (25, '2019-05-06 10:32:56.065759+00', '2019-05-06 10:32:56.067015+00', false, '<p></p>', '2019-05-05 22:32:00+00', '2019-05-05 22:32:00+00', 'ấd', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (26, '2019-05-06 10:35:51.501548+00', '2019-05-06 10:35:51.501853+00', false, '<p>asdasd</p>', '2019-05-05 22:35:00+00', '2019-05-05 22:35:00+00', 'aaa', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (27, '2019-05-06 10:37:21.612514+00', '2019-05-06 10:37:21.61281+00', false, '<p>asdsd</p>', '2019-05-05 22:37:00+00', '2019-05-05 22:37:00+00', 'asdasd', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (28, '2019-05-06 10:38:01.465254+00', '2019-05-06 10:38:01.465582+00', false, '<p>dddd</p>', '2019-05-05 22:37:00+00', '2019-05-05 22:37:00+00', 'hhhh', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (29, '2019-05-06 10:40:44.836972+00', '2019-05-06 10:40:44.837514+00', false, '<p>dd</p>', '2019-05-05 22:40:00+00', '2019-05-05 22:40:00+00', 'dsdsd', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (30, '2019-05-06 10:42:16.31314+00', '2019-05-06 10:42:16.313491+00', false, '<p>dddd</p>', '2019-05-05 22:42:00+00', '2019-05-05 22:42:00+00', 'dsdsd', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (31, '2019-05-06 10:44:07.90108+00', '2019-05-06 10:44:07.901764+00', false, '<p>dsdsd</p>', '2019-05-05 22:43:00+00', '2019-05-05 22:43:00+00', '222', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (32, '2019-05-06 14:00:24.620283+00', '2019-05-07 07:58:42.867134+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 24, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (33, '2019-05-07 10:43:55.257246+00', '2019-05-07 10:45:07.12339+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 25, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (34, '2019-05-07 10:51:08.023217+00', '2019-05-07 10:51:08.024144+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 26, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (35, '2019-05-07 10:54:24.876389+00', '2019-05-07 10:54:24.876967+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 27, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (36, '2019-05-07 10:57:05.771486+00', '2019-05-07 10:57:05.772007+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 28, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (37, '2019-05-07 10:59:49.23704+00', '2019-05-07 10:59:49.237817+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 29, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (38, '2019-05-07 11:02:30.792744+00', '2019-05-07 11:02:30.793203+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 30, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (39, '2019-05-07 11:02:30.809109+00', '2019-05-07 11:02:30.809716+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 31, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (40, '2019-05-07 11:05:12.137418+00', '2019-05-07 11:05:12.137891+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 32, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (41, '2019-05-07 11:05:12.157348+00', '2019-05-07 11:05:12.157834+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 33, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (42, '2019-05-07 11:10:50.719866+00', '2019-05-07 11:11:16.0047+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 34, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (43, '2019-05-07 11:10:50.745493+00', '2019-05-07 11:11:16.015371+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 35, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (44, '2019-05-07 11:12:53.020603+00', '2019-05-07 11:12:53.021096+00', false, 'Contact Duc Anh Tran', '2019-05-08 17:00:00+00', '2019-05-08 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 36, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (45, '2019-05-07 11:12:53.035615+00', '2019-05-07 11:12:53.036231+00', false, 'Contact Duc Anh3 Tran', '2019-05-08 17:00:00+00', '2019-05-08 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (46, '2019-05-07 11:18:28.836898+00', '2019-05-07 11:18:28.837756+00', false, 'Contact Duc Anh Tran', '2019-05-16 17:00:00+00', '2019-05-16 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 38, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (47, '2019-05-07 11:18:28.85274+00', '2019-05-07 11:18:28.853227+00', false, 'Contact Duc Anh3 Tran', '2019-05-16 17:00:00+00', '2019-05-16 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 39, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (48, '2019-05-07 11:36:30.154736+00', '2019-05-07 11:36:30.155121+00', false, '<p>dsd</p>', '2019-05-06 23:36:00+00', '2019-05-06 23:36:00+00', 'hehe', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (49, '2019-05-07 11:36:38.098872+00', '2019-05-07 11:36:38.099256+00', false, '<p>dsd</p>', '2019-05-06 23:36:00+00', '2019-05-06 23:36:00+00', 'hehe', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (50, '2019-05-07 11:38:51.184709+00', '2019-05-07 11:38:51.185158+00', false, '<p>sdsd</p>', '2019-05-06 23:38:00+00', '2019-05-06 23:38:00+00', 'hihi', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (51, '2019-05-07 11:42:27.636951+00', '2019-05-07 11:42:27.637371+00', false, '<p>dsd</p>', '2019-05-06 23:42:00+00', '2019-05-06 23:42:00+00', 'zozo', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (54, '2019-05-07 11:47:46.388002+00', '2019-05-07 11:47:46.388422+00', false, '<p></p>', '2019-05-06 23:47:00+00', '2019-05-06 23:47:00+00', 'aaa', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (55, '2019-05-07 11:55:20.532259+00', '2019-05-07 11:55:20.532848+00', false, '<p>dsd</p>', '2019-05-06 23:55:00+00', '2019-05-06 23:55:00+00', 'asdsdsd', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (56, '2019-05-07 11:55:57.044389+00', '2019-05-07 11:55:57.045002+00', false, '<p>sdsdsd</p>', '2019-05-06 23:55:00+00', '2019-05-06 23:55:00+00', 'asdasd', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (57, '2019-05-07 11:56:30.286954+00', '2019-05-07 11:56:30.287542+00', false, '<p></p>', '2019-05-06 23:56:00+00', '2019-05-06 23:56:00+00', 'sdsds', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (58, '2019-05-07 11:56:56.647141+00', '2019-05-07 11:56:56.647515+00', false, '<p></p>', '2019-05-06 23:56:00+00', '2019-05-06 23:56:00+00', 'sdsdd', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (59, '2019-05-07 12:39:27.001824+00', '2019-05-07 12:39:27.0026+00', false, '<p></p>', '2019-05-07 00:39:00+00', '2019-05-07 00:39:00+00', 'aaaa', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (60, '2019-05-07 12:43:03.986871+00', '2019-05-07 12:43:03.987301+00', false, '<p>sdsd</p>', '2019-05-07 00:42:00+00', '2019-05-07 00:42:00+00', 'sdasd', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (53, '2019-05-07 11:45:45.043536+00', '2019-05-07 12:44:35.115176+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 41, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (61, '2019-05-07 12:44:23.301238+00', '2019-05-07 12:46:52.176321+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 42, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (62, '2019-05-07 12:44:23.31895+00', '2019-05-07 12:46:52.184131+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 43, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (52, '2019-05-07 11:45:45.027876+00', '2019-05-07 12:44:35.107159+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 40, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (63, '2019-05-07 12:45:07.234999+00', '2019-05-07 12:45:07.235644+00', false, '<p></p>', '2019-05-07 00:44:00+00', '2019-05-07 00:44:00+00', 'sadasd', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (64, '2019-05-07 13:15:27.217442+00', '2019-05-07 13:15:27.218043+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 44, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (65, '2019-05-07 13:15:27.243825+00', '2019-05-07 13:15:27.2444+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 45, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (66, '2019-05-07 13:24:12.909649+00', '2019-05-07 13:24:12.910119+00', false, '<p></p>', '2019-05-07 01:24:00+00', '2019-05-07 01:24:00+00', 'hello', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (67, '2019-05-07 13:25:10.999412+00', '2019-05-07 13:25:11.000095+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 46, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (68, '2019-05-07 13:25:11.034666+00', '2019-05-07 13:25:11.035193+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 47, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (69, '2019-05-07 13:26:00.33533+00', '2019-05-07 13:26:00.336785+00', false, '<p></p>', '2019-05-07 01:25:00+00', '2019-05-07 01:25:00+00', 'dsdsd', 0, 2, 37, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (70, '2019-05-07 13:27:52.412546+00', '2019-05-07 13:27:52.413283+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 48, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (71, '2019-05-07 13:27:52.431901+00', '2019-05-07 13:27:52.432696+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 49, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (72, '2019-05-07 13:36:42.319171+00', '2019-05-07 13:36:58.238055+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 50, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (73, '2019-05-07 13:36:42.332382+00', '2019-05-07 13:36:58.244815+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 51, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (74, '2019-05-07 13:39:37.431924+00', '2019-05-07 13:39:37.432502+00', false, 'Contact Duc Anh Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 52, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (75, '2019-05-07 13:39:37.44668+00', '2019-05-07 13:39:37.447033+00', false, 'Contact Duc Anh3 Tran', '2019-05-06 17:00:00+00', '2019-05-06 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 53, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (76, '2019-05-07 15:58:28.462796+00', '2019-05-07 15:58:28.463211+00', false, '<p>á</p>', '2019-05-07 03:58:00+00', '2019-05-07 03:58:00+00', 'aaa', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (77, '2019-05-07 15:59:31.863425+00', '2019-05-07 15:59:31.863729+00', false, '<p>sd</p>', '2019-05-07 03:59:00+00', '2019-05-07 03:59:00+00', 'sdsdsadsdas', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (78, '2019-05-07 16:00:43.539873+00', '2019-05-07 16:00:43.540298+00', false, '<p></p>', '2019-05-07 04:00:00+00', '2019-05-07 04:00:00+00', 'aaa', 0, 2, NULL, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (79, '2019-05-08 03:15:32.4014+00', '2019-05-08 03:15:32.401753+00', false, 'Contact Duc Anh Tran', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 54, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (80, '2019-05-08 03:15:32.415894+00', '2019-05-08 03:15:32.416477+00', false, 'Contact Duc Anh3 Tran', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 55, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (81, '2019-05-08 03:36:20.271884+00', '2019-05-08 03:36:20.272667+00', false, 'Contact Duc Anh Tran', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh Tran', 0, 2, 56, NULL, 2);
INSERT INTO public.events_event (id, created, modified, is_removed, content, start_date, end_date, name, priority, assigned_to_id, marketing_id, order_id, user_id) VALUES (82, '2019-05-08 03:36:20.296227+00', '2019-05-08 03:36:20.296768+00', false, 'Contact Duc Anh3 Tran', '2019-05-07 17:00:00+00', '2019-05-07 17:00:00+00', 'Start contacting Duc Anh3 Tran', 0, 2, 57, NULL, 2);


--
-- Data for Name: events_event_contacts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (1, 1, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (2, 2, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (3, 3, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (4, 4, 2);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (5, 5, 4);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (6, 6, 5);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (7, 7, 6);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (8, 8, 7);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (9, 9, 8);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (10, 10, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (11, 11, 2);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (12, 12, 4);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (13, 13, 5);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (14, 14, 6);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (15, 15, 7);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (16, 16, 8);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (17, 17, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (18, 18, 2);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (19, 19, 4);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (20, 20, 5);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (21, 21, 6);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (22, 22, 7);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (23, 23, 8);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (24, 24, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (25, 25, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (26, 26, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (27, 27, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (28, 28, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (29, 29, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (30, 30, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (31, 31, 1);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (32, 32, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (33, 33, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (34, 34, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (35, 35, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (36, 36, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (37, 37, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (38, 38, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (39, 39, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (40, 40, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (41, 41, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (42, 42, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (43, 43, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (44, 44, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (45, 45, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (46, 46, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (47, 47, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (48, 48, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (49, 49, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (50, 50, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (51, 51, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (52, 52, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (53, 53, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (54, 54, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (55, 55, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (56, 56, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (57, 57, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (58, 58, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (59, 59, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (60, 60, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (61, 61, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (62, 62, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (63, 63, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (64, 64, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (65, 65, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (66, 66, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (67, 67, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (68, 68, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (69, 69, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (70, 70, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (71, 71, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (72, 72, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (73, 73, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (74, 74, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (75, 75, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (76, 76, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (77, 77, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (78, 78, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (79, 79, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (80, 80, 9);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (81, 81, 3);
INSERT INTO public.events_event_contacts (id, event_id, contact_id) VALUES (82, 82, 9);


--
-- Data for Name: jet_bookmark; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: jet_pinnedapplication; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notifications_notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (1, '2019-04-24 03:05:43.413476+00', '2019-04-24 03:06:35.616693+00', false, 'asdasd', 'http://localhost:8000/admin/notifications/notification', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (9, '2019-04-24 03:22:47.037876+00', '2019-04-24 03:33:42.871423+00', false, 'http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (8, '2019-04-24 03:22:40.18126+00', '2019-04-24 03:33:42.877843+00', false, 'http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (7, '2019-04-24 03:22:34.446075+00', '2019-04-24 03:33:42.882089+00', false, 'http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (6, '2019-04-24 03:22:29.053219+00', '2019-04-24 03:33:42.886832+00', false, 'http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (5, '2019-04-24 03:20:05.986296+00', '2019-04-24 03:33:42.890337+00', false, 'http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (4, '2019-04-24 03:19:48.011692+00', '2019-04-24 03:33:42.894402+00', false, 'http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (3, '2019-04-24 03:19:38.09034+00', '2019-04-24 03:33:42.899364+00', false, 'http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);
INSERT INTO public.notifications_notification (id, created, modified, is_removed, content, link, avatar, is_seen, user_id) VALUES (2, '2019-04-24 03:19:30.460379+00', '2019-04-24 03:33:42.903699+00', false, 'import PerfectScrollbar from ''react-perfect-scrollbar''import PerfectScrollbar from ''react-perfect-scrollbar''import PerfectScrollbar from ''react-perfect-scrollbar''import PerfectScrollbar from ''react-perfect-scrollbar''import PerfectScrollbar from ''react-perfect-scrollbar''sad', 'http://localhost:8000/admin/notifications/notification/add/', 'http://localhost:8000/admin/notifications/notification/add/', true, 2);


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
-- Data for Name: steps_step; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (1, '2019-04-20 07:14:44.937345+00', '2019-04-20 07:15:58.962242+00', false, 5, '[{"name": "Duc Anh Tran", "type": "check_box", "choices": ["Test"]}]', 2, '[{"label": "Send Email", "value": "Send Email"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (34, '2019-05-07 06:19:20.229744+00', '2019-05-07 06:19:28.020323+00', false, 34, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 38, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (32, '2019-05-07 06:16:59.848971+00', '2019-05-07 06:20:21.926267+00', false, 20, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 36, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (25, '2019-05-02 16:50:59.005024+00', '2019-05-02 16:50:59.006391+00', false, 2, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 31, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (26, '2019-05-02 16:51:26.191931+00', '2019-05-02 16:51:26.192953+00', false, 2, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 32, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (2, '2019-04-21 15:16:35.17509+00', '2019-04-24 06:10:16.153552+00', false, 20, '[{"name": "Hell", "type": "number", "choices": []}]', 3, '[{"label": "Call Client", "value": "Call Client"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (3, '2019-04-24 10:01:40.349065+00', '2019-04-24 10:01:40.350996+00', false, 4, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 4, '[{"label": "Call Client", "value": "Call Client"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (4, '2019-04-24 10:08:28.084951+00', '2019-04-24 10:08:28.086415+00', false, 0, '[]', 5, '[]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (5, '2019-04-24 10:08:28.085135+00', '2019-04-24 10:08:28.086745+00', false, 0, '[]', 5, '[]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (6, '2019-04-24 10:22:16.189609+00', '2019-04-24 10:22:16.190781+00', false, 4, '[{"name": "Duc Anh Tran2", "type": "text", "choices": []}]', 6, '[{"label": "Call Client", "value": "Call Client"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (7, '2019-04-24 10:22:16.189749+00', '2019-04-24 10:22:16.190859+00', false, 0, '[]', 6, '[]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (8, '2019-04-24 10:25:50.042869+00', '2019-04-24 10:25:50.04349+00', false, 34, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 7, '[{"label": "Send Email", "value": "Send Email"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (9, '2019-04-24 10:30:08.158665+00', '2019-04-24 10:30:08.159247+00', false, 23, '[{"name": "aaa222", "type": "text", "choices": []}]', 8, '[{"label": "Send Email", "value": "Send Email"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (10, '2019-04-24 10:34:36.424894+00', '2019-04-24 10:34:36.425419+00', false, 34, '[{"name": "hey hey", "type": "text", "choices": []}]', 9, '[{"label": "Call Client", "value": "Call Client"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (11, '2019-04-24 10:35:35.029532+00', '2019-04-24 10:35:35.030475+00', false, 23, '[{"name": "sadasd", "type": "text", "choices": []}]', 10, '[{"label": "Call Client", "value": "Call Client"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (12, '2019-04-24 10:36:05.547415+00', '2019-04-24 10:36:05.547894+00', false, 23, '[{"name": "111", "type": "text", "choices": []}]', 11, '[{"label": "Send Email", "value": "Send Email"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (13, '2019-04-24 10:37:21.487325+00', '2019-04-24 10:37:21.487933+00', false, 2, '[{"name": "asdsad", "type": "text", "choices": []}]', 12, '[{"label": "Send Email Manually", "value": "Send Email Manually"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (14, '2019-04-24 10:38:02.059634+00', '2019-04-24 10:38:02.060346+00', false, 23, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 13, '[{"label": "Send Email", "value": "Send Email"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (15, '2019-04-24 11:07:49.406244+00', '2019-04-24 11:07:49.407162+00', false, 50, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 22, '[{"label": "Send Email", "value": "Send Email"}, {"label": "Send Email Manually", "value": "Send Email Manually"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (28, '2019-05-02 16:58:16.011241+00', '2019-05-02 16:58:16.011644+00', false, 12, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 33, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (16, '2019-04-24 11:37:54.15289+00', '2019-04-24 11:42:10.102549+00', false, 23, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 25, '[{"label": "Send Email", "value": "Send Email"}, {"label": "Send Email Manually", "value": "Send Email Manually"}, {"label": "Call Client", "value": "Call Client"}]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (17, '2019-04-24 12:09:58.732614+00', '2019-04-24 12:09:58.733877+00', false, 1212, '[]', 26, '[null, null]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (18, '2019-04-24 12:12:52.928473+00', '2019-04-24 12:12:52.929179+00', false, 123123, '[{"name": "Duc Anh Tran", "type": "number", "choices": []}]', 27, '[null]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (19, '2019-04-24 12:14:18.008738+00', '2019-04-24 12:14:18.009574+00', false, 22, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 28, '[null, null]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (20, '2019-04-24 12:15:04.890068+00', '2019-05-03 06:20:54.247028+00', false, 22, '[{"name": "aaa", "type": "radio", "choices": ["A > B", "B >A"]}, {"name": "WOoo", "type": "text", "choices": []}]', 29, '["Send Email", "Send Email Manually", "Call Client"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (27, '2019-05-02 16:51:26.192086+00', '2019-05-03 06:47:12.777155+00', false, 32, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 29, '["Call Client"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (24, '2019-05-02 16:50:35.679713+00', '2019-05-06 14:18:21.24086+00', false, 23, '[{"name": "asdasd", "type": "text", "choices": []}]', 30, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (29, '2019-05-07 06:13:19.314747+00', '2019-05-07 06:13:19.315229+00', false, 3, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 34, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (30, '2019-05-07 06:13:19.314841+00', '2019-05-07 06:13:19.315392+00', false, 3, '[{"name": "Anh", "type": "text", "choices": []}]', 34, '["Call Client"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (31, '2019-05-07 06:15:41.739438+00', '2019-05-07 06:15:41.739956+00', false, 33, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 35, '["Send Email"]', NULL);
INSERT INTO public.steps_step (id, created, modified, is_removed, duration, conditions, follow_up_id, actions, mail_template_id) VALUES (33, '2019-05-07 06:17:30.644654+00', '2019-05-07 06:17:30.645651+00', false, 20, '[{"name": "Duc Anh Tran", "type": "text", "choices": []}]', 37, '["Send Email"]', NULL);


--
-- Data for Name: steps_stepdetail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (1, '2019-05-03 08:15:50.836823+00', '2019-05-03 08:15:50.837338+00', true, '{"aaa": {"type": "radio", "result": "A > B"}, "WOoo": {"type": "text", "result": ""}}', 6, 20, 'RUNNING');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (2, '2019-05-03 08:16:03.315272+00', '2019-05-03 08:16:03.315542+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": ""}}', 6, 20, 'RUNNING');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (3, '2019-05-03 08:16:59.19084+00', '2019-05-03 08:16:59.191116+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": ""}}', 6, 20, 'RUNNING');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (4, '2019-05-03 08:17:27.714248+00', '2019-05-03 08:17:27.714515+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": ""}}', 6, 20, 'RUNNING');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (5, '2019-05-03 08:17:33.278776+00', '2019-05-03 08:17:33.279084+00', true, '{"aaa": {"type": "radio", "result": "A > B"}, "WOoo": {"type": "text", "result": ""}}', 6, 20, 'RUNNING');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (20, '2019-05-03 09:22:02.289519+00', '2019-05-03 09:22:02.289775+00', true, '{"Duc Anh Tran": {"type": "text", "result": "asfasf"}}', 6, 27, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (19, '2019-05-03 09:00:28.909553+00', '2019-05-03 09:51:53.828482+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": "ffff"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (6, '2019-05-03 08:19:56.092875+00', '2019-05-03 08:22:45.098813+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": "asfasfasfasf"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (7, '2019-05-03 08:20:32.471956+00', '2019-05-03 08:23:06.25551+00', true, '{"Duc Anh Tran": {"type": "text", "result": "Quang tri sound"}}', 6, 27, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (21, '2019-05-03 09:55:10.355629+00', '2019-05-03 09:55:10.355889+00', false, '{"aaa": {"type": "radio", "result": ""}, "WOoo": {"type": "text", "result": ""}}', 6, 20, 'RUNNING');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (8, '2019-05-03 08:34:50.775927+00', '2019-05-03 08:35:04.043224+00', true, '{"aaa": {"type": "radio", "result": "A > B"}, "WOoo": {"type": "text", "result": "baac"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (9, '2019-05-03 08:39:38.100384+00', '2019-05-03 08:39:38.10064+00', true, '{"Duc Anh Tran": {"type": "text", "result": "asfasf"}}', 6, 27, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (10, '2019-05-03 08:42:40.962424+00', '2019-05-03 08:42:40.962682+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": "asfafs"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (11, '2019-05-03 08:48:45.971125+00', '2019-05-03 08:48:45.971441+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": "asfasf"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (12, '2019-05-03 08:49:21.401393+00', '2019-05-03 08:49:21.401653+00', true, '{"Duc Anh Tran": {"type": "text", "result": "asfasf"}}', 6, 27, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (13, '2019-05-03 08:54:07.740775+00', '2019-05-03 08:54:07.741033+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": ""}}', 6, 20, 'RUNNING');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (14, '2019-05-03 08:54:14.200787+00', '2019-05-03 08:54:14.201055+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": "asfasf"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (15, '2019-05-03 08:55:43.353161+00', '2019-05-03 08:55:43.353457+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": "sbdfsdfb"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (16, '2019-05-03 08:56:26.193059+00', '2019-05-03 08:56:26.193687+00', true, '{"aaa": {"type": "radio", "result": "B >A"}, "WOoo": {"type": "text", "result": "asfasf"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (17, '2019-05-03 08:57:08.671865+00', '2019-05-03 08:57:08.672152+00', true, '{"aaa": {"type": "radio", "result": ""}, "WOoo": {"type": "text", "result": "asfasfasf"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (18, '2019-05-03 08:58:10.998595+00', '2019-05-03 08:58:10.99908+00', true, '{"aaa": {"type": "radio", "result": "A > B"}, "WOoo": {"type": "text", "result": "asfasf"}}', 6, 20, 'COMPLETED');
INSERT INTO public.steps_stepdetail (id, created, modified, is_removed, information, order_id, step_id, status) VALUES (22, '2019-05-07 14:16:32.623994+00', '2019-05-07 14:16:32.624412+00', false, '{"Duc Anh Tran": {"type": "text", "result": "asfasf"}}', 26, 32, 'COMPLETED');


--
-- Data for Name: orders_orderhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders_orderhistory (id, created, modified, is_removed, date, action, order_id, step_detail_id) VALUES (1, '2019-05-03 09:51:53.88348+00', '2019-05-03 09:51:53.883771+00', false, '2019-05-03', 'Call Client', 6, 19);
INSERT INTO public.orders_orderhistory (id, created, modified, is_removed, date, action, order_id, step_detail_id) VALUES (2, '2019-05-03 09:55:10.391559+00', '2019-05-03 09:55:10.392142+00', false, '2019-05-03', 'Call Client', 6, 21);


--
-- Data for Name: packages_productcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (1, '2019-04-19 10:28:17.065512+00', '2019-04-19 10:28:17.066067+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (2, '2019-04-19 10:30:45.873737+00', '2019-04-19 10:30:45.874188+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (3, '2019-04-19 10:30:56.756483+00', '2019-04-19 10:30:56.756696+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (4, '2019-04-19 10:30:57.668121+00', '2019-04-19 10:30:57.668402+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (5, '2019-04-19 10:30:57.825687+00', '2019-04-19 10:30:57.825944+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (6, '2019-04-19 10:31:36.214029+00', '2019-04-19 10:31:36.214456+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (7, '2019-04-19 10:33:35.44025+00', '2019-04-19 10:33:35.440475+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (8, '2019-04-19 10:33:47.13556+00', '2019-04-19 10:33:47.135758+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (9, '2019-04-19 10:38:02.288476+00', '2019-04-19 10:38:02.288692+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (10, '2019-04-19 10:38:18.595574+00', '2019-04-19 10:38:18.595864+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (11, '2019-04-19 10:40:29.619112+00', '2019-04-19 10:40:29.619432+00', false, 'Vu', NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (12, '2019-04-19 10:41:19.743929+00', '2019-04-19 10:41:19.744154+00', false, 'Vuthao2', '', 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (13, '2019-04-19 10:42:01.307397+00', '2019-04-19 10:42:01.30783+00', false, 'vulau', 'ss', 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (14, '2019-04-19 10:42:22.314092+00', '2019-04-19 10:42:22.314371+00', false, NULL, NULL, 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (15, '2019-04-19 10:43:15.02224+00', '2019-04-19 10:43:15.022802+00', false, 'type1', 'sadasd', 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (16, '2019-04-19 10:43:57.626679+00', '2019-04-19 10:43:57.627021+00', false, 'type2', 'ss2', 'ACTIVE');
INSERT INTO public.packages_productcategory (id, created, modified, is_removed, name, description, status) VALUES (17, '2019-04-19 10:44:10.723725+00', '2019-04-19 10:44:10.724058+00', false, 'type22', 'ss2', 'ACTIVE');


--
-- Data for Name: packages_producttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_producttype (id, created, modified, is_removed, name, description, status) VALUES (1, '2019-04-19 11:04:26.628441+00', '2019-04-19 11:04:26.628771+00', false, 'Type 1', 'ss', 'ACTIVE');
INSERT INTO public.packages_producttype (id, created, modified, is_removed, name, description, status) VALUES (2, '2019-04-19 11:04:57.909729+00', '2019-04-19 11:04:57.909944+00', false, 'Type 2', 'sss', 'INACTIVE');
INSERT INTO public.packages_producttype (id, created, modified, is_removed, name, description, status) VALUES (3, '2019-04-19 11:13:14.547063+00', '2019-04-19 11:13:14.547391+00', false, '222', 'ss', 'ACTIVE');


--
-- Data for Name: packages_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, manager_id, category_id, product_type_id) VALUES (1, '2019-04-19 11:30:49.019946+00', '2019-04-19 11:30:49.035364+00', false, 'aaa', 'asdasdasd', 'ACTIVE', '2019-04-20', 1, 3, 1);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, manager_id, category_id, product_type_id) VALUES (2, '2019-04-29 11:23:49.130036+00', '2019-04-29 11:23:49.13037+00', false, 'aaa', '222', 'ACTIVE', '2019-04-24', 2, 12, 1);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, manager_id, category_id, product_type_id) VALUES (4, '2019-05-03 10:53:18.52312+00', '2019-05-03 10:53:18.523675+00', false, 'Test4556', '222', 'ACTIVE', '2019-05-16', 2, 12, 2);
INSERT INTO public.packages_product (id, created, modified, is_removed, name, "desc", status, start_sale_date, manager_id, category_id, product_type_id) VALUES (3, '2019-05-03 10:51:14.407172+00', '2019-05-03 14:36:13.728837+00', false, 'Test1234', '222', 'ACTIVE', '2019-05-11', 2, 12, 1);


--
-- Data for Name: packages_feature; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (1, '2019-04-19 11:30:57.442285+00', '2019-04-19 11:30:57.447359+00', false, 'aaa', 'sadasd', 222, 3, 1);
INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (2, '2019-04-29 11:23:49.173844+00', '2019-04-29 11:23:49.174239+00', false, 'aaa', '3232', 2123, 1, 2);
INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (3, '2019-05-03 10:53:18.578553+00', '2019-05-03 10:53:18.579003+00', false, 'F121323', 'asdasd', 100, 1, 4);
INSERT INTO public.packages_feature (id, created, modified, is_removed, name, "desc", price, number, product_id) VALUES (4, '2019-05-03 10:53:18.583179+00', '2019-05-03 10:53:18.583554+00', false, 'F2', '222', 111, 2, 4);


--
-- Data for Name: packages_package_features; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (1, 1, 1);
INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (2, 2, 2);
INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (3, 3, 3);
INSERT INTO public.packages_package_features (id, package_id, feature_id) VALUES (4, 3, 4);


--
-- Data for Name: packages_packagehistory; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: account_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_profile_id_seq', 2, true);


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

SELECT pg_catalog.setval('public.auth_permission_id_seq', 136, true);


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

SELECT pg_catalog.setval('public.campaigns_campaign_assigned_to_id_seq', 40, true);


--
-- Name: campaigns_campaign_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_id_seq', 38, true);


--
-- Name: campaigns_campaign_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_campaign_packages_id_seq', 37, true);


--
-- Name: campaigns_contactmarketing_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketing_id_seq', 57, true);


--
-- Name: campaigns_contactmarketinghistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_contactmarketinghistory_id_seq', 61, true);


--
-- Name: campaigns_followupplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_followupplan_id_seq', 38, true);


--
-- Name: campaigns_mailtemplate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_mailtemplate_id_seq', 1, false);


--
-- Name: campaigns_marketingplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_marketingplan_id_seq', 50, true);


--
-- Name: campaigns_note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_note_id_seq', 5, true);


--
-- Name: contacts_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contact_id_seq', 9, true);


--
-- Name: contacts_contactgroup_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_contacts_id_seq', 13, true);


--
-- Name: contacts_contactgroup_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contacts_contactgroup_id_seq', 3, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 85, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 34, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 59, true);


--
-- Name: events_event_contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_contacts_id_seq', 82, true);


--
-- Name: events_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_event_id_seq', 82, true);


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

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 9, true);


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

SELECT pg_catalog.setval('public.orders_order_id_seq', 39, true);


--
-- Name: orders_order_packages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_order_packages_id_seq', 1, false);


--
-- Name: orders_orderhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_orderhistory_id_seq', 2, true);


--
-- Name: packages_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_feature_id_seq', 4, true);


--
-- Name: packages_package_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_features_id_seq', 4, true);


--
-- Name: packages_package_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_package_id_seq', 3, true);


--
-- Name: packages_packagehistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_packagehistory_id_seq', 1, false);


--
-- Name: packages_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_product_id_seq', 4, true);


--
-- Name: packages_productcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_productcategory_id_seq', 17, true);


--
-- Name: packages_producttype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.packages_producttype_id_seq', 3, true);


--
-- Name: steps_step_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.steps_step_id_seq', 34, true);


--
-- Name: steps_stepdetail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.steps_stepdetail_id_seq', 22, true);


--
-- PostgreSQL database dump complete
--

