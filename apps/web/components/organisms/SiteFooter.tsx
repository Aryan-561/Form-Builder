import Link from "next/link";
import Logo from "../logo/logo";

export function SiteFooter() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <Logo hideTitle />
          <span>© {new Date().getFullYear()} FormCraft SaaS Inc. All rights reserved.</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/terms"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/docs"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            API Documentation
          </Link>
          <Link
            href="/support"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
}
