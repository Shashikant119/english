# Module 6 — Authentication and Authorization

Authentication asks “who are you?” Authorization asks “may you do this?”

```text
register -> validate -> hash password -> store user -> verify email
login -> rate limit -> compare hash -> issue session/access+refresh tokens
request -> verify identity -> load policy -> authorize resource -> respond
```

## Password flow

Normalize email, validate input, hash with Argon2id/bcrypt at an appropriate cost,
and never log passwords. Return a generic login failure so attackers cannot
enumerate accounts.

## JWT and refresh rotation

```text
client --access token--> API --verify signature/iss/aud/exp--> route
client --refresh cookie--> auth server --rotate/revoke--> new token pair
```

Keep access tokens short-lived. Store hashed refresh-token records, rotate on use,
detect reuse, and revoke the token family after theft. JWT payloads are encoded,
not encrypted. Use an algorithm allowlist and rotate signing keys.

## Roles and permissions

RBAC maps roles to permissions. Resource checks also enforce ownership: an
“editor” may update only an assigned article. Deny by default and test forbidden
cases.

## Protected React routes

Show loading while session bootstrap runs, redirect anonymous users, and render a
forbidden page for insufficient role. This is UX; APIs remain the security boundary.

## OAuth/Google login

Use Authorization Code with PKCE, validate `state`, nonce, issuer, audience, and
redirect URI. Link accounts only after securely proving ownership; prevent email
collision takeover.

## OTP, reset, and verification

Generate cryptographically random, single-use, short-lived codes/tokens. Store a
hash, limit attempts and sends, invalidate after success/password change, and do
not reveal whether an account exists. Email links must use an allowlisted origin.

## Security and assignment

Protect against CSRF, XSS, credential stuffing, fixation, token replay, timing
leaks, and open redirects. Log security events without tokens. Build register,
email verification, login, logout, refresh rotation, forgot/reset, RBAC, ownership,
Google login abstraction, tests, and threat model.

