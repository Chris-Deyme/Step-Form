import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaPen } from "react-icons/fa";
import { FaSignature } from "react-icons/fa";

export const StepFour = ({
  formData,
  setFormData,
  setCurrentStep,
  onBack,
  onNext,
}) => {
  const [paymentMethod, setPaymentMethod] = useState(
    formData.paymentMethod || ""
  );

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentMethod: value,
    }));
  };

  const getPaymentMethods = () => {
    if (formData.creditImpot) {
      if (formData.formule === "Pack") {
        return [
          "Paiement par carte bancaire",
          "Paiement carte bancaire 3 x 4 fois",
          "Paiement par chèque/CESU",
          "Paiement par ECESU",
        ];
      } else {
        return [
          "Prélèvement bancaire (Virement SEPA)",
          "Prélèvement par carte bancaire",
        ];
      }
    } else {
      if (formData.formule === "Pack") {
        return [
          "Paiement par carte bancaire",
          "Paiement carte bancaire 3 x 4 fois",
          "Paiement par chèque",
        ];
      } else {
        return [
          "Prélèvement par carte bancaire",
          "Prélèvement bancaire (Virement SEPA)",
        ];
      }
    }
  };

  const paymentMethods = getPaymentMethods();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <motion.div
      className="space-y-2"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 bg-white md:w-4/5 lg:w-1/2 xl:w-1/2 w-4/5 mx-auto">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Finalisation
        </h2>
        {!formData.creditImpot && (
          <>
            <h3 className="mb-4 text-2xl font-semibold">
              Avance du crédit d'impôt
            </h3>
            <Separator className="mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />
            <p className="mb-8">
              Pour bénéficier de l'avance immédiate du crédit d'impôt, merci de
              renseigner vos coordonnées bancaires, nécessaires pour vous
              affilier au dispositif de l'URSSAF.
            </p>

            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="iban"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Iban :
                </label>
                <input
                  type="text"
                  id="iban"
                  name="iban"
                  value={formData.iban}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Saisissez votre numéro IBAN"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="bic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bic :
                </label>
                <input
                  type="text"
                  id="bic"
                  name="bic"
                  value={formData.bic}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Saisissez votre numéro Bic"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="swift"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Swift :
                </label>
                <input
                  type="text"
                  id="swift"
                  name="swift"
                  value={formData.swift}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Saisissez votre numéro Swift"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-1">
              <div>
                <label
                  htmlFor="titulaire"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Titulaire :
                </label>
                <input
                  type="text"
                  id="titulaire"
                  name="titulaire"
                  value={formData.titulaire}
                  onChange={handleInputChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder="Titulaire du compte"
                  required
                />
              </div>
            </div>
          </>
        )}

        <h3 className="mb-4 text-2xl font-semibold">Méthode de paiement</h3>
        <Separator className="mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />
        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
        >
          {paymentMethods.map((method, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={method} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{method}</Label>
              </div>
              {method === paymentMethod && (
                <>
                  {method === "Prélèvement par carte bancaire" ||
                  method === "Paiement par carte bancaire" ||
                  method === "Paiement carte bancaire 3 x 4 fois" ? (
                    <form
                      action="#"
                      className="w-full mb-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8 mt-4"
                    >
                      <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="full_name"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {" "}
                            Nom figurant sur la carte*{" "}
                          </label>
                          <input
                            type="text"
                            id="full_name"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label
                            htmlFor="card-number-input"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            {" "}
                            Numéro de carte*{" "}
                          </label>
                          <input
                            type="text"
                            id="card-number-input"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="xxxx-xxxx-xxxx-xxxx"
                            pattern="^4[0-9]{12}(?:[0-9]{3})?$"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="card-expiration-input"
                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Date d'expiration*{" "}
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                              <svg
                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </div>
                            <input
                              datepicker
                              datepicker-format="mm/yy"
                              id="card-expiration-input"
                              type="text"
                              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                              placeholder="12/27"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="cvv-input"
                            className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            CVV*
                            <button
                              data-tooltip-target="cvv-desc"
                              data-tooltip-trigger="hover"
                              className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
                            >
                              <svg
                                className="h-4 w-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                            </button>
                            <div
                              id="cvv-desc"
                              role="tooltip"
                              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                            >
                              Les 3 derniers chiffres au dos de la carte
                              <div
                                className="tooltip-arrow"
                                data-popper-arrow
                              ></div>
                            </div>
                          </label>
                          <input
                            type="number"
                            id="cvv-input"
                            aria-describedby="helper-text-explanation"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="•••"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Pay now
                      </button>
                    </form>
                  ) : method === "Prélèvement bancaire (Virement SEPA)" ? (
                    <>
                      <div className="grid gap-6 mb-6 md:grid-cols-1">
                        <div>
                          <label
                            htmlFor="iban"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Iban :
                          </label>
                          <input
                            type="text"
                            id="iban"
                            name="iban"
                            value={formData.iban}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="Saisissez votre numéro IBAN"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                          <label
                            htmlFor="bic"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Bic :
                          </label>
                          <input
                            type="text"
                            id="bic"
                            name="bic"
                            value={formData.bic}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="Saisissez votre numéro Bic"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="swift"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Swift :
                          </label>
                          <input
                            type="text"
                            id="swift"
                            name="swift"
                            value={formData.swift}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="Saisissez votre numéro Swift"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-6 mb-6 md:grid-cols-1">
                        <div>
                          <label
                            htmlFor="titulaire"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Titulaire :
                          </label>
                          <input
                            type="text"
                            id="titulaire"
                            name="titulaire"
                            value={formData.titulaire}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            placeholder="Titulaire du compte"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : method === "Paiement par chèque" ||
                    method === "Paiement par chèque/CESU" ? (
                    <>
                      <form
                        action="#"
                        className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8 mt-4"
                      >
                        <label
                          htmlFor="titulaire"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Merci de nous envoyer par courrier vos chèques ou CESU
                          à l'adresse :
                        </label>
                        <div className="flex font-bold flex-col gap-3">
                          <p>Évidence Cours - Fasiladom </p>{" "}
                          <p>5 AV Paul VERLAINE </p>
                          <p>38100 Grenoble</p>
                        </div>
                        <p className="mt-4">
                          Vous pouvez également contacter le service client :{" "}
                          <br /> - contact@fasiladom.fr - 09 70 21 20 36 (prix
                          d'un appel local)
                        </p>
                      </form>
                    </>
                  ) : method === "Paiement par ECESU" ? (
                    <div className="p-5 border my-3 rounded-xl">
                      <p className="flex flex-col gap-4">
                        <span className="font-bold">
                          Vous souhaitez régler vos cours en e-CESU, pour se
                          faire :
                        </span>

                        <p>
                          Votre compte personnel est automatiquement crédité du
                          montant distribué par votre entreprise.
                        </p>

                        <p>
                          1/ Connectez-vous sur le site de l&apos;émetteur du
                          titre emploi service (SODEXO, Domalin, Edenred,
                          Domiserve ....)
                        </p>

                        <p>
                          2/ Choisissez FASILADOM comme prestataire en
                          saisissant le code NAN : 0048037*7
                        </p>

                        <p>
                          {" "}
                          3/ Sélectionnez Fasiladom et cliquez sur « ajouter »
                        </p>

                        <p>
                          {" "}
                          4/ Cliquez ensuite sur « payer l&apos;intervenant »
                        </p>
                        <p>
                          {" "}
                          5/ Dans la zone commentaire, indiquez le montant
                          déposé et votre nom.
                        </p>
                        <p>
                          {" "}
                          Le traitement peut prendre jusqu&apos;à 48h00, nous
                          vous confirmerons leur réception et créditerons votre
                          compte du nombre d'heures correspondant.
                        </p>
                      </p>
                      <p className="mt-4">
                        Vous pouvez également contacter le service client :
                        <br />- contact@fasiladom.fr - 09 70 21 20 36 (prix d'un
                        appel local)
                      </p>
                    </div>
                  ) : null}
                </>
              )}
            </React.Fragment>
          ))}
        </RadioGroup>

        <div class="flex justify-between pb-10 m-6">
          <Button
            type="button"
            onClick={onBack}
            className="shadow-md rounded-lg bg-[#FFFFFF] text-[#752466] border-2 border-[#752466]  transition-transform transform-gpu hover:bg-[#FFFFFF] hover:scale-105"
          >
            Précédent
          </Button>
          <Button
            type="button"
            onClick={(e) => onNext(e)}
            className="shadow-md rounded-lg bg-[#752466] text-[#FFFFFF] border-2 border-[#752466] transition-transform transform-gpu hover:bg-[#752466] hover:scale-105"
          >
            <FaSignature className="mr-2" />
            Signer les documents
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
