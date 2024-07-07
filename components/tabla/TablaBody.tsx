import React from "react";
interface props<T> {
  filas: T[];
  children: (fila: T) => React.ReactNode;
}
export default function TablaBody<T>({ filas, children }: props<T>) {
  return (
    <tbody className="text-gray-700 dark:text-gray-200 text-sm font-semibold">
      {filas.map((fila, index) => (
        <React.Fragment key={index + 100}>{children(fila)}</React.Fragment>
      ))}
    </tbody>
  );
}
