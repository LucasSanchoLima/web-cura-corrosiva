import { useUserContext } from "@/contexts/userContext";
import { FontMaquina } from "@/fonts/fonts";
import { useWindowSize } from "@/hooks/useWindowSize";
import { tagComentario } from "../funcoes";
import { useLeitorContext } from "@/contexts/leitorContext";
import { enviarComentario, editarComentario } from "@/components/funcoes/funcoes";
import { useComment } from "./ComentarioItem";
import { useArrayComentarioContext } from "@/contexts/arrayComentarioContext";

export function FormularioComentario() {
  const { recarregarComentarios } = useArrayComentarioContext();
  const { user, nomeUsuario } = useUserContext();
  const windowSize = useWindowSize();
  const { idCapAtual } = useLeitorContext();
  const { comment, setIsEditing, isEditing } = useComment();

  let idComentario = comment?.id;

  if (idComentario == undefined) {
    idComentario = "padrao";
  }

  let textoEditado = comment?.texto.replaceAll("[!]", String.fromCharCode(10));

  async function enviarForm(formData: FormData) {
    let texto = String(formData.get("texto"));
    let valorInput = document.getElementById(idComentario) as HTMLInputElement;

    valorInput.value = "";

    if (texto == "") {
      console.error("Nenhum texto para ser enviardo");
      return;
    }

    const token = await user!.getIdToken();

    texto = texto.replaceAll(String.fromCharCode(10), "[!]");

    if (isEditing) {
      setIsEditing(false);
      await editarComentario(token, texto, idComentario);
    } else {
      await enviarComentario(token, texto, idCapAtual, null);
    }
    recarregarComentarios();
  }

  return (
    <div className="bg-zinc-900 p-3 my-10 rounded-md">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="rounded-full bg-zinc-950 text-center w-12 h-12 flex flex-col">
            <p className={`my-auto ${nomeUsuario![0].search(/[a-z]/) < 0 ? "pt-1" : ""} select-none`}>{nomeUsuario![0]}</p>
          </div>
          <p className="p-3 max-w-24 sm:max-w-max text-ellipsis overflow-hidden text-nowrap">{nomeUsuario}</p>
        </div>
        <div className={`${FontMaquina.className} text-sm md:text-base`}>
          <button
            // onClick={() => {
            //   tagComentario("s", idComentario, windowSize.largura!);
            // }}
            className="p-1 mr-1 sm:mx-2 bg-zinc-800 rounded-md border border-zinc-500 px-2 opacity-40"
          >
            {windowSize.largura! > 640 ? "Spoiler" : "S"}
          </button>
          <button
            onClick={() => {
              tagComentario("t", idComentario, windowSize.largura!);
            }}
            className="p-1 mr-1 sm:mx-2 bg-zinc-800 rounded-md border border-zinc-500 px-2"
          >
            {windowSize.largura! > 640 ? "Tagarela" : "T"}
          </button>
          <button
            onClick={() => {
              tagComentario("a", idComentario, windowSize.largura!);
            }}
            className="p-1 mr-1 sm:mx-2 bg-zinc-800 rounded-md border border-zinc-500 px-2"
          >
            {windowSize.largura! > 640 ? "Alice" : "A"}
          </button>
          <button
            onClick={() => {
              tagComentario("r", idComentario, windowSize.largura!);
            }}
            className="p-1 mr-1 sm:mx-2 bg-zinc-800 rounded-md border border-zinc-500 px-2"
          >
            {windowSize.largura! > 640 ? "Radio" : "R"}
          </button>
        </div>
      </div>
      <form
        action={enviarForm}
        className={`flex flex-col text-base sm:text-xl items-end w-full ${FontMaquina.className}`}
      >
        <textarea
          rows={6}
          placeholder="Deixe seu comentario aqui..."
          id={idComentario}
          name="texto"
          defaultValue={comment?.texto ? textoEditado : ""}
          className="bg-zinc-800 w-full text-xl rounded-md p-1 mt-3 sm:p-2 sm:py-3"
        ></textarea>
        <div>
          {comment?.id != undefined ? (
            <button
              onClick={() => {
                setIsEditing(false);
              }}
              className="mt-3 bg-red-800 rounded-full py-1 px-5 mx-3"
            >
              Cancelar
            </button>
          ) : (
            <></>
          )}

          <input
            type="submit"
            value={"Enviar"}
            className="mt-3 bg-sky-800 rounded-full py-1 px-5 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
