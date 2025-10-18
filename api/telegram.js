// Vercel Serverless Function: /api/telegram

export default async function handler(req, res) {
  // تلگرام فقط POST می‌فرستد؛ بقیهٔ متدها برای تست، 200 بده
  if (req.method !== 'POST') return res.status(200).send('OK');

  // امنیت: سکرت باید با مقداری که در setWebhook می‌فرستی یکی باشد
  const secret = req.headers['x-telegram-bot-api-secret-token'] || '';
  if (!process.env.SECRET_TOKEN || secret !== process.env.SECRET_TOKEN) {
    return res.status(403).send('forbidden');
  }

  try {
    // بدنهٔ دریافتی را به Web App گوگل فوروارد کن
    await fetch(process.env.TARGET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // در فانکشن‌های Vercel، req.body (اگر JSON باشد) آماده است
      body: JSON.stringify(req.body || {})
    });
  } catch (e) {
    // حتی اگر Google کند/داون بود، به تلگرام 200 می‌دهیم تا صف نشود
  }

  return res.status(200).send('OK');
}
