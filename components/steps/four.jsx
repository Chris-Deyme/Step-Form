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
          "Prélèvement par carte bancaire",
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
        return ["Prélèvement par carte bancaire", "Paiement par chèque"];
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
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={method} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{method}</Label>
            </div>
          ))}
        </RadioGroup>

        {paymentMethod === "Prélèvement par carte bancaire" && (
          <form
            action="#"
            className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8 mt-4"
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
                    <div className="tooltip-arrow" data-popper-arrow></div>
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
        )}
        {paymentMethod === "Prélèvement bancaire (Virement SEPA)" && (
          <>
            {" "}
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
        {(paymentMethod === "Paiement par chèque" ||
          paymentMethod === "Paiement par chèque/CESU" ||
          paymentMethod === "Paiement par ECESU") && (
          <>
            <form
              action="#"
              className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8 mt-4"
            >
              <label
                htmlFor="titulaire"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Merci de nous envoyer par courrier vos chèques ou CESU à
                l'adresse :
              </label>
              <div className="flex font-bold flex-col gap-3">
                <p>Évidence Cours - Fasiladom </p> <p>5 AV Paul VERLAINE </p>
                <p>38100 Grenoble</p>
              </div>
              <p className="mt-4">
                Vous pouvez également contacter le service client : <br /> -
                contact@fasiladom.fr - 09 70 21 20 36 (prix d'un appel local)
              </p>
            </form>
          </>
        )}
        <div class="flex justify-between pb-10 m-6">
        <Button
          type="button"
          onClick={onBack}
          className="shadow-md rounded-lg bg-[#FFFFFF] text-[#752466] border-2 border-[#752466] mx-auto transition-transform transform-gpu hover:bg-[#FFFFFF] hover:scale-105"
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

      {/* <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-4 text-2xl font-semibold">
              Paiement par carte bancaire
            </h3>
            <Separator className="mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
              <div className="grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Montant
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        1 200.00 €
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Réduction
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        -299.00 €
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Frais d'inscription
                      </dt>
                      <dd className="text-base font-medium text-green-500 dark:text-white">
                        Offert
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        TVA
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        240.00 €
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      1 440.00 €
                    </dd>
                  </dl>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://www.svgrepo.com/show/14823/amex.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                    alt=""
                  />
                  <img
                    className="h-8 w-auto dark:hidden"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg"
                    alt=""
                  />
                  <img
                    className="hidden h-8 w-auto dark:flex"
                    src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                {" "}
                Entrer une carte cadeau, un coupon ou un code promo{" "}
              </label>
              <div className="flex max-w-md items-center gap-4">
                <input
                  type="text"
                  id="voucher"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  placeholder=""
                  required
                />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Apply
                </button>
              </div>
            </div>

            <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
              Payment processed by{" "}
              <a
                href="#"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Stripe
              </a>{" "}
              for{" "}
              <a
                href="#"
                title=""
                className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
              >
                Evidence Cours
              </a>
              - France
            </p>
          </div>
        </div>
      </section> */}

      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
      <div class="flex justify-between pb-10 m-6">
        <Button
          type="button"
          onClick={onBack}
          className="shadow-md rounded-lg bg-[#FFFFFF] text-[#752466] border-2 border-[#752466] mx-auto transition-transform transform-gpu hover:bg-[#FFFFFF] hover:scale-105"
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
    </motion.div>
  );
};