import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaPen } from "react-icons/fa";
import { FaSignature } from "react-icons/fa";
import { Pacifico } from "next/font/google";

export const StepFive = ({ formData, setFormData, setCurrentStep }) => {
  return (
    <>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Il ne vous reste plus qu’à signer vos documents
          </h2>
          <Separator className="mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            Pour finaliser votre commande il vous faut à présent signer les
            conditions générales de vente ainsi que le mandat nous permettant
            d’effectuer en votre nom toutes les démarches administratives. En
            cliquant sur “Signer le document”, vous allez être redirigé vers un
            site de signature de documents en ligne (signature électronique).
          </p>
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="shadow-md rounded-lg bg-[#752466] text-[#FFFFFF] border-2 border-[#752466] transition-transform transform-gpu hover:bg-[#752466] hover:scale-105"
            >
              <FaSignature className="mr-2" />
              Signer les documents
            </Button>
          </div>
        </div>
      </section>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Résumé de votre commande
          </h2>
          <Separator className="mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
              Élève(s)
            </h3>
            {/* <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Nom
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {formData.nom} {formData.prenom}
              </dd>
            </dl> */}
            <dl className="pb-4">
              <dt className="font-normal  mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Nom & prénom
              </dt>
              {formData.students.map((student, index) => (
                <div className="flex justify-end ">
                  <dd className="font-medium text-gray-900 py-1 dark:text-white sm:text-end">
                    {student.nom} {student.prenom}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="flex justify-end mt-4">
              <Button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="shadow-md rounded-lg bg-[#FFFFFF] text-[#752466] border-2 border-[#752466] transition-transform transform-gpu hover:bg-[#FFFFFF] hover:scale-105"
              >
                <FaPen className="mr-2" />
                Modifier
              </Button>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
              Souscripteur
            </h3>
            {[formData].map((data, index) => (
              <>
                <dl className="sm:flex pb-3 items-center justify-between gap-4">
                  <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                    Nom & prénom
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                    {formData.nom} {formData.prenom}
                  </dd>
                </dl>
              </>
            ))}

            <div className="flex justify-end mt-4">
              <Button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="shadow-md rounded-lg bg-[#FFFFFF] text-[#752466] border-2 border-[#752466] transition-transform transform-gpu hover:bg-[#FFFFFF] hover:scale-105"
              >
                <FaPen className="mr-2" />
                Modifier
              </Button>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
              Formule
            </h3>
            <dl className="sm:flex items-center justify-between gap-4">
              Vous avez choisi le forfait suivant:
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                {formData.formule === "Pack"
                  ? "À la demande"
                  : formData.formule}
                <br />
                {formData.parHeure}€/heure
                <br />
                {formData.choixFormule}
                {!formData.creditImpot ? (
                  <p>Avec avance du crédit d&apos;impôts</p>
                ) : (
                  <p>Sans avance du crédit d&apos;impôts</p>
                )}
                {/* <div className="flex mt-3">
                  <p className="font-bold mr-2">Total:</p>
                  <p>
                    {formData.formule === "Pack" ||
                    formData.formule === "Sans engagement"
                      ? formData.prix
                      : formData.prix * 12}{" "}
                    €
                  </p>
                </div> */}
              </dt>
            </dl>
            <div className="flex justify-end mt-4">
              <Button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="shadow-md rounded-lg bg-[#FFFFFF] text-[#752466] border-2 border-[#752466] transition-transform transform-gpu hover:bg-[#FFFFFF] hover:scale-105"
              >
                <FaPen className="mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
