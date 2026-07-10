import { Dumbbell } from "lucide-react";
import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-400 text-zinc-950">
                <Dumbbell className="h-4 w-4" />
              </div>
              <span className="text-white">
                IRON<span className="text-lime-400">PULSE</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
              Premium fitness experience with world-class trainers and
              cutting-edge facilities.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/classes" className="text-sm text-zinc-500 hover:text-white transition-colors">Classes</Link>
              <Link href="/trainers" className="text-sm text-zinc-500 hover:text-white transition-colors">Trainers</Link>
              <Link href="/pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">Pricing</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Account</h4>
            <div className="flex flex-col gap-2">
              <Link href="/login" className="text-sm text-zinc-500 hover:text-white transition-colors">Log in</Link>
              <Link href="/register" className="text-sm text-zinc-500 hover:text-white transition-colors">Register</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-zinc-500">
              <span>hello@ironpulse.com</span>
              <span>+1 (555) 123-4567</span>
              <span>123 Fitness St, New York</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-zinc-600">
          © {new Date().getFullYear()} IronPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
