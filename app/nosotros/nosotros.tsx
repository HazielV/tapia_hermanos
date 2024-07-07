"use client";

import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
export default function Nosotros() {
  const [id, setId] = useState(1);
  const [esVisible, setVisible] = useState(true);
  const opciones = [
    {
      id: 1,
      titulo: "Quienes somos",
    },
    {
      id: 2,
      titulo: "Nuestra misión",
    },
    {
      id: 3,
      titulo: "Nuestra visión",
    },
    {
      id: 4,
      titulo: "Nuestra Fortaleza",
    },
  ];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    if (id > current) {
      for (let index = current; index < id; index++) {
        api.scrollNext();
      }
    }
    if (id < current) {
      for (let index = id; index < current; index++) {
        api.scrollPrev();
      }
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, id, current]);

  const textos = [
    {
      id: 1,
      texto: `Fundada un 20 de junio del año 2000, se constituye Tapia Hermanos Transporte S.R.L. una empresa enfocada en transportar carga solida de alto tonelaje en territorio nacional e internacional.
      Siempre enfocada y reconocida por brindar un servicio de calidad con responsabilidad y compromiso, hoy en día recorre las principales carreteras de Bolivia, Chile y Perú
      `,
    },
    {
      id: 2,
      texto: `Tenemos como misión el de brindar un servicio de transporte de carga pesada a nivel nacional e internacional satisfaciendo los requerimientos y necesidades de los clientes, garantizando un servicio que se destaque por su puntualidad, seguridad, calidad y experiencia.`,
    },
    {
      id: 3,
      texto: `Buscamos convertirnos en una compañía posicionada en el mercado nacional e internacional y consolidarnos como una empresa de calidad que brinda servicios confiables y de excelencia para nuestros clientes. `,
    },
    {
      id: 4,
      texto: `Contamos con una basta experiencia en el mercado de transporte, con capacidad de adaptarnos a los requerimientos de los clientes, así también nuestro equipo de trabajo experto en el transporte de carga comparte los valores de la empresa y busca alcanzar nuestra visión`,
    },
  ];
  return (
    <section
      id="Nosotros"
      className=" min-h-screen pt-40 flex items-center flex-col justify-center gap-20 bg-[#fff] py-20 md:py-28 md:pt-60"
    >
      <div className="grid place-items-center gap-16 w-full">
        <div className="flex relative h-full">
          <h1
            onAnimationEnd={(e) => {
              setVisible(false);
            }}
            className="capitalize font-bold text-3xl overflow-hidden whitespace-nowrap  text-blue-900 textanime"
          >
            Porque elegirnos?
          </h1>
          {esVisible && (
            <div className="relative h-full w-1 bg-black top-0 -right-1 cursoranime"></div>
          )}
        </div>
        {/* barra con botones */}
        <div className="grid  place-items-center w-full">
          <div className="flex justify-between w-11/12 sm:w-4/5 md:w-3/5 max-w-2xl  relative">
            <div className="w-full py-4 flex justify-center absolute top-full mt-1.5">
              <div className="h-0.5 bg-gray-200 w-[80%] sm:w-[85%]"></div>
            </div>
            {opciones.map((opcion) => (
              <div
                onClick={() => setId(opcion.id)}
                key={opcion.id}
                className=" relative flex items-center justify-center cursor-pointer select-none group "
              >
                {/* bolita */}
                <span
                  className={
                    "w-5 h-5 rounded-full  border-[5px] absolute top-full mt-3  " +
                    (id === opcion.id
                      ? "border-white bg-[#0078FF] shadow-md shadow-black/40"
                      : "border-gray-200 bg-gray-400 group-hover:bg-[#0078FF]")
                  }
                ></span>
                {id === opcion.id ? (
                  <p
                    style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)" }}
                    className={
                      " font-semibold leading-5   max-w-[80px] text-center select-none " +
                      (id === opcion.id
                        ? "text-[#0078FF] "
                        : "text-gray-400/70")
                    }
                  >
                    {opcion.titulo}
                  </p>
                ) : (
                  <p
                    className={
                      " font-semibold leading-5 transition  max-w-[80px] text-center select-none " +
                      (id === opcion.id
                        ? "text-[#0078FF] "
                        : "text-gray-400/70 hover:text-[#0078FF]")
                    }
                  >
                    {opcion.titulo}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" mt-5 md:mt-10 flex flex-col-reverse w-4/5 max-w-3xl gap-10 md:gap-12  justify-center items-center md:flex-row ">
        {/* carousel */}
        <div className="">
          <Carousel
            setApi={setApi}
            className="w-full max-w-md after:absolute z-10  after:h-full after:w-[90%] after:top-0 after:bg-black/25 after:blur-md after:-z-10 bg-transparent after:left-0"
          >
            <CarouselContent className="bg-transparent">
              <CarouselItem className=" bg-transparent w-full ">
                <div className="h-96 w-[25rem] border ">
                  <img
                    src="/quienes_somos.jpg"
                    alt=""
                    className="object-cover h-full object-[35%,0%]"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-96 w-[25rem] border">
                  <img
                    src="/mision.jpg"
                    alt=""
                    className="object-cover h-full object-[65%,0%]"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-96 w-[25rem] border">
                  <img
                    src="/vision.jpg"
                    alt=""
                    className="object-cover h-full object-[50%,0%]"
                  />
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-96 w-[25rem] border">
                  <img
                    src="/fortaleza.png"
                    alt=""
                    className="object-cover h-full object-[50%,0%]"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        {/* textos */}
        <div className="max-w-xl">
          {textos.find((elem) => elem.id === id) && (
            <div key={id} className="text-justify entrada">
              {textos.find((elem) => elem.id === id)?.texto}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
