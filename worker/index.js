// Cloudflare Worker: recibe la confirmación de la invitación y la manda por WhatsApp (CallMeBot).
// Secretos (wrangler secret put): CALLMEBOT_APIKEY, WHATSAPP_PHONE (ej. 51939945744)
// Variable: ALLOWED_ORIGINS = "https://tudominio.com,https://www.tudominio.com"

const MAX_TEXT = 600;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
    const originOk = allowed.includes(origin);

    const cors = {
      'Access-Control-Allow-Origin': originOk ? origin : allowed[0] || '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin',
    };
    const json = (body, status = 200) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
    if (!originOk) return json({ ok: false, error: 'origin' }, 403);

    let text;
    try {
      ({ text } = await request.json());
    } catch {
      return json({ ok: false, error: 'json' }, 400);
    }
    if (typeof text !== 'string' || !text.trim() || text.length > MAX_TEXT) {
      return json({ ok: false, error: 'text' }, 400);
    }

    const qs = new URLSearchParams({ phone: `+${env.WHATSAPP_PHONE}`, text, apikey: env.CALLMEBOT_APIKEY });
    try {
      const res = await fetch(`https://api.callmebot.com/whatsapp.php?${qs}`);
      return json({ ok: res.ok }, res.ok ? 200 : 502);
    } catch {
      return json({ ok: false, error: 'upstream' }, 502);
    }
  },
};
