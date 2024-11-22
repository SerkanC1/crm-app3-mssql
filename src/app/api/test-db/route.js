// src/app/api/test-db/route.ts

import db from "@/lib/db";

/**
 * GET isteği ile veritabanı bağlantısını test eder
 */
//export async function GET(request: Request) {
export async function GET() {
  try {
    /**
     * Veritabanı bağlantısını test eder
     */
    const isConnected = await db.testConnection();

    if (!isConnected) {
      return new Response(
        JSON.stringify({ hata: "Veritabanı bağlantısı başarısız" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ mesaj: "Veritabanına bağlantı başarılı" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ hata: "Sunucu hatası" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
