"use client";

// const serverURL = "https://curacorrosiva.com";
const serverURL = "http://localhost:3000";

//=============
//Capitulo PAGE
//=============

export async function carregarCapituloLeitor(nomeCapitulo: String, nomeLivro: String, nomeAutor: String) {
  const request = { body: JSON.stringify({ capitulo: nomeCapitulo, autor: nomeAutor, livro: nomeLivro }), method: "POST" };
  const result = await fetch(serverURL + "/api/CapituloPage/carregarCapituloLeitor", request);

  return await result.json();
}

//==========
//LIVRO PAGE
//==========

export async function alterarNomeCapitulo(token: String, novoTitulo: String, antigoTitulo: String, livro: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ antigoTitulo, novoTitulo, livro }), method: "POST" };
  const result = await fetch(serverURL + "/api/LivroPage/alterarNomeCapitulo", request);

  return await result.json();
}

export async function carregarInfoLivro(Titulo: String, autor: String) {
  const request = { body: JSON.stringify({ Titulo, autor }), method: "POST" };
  const result = await fetch(serverURL + "/api/LivroPage/carregarLivroInfo", request);

  return await result.json();
}

export async function adicionarCapitulo(token: String, titulo: String, livro: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ titulo, livro }), method: "POST" };
  const result = await fetch(serverURL + "/api/LivroPage/adicionarCapitulo", request);

  return await result.json();
}

export async function requesteAlterarTitulo(token: String, NovoTitulo: String, AntigoTitulo: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ nomeLivro: NovoTitulo, AntigoTitulo }), method: "POST" };
  const result = await fetch(serverURL + "/api/LivroPage/alterarTituloLivro", request);

  return await result.json();
}

export async function alterarDescricaoLivro(token: String, descricao: String, titulo: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ descricao: descricao, titulo: titulo }), method: "POST" };
  const result = await fetch(serverURL + "/api/LivroPage/alterarDescricao", request);

  return await result.json();
}

//============
//USUARIO PAGE
//============

export async function requesteMudarNome(token: String, nome: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ nome: nome }), method: "POST" };
  const result = await fetch(serverURL + "/api/UsuarioPage/mudarNome", request);

  return await result.json();
}

export async function criarLivro(token: String, nomeLivro: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ nomeLivro }), method: "POST" };
  const result = await fetch(serverURL + "/api/UsuarioPage/criarLivro", request);

  return await result.json();
}

export async function autorPegarLivros(token: String) {
  const request = { headers: { Authorization: "Bearer " + token }, method: "POST" };
  const result = await fetch(serverURL + "/api/UsuarioPage/autorCarregarLivros", request);

  return await result.json();
}

export async function pegarAutor(nomeAutor: string) {
  const request = { body: JSON.stringify({ nomeAutor }), method: "POST" };
  const result = await fetch(serverURL + "/api/UsuarioPage/carregarAutor", request);

  return await result.json();
}

//==========
//Comentario
//==========

export async function denunciarComentario(token: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ idComentario }), method: "POST" };
  const result = await fetch(serverURL + "/api/Comentario/denunciarComentario", request);

  return await result.json();
}

export async function editarComentario(token: String, texto: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ texto, idComentario }), method: "POST" };
  const result = await fetch(serverURL + "/api/Comentario/editarComentario", request);

  return await result.json();
}

export async function enviarComentario(token: String, texto: String, capitulo: number, pai: String | null) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ texto, capitulo, pai }), method: "POST" };
  const result = await fetch(serverURL + "/api/Comentario/enviarComentario", request);

  return await result.json();
}

export async function enviarUpVote(token: String, positivo: boolean, IDcomentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ positivo, IDcomentario }), method: "POST" };
  const result = await fetch(serverURL + "/api/Comentario/upvote", request);

  return await result.json();
}

export async function excluirComentario(token: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ idComentario }), method: "POST" };
  const result = await fetch(serverURL + "/api/Comentario/excluirComentario", request);

  return await result.json();
}

export async function pegarComentario(arco: number, inicio: number, qtd: number) {
  const request = { body: JSON.stringify({ arco, inicio, qtd }), method: "POST" };
  const result = await fetch(serverURL + "/api/Comentario/carregarComentario", request);

  return await result.json();
}

export async function carregarUpVote(token: String, idComentario: String) {
  const request = { headers: { Authorization: "Bearer " + token }, body: JSON.stringify({ idComentario: idComentario }), method: "POST" };
  const result = await fetch(serverURL + "/api/Comentario/carregarUpvote", request);

  return await result.json();
}

//=====
//RESTo
//=====

export async function requestePegarNome(token: String) {
  const request = { headers: { Authorization: "Bearer " + token }, method: "POST" };
  const result = await fetch(serverURL + "/api/nomeUsuario", request);
  const data = await result.json();

  return data.nome;
}
