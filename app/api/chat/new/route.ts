// import crypto from "node:crypto";
import { db } from "@/drizzle";
import { chats } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { mallam } from "@/lib/mallam";
// import { redis } from "@/lib/redis";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { input } = await request.json();

	const session = await auth();

	const instruction = `Sila berikan tajuk yang sesuai kepada soalan berikut: ${input}`;

	const title = await mallam.chatCompletion(instruction);

	if (session?.user?.id) {
		// const uuid = crypto.randomUUID();
		// await redis.set(`chat:${session.user.id}:${uuid}`, input);

		// Insert the chat into the database
		const res = await db
			.insert(chats)
			.values({
				title: title.message.trim(),
				contents: input.trim(),
				user_id: session?.user.id,
			})
			.returning({ id: chats.id, title: chats.title })
			.then((res) => res[0]);

		return NextResponse.json(res, { status: 201 });
	}

	return NextResponse.json(
		{
			error: "Sila log masuk untuk menggunakan fungsi ini",
		},
		{ status: 401 },
	);
}
