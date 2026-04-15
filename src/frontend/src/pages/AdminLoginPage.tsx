import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useActor } from "@/lib/backend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Loader2,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

type AdminStatus = "idle" | "checking" | "no-admin" | "authorized" | "denied";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginStatus, login, clear, identity } = useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [adminStatus, setAdminStatus] = useState<AdminStatus>("idle");
  const [settingAdmin, setSettingAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = loginStatus === "success" && !!identity;

  useEffect(() => {
    if (!isLoggedIn || isFetching || !actor) return;

    setAdminStatus("checking");
    setError(null);

    actor
      .getAdminPrincipal()
      .then((adminPrincipal) => {
        if (adminPrincipal === null) {
          setAdminStatus("no-admin");
        } else {
          const callerText = identity.getPrincipal().toText();
          const adminText = adminPrincipal.toText();
          if (callerText === adminText) {
            navigate({ to: "/admin/dashboard" });
          } else {
            setAdminStatus("denied");
          }
        }
      })
      .catch(() => {
        setError("Failed to verify admin status. Please try again.");
        setAdminStatus("idle");
      });
  }, [isLoggedIn, isFetching, actor, identity, navigate]);

  async function handleSetAdmin() {
    if (!actor) return;
    setSettingAdmin(true);
    setError(null);
    try {
      await actor.setAdmin();
      navigate({ to: "/admin/dashboard" });
    } catch {
      setError("Failed to set admin. Please try again.");
      setSettingAdmin(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            AdoptPaws
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Admin Portal</p>
        </div>

        <Card className="border-border shadow-pet-card">
          <CardHeader className="text-center pb-2 pt-6">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Admin Sign In
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in with Internet Identity to access the admin dashboard
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-4 space-y-4">
            {error && (
              <div
                data-ocid="admin-login.error_state"
                className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive"
              >
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Not logged in */}
            {!isLoggedIn && (
              <div className="space-y-3">
                <p className="text-sm text-center text-muted-foreground">
                  Use your Internet Identity to authenticate securely.
                </p>
                <Button
                  data-ocid="admin-login.sign_in_button"
                  className="w-full"
                  onClick={() => login()}
                  disabled={loginStatus === "logging-in"}
                >
                  {loginStatus === "logging-in" ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  Sign In with Internet Identity
                </Button>
              </div>
            )}

            {/* Checking admin status */}
            {isLoggedIn && adminStatus === "checking" && (
              <div
                data-ocid="admin-login.loading_state"
                className="flex flex-col items-center gap-3 py-4"
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Verifying admin access…
                </p>
              </div>
            )}

            {/* No admin set yet */}
            {isLoggedIn && adminStatus === "no-admin" && (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-sm text-foreground">
                  <p className="font-medium mb-1">No admin configured yet</p>
                  <p className="text-muted-foreground">
                    You are the first to sign in. Set your account as the
                    administrator to manage adoption applications.
                  </p>
                </div>
                <Button
                  data-ocid="admin-login.set_admin_button"
                  className="w-full"
                  variant="default"
                  onClick={handleSetAdmin}
                  disabled={settingAdmin}
                >
                  {settingAdmin ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 mr-2" />
                  )}
                  Set Yourself as Admin
                </Button>
                <Button
                  data-ocid="admin-login.sign_out_button"
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={() => {
                    clear();
                    setAdminStatus("idle");
                  }}
                >
                  Sign Out
                </Button>
              </div>
            )}

            {/* Access denied */}
            {isLoggedIn && adminStatus === "denied" && (
              <div className="space-y-4">
                <div
                  data-ocid="admin-login.access_denied"
                  className="flex items-start gap-2 p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive text-sm">
                      Access Denied
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You are not authorized to access this area. Only the
                      designated admin can sign in here.
                    </p>
                  </div>
                </div>
                <Button
                  data-ocid="admin-login.sign_out_button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    clear();
                    setAdminStatus("idle");
                  }}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="text-center mt-6">
          <a
            data-ocid="admin-login.back_link"
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
