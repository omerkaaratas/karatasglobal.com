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

**Important:** Both forms build a `mailto:` URL and open the visitor's email application. They do NOT submit to a server, confirm delivery or collect/store leads in the browser/site. The visitor must press Send. The email address already shown on the existing public site is used but **real receipt has not been tested**.

Do not request sensitive files or confidential specifications through this workflow. A real hosted form handler would require a separate privacy, security, cost and founder approval decision.

## Known release checks

- Founder approval of exact proposed public copy, name, contact channels and actual service capability.
- Confirm rendered layouts at 375px / 768px / 1366px and keyboard accessibility.
- Test native email-client opening and actual inbox receipt **only after explicit permission**.
- Review legal/trading identity and privacy information.
- Check GitHub Pages settings and HTTPS enforcement; do not change DNS or mail records under this PR.
- Preserve current production commit for rollback; verify after publishing.
- Historical vehicle images are no longer displayed but may remain retrievable by their old direct paths until separately removed.

## Prior version

The previous live design emphasized commercial vehicles and included unrelated Granite & Lime content. This draft removes both from the visible page and substitutes abstract CSS graphics and buyer-led messaging.
