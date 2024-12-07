"use client";
import logoImg from "../../../public/logoImg.png";
import "../../Style/Header.css";
import Image from "next/image";
import Buttons from "./Buttons";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Header() {
  const login = () => {
    alert("hello login");
  };
  return (
    <div className="bg-pink-800 w-full h-24 flex justify-between items-center p-6 text-white">
      <div className="w-50 flex items-center">
        <Image alt="Donut Dazzle" src={logoImg} id="logoImg" />
        <span>
          <h1 className="font-bold">Donut Dazzle😋</h1>
        </span>
      </div>
      <div>
        <ul className="flex justify-center items-center p-16">
          <li>
            <Link href="/cart" className="flex items-center">
              <ShoppingCartIcon className="h-5 w-5 text-white-500" />
              <span className="ml-1">Cart</span>
            </Link>
          </li>
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Buttons
              props={{ click: login, btnText: "Signin", classname: "btnId" }}
            />
          </li>
          <li>
            <Buttons
              props={{ click: login, btnText: "Signup", classname: "btnId" }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
