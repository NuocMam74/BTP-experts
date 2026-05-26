CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`conversation_id` text,
	`agent_slug` text,
	`format` text NOT NULL,
	`title` text NOT NULL,
	`filename` text NOT NULL,
	`storage_path` text NOT NULL,
	`size_bytes` integer,
	`metadata` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`agent_slug`) REFERENCES `agents`(`slug`) ON UPDATE no action ON DELETE no action
);
