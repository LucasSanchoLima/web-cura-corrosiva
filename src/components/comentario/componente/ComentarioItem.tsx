"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { ComentarioForm } from "../cliente";
import { Comentario } from "../comentarioServer";
import { ComentarioProps } from "./ComentarioLista";

interface ComentarioContextProps {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  comment: ComentarioProps;
}

const CommentContext = createContext({} as ComentarioContextProps);

export default function ComentarioItem({ comment }: { comment: ComentarioProps }) {
  const [isEditing, setIsEditing] = useState(false);

  const memoizedProps = useMemo(() => ({ isEditing, setIsEditing, comment }), [isEditing, setIsEditing, comment]);

  return <CommentContext.Provider value={memoizedProps}>{isEditing ? <ComentarioForm /> : <Comentario />}</CommentContext.Provider>;
}

export function useComment() {
  return useContext(CommentContext);
}
