import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@/lib/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ClipboardList,
  FileText,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AdoptionApplication } from "../backend.d";

function formatDate(createdAt: bigint): string {
  return new Date(Number(createdAt) / 1_000_000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function homeTypeLabel(type: string): string {
  const map: Record<string, string> = {
    house: "House",
    apartment: "Apartment",
    condo: "Condo",
    townhouse: "Townhouse",
  };
  return map[type.toLowerCase()] ?? type;
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { loginStatus, identity, clear } = useInternetIdentity();
  const { actor, isFetching } = useActor();

  const [applications, setApplications] = useState<AdoptionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const isLoggedIn = loginStatus === "success" && !!identity;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/admin" });
      return;
    }
    if (isFetching || !actor) return;

    setLoading(true);
    setFetchError(null);

    actor
      .listAdoptionApplications()
      .then((apps) => {
        setApplications(apps);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.toLowerCase().includes("unauthorized") ||
          msg.toLowerCase().includes("not authorized")
        ) {
          setAuthError(true);
        } else {
          setFetchError("Failed to load applications. Please refresh.");
        }
        setLoading(false);
      });
  }, [isLoggedIn, isFetching, actor, navigate]);

  function handleLogout() {
    clear();
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Admin header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-display font-bold text-foreground text-lg">
                AdoptPaws
              </span>
              <span className="ml-2 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {identity && (
              <span className="hidden sm:block text-xs text-muted-foreground truncate max-w-[160px]">
                {identity.getPrincipal().toText().slice(0, 12)}…
              </span>
            )}
            <Button
              data-ocid="admin-dashboard.logout_button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and review all adoption applications
          </p>
        </div>

        {/* Auth error */}
        {authError && (
          <div
            data-ocid="admin-dashboard.access_denied"
            className="flex items-start gap-3 p-6 rounded-xl bg-destructive/10 border border-destructive/20"
          >
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-destructive">Access Denied</p>
              <p className="text-sm text-muted-foreground mt-1">
                You are not authorized to view adoption applications. Please
                sign out and log in with the admin account.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {/* Fetch error */}
        {fetchError && (
          <div
            data-ocid="admin-dashboard.error_state"
            className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            {fetchError}
          </div>
        )}

        {!authError && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="border-border">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Applications
                    </p>
                    {loading ? (
                      <Skeleton className="h-7 w-10 mt-1" />
                    ) : (
                      <p
                        data-ocid="admin-dashboard.total_count"
                        className="text-2xl font-display font-bold text-foreground"
                      >
                        {applications.length}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Applicants</p>
                    {loading ? (
                      <Skeleton className="h-7 w-10 mt-1" />
                    ) : (
                      <p className="text-2xl font-display font-bold text-foreground">
                        {new Set(applications.map((a) => a.email)).size}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pets Requested
                    </p>
                    {loading ? (
                      <Skeleton className="h-7 w-10 mt-1" />
                    ) : (
                      <p className="text-2xl font-display font-bold text-foreground">
                        {new Set(applications.map((a) => String(a.petId))).size}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card className="border-border overflow-hidden">
              <CardHeader className="bg-card border-b border-border px-6 py-4">
                <CardTitle className="text-base font-display font-semibold flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-primary" />
                  Adoption Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div
                    data-ocid="admin-dashboard.loading_state"
                    className="p-6 space-y-3"
                  >
                    {(["sk1", "sk2", "sk3", "sk4", "sk5"] as const).map((k) => (
                      <Skeleton key={k} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                ) : applications.length === 0 ? (
                  <div
                    data-ocid="admin-dashboard.empty_state"
                    className="flex flex-col items-center gap-3 py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                      <ClipboardList className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        No applications yet
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Adoption applications will appear here once submitted.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/40">
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            #
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            Applicant
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            Email
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            Phone
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            Pet ID
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            Location
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            Home
                          </th>
                          <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">
                            Submitted
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.map((app, index) => (
                          <tr
                            key={app.id}
                            data-ocid={`admin-dashboard.application.item.${index + 1}`}
                            className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                          >
                            <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-medium text-foreground">
                                {app.applicantName}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">
                              {app.email}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                              {app.phone}
                            </td>
                            <td className="px-4 py-3">
                              <Badge
                                variant="outline"
                                className="font-mono text-xs"
                              >
                                #{String(app.petId)}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                              {app.city}, {app.state}
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="secondary" className="text-xs">
                                {homeTypeLabel(app.homeType)}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                              {formatDate(app.createdAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Footer info */}
            {!loading && applications.length > 0 && (
              <p className="text-xs text-muted-foreground mt-4 text-right">
                Showing {applications.length} application
                {applications.length !== 1 ? "s" : ""}
              </p>
            )}
          </>
        )}
      </main>

      <footer className="bg-muted/40 border-t border-border py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} AdoptPaws Admin Portal. Secure access
          only.
        </div>
      </footer>
    </div>
  );
}

// End of file
