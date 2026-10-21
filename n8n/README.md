# Website support workflow (n8n)

`acesoftwares-support.workflow.json` answers every support request from the website: the contact page and the
24/7 support widget on every page. The site posts to:

```
https://arehonematodzi.app.n8n.cloud/webhook/acesoftwares-support
```

(set as `SUPPORT_WEBHOOK` in `src/data/site.js`).

## What it does

1. **Webhook** receives `name`, `email`, `company`, `interest`, `message`, `source`, `page` (form data).
2. **Loads `https://acesoftwares.tech/knowledge.txt`**, a plain-text summary of the site that is regenerated on
   every `npm run build` from `src/data/*.js`, so prices, plans and FAQs are always current.
3. **AI agent** (your Azure OpenAI model) answers from that knowledge only, or replies `NEEDS_HUMAN_AGENT`.
4. **Replies to the website instantly**: `{ status: 'success', message }` or `{ status: 'transferred', message }`.
5. **Emails (Gmail)**
   - Needs a person → alert to info@acetheacademia.com + n8ncapetown@gmail.com, and a confirmation to the customer.
   - Answered by AI → the answer to the customer, and a copy to the team so every lead is seen.

## Import it (replaces the current version)

1. In n8n, open the existing workflow and **deactivate** it (the new one uses the same webhook path).
2. **Workflows → Import from file** → choose `acesoftwares-support.workflow.json`.
3. Open each of the 4 **Gmail** nodes and select your Gmail credential (e.g. the n8ncapetown@gmail.com account).
4. Check the **Azure OpenAI Chat Model** node still shows your credential (`Azure Open AI account 6`).
5. **Activate** the workflow. Delete or archive the old one.

## Fixes compared with the original

| Problem in the original | Fix |
|---|---|
| Webhook responded immediately, so the Respond nodes never reached the site | `responseMode: responseNode` |
| AI Agent had no prompt (expects `chatInput` from a chat trigger) | Prompt defined from the visitor's message + system instructions |
| Simple Memory had no session key without a chat trigger | Session key = visitor's email |
| Code node used `$input.item` in "run once for all items" mode | Mode set to "run once for each item" |
| Scraping the React homepage returns an empty HTML shell | Loads `/knowledge.txt` instead (and still works if it can't be reached) |
| AI answer was inserted into hand-written JSON (quotes/new lines broke it) | Response built as a real JSON object |
| No emails were sent | 4 Gmail nodes (team alerts + customer emails) |

## Notes

- `knowledge.txt` only exists once the site is deployed at acesoftwares.tech. Until then the agent has no context and
  will mostly hand over to a person, which is safe.
- The webhook is public. The site has a hidden spam trap, but if you see abuse, add a rate limit or a shared secret.
