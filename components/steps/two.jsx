"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { countries } from "./options/countries";
import { toast } from "sonner";

export const StepTwo = ({ onNext, onBack, formData, setFormData }) => {
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    const isFrance = selectedOption.value === "France";

    setFormData((prevFormData) => ({
      ...prevFormData,
      paysNaissance: selectedOption,
      codePostalNaissance: isFrance ? prevFormData.codePostalNaissance : "99",
    }));
  };

  const handleAddressChange = (selectedOption) => {
    const addressDetails = {
      adresse: selectedOption.details.name,
      ville: selectedOption.details.city,
      codePostal: selectedOption.details.postcode,
      x: selectedOption.details.x,
      y: selectedOption.details.y,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      ...addressDetails,
    }));
  };

  const calculateAge = (date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    const errors = [];
    const {
      civilite,
      nom,
      prenom,
      dateNaissance,
      nomNaissance,
      paysNaissance,
      villeNaissance,
      codePostalNaissance,
      adresse,
      codePostal,
      ville,
      telephone,
    } = formData;

    if (
      !civilite ||
      !nom ||
      !prenom ||
      !dateNaissance ||
      !nomNaissance ||
      !paysNaissance ||
      !villeNaissance ||
      !codePostalNaissance ||
      !adresse ||
      !codePostal ||
      !ville ||
      !telephone
    ) {
      errors.push("Tous les champs obligatoires doivent être remplis.");
    }

    if (dateNaissance && calculateAge(dateNaissance) < 18) {
      toast("Le souscripteur doit être majeur.");
      return;
    }

    setErrors(errors);

    return errors.length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(e);
    }
  };

  const civiliteOptions = [
    { value: "Monsieur", label: "Monsieur" },
    { value: "Madame", label: "Madame" },
    { value: "Non renseigné", label: "Non renseigné" },
  ];

  const loadCountryOptions = async (inputValue) => {
    return countries.filter((country) =>
      country.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadAddressOptions = async (inputValue) => {
    if (inputValue.length < 1) return [];
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${inputValue}&limit=5`
      );
      const json = await response.json();
      return json.features.map((feature) => ({
        label: feature.properties.label,
        value: feature.properties.label,
        details: feature.properties,
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des données : ", error);
      return [];
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 bg-white md:w-4/5 lg:w-1/2 xl:w-1/2 w-4/5 mx-auto">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Souscripteur
        </h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Ces informations sont indispensables pour bénéficier du Crédit d’Impôt
          de 50%, merci de veiller à ce qu'elles soient identiques à celles
          connues du service des impôts.
        </p>
        <h3 className="mb-4 text-2xl font-semibold">Votre identité</h3>
        <Separator className="mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />

        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="civilite"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Civilité :
            </label>
            <select
              id="civilite"
              name="civilite"
              value={formData.civilite}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Choisir</option>
              {civiliteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="nom"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom :
            </label>
            <input
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nom de famille"
              required
            />
          </div>
          <div>
            <label
              htmlFor="prenom"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Prénom :
            </label>
            <input
              name="prenom"
              type="text"
              value={formData.prenom}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Prénom"
              required
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="dateNaissance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date de naissance :
            </label>
            <input
              name="dateNaissance"
              type="date"
              value={formData.dateNaissance}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Date de naissance"
              required
            />
          </div>
          <div>
            <label
              htmlFor="nomNaissance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom de naissance :
            </label>
            <input
              name="nomNaissance"
              type="text"
              value={formData.nomNaissance}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Nom de naissance"
              required
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="paysNaissance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pays de naissance :
            </label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadCountryOptions}
              defaultOptions
              onChange={handleCountryChange}
              value={formData.paysNaissance}
              className="pt-[2px]"
              placeholder="Sélectionner un pays"
              required
            />
          </div>
          <div>
            <label
              htmlFor="villeNaissance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ville de naissance :
            </label>
            <input
              name="villeNaissance"
              type="text"
              value={formData.villeNaissance}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ville de naissance"
              required
            />
          </div>
          <div>
            <label
              htmlFor="codePostalNaissance"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Code postal de naissance :
            </label>
            <input
              name="codePostalNaissance"
              type="text"
              value={formData.codePostalNaissance}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Code postal de naissance"
              disabled={formData.paysNaissance?.value !== "France"}
              required
            />
          </div>
        </div>

        <h3 className="mb-4 text-2xl font-semibold">Votre adresse</h3>
        <Separator className="mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />

        <AsyncSelect
          cacheOptions
          loadOptions={loadAddressOptions}
          defaultOptions
          className="w-full my-7"
          onChange={handleAddressChange}
          placeholder="Entrez une adresse..."
        />

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Adresse:
            </label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Numéro et rue"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Code postal :
            </label>
            <input
              type="text"
              name="codePostal"
              value={formData.codePostal}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Code Postal"
              required
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="ville"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ville
            </label>
            <input
              type="text"
              id="ville"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ville"
              required
            />
          </div>
          <div>
            <label
              htmlFor="telephone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Téléphone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Téléphone"
              required
            />
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger chevronColor="black">Parrainage</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2 mb-2 md:grid-cols-1">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="parrainageProfesseur"
                    name="parrainageProfesseur"
                    checked={formData.parrainageProfesseur}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="parrainageProfesseur"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Vous êtes parrainé par un professeur qui se nomme :
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="parrainProfesseurNom"
                    value={formData.parrainProfesseurNom}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nom du professeur"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="parrainageFamille"
                    name="parrainageFamille"
                    checked={formData.parrainageFamille}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="parrainageFamille"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Vous êtes parrainé par une famille qui se nomme :
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    name="parrainFamilleNom"
                    value={formData.parrainFamilleNom}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nom de la famille"
                  />
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="pasParraine"
                    name="pasParraine"
                    checked={formData.pasParraine}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="pasParraine"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Je ne suis pas parrainé
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </motion.form>
  );
};
