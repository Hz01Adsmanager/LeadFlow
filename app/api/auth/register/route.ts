import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, organizationName } = body as {
      email?: string;
      password?: string;
      organizationName?: string;
    };

    if (!email || !password || !organizationName) {
    console.error('Register request missing fields', { email, organizationName, password });
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
    console.error('Supabase signUp error', signUpResult.error);
    return NextResponse.json({ error: signUpResult.error.message }, { status: 400 });
  }

  const user = signUpResult.data.user;
  if (!user) {
    console.error('Supabase signUp returned no user', signUpResult.data);
    }

    const organizationInsert = await supabaseAdmin
      .from('organizations')
      .insert({ name: organizationName })
      .select('id')
      .single();

    if (organizationInsert.error || !organizationInsert.data) {
      console.error('Organization insert error', organizationInsert.error, organizationInsert.data);
      try {
        await supabaseAdmin.auth.admin.deleteUser(user.id);
      } catch (cleanupError) {
        console.error('Cleanup deleteUser error', cleanupError);
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
      console.error('User insert error', userInsert.error);
      try {
        await supabaseAdmin.from('organizations').delete().eq('id', organizationId);
      } catch (cleanupError) {
        console.error('Cleanup delete organization error', cleanupError);
      }
      try {
        await supabaseAdmin.auth.admin.deleteUser(user.id);
      } catch (cleanupError) {
        console.error('Cleanup deleteUser error', cleanupError);
      }
      return NextResponse.json({ error: 'Não foi possível criar o usuário da organização.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Register route error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro interno no cadastro.' },
      { status: 500 }
    );
  }
}
