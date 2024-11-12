import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'users.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContents);
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const newUser = await request.json();

  const filePath = path.join(process.cwd(), 'public', 'users.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContents);

  if (users.some((user: any) => user.id === newUser.id || user.rm === newUser.rm)) {
    return NextResponse.json({ error: 'Usuário já cadastrado' }, { status: 400 });
  }

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: 'Usuário registrado com sucesso', user: newUser });
}
