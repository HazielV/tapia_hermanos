"use client";

import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Footer from "./components/footer";
import { login } from "../actions/auth";
const initialState = {
  message: "",
};
export default function Login() {
  const [state, formAction] = useFormState(login, initialState);
  console.log(state);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <form action={formAction} className="grid gap-5 w-full max-w-sm p-8">
        <h1 className="text-2xl font-medium pb-5">Bienvenido al sistema</h1>
        <p aria-live="polite" className="">
          {state?.message}
        </p>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="usuario">Usuario</Label>
          <Input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            required
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            name="password"
            type="password"
            id="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <Footer />
      </form>
    </div>
  );
}
