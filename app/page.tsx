import Link from "next/link";
import Nosotros from "./nosotros/nosotros";
import BarraFlotante from "@/components/barraFlotante";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Sidebar from "./sidebar";

export default function Home({
  searchParams,
}: {
  searchParams: { enviado: string };
}) {
  const servicios = [
    {
      titulo: "Primer contacto",
      imagen: (
        <img src="/primer.jpg" alt="" className=" object-cover object-bottom" />
      ),
      descripcion:
        "Brindamos asesoramiento a nuestros clientes sobre documentación y licencias para el transporte de carga.",
      icono: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
        </svg>
      ),
    },
    {
      titulo: "Carga Masiva ",
      imagen: (
        <img src="/masiva.png" alt="" className=" object-cover object-bottom" />
      ),
      descripcion:
        "Nuestra empresa esta especializa en el transporte de carga masiva, que va desde el transporte de mineral, material de construcción, contenedores y carga en general",
      icono: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 15V8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5V15.5C13 16.8807 14.1193 18 15.5 18C16.8807 18 18 16.8807 18 15.5V8.82929C16.8348 8.41746 16 7.30622 16 6C16 4.34315 17.3431 3 19 3C20.6569 3 22 4.34315 22 6C22 7.30622 21.1652 8.41746 20 8.82929V15.5C20 17.9853 17.9853 20 15.5 20C13.0147 20 11 17.9853 11 15.5V8.5C11 7.11929 9.88071 6 8.5 6C7.11929 6 6 7.11929 6 8.5V15H9L5 20L1 15H4Z"></path>
        </svg>
      ),
    },
    {
      titulo: "Seguimiento",
      imagen: (
        <img
          src="/seguimiento.png"
          alt=""
          className=" object-cover object-bottom brightness-125"
        />
      ),
      descripcion:
        "La carga se encuentra monitoreado desde la recogida hasta la entrega. Mayor seguridad y eficiencia en el transporte.",
      icono: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 15V8.5C4 6.01472 6.01472 4 8.5 4C10.9853 4 13 6.01472 13 8.5V15.5C13 16.8807 14.1193 18 15.5 18C16.8807 18 18 16.8807 18 15.5V8.82929C16.8348 8.41746 16 7.30622 16 6C16 4.34315 17.3431 3 19 3C20.6569 3 22 4.34315 22 6C22 7.30622 21.1652 8.41746 20 8.82929V15.5C20 17.9853 17.9853 20 15.5 20C13.0147 20 11 17.9853 11 15.5V8.5C11 7.11929 9.88071 6 8.5 6C7.11929 6 6 7.11929 6 8.5V15H9L5 20L1 15H4Z"></path>
        </svg>
      ),
    },
    {
      titulo: "Documentación ",
      imagen: (
        <img
          src="/documentacion.png"
          alt=""
          className=" object-cover object-bottom"
        />
      ),
      descripcion:
        "La organización es la encargada de revisar y ejecutar la documentación necesaria en frontera",
      icono: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M9 4H14.4458C14.7905 4 15.111 4.17762 15.2938 4.47L18.75 10H23.1577C23.4339 10 23.6577 10.2239 23.6577 10.5C23.6577 10.5837 23.6367 10.666 23.5967 10.7394L19.6364 18H19C18.4694 18 17.9548 17.9311 17.4648 17.8018L20.63 12H3.4L4.44833 17.824C3.9845 17.939 3.49937 18 3 18H2.45455L1.21434 11.1789C1.11555 10.6355 1.47595 10.1149 2.01933 10.0161C2.07835 10.0054 2.13822 10 2.19821 10H3V5C3 4.44772 3.44772 4 4 4H5V1H9V4ZM5 10H16.3915L13.8915 6H5V10ZM3 20C4.53671 20 5.93849 19.4223 7 18.4722C8.06151 19.4223 9.46329 20 11 20C12.5367 20 13.9385 19.4223 15 18.4722C16.0615 19.4223 17.4633 20 19 20H21V22H19C17.5429 22 16.1767 21.6104 15 20.9297C13.8233 21.6104 12.4571 22 11 22C9.54285 22 8.17669 21.6104 7 20.9297C5.82331 21.6104 4.45715 22 3 22H1V20H3Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="">
      <div className="flex flex-col overflow-x-hidden overflow-y-auto min-h-screen  ">
        <div className="fixed bottom-8 left-8 items-center flex flex-col gap-5 z-50 group">
          <a
            href="https://www.facebook.com/profile.php?id=61557797254300"
            target="_blank"
            className="text-blue-500  rounded-full bg-white translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-facebook w-14 h-14"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
          <a
            href="https://wa.link/ubml82"
            target="_blank"
            className="p-3 rounded-full bg-green-400 text-white z-10 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-facebook w-10 h-10"
              viewBox="0 0 16 16"
            >
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
          </a>
        </div>
        <div className="fixed w-full z-50 bg-gray-100/70 p-4 flex items-center justify-between py-2">
          {/* logo */}
          <div className="h-16 flex">
            <img src="/logo.png" alt="" />
          </div>
          {/* button barras */}
          <Sidebar />
          {/* MENUS */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-6 gap-8 font-medium">
              <div className="cursor-pointer ">
                <a href="#Inicio">Inicio</a>
              </div>
              <div className="cursor-pointer">
                <a href="#Nosotros">Nosotros</a>
              </div>
              <div className="cursor-pointer">
                <a href="#Servicios">Servicios</a>
              </div>
              <div className="cursor-pointer">
                <a href="#Cotizacion">Cotizacion</a>
              </div>
              <div className="cursor-pointer">
                <a href="#Destinos">Destinos</a>
              </div>
              <div className="cursor-pointer">
                <a href="#Contacto">Contacto</a>
              </div>
            </div>
          </div>
        </div>
        <section id="Inicio">
          <div className="relative flex flex-col justify-center items-center  w-screen min-h-[85vh] bgHero text-white p-5">
            <div className="absolute bg-black/30 w-full h-full"></div>

            <div
              id="hero"
              className="relative flex flex-col items-center uppercase text-left w-11/12"
            >
              <div className="flex flex-col gap-5">
                <h1 className="font-bold text-5xl text-center md:text-left  ">
                  TAPIA HERMANOS TRANSPORTE S.R.L.
                </h1>
                <div className="font-light text-xl flex flex-col text-gray-200  ">
                  <span>TRANSPORTE DE CARGA PESADA POR CARRETERA </span>
                  <span className="normal-case max-w-4xl">
                    Somos una empresa con experiencia consolidada en el mercado
                    nacional e internacional
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <Link href={"/rastrearpedido"} className="flex">
                    <Button
                      className="h-auto px-7 text-lg"
                      variant={"secondary"}
                    >
                      Ratrear Pedido
                    </Button>
                  </Link>
                  <a href="#Contacto">
                    <button className="text-white   self-end text-lg border-[3px] px-5 py-2.5 hover:bg-white hover:text-black transition hover:border-white">
                      Contáctanos
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <BarraFlotante />
          </div>
        </section>
        {/* Nosotros */}
        <Nosotros />

        {/* servicios */}
        <section
          id="Servicios"
          className=" min-h-[60vh]  flex items-center flex-col justify-center gap-10 bg-[#FBFBFB] py-20 md:py-28"
        >
          <div className="uppercase font-normal text-3xl md:text-4xl self-center justify-self-center text-center px-4">
            Nuestro Servicios
            <div className="text-base md:text-md lg:text-lg max-w-3xl  mt-12 px-4 font-light">
              Tapia Hermanos S.R.L. cuenta con un proceso operativo integrado,
              que abarca desde la emisión de la orden de recogida, pasando por
              el traslado de la carga y la logística, hasta la entrega de la
              mercancía a sus clientes.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  py-10  gap-10  w-full sm:w-10/12  p-5 ">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="hover:shadow-2xl transition duration-300   flex flex-col gap-3   relative bg-white"
              >
                <div className=" h-56 w-full flex bg-cover">
                  {servicio.imagen}
                </div>
                <div className="py-7 px-8 relative text-center">
                  <h1 className="text-lg md:text-xl uppercase font-semibold mb-5 ">
                    {servicio.titulo}
                  </h1>
                  <p className="text-md font-light text-justify">
                    {servicio.descripcion}
                  </p>
                  <div className="w-20 absolute -top-12 bg-white py-5 px-6  rounded-full text-stone-400">
                    {servicio?.icono}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* cotizacion */}
        <section
          id="Cotizacion"
          className=" min-h-[30vh] flex items-center justify-around bg-[#D0BEA8] relative flex-col xl:flex-row py-20 xl:py-0 gap-10"
        >
          <div className="text-black text-[34px] font-medium relative left-0 pl-10 flex-1 items-center max-w-5xl xl:max-w-7xl  gap-5 flex flex-col 2xl:flex-row">
            <div className="">
              <p>Haga cotizacion en linea</p>
              <p className="text-xl font-light  max-w-2xl mt-5">
                Solicite su presupuesto online sin compromiso y descubra todo lo
                que podemos hacer por su empresa.
              </p>
            </div>
            <Link href={"cotizacion"}>
              <button className="bg-white hover:shadow-md text-black relative   px-10 py-4 text-xl pl-7 pr-0 flex items-center transition group whitespace-nowrap self-start 2xl:self-center">
                Cotización en linea
                <svg
                  className="text-black relative left-6 group-hover:translate-x-3 transition "
                  width="101"
                  height="16"
                  viewBox="0 0 101 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M100.707 8.70711C101.098 8.31658 101.098 7.68342 100.707 7.29289L94.3432 0.928932C93.9526 0.538408 93.3195 0.538408 92.9289 0.928932C92.5384 1.31946 92.5384 1.95262 92.9289 2.34315L98.5858 8L92.9289 13.6569C92.5384 14.0474 92.5384 14.6805 92.9289 15.0711C93.3195 15.4616 93.9526 15.4616 94.3432 15.0711L100.707 8.70711ZM0 9H100V7H0V9Z"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className=" text-right max-h-96 flex">
            <img
              src="/cotizacion.png"
              alt=""
              className=" object-cover w-full"
            />
          </div>
        </section>
        {/* mapa  */}
        <section
          id="Destinos"
          className=" min-h-[60vh] flex items-center justify-center py-20"
        >
          <div className="flex flex-col xl:flex-row p-5 gap-10 place-content-center place-items-center">
            <div className="flex flex-col gap-12 ">
              <h1 className="capitalize text-[3.4rem] pl-7">
                nuestros destinos
              </h1>
              <div className="grid grid-cols-2  gap-10 place-content-around place-items-center  ">
                <div className="flex items-center gap-5 font-medium">
                  <span className="text-4xl lg:text-5xl">+500</span>
                  <p className="max-w-20 leading-none">Clientes satisfechos</p>
                </div>
                <div className="flex items-center gap-5 font-medium">
                  <span className="text-4xl lg:text-5xl">3</span>
                  <p className="max-w-20 leading-none">Covertura en Paises</p>
                </div>

                <div className="flex items-center gap-5 font-medium">
                  <span className="text-4xl lg:text-5xl">100%</span>
                  <p className="max-w-32 leading-none">Enfoque Profesional</p>
                </div>
                <div className="flex items-center gap-5 font-medium">
                  <span className="text-4xl lg:text-5xl">+20</span>
                  <p className="max-w-32 leading-none"> Años de experiencia </p>
                </div>
              </div>
            </div>

            <img
              src="/mapaFinal.png"
              alt="mapa"
              className="aspect-square w-full sm:w-3/4  xl:w-5/12"
            />
          </div>
        </section>
        {/* contacto */}
        <section id="Contacto" className="bg-[#F8F8F8] py-10 px-2 md:px-4 ">
          <div className="flex flex-col lg:flex-row-reverse  items-center justify-center min-h-[60vh] gap-5 ">
            <div className="grid gap-10 bg-white p-10 max-w-[44rem]">
              <div>
                <h1 className="text-blue-700 font-medium text-xl mb-2">
                  Estamos para servirle
                </h1>
                <p className="font-light text-gray-500 text-justify">
                  Para mayor información de nuestros productos o servicios, o
                  cualquier comentario, pedido o pregunta, por favor llene el
                  formulario
                </p>
              </div>
              <div>
                <h1 className="text-blue-700 font-medium text-xl mb-2">
                  Oficinas
                </h1>
                <div className="font-light text-gray-500 flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  <p>
                    Dirección: Sopocachi, calle Manuel Ballivián N°1304 La Paz
                  </p>
                </div>
                <div className="font-light text-gray-500 flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  <p>
                    Dirección: Av. Belén y la calle San Marcos N°1236. El Alto
                  </p>
                </div>
                <div className="font-light text-gray-500 flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  <p>Dirección: calle 6 de agosto N°176 Potosí</p>
                </div>

                <div className="font-light text-gray-500 flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-telephone-outbound-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                  <p>Teléfono : (591 2) 242-2741</p>
                </div>
                <div className="font-light text-gray-500 flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope-arrow-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zm.192 8.159 6.57-4.027L8 9.586l1.239-.757.367.225A4.49 4.49 0 0 0 8 12.5c0 .526.09 1.03.256 1.5H2a2 2 0 0 1-1.808-1.144M16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z" />
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016" />
                  </svg>
                  Email: tapiahermanostrans@yahoo.es
                </div>
              </div>
              <div>
                <h1 className="text-blue-700 font-medium text-xl mb-2">
                  Horarios de Oficina
                </h1>
                <p className="font-light text-gray-500">
                  Lunes - Viernes 9am a 5pm
                </p>
                <p className="font-light text-gray-500">Sábados - 9am a 2pm</p>
              </div>
            </div>
            <div className="bg-white p-10 w-full max-w-3xl">
              <form action="" className=" flex flex-col gap-7">
                <div className="mb-4">
                  <h1 className="text-3xl font-medium uppercase">
                    Contactanos
                  </h1>
                  <p className="text-sm mt-2">
                    comunicate con TAPIA HERMANOS TRANSPORTE S.R.L.
                  </p>
                </div>
                <div className=" grid md:grid-cols-2 gap-3">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input type="email" id="email" placeholder="Nombre" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                      type="email"
                      id="email"
                      placeholder="Correo electrónico"
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input type="email" id="email" placeholder="Teléfono" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input type="email" id="email" placeholder="Asunto " />
                  </div>
                </div>
                <Textarea placeholder="Menssaje" />
                <div>
                  <Button variant={"default"}>Enviar</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* <section className="min-h-[100vh]  "></section> */}
        <section className="bg-[#041329] py-12">
          <div className="text-gray-300 font-medium text-sm relative left-[10%]">
            TAPIA HERMANOS TRANSPORTE S.R.L. © Todos os direitos reservados /
            All rights reserveds .
          </div>
        </section>
      </div>

      {/* cotizacion enviada */}
      {searchParams.enviado && (
        <div className="fixed bottom-0 right-0 z-[200] bg-white py-7 px-9 shadow-md border m-4 flex flex-col text-sm noti">
          <span className="font-medium">
            Se cotizacion fue enviada correctamente
          </span>
          <span className="capitalize">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long", // Día de la semana en texto
              day: "numeric", // Día del mes en número
              month: "long", // Mes en texto
              year: "numeric", // Año en número
              hour: "numeric", // Hora
              minute: "numeric", // Minutos
            })}
          </span>
        </div>
      )}
    </div>
  );
}
