# Karatas Global — KG-WEB-001 (Option B draft)

A lightweight, dependency-free, founder-led B2B site. Main positioning: **International Business Development & Strategic Sourcing between Ireland and Türkiye.**

## Review status

This branch is **NOT published**. It is proposed website content awaiting founder review and explicit release approval. The production site remains driven by the configured GitHub Pages deployment source (verify in Pages settings before any merge).

## Files

- `index.html` — one-page commercial positioning, buyer/manufacturer journeys, services, sectors, process, founder and enquiry contact.
- `assets/css/styles.css` — responsive corporate styles, no external fonts/images (aside from the existing KG SVG logo).
- `assets/js/main.js` — mobile navigation and email-client handoff for the two enquiry forms.
- `assets/brand/` — existing brand assets retained.
- `assets/img/` — historical photos retained in repository but **not referenced by the redesigned page**.

No framework, build step, analytics, cookies or paid external services are used. Open `index.html` in a browser to preview. Internet access is not required to load the site itself.

## Contact forms

**KG-WEB-001 PR #3:** Both forms are configured to POST to a **separate Karatas Global Formspark form**, `https://submit-form.com/VPg3Xqson`, using the existing `omer@karatasglobal.com` notification destination, as reported by the founder. They include an `enquiry_type` label (buyer vs supplier), Formspark-compatible `_email.subject`, honeypot, and on-page asynchronous confirmation/error status.

With JavaScript enabled, the site sends JSON with `Content-Type` and `Accept: application/json`; a visible acknowledgement is shown only when Formspark responds successfully. Failure preserves form input and offers an email-app fallback. Without JavaScript, a normal HTML POST goes directly to Formspark and redirects to `enquiry-sent.html` or `enquiry-error.html`, with `_append=false` to avoid exposing visitor data in query strings.

**NOT YET END-TO-END VERIFIED:** The form ID and active notification recipient were supplied by the founder, but no live enquiry was submitted and no inbox receipt was confirmed. The code is on a separate PR branch; publishing requires explicit founder release authorisation after validation.

Do not request sensitive files or confidential specifications through this workflow. A separate Karatas Global Formspark workspace/form was created by the founder. The latest draft includes `privacy.html`. Final privacy policy and retention controls remain a founder responsibility.

## Known release checks

- Founder approval of exact proposed public copy, name, contact channels and actual service capability.
- Confirm rendered layouts at 375px / 768px / 1366px and keyboard accessibility.
- Test buyer and partner Formspark submissions end-to-end and verify records plus notifications in **omer@karatasglobal.com**, **only after explicit permission**. Do not send test enquiries without authorisation.
- Review legal/trading identity and privacy information.
- Check GitHub Pages settings and HTTPS enforcement; do not change DNS or mail records under this PR.
- Preserve current production commit for rollback; verify after publishing.
- Historical vehicle images are no longer displayed but may remain retrievable by their old direct paths until separately removed.

## Prior version

The previous live design emphasized commercial vehicles and included unrelated Granite & Lime content. This draft removes both from the visible page and substitutes abstract CSS graphics and buyer-led messaging.
