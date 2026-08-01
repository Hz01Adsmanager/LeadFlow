export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard LeadFlow</h1>
          <p className="mt-4 text-slate-600">
            Bem-vindo(a)! Sua organização foi criada com sucesso. Em breve, você poderá configurar
            fontes de coleta, executar actors do Apify e gerenciar seus leads.
          </p>
        </div>
      </div>
    </main>
  );
}
