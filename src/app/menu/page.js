"use client";
import Footer from "@/components/commonComponents/Footer";
import Header from "@/components/commonComponents/Header";
import Card from "@/components/commonComponents/Card";
import "../../Style/Card.css";

export default function Menu() {
  return (
    <div>
      <Header />
      <div className="cards-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Footer />
    </div>
  );
}
