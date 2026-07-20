import * as React from "react";
import { SettingsCard } from "~/components/ui/settings-card";
import { Button } from "~/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6">
        <SettingsCard title="Profile" description="Update your personal information.">
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted/50 rounded animate-pulse" />
            </div>
            <div className="grid gap-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-10 w-full bg-muted/50 rounded animate-pulse" />
            </div>
            <Button disabled>Save Changes</Button>
          </div>
        </SettingsCard>

        <SettingsCard title="Account" description="Manage your account preferences.">
          <div className="h-20 w-full bg-muted/50 rounded animate-pulse" />
        </SettingsCard>

        <SettingsCard title="Security" description="Manage your password and security settings.">
          <div className="h-20 w-full bg-muted/50 rounded animate-pulse" />
        </SettingsCard>

        <SettingsCard title="Notifications" description="Configure how you receive notifications.">
          <div className="h-20 w-full bg-muted/50 rounded animate-pulse" />
        </SettingsCard>

        <SettingsCard title="API Keys" description="Manage your API keys for integrations.">
          <div className="h-20 w-full bg-muted/50 rounded animate-pulse" />
        </SettingsCard>

        <SettingsCard
          title="Danger Zone"
          description="Irreversible and destructive actions."
          className="border-destructive/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
