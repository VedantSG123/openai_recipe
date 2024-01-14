CREATE TABLE IF NOT EXISTS "chats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"chat_owner" uuid NOT NULL,
	"indredients" text,
	"response" text
);
