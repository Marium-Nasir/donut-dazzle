"use client";
import "../../Style/Card.css";
import Image from "next/image";
import Buttons from "@/components/commonComponents/Buttons";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Card({ props }) {
  return (
    <div className="card">
      <div className="img-container">
        <Image src={props?.img} alt="loading..." layout="responsive" />
      </div>
      <div className="content-container">
        <h2>{props?.name}</h2>
        <p>{props?.description}</p>
        <Buttons
          props={{
            click: props?.addToCart,
            btnText: "Add to cart",
            classname: "card-btn",
            icon: <ShoppingCartIcon className="h-5 w-5" />,
          }}
        />
      </div>
    </div>
  );
}
