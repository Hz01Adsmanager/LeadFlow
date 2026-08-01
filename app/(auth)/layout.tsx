import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LeadFlow - Autenticação',
  description: 'Entrar ou criar sua conta LeadFlow.'
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-sm sm:p-14">
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold text-slate-900">
              LeadFlow
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
