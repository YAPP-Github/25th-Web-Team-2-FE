---
name: pr
description: Prepare and create a GitHub pull request for the current repository branch using the repository's pull request template.
---

# Create a pull request

Use this skill when the user asks to create/open a PR or invokes `/pr`.

1. Read `.github/PULL_REQUEST_TEMPLATE.md` from the repository. Treat its headings and order as the required PR body format. Fill every section with concise, task-specific content and remove placeholder bullets. Do not add alternate headings unless the user asks.
2. Inspect the current branch, worktree, commits, and target branch. Use the target named by the user; otherwise use the repository's default branch. Confirm that unrelated or uncommitted changes will not be included.
3. Summarize the branch changes against the target branch. Report the actual verification performed and any limitations accurately.
4. Ensure the intended commits are pushed to the remote branch. Do not force-push unless the user explicitly asks or an already-authorized amend/rebase requires updating this task's own branch; use `--force-with-lease` in that case.
5. Create the PR with `gh pr create`, using the repository template's exact section structure. Set a concise title that describes the full change. Do not assign reviewers, assignees, or labels unless requested or required by repository automation.
6. Verify the created PR URL and base/head branches. Report the URL, title, target branch, and any checks still pending.

If GitHub authentication or network access blocks PR creation, keep the branch pushed when possible and report the exact blocker. Never claim a PR exists until the create command returns its URL.
