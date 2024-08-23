"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export default function FormButton() {
  const { pending } = useFormStatus();
  return (
    <div className="flex sticky bottom-0 bg-white justify-end w-full md:col-span-2  text-sm px-4 py-4">
      <Button
        disabled={pending}
        variant={"default"}
        className="bg-indigo-600 hover:bg-indigo-700"
      >
        Guardar
      </Button>
    </div>
  );
}
