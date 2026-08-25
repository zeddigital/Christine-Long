import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router, Switch } from "wouter";
import { AuthProvider, useAuth } from "@/context/Auth";
import { Shell } from "@/components/Shell";
import { Spinner, Empty } from "@/components/Bits";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ModulePage from "@/pages/Module";
import LessonPage from "@/pages/Lesson";
import AdminMembers from "@/pages/admin/Members";
import AdminMemberDetail from "@/pages/admin/MemberDetail";
import AdminInvite from "@/pages/admin/Invite";
import AdminModules from "@/pages/admin/Modules";

const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000, retry: 1, refetchOnWindowFocus: false } },
});

function Routes() {
  const { session, member, loading } = useAuth();

  if (loading)
    return (
      <div className="grid min-h-screen place-items-center">
        <Spinner label="Signing you in" />
      </div>
    );

  if (!session) return <Login />;

  // Authenticated with Supabase, but no member record is linked to this login.
  if (!member)
    return (
      <Shell>
        <Empty
          title="Your account isn't linked yet"
          detail="You've signed in, but this email isn't attached to a membership record. Let Christine know and she'll connect it."
        />
      </Shell>
    );

  return (
    <Shell>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/m/:slug" component={ModulePage} />
        <Route path="/l/:slug" component={LessonPage} />
        <Route path="/admin" component={member.is_admin ? AdminMembers : Forbidden} />
        <Route path="/admin/invite" component={member.is_admin ? AdminInvite : Forbidden} />
        <Route path="/admin/modules" component={member.is_admin ? AdminModules : Forbidden} />
        <Route
          path="/admin/members/:id"
          component={member.is_admin ? AdminMemberDetail : Forbidden}
        />
        <Route>
          <Empty title="Page not found" detail="That link doesn't lead anywhere in the member area." />
        </Route>
      </Switch>
    </Shell>
  );
}

/** Admin routes are hidden here and blocked by the database as well — a member who
 *  guesses the URL sees this, and the queries behind it would return nothing anyway. */
function Forbidden() {
  return (
    <Empty
      title="Not your area"
      detail="This part of the site is for Christine. If you think you should have access, let her know."
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <Router base="/membership-site">
          <Routes />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
