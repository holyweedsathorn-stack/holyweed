// Step 1 of GitHub OAuth login for the /admin content panel.
// The CMS opens this endpoint in a popup; we redirect the browser to
// GitHub's own login/consent screen.
module.exports = async (req, res) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;

  if (!clientId) {
    res.status(500).send(
      'Missing GITHUB_OAUTH_CLIENT_ID environment variable in Vercel project settings. ' +
      'See ADMIN-SETUP-GUIDE.md for setup steps.'
    );
    return;
  }

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = protocol + '://' + host + '/api/callback';
  const scope = 'repo,user';

  const authorizeUrl =
    'https://github.com/login/oauth/authorize' +
    '?client_id=' + encodeURIComponent(clientId) +
    '&redirect_uri=' + encodeURIComponent(redirectUri) +
    '&scope=' + encodeURIComponent(scope);

  res.writeHead(302, { Location: authorizeUrl });
  res.end();
};
