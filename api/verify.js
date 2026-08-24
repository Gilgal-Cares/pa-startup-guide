module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const key = req.body?.key;
  if (!key) { return res.json({ valid: false, error: 'No key provided' }); }

  try {
    const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        product_id: 'jPKXJuUMvb4OZMNOlbglNg==',
        license_key: key
      }).toString()
    });
    const data = await response.json();
    res.json({ valid: data.success === true });
  } catch(e) {
    res.status(500).json({ valid: false, error: e.message });
  }
};
