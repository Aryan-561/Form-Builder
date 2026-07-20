import * as React from "react";
import { SettingsCard } from "~/components/ui/settings-card";
import { Button } from "~/components/ui/button";

export default function BillingPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription plan, credits, and payment methods.
        </p>
      </div>

      <div className="grid gap-6">
        <SettingsCard title="Current Plan" description="You are currently on the Free plan.">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Free Plan</p>
              <p className="text-sm text-muted-foreground mt-1">
                Up to 3 active forms and 100 submissions per month.
              </p>
            </div>
            <Button>Upgrade Plan</Button>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Credits & Usage"
          description="Your current credit usage for this billing cycle."
        >
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
        </SettingsCard>

        <SettingsCard
          title="Payment Method"
          description="Manage your credit cards and payment methods."
        >
          <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg bg-muted/20">
            <p className="text-sm text-muted-foreground">No payment method added yet.</p>
          </div>
        </SettingsCard>

        <SettingsCard
          title="Billing History"
          description="View and download your previous invoices."
        >
          <div className="flex items-center justify-center p-6 border border-dashed rounded-lg bg-muted/20">
            <p className="text-sm text-muted-foreground">No billing history available.</p>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
