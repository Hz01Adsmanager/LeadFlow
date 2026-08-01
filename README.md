# LeadFlow

LeadFlow é uma plataforma SaaS multi-tenant para gerenciamento e coleta de leads, com integração com Apify e Supabase.

## Pilha
- Frontend: Next.js App Router + TypeScript + Tailwind CSS
- Backend: Supabase (Postgres + Auth + Row Level Security)
- Integração: Apify API
- Billing: Stripe (planejado)

## Estrutura inicial
- `app/`: rotas do Next.js e telas de autenticação
- `lib/`: helpers para Supabase client e admin
- `supabase/schema.sql`: esquema inicial do banco e políticas RLS

## Configuração
Copie o arquivo de exemplo de variáveis de ambiente:

```bash
cp .env.local.example .env.local
```

Defina as variáveis:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_PUBLISHABLE_KEY` (planejado)
- `STRIPE_SECRET_KEY` (planejado)

## Desenvolvimento

```bash
npm install
npm run dev
```

## Próximos passos
- Configurar autenticação com Supabase Auth e criação de organização
- Implementar telas administrativas para membros e papéis
- Integrar Apify com execução de actors e importação de leads
- Adicionar billing e limites de plano
