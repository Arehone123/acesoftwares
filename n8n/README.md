# Website support workflow (n8n)

`acesoftwares-support.workflow.json` handles every support request from the website (contact page and the
24/7 widget on every page). It is your ticket-based workflow with the fixes listed below.

| Webhook | Used by |
|---|---|
| `POST https://arehonematodzi.app.n8n.cloud/webhook/acesoftwares-support` | Contact form + widget (`SUPPORT_WEBHOOK`) |
| `GET https://arehonematodzi.app.n8n.cloud/webhook/acesoftwares-ticket-status?id=AS-…` | Site checks for your team's reply (`SUPPORT_STATUS_WEBHOOK`) |

Always use **`/webhook/`** (production). `/webhook-test/` only works once, while "Listen for test event" is open.

## How it works

1. A visitor asks a question. The workflow loads `https://acesoftwares.tech/knowledge.txt` (generated from the site on
   every build) and the AI agent answers from it.
2. **AI can answer** → the answer shows on the website instantly, and is emailed to the visitor (they can untick
   "Email me a copy").
3. **Needs a person** → a ticket is created. The visitor sees "a support agent is on it" and gets an acknowledgement
   email; **n8ncapetown@gmail.com** gets the request with an AI summary and a suggested draft.
4. **You reply to that email** from n8ncapetown@gmail.com (or reply `APPROVE` to send the draft). Within a minute the
   answer is emailed to the customer **and appears in the widget / contact page** if they still have the site open.

## Fixes in this version

| Problem | Fix |
|---|---|
| `allowedOrigins` was only `https://acesoftwares.tech` | Also allows `www.acesoftwares.tech` and `localhost:5173` |
| Alerts went to `owner@acesoftwares.tech` (and the reply trigger watched it) | Uses `n8ncapetown@gmail.com`, a different mailbox from the sending Gmail account, so replies land in the inbox the trigger watches |
| Scraped the React homepage (empty HTML shell) | Loads `/knowledge.txt` |
| Customer text was put into HTML emails unescaped | Escaped before it goes into any email |
| Website never sent `email_copy` or checked ticket status | Website now sends `email_copy` and checks the status webhook |

## If every request returns HTTP 500

Every path, including the simple ticket-status webhook that has no AI in it, failing within 0.3 s means n8n cannot
start the run. Open **Executions** in n8n, click the failed run, and read the error on the red node. Common causes:

- **Code node error.** Open a Code node and click *Test step*; check the n8n Cloud status page for task-runner issues.
- **Execution limit.** Check **Settings → Usage** in n8n Cloud; when the monthly quota is used up, runs stop.
- **Workflow not published.** After importing, click **Publish / Activate** so production uses the new version.

## Import

1. Deactivate the current workflow. 2. **Import from file** → this JSON. 3. Check the Gmail nodes and the Gmail
Trigger use the `acetheacademia.info` credential and the Azure node uses `Azure Open AI account 6`.
4. **Activate.** 5. Send a test from the site's widget.

Note: tickets live in the workflow's static data, which n8n only saves for **production** runs (not manual test runs),
and two requests finishing at the same moment can overwrite each other. For high volume, move tickets to a Google
Sheet or database.
