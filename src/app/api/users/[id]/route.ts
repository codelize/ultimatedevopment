import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // ID do usuário para atualizar

  // Caminho do arquivo JSON
  const filePath = path.join(process.cwd(), 'public', 'users.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(fileContents);

  // Verifica se o ID é numérico e busca o índice do usuário pelo ID
  const userIndex = users.findIndex((user: any) => String(user.id) === id);
  if (userIndex === -1) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  // Atualiza os dados do usuário com os novos dados recebidos
  const updatedUser = await request.json();
  users[userIndex] = { ...users[userIndex], ...updatedUser };

  // Salva as alterações no arquivo JSON
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: 'Usuário atualizado com sucesso', user: users[userIndex] });
}
