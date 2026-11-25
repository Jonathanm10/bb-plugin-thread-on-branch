# bb-plugin-thread-on-branch

A BB plugin that adds "New thread on <branch>" to every thread menu. Picking
it opens BB's new-thread screen with the source thread's project and
environment selected, so the new thread works in the same checkout, on the
same branch.

- Shows in the sidebar row menu, the right-click menu, the thread header
  menu, the compact drawer, and (via Customize actions) row quick actions.
- Reads "New thread in environment" when BB has no branch name for the
  environment. Threads without an environment do not get the item.
- The new thread shares the checkout with the source thread. Two agents
  editing at once can overwrite each other's changes.

## Files

- `app.tsx` registers the thread action.
- `server.ts` is an empty backend entry, which BB requires.

## Install

```
bb plugin install git:https://github.com/Jonathanm10/bb-plugin-thread-on-branch.git@^0.1.0
```

From a local checkout:

```
npm install
bb plugin install .
```

After editing sources, run `bb plugin reload thread-on-branch`, or
`bb plugin dev` to rebuild and reload on every save.
