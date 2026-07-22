const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function redis(command) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("STORAGE_NOT_CONFIGURED");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw new Error("STORAGE_ERROR");
  return response.json();
}

async function notify(record) {
  if (!process.env.RESEND_API_KEY) return;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "DACHILL予約 <onboarding@resend.dev>",
      to: ["s.hasegawa1130@gmail.com"],
      subject: "DACHILL BLACK EDITION 再入荷予約",
      text: `メール: ${record.email}\n住所: ${record.address}\n受付日時: ${record.createdAt}`,
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "POSTのみ利用できます。" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  const address = String(req.body?.address || "").trim().replace(/\s+/g, " ");
  if (!EMAIL_RE.test(email) || email.length > 254) return json(res, 400, { error: "メールアドレスを確認してください。" });
  if (address.length < 8 || address.length > 300) return json(res, 400, { error: "住所を確認してください。" });

  const record = {
    id: crypto.randomUUID(),
    product: "DACHILL STOOL 01 BLACK EDITION",
    price: 7980,
    email,
    address,
    createdAt: new Date().toISOString(),
  };

  try {
    await redis(["RPUSH", "dachill:reservations", JSON.stringify(record)]);
    await notify(record).catch(() => {});
    return json(res, 201, { ok: true });
  } catch (error) {
    if (error.message === "STORAGE_NOT_CONFIGURED") return json(res, 503, { error: "予約受付の準備中です。しばらくしてからお試しください。" });
    return json(res, 500, { error: "登録できませんでした。時間をおいて再度お試しください。" });
  }
}
