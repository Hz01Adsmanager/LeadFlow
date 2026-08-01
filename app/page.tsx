import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">LeadFlow</p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Gerencie captação de leads com Apify e Supabase.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Uma plataforma multi-tenant para coletar, organizar e acompanhar leads de scraping.
              Crie sua organização, convide sua equipe e importe leads automaticamente.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Criar conta
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300"
              >
                Entrar
              </Link>
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Multi-tenant</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Cada organização tem dados isolados com Row Level Security no Supabase.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Integração Apify</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Configure actors, dispare coletas e importe resultados diretamente como leads.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
