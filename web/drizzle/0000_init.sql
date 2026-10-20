CREATE TABLE `audit_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`user_email` text,
	`action` text NOT NULL,
	`entity` text NOT NULL,
	`entity_key` text,
	`summary` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_created` ON `audit_log` (`created_at`);--> statement-breakpoint
CREATE TABLE `documents` (
	`type` text NOT NULL,
	`key` text NOT NULL,
	`draft` text,
	`published` text,
	`draft_updated_at` integer,
	`draft_updated_by` text,
	`published_at` integer,
	`published_by` text,
	PRIMARY KEY(`type`, `key`)
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`pathname` text NOT NULL,
	`filename` text NOT NULL,
	`content_type` text NOT NULL,
	`size` integer NOT NULL,
	`alt` text DEFAULT '' NOT NULL,
	`uploaded_by` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`permissions` text DEFAULT '[]' NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stage` text NOT NULL,
	`expires_at` integer NOT NULL,
	`ip` text,
	`user_agent` text,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `sessions_user` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE TABLE `submission_notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`submission_id` integer NOT NULL,
	`user_id` text,
	`body` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference` text NOT NULL,
	`form_key` text NOT NULL,
	`form_name` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`urgent` integer DEFAULT false NOT NULL,
	`assigned_to` text,
	`name` text NOT NULL,
	`email` text,
	`phone` text,
	`organization` text,
	`answers` text NOT NULL,
	`files` text NOT NULL,
	`site` text,
	`emailed` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `submissions_reference_unique` ON `submissions` (`reference`);--> statement-breakpoint
CREATE INDEX `submissions_form` ON `submissions` (`form_key`);--> statement-breakpoint
CREATE INDEX `submissions_status` ON `submissions` (`status`,`created_at`);--> statement-breakpoint
CREATE TABLE `throttle` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`window_start` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text DEFAULT '' NOT NULL,
	`password_hash` text NOT NULL,
	`is_super` integer DEFAULT false NOT NULL,
	`role_id` text,
	`must_change_password` integer DEFAULT true NOT NULL,
	`totp_secret` text,
	`totp_enabled` integer DEFAULT false NOT NULL,
	`disabled` integer DEFAULT false NOT NULL,
	`failed_attempts` integer DEFAULT 0 NOT NULL,
	`locked_until` integer,
	`last_seen_at` integer,
	`created_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `versions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` text NOT NULL,
	`key` text NOT NULL,
	`data` text NOT NULL,
	`published_at` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`published_by` text
);
--> statement-breakpoint
CREATE INDEX `versions_doc` ON `versions` (`type`,`key`);