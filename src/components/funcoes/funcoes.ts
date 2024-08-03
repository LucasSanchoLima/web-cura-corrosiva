export async function requestePegarNome(token: String) {
  const request = { headers: { Authorization: "Bearer " + token }, method: "POST" };
  const result = await fetch("/api/nomeUsuario", request);
  const data = await result.json();

  return data.nome;
}

export async function requesteMudarNome(token: String, nome: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ nome: nome }), method: "POST" };
  const result = await fetch("/api/mudarNome", request);

  return await result.json();
}

export async function enviarComentario(token: String, texto: String, capitulo: number, pai: String | null) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ texto, capitulo, pai }), method: "POST" };
  const result = await fetch("/api/enviarComentario", request);

  return await result.json();
}

export async function enviarUpVote(token: String, positivo: boolean, IDcomentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ positivo, IDcomentario }), method: "POST" };
  const result = await fetch("/api/upvote", request);

  return await result.json();
}

export async function excluirComentario(token: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ idComentario }), method: "POST" };
  const result = await fetch("/api/excluirComentario", request);

  return await result.json();
}
