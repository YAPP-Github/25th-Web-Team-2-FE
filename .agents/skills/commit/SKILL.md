---
name: commit
description: Create clear, logically grouped Git commits for completed repository changes when asked to commit or save work.
---

# Commit changes

Use this skill when the user asks to commit changes, or explicitly invokes `/commit`.

1. Inspect `git status` and the diff before staging. Identify which changes belong to the requested work and leave unrelated user changes untouched.
2. Group changes by purpose. Make separate commits when changes represent distinct user-visible or technical outcomes; keep tightly coupled implementation and its necessary UI handling together.
3. Stage only the files or hunks for the intended commit. Do not use `git add -A` when unrelated changes may be present.
4. Write a concise commit subject that describes the change. Prefer Korean when the surrounding conversation is Korean. Do not claim tests passed unless they were run and passed.
5. Create the commit and verify the resulting commit list and worktree status.
6. Do not push or create a pull request unless the user also asks for it.

If a commit hook changes files, inspect those changes. Include them only when they are formatting or generated changes directly associated with the commit; otherwise stop and report them.

Report the commit hashes, subjects, and any verification that was run.
