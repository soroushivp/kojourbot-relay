export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).send('OK');

  // بررسی سکرت (امنیت)
  const secret = req.headers['x-telegram-bot-api-secret-token'] || '';
  if (secret !== process.env.SECRET_TOKEN) {
    console.log('❌ Invalid secret token');
    return res.status(403).send('Forbidden');
  }

  // ارسال داده به Google Apps Script
  try {
    const response = await fetch(process.env.TARGET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body || {}), // 🔹 بسیار مهم
    });

    console.log('✅ Forwarded to Google Script:', response.status);
  } catch (err) {
    console.error('❌ Forward error:', err.message);
  }

  return res.status(200).send('OK');
}
