// Step 2 of GitHub OAuth login for the /admin content panel.
// GitHub redirects back here with a one-time ?code=... which we exchange
// (server-side, using the secret) for an access token, then hand that
// token back to the CMS popup window via postMessage.
module.exports = async (req, res) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const code = req.query && req.query.code;

  if (!clientId || !clientSecret) {
    res.status(500).send(
      'Missing GITHUB_OAUTH_CLIENT_ID / GITHUB_OAUTH_CLIENT_SECRET environment variables ' +
      'in Vercel project settings. See ADMIN-SETUP-GUIDE.md for setup steps.'
    );
    return;
  }

  if (!code) {
    res.status(400).send('Missing ?code from GitHub. Try logging in again from /admin.');
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      res.status(400).send(
        'GitHub OAuth error: ' + (tokenData.error_description || tokenData.error)
      );
      return;
    }

    const payload = JSON.stringify({ token: tokenData.access_token, provider: 'github' });

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(
      '<!DOCTYPE html><html><body>' +
      '<script>' +
      '(function() {' +
      '  function receiveMessage(e) {' +
      '    window.opener.postMessage(' +
      '      "authorization:github:success:" + ' + JSON.stringify(payload) + ',' +
      '      e.origin' +
      '    );' +
      '    window.removeEventListener("message", receiveMessage, false);' +
      '  }' +
      '  window.addEventListener("message", receiveMessage, false);' +
      '  window.opener.postMessage("authorizing:github", "*");' +
      '})();' +
      '</script>' +
      'Signed in — you can close this window if it does not close automatically.' +
      '</body></html>'
    );
  } catch (err) {
    res.status(500).send('OAuth callback failed: ' + err.message);
  }
};
