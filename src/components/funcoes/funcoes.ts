"use client";

export async function requestePegarNome(token: String) {
  const request = { headers: { Authorization: "Bearer " + token }, method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/nomeUsuario", request);
  const data = await result.json();

  return data.nome;
}

export async function requesteMudarNome(token: String, nome: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ nome: nome }), method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/mudarNome", request);

  return await result.json();
}

export async function enviarComentario(token: String, texto: String, capitulo: number, pai: String | null) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ texto, capitulo, pai }), method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/enviarComentario", request);

  return await result.json();
}

export async function editarComentario(token: String, texto: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ texto, idComentario }), method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/editarComentario", request);

  return await result.json();
}

export async function enviarUpVote(token: String, positivo: boolean, IDcomentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ positivo, IDcomentario }), method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/upvote", request);

  return await result.json();
}

export async function excluirComentario(token: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ idComentario }), method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/excluirComentario", request);

  return await result.json();
}

export async function denunciarComentario(token: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ idComentario }), method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/denunciarComentario", request);

  return await result.json();
}

export async function pegarComentario(arco: number, inicio: number, qtd: number) {
  const request = { body: JSON.stringify({ arco, inicio, qtd }), method: "POST" };
  const result = await fetch("https://curacorrosiva.com/api/carregarComentario", request);

  return await result.json();
}
