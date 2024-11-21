// src/app/api/test-db/route.js
import { connectToDatabase } from "@/lib/db";

export async function GET(request) {
  await connectToDatabase();
  return new Response(JSON.stringify({ message: "Connected to database" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
