import * as React from "react";
import { SettingsCard } from "~/components/ui/settings-card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6">
        <SettingsCard title="Profile" description="Update your personal information.">
          <div className="space-y-4 max-w-sm">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="e.g. johndoe" defaultValue="johndoe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                defaultValue="john@example.com"
                disabled
              />
            </div>
            <Button>Save Changes</Button>
          </div>
        </SettingsCard>

        <SettingsCard title="Security" description="Manage your password and security settings.">
          <div className="space-y-4 max-w-sm">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" placeholder="Enter new password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>
            <Button>Update Password</Button>
          </div>
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
