// Adds "New thread on <branch>" to every thread menu (row menu, right-click,
// header menu, compact drawer, and the quick-action picker). It opens the
// compose screen with the source thread's project and environment preselected,
// so the new thread runs in the same worktree, on the same branch.
import { useMemo } from "react";
import {
  definePluginApp,
  experimental_THREAD_ACTION_GROUPS,
  experimental_useSidebarThreads,
} from "@get-bb/plugin-sdk/app";

/** threadId → branch name, for threads whose environment has a known branch. */
function useBranchNames(): ReadonlyMap<string, string> {
  const { threads } = experimental_useSidebarThreads();
  return useMemo(() => {
    const branches = new Map<string, string>();
    for (const thread of threads) {
      const branch = thread.environment?.branchName;
      if (branch) branches.set(thread.id, branch);
    }
    return branches;
  }, [threads]);
}

export default definePluginApp((app) => {
  app.slots.experimental_threadAction({
    id: "new-thread-on-branch",
    title: "New thread on branch",
    icon: "GitBranch",
    group: experimental_THREAD_ACTION_GROUPS.open,
    useData: useBranchNames,
    item: ({ thread, data, navigate }) => {
      const environment = thread.environment;
      if (!environment) return null;
      const branch = data.get(thread.id);
      return {
        label: branch ? `New thread on ${branch}` : "New thread in environment",
        icon: "GitBranch",
        run: () =>
          navigate.toCompose({
            projectId: thread.projectId,
            environmentId: environment.id,
            focusPrompt: true,
          }),
      };
    },
  });
});
