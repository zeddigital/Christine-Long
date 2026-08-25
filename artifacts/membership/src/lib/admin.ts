import { supabase } from "./supabase";
import type { Module } from "./types";

export interface MemberRow {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: "invited" | "active" | "inactive";
  is_admin: boolean;
  last_seen_at: string | null;
  created_at: string;
  modules_held: number;
  lessons_completed: number;
  last_activity: string | null;
}

export interface Grant {
  id: number;
  module_id: number;
  granted_at: string;
  cancelled_at: string | null;
  source: string;
  modules: Pick<Module, "id" | "name" | "slug"> | null;
}

export async function fetchMembers(): Promise<MemberRow[]> {
  const { data, error } = await supabase
    .from("member_overview")
    .select("*")
    .order("modules_held", { ascending: false })
    .order("email");
  if (error) throw error;
  return (data ?? []) as MemberRow[];
}

export async function fetchMember(id: number): Promise<MemberRow | null> {
  const { data, error } = await supabase
    .from("member_overview")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as MemberRow | null;
}

export async function fetchAllModules(): Promise<Module[]> {
  const { data, error } = await supabase
    .from("modules")
    .select("id,name,slug,series,summary,sort_order")
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function fetchGrants(memberId: number): Promise<Grant[]> {
  const { data, error } = await supabase
    .from("entitlements")
    .select("id,module_id,granted_at,cancelled_at,source,modules(id,name,slug)")
    .eq("member_id", memberId)
    .order("granted_at");
  if (error) throw error;
  return (data ?? []) as unknown as Grant[];
}

/** Give a member a module. Re-granting a cancelled one simply reinstates it. */
export async function grantModule(memberId: number, moduleId: number) {
  const { error } = await supabase.from("entitlements").upsert(
    { member_id: memberId, module_id: moduleId, source: "manual", cancelled_at: null },
    { onConflict: "member_id,module_id" },
  );
  if (error) throw error;
}

/** Withdraw access without deleting the record, so the history stays intact. */
export async function revokeModule(memberId: number, moduleId: number) {
  const { error } = await supabase
    .from("entitlements")
    .update({ cancelled_at: new Date().toISOString() })
    .eq("member_id", memberId)
    .eq("module_id", moduleId);
  if (error) throw error;
}

export async function updateMember(id: number, patch: Partial<MemberRow>) {
  const { error } = await supabase.from("members").update(patch).eq("id", id);
  if (error) throw error;
}

/** Runs server-side: creating a login needs the service key, which stays out of the browser. */
export async function inviteMember(input: {
  email: string;
  first_name?: string;
  last_name?: string;
  module_ids?: number[];
}) {
  const { data, error } = await supabase.functions.invoke("invite-member", { body: input });
  if (error) {
    const detail = await (error as { context?: Response }).context?.json?.().catch(() => null);
    throw new Error(detail?.error ?? error.message);
  }
  return data as { ok: boolean; member_id: number; modules_granted: number; existing_login: boolean };
}

/** Per-module completion for one member, for the progress view. */
export async function fetchMemberProgress(memberId: number) {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id,completed_at,lessons(module_id,title)")
    .eq("member_id", memberId)
    .not("completed_at", "is", null);
  if (error) throw error;
  return (data ?? []) as unknown as {
    lesson_id: number;
    completed_at: string;
    lessons: { module_id: number; title: string } | null;
  }[];
}

/* ------------------------------------------------------------------------- *
 * Module management
 * ------------------------------------------------------------------------- */

export interface ModuleRow extends Module {
  archived_at: string | null;
  lesson_count: number;
  members_holding: number;
}

export async function fetchModuleOverview(): Promise<ModuleRow[]> {
  const { data, error } = await supabase
    .from("module_overview")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as ModuleRow[];
}

/**
 * Take a module out of circulation, or put it back.
 *
 * Archiving hides the module and everything under it — lessons, sections, worksheets
 * and audio — because every content policy resolves entitlement through the same
 * has_module() check. Entitlements are left untouched, so restoring returns access to
 * exactly the people who had it.
 */
export async function setModuleArchived(id: number, archived: boolean) {
  const { error } = await supabase
    .from("modules")
    .update({ archived_at: archived ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
}

export async function renameModule(id: number, name: string) {
  const { error } = await supabase.from("modules").update({ name }).eq("id", id);
  if (error) throw error;
}

/**
 * Permanent. Every foreign key onto modules cascades, so this also destroys the
 * module's lessons, their sections and media links, and every entitlement to it.
 * The UI requires the module's name to be typed before calling this.
 */
export async function deleteModule(id: number) {
  const { error } = await supabase.from("modules").delete().eq("id", id);
  if (error) throw error;
}

/* ------------------------------------------------------------------------- *
 * Member management
 * ------------------------------------------------------------------------- */

/**
 * Inactive members resolve to no member at all, so they lose every module, any admin
 * rights and their progress view while their records stay intact. Reactivating returns
 * them exactly as they were.
 */
export async function setMemberStatus(id: number, status: MemberRow["status"]) {
  const { error } = await supabase.from("members").update({ status }).eq("id", id);
  if (error) throw error;
}

/** Runs server-side: deleting a login needs the service key, which stays out of the browser. */
export async function removeMember(memberId: number) {
  const { data, error } = await supabase.functions.invoke("remove-member", {
    body: { member_id: memberId },
  });
  if (error) {
    const detail = await (error as { context?: Response }).context?.json?.().catch(() => null);
    throw new Error(detail?.error ?? error.message);
  }
  return data as {
    ok: boolean;
    email: string;
    login_removed: boolean;
    warning?: string;
  };
}
