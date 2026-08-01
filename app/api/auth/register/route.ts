import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, organizationName } = body as {
    email?: string;
    password?: string;
    organizationName?: string;
  };

  if (!email || !password || !organizationName) {
    return NextResponse.json({ error: 'Preencha email, senha e nome da organização.' }, { status: 400 });
  }

  const signUpResult = await supabaseAdmin.auth.signUp({
    email,
    password,
    options: {
      data: {
        organization_name: organizationName
      }
    }
  });

  if (signUpResult.error) {
    return NextResponse.json({ error: signUpResult.error.message }, { status: 400 });
  }

  const user = signUpResult.data.user;
  if (!user) {
    return NextResponse.json({ error: 'Não foi possível criar o usuário.' }, { status: 500 });
  }

  const organizationInsert = await supabaseAdmin
    .from('organizations')
    .insert({ name: organizationName })
    .select('id')
    .single();

  if (organizationInsert.error || !organizationInsert.data) {
    try {
      await supabaseAdmin.auth.admin.deleteUser(user.id);
    } catch {
      // ignore cleanup failure
    }
    return NextResponse.json({ error: 'Não foi possível criar a organização.' }, { status: 500 });
  }

  const organizationId = organizationInsert.data.id;
  const userInsert = await supabaseAdmin.from('users').insert({
    auth_id: user.id,
    organization_id: organizationId,
    role: 'admin'
  });

  if (userInsert.error) {
    try {
      await supabaseAdmin.from('organizations').delete().eq('id', organizationId);
    } catch {
      // ignore cleanup failure
    }
    try {
      await supabaseAdmin.auth.admin.deleteUser(user.id);
    } catch {
      // ignore cleanup failure
    }
    return NextResponse.json({ error: 'Não foi possível criar o usuário da organização.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
