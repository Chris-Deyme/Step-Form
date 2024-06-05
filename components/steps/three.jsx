"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { CiCircleCheck } from "react-icons/ci";

export const StepThree = ({ onNext, onBack, formData, setFormData }) => {
  const handleCreditImpotChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      creditImpot: !prevFormData.creditImpot,
    }));
  };

  const calculerPrix = (prix) => {
    return formData.creditImpot ? prix * 2 : prix;
  };

  const handlePayment = (formule, parHeure) => {
    return (e) => {
      e.preventDefault();
      setFormData((prevFormData) => ({
        ...prevFormData,
        formule,
        parHeure: parHeure,
      }));
      onNext(e);
    };
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    const [choixFormule, prix] = value.split(" - ");
    setFormData((prevFormData) => ({
      ...prevFormData,
      choixFormule,
      prix: prix.split("€")[0],
    }));
  };

  return (
    <motion.div
      className="flex flex-col space-y-4"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Choisissez la formule la plus adaptée à votre projet
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Ce choix n’est qu’informatif à ce stade, le paiement ne
              s'effectuera qu'à partir de la validation de la date de premier
              cours.
            </p>
          </div>
          <h3 className="mb-4 text-2xl font-semibold">Votre formule</h3>
          <Separator className=" mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />
          <p>
            Sélectionnez la formule et le nombre d’heures de cours souhaitées,
            disponibles pour tous les élèves créés au préalable. Vous pourrez
            ensuite dispatcher votre crédit d'heure selon vos préférences parmi
            les élèves inscrits.
          </p>
          <div className="flex items-center gap-2 mb-6 mt-2">
            <input
              type="checkbox"
              id="creditImpot"
              name="creditImpot"
              checked={formData.creditImpot}
              onChange={handleCreditImpotChange}
              className="w-4 h-4 mb-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="creditImpot"
              className="mb-6 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Je ne souhaite pas bénéficier du crédit immédiat d’impôt
            </label>
          </div>

          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {/* Offre Starter */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl text-[#0072BA] font-semibold">
                SANS ENGAGEMENT
              </h3>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  {calculerPrix(30)}€
                </span>
                <span className="text-gray-500 dark:text-gray-400">/heure</span>
              </div>
              <Separator className=" mb-8 border-2 border-[#0072BA] bg-[#0072BA]" />
              {/* Liste des fonctionnalités */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#0072BA] dark:text-[#0072BA]" />
                  <span>Pas d'engagement</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#0072BA] dark:text-[#0072BA]" />
                  <span>Heures valables 2 ans</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#0072BA] dark:text-[#0072BA]" />
                  <span>Pas de frais d’inscription</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#0072BA] dark:text-[#0072BA]" />
                  <span>Accès imusic-school offert</span>
                </li>
              </ul>
              <div className="grid gap-6 mb-6 md:grid-cols-1">
                <select
                  name="choixFormule"
                  onChange={handleInputChange}
                  className="bg-gray-50 border-2 border-[#0072BA] text-gray-900 text-sm rounded-lg focus:ring-[#0072BA] focus:border-[#0072BA] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#0072BA] dark:focus:border-[#0072BA]"
                >
                  <option value={`2h/mois - ${calculerPrix(60)}€/mois`}>
                    2h/mois - {calculerPrix(60)}€/mois
                  </option>
                  <option value={`3h/mois - ${calculerPrix(90)}€/mois`}>
                    3h/mois - {calculerPrix(90)}€/mois
                  </option>
                  <option value={`4h/mois - ${calculerPrix(120)}€/mois`}>
                    4h/mois - {calculerPrix(120)}€/mois
                  </option>
                  <option value={`6h/mois - ${calculerPrix(180)}€/mois`}>
                    6h/mois - {calculerPrix(180)}€/mois
                  </option>
                  <option value={`8h/mois - ${calculerPrix(240)}€/mois`}>
                    8h/mois - {calculerPrix(240)}€/mois
                  </option>
                </select>
                <Button
                  onClick={handlePayment("Sans engagement", calculerPrix(30))}
                  className="shadow-md rounded-lg bg-[#0072BA] mx-auto transition-transform transform-gpu hover:bg-[#0072BA] hover:scale-105"
                >
                  Choisir
                </Button>
              </div>
            </div>

            {/* Offre Company */}
            <div className="relative flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <div className="absolute top-0 left-0 right-0 -mt-4 w-full bg-[#F25C05] rounded-t-lg">
                <p className="text-white font-bold py-1 text-center">
                  LE PLUS POPULAIRE
                </p>
              </div>
              <div className="pt-10">
                <h3 className="mb-4 text-2xl  -mt-7 text-[#F25C05] font-semibold">
                  ABONNEMENT 12 MOIS
                </h3>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">
                    {calculerPrix(25)}€
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /heure
                  </span>
                </div>
                <Separator className=" mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />
                {/* Liste des fonctionnalités */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#F25C05] dark:text-[#F25C05]" />
                    <span>3 mois sans engagement</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#F25C05] dark:text-[#F25C05]" />
                    <span>Heures valables 2 ans</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#F25C05] dark:text-[#F25C05]" />
                    <span>Pas de frais d’inscription</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#F25C05] dark:text-[#F25C05]" />
                    <span>Accès imusic-school offert</span>
                  </li>
                </ul>
                <div className="grid gap-6 mb-6 md:grid-cols-1">
                  <select
                    name="choixFormule"
                    onChange={handleInputChange}
                    className="bg-gray-50 border-2 border-[#F25C05] text-gray-900 text-sm rounded-lg focus:ring-[#F25C05] focus:border-[#F25C05] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#F25C05] dark:focus:border-[#F25C05]"
                  >
                    <option value={`2h/mois - ${calculerPrix(50)}€/mois`}>
                      2h/mois - {calculerPrix(50)}€/mois
                    </option>
                    <option value={`3h/mois - ${calculerPrix(75)}€/mois`}>
                      3h/mois - {calculerPrix(75)}€/mois
                    </option>
                    <option value={`4h/mois - ${calculerPrix(100)}€/mois`}>
                      4h/mois - {calculerPrix(100)}€/mois
                    </option>
                    <option value={`6h/mois - ${calculerPrix(150)}€/mois`}>
                      6h/mois - {calculerPrix(150)}€/mois
                    </option>
                    <option value={`8h/mois - ${calculerPrix(200)}€/mois`}>
                      8h/mois - {calculerPrix(200)}€/mois
                    </option>
                  </select>
                  <Button
                    onClick={handlePayment(
                      "Abonnement 12 mois",
                      calculerPrix(25)
                    )}
                    className="shadow-md rounded-lg bg-[#F25C05] mx-auto transition-transform transform-gpu hover:bg-[#0072BA] hover:scale-105"
                  >
                    Choisir
                  </Button>
                </div>
              </div>
            </div>

            {/* Offre Enterprise */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl text-[#752466] font-semibold">
                À LA DEMANDE
              </h3>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                  {calculerPrix(25)}€
                </span>
                <span className="text-gray-500 dark:text-gray-400">/heure</span>
              </div>
              <Separator className=" mb-8 border-2 border-[#752466] bg-[#752466]" />
              {/* Liste des fonctionnalités */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#752466] dark:text-[#752466]" />
                  <span>Fréquence libre</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#752466] dark:text-[#752466]" />
                  <span>Heures valables 2 ans</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#752466] dark:text-[#752466]" />
                  <span>Pas de frais d’inscription</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CiCircleCheck className="flex-shrink-0 w-5 h-5 text-[#752466] dark:text-[#752466]" />
                  <span>Accès imusic-school offert</span>
                </li>
              </ul>
              <div className="grid gap-6 mb-6 md:grid-cols-1">
                <select
                  name="choixFormule"
                  onChange={handleInputChange}
                  className="bg-gray-50 border-2 border-[#752466] text-gray-900 text-sm rounded-lg focus:ring-[#752466] focus:border-[#752466] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#752466] dark:focus:border-[#752466]"
                >
                  <option value={`Pack 10h - ${calculerPrix(250)}€`}>
                    Pack 10h - {calculerPrix(250)}€
                  </option>
                  <option
                    value={`Pack 20h + 1h offerte - ${calculerPrix(500)}€`}
                  >
                    Pack 20h + 1h offerte - {calculerPrix(500)}€
                  </option>
                  <option
                    value={`Pack 30h + 2h offertes - ${calculerPrix(750)}€`}
                  >
                    Pack 30h + 2h offertes - {calculerPrix(750)}€
                  </option>
                  <option
                    value={`Pack 40h + 3h offertes - ${calculerPrix(1000)}€`}
                  >
                    Pack 40h + 3h offertes - {calculerPrix(1000)}€
                  </option>
                </select>
                <Button
                  onClick={handlePayment("Pack", calculerPrix(25))}
                  className="shadow-md rounded-lg bg-[#752466] mx-auto transition-transform transform-gpu hover:bg-[#0072BA] hover:scale-105"
                >
                  Choisir
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between m-6">
            <Button
              type="button"
              onClick={onBack}
              className="shadow-md rounded-lg bg-[#FFFFFF] text-[#752466] border-2 border-[#752466] mx-auto transition-transform transform-gpu hover:bg-[#FFFFFF] hover:scale-105"
            >
              Précédent
            </Button>
            <Button
              type="submit"
              className="shadow-md rounded-lg bg-[#752466] mx-auto transition-transform transform-gpu hover:bg-[#752466] hover:scale-105"
            >
              Suivant
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
