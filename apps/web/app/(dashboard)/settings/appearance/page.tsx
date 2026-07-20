"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useThemeStore } from "~/hooks/use-theme-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Check, Moon, Sun, Monitor } from "lucide-react";

const presetColors = [
  { name: "Zinc", value: "" }, // Default
  { name: "Rose", value: "oklch(0.60 0.18 16)" },
  { name: "Blue", value: "oklch(0.60 0.16 255)" },
  { name: "Green", value: "oklch(0.65 0.15 150)" },
  { name: "Violet", value: "oklch(0.60 0.18 300)" },
  { name: "Orange", value: "oklch(0.65 0.18 45)" },
];

export default function AppearanceSettingsPage() {
  const { theme, setTheme } = useTheme();
  const {
    themeName,
    setThemeName,
    primaryColor,
    setPrimaryColor,
    radius,
    setRadius,
    fontFamily,
    setFontFamily,
    isGlass,
    setIsGlass,
    reset,
  } = useThemeStore();

  const handleThemeChange = (val: "default" | "ocean-breeze" | "starry-night") => {
    setThemeName(val);
  };

  const handleReset = () => {
    reset();
    setTheme("system");
  };

  const themes = [
    { name: "Default", value: "default", color: "bg-zinc-950 dark:bg-white" },
    { name: "Ocean Breeze", value: "ocean-breeze", color: "bg-blue-600" },
    { name: "Starry Night", value: "starry-night", color: "bg-indigo-950" },
  ] as const;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
          <p className="text-muted-foreground mt-2">
            Customize the look and feel of your workspace. Changes are applied immediately.
          </p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          Reset to Defaults
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Color Theme</CardTitle>
            <CardDescription>
              Select the underlying theme palette for your interface.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {themes.map((t) => (
                <div
                  key={t.value}
                  className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 transition-all hover:bg-accent hover:text-accent-foreground ${
                    themeName === t.value ? "border-primary" : "border-border"
                  }`}
                  onClick={() => handleThemeChange(t.value)}
                >
                  <div className={`mb-3 h-8 w-8 rounded-full ${t.color}`} />
                  <span className="text-sm font-medium">{t.name}</span>
                  {themeName === t.value && (
                    <Check className="absolute top-2 right-2 h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mode</CardTitle>
            <CardDescription>Switch between light and dark mode.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid max-w-md grid-cols-3 gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="justify-start"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Primary Color</CardTitle>
            <CardDescription>
              Choose a preset or enter a custom value (e.g. #3b82f6 or oklch(...)).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-wrap gap-3">
              {presetColors.map((color) => (
                <div
                  key={color.name}
                  onClick={() => setPrimaryColor(color.value)}
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                    primaryColor === color.value
                      ? "scale-110 border-primary"
                      : "border-transparent hover:scale-105 hover:border-border"
                  }`}
                  title={color.name}
                  style={{
                    backgroundColor: color.value || "hsl(var(--primary))",
                  }}
                >
                  {primaryColor === color.value && (
                    <Check className="h-5 w-5 text-primary-foreground drop-shadow-md" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex max-w-md items-center gap-4">
              <div
                className="h-10 w-10 shrink-0 rounded-md border shadow-sm"
                style={{
                  backgroundColor: primaryColor || "hsl(var(--primary))",
                }}
              />
              <input
                type="color"
                value={primaryColor || "#3b82f6"}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-20 cursor-pointer rounded-md border-0 p-0"
              />
              <Button variant="outline" onClick={() => setPrimaryColor("")}>
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Special Effects</CardTitle>
            <CardDescription>Enable crazy visual effects for your workspace.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={isGlass}
                  onChange={(e) => setIsGlass(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                Enable Glassmorphism UI (Translucent Cards)
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Choose the font family used across the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <Select
                value={fontFamily}
                onValueChange={(val) => {
                  if (val) setFontFamily(val);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="font-sans">Sans Serif (Default)</SelectItem>
                  <SelectItem value="font-serif">Serif</SelectItem>
                  <SelectItem value="font-mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
            <CardDescription>Adjust how rounded the components should be.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex max-w-md items-center gap-6">
              <span className="w-12 text-sm font-medium">{radius.toFixed(2)}</span>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <Button variant="outline" onClick={() => setRadius(0.5)}>
                Reset
              </Button>
            </div>
            <div className="mt-8">
              <Label className="mb-3 block">Preview:</Label>
              <div className="flex gap-4">
                <Button>Primary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="secondary">Secondary Button</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
