"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import AsyncSelect from "react-select/async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/multiselect";
import TimePicker from "rc-time-picker";
import moment from "moment";
import "rc-time-picker/assets/index.css";
import { toast } from "sonner";

export const StepOne = ({ onNext, formData, setFormData }) => {
  const initialStudentState = {
    genre: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    typePratique: "Soutien scolaire",
    instruments: [],
    niveau: "",
    adresse: "",
    ville: "",
    codePostal: "",
    x: "",
    y: "",
    telephone: "",
    disponibilites: [],
    message: "",
  };

  const [students, setStudents] = useState(initialStudentState);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [studentToRemoveIndex, setStudentToRemoveIndex] = useState(null);
  const [errors, setErrors] = useState([]);
  const [disponibiliteError, setDisponibiliteError] = useState("");
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState(null);

  useEffect(() => {
    if (formData.students.length > 0) {
      setExpandedAccordionIndex(formData.students.length - 1);
    }
  }, [students]);

  const [selectedInstruments, setSelectedInstruments] = useState([]);

  // const effectRan = React.useRef(false);

  console.log(formData);

  useEffect(() => {
    if (formData.students.length === 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        students: [initialStudentState],
      }));
    }
  }, []);

  const handleInstrumentChange = (value) => {
    setSelectedInstruments(value);
    setStudents((prevStudents) => ({
      ...prevStudents,
      instruments: value,
    }));
  };

  const addStudent = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      students: [...prevFormData.students, students],
    }));
    setStudents({
      genre: "",
      nom: "",
      prenom: "",
      dateNaissance: "",
      typePratique: "Soutien scolaire",
      instruments: [],
      niveau: "",
      adresse: "",
      ville: "",
      codePostal: "",
      x: "",
      y: "",
      telephone: "",
      disponibilites: [],
      message: "",
    });
  };

  const updateStudent = (
    index,
    updatedStudent,
    accordionIndex = expandedAccordionIndex
  ) => {
    setFormData((prevFormData) => {
      const updatedStudents = [...prevFormData.students];
      updatedStudents[index] = { ...updatedStudents[index], ...updatedStudent };
      return { ...prevFormData, students: updatedStudents };
    });

    console.log(accordionIndex);
    setExpandedAccordionIndex(accordionIndex);
  };

  const removeStudent = (index) => {
    setStudentToRemoveIndex(index);
    setShowConfirmationModal(true);
  };

  const confirmRemoveStudent = () => {
    setFormData((prevFormData) => {
      const updatedStudents = prevFormData.students.filter(
        (_, idx) => idx !== studentToRemoveIndex
      );
      return { ...prevFormData, students: updatedStudents };
    });
    setShowConfirmationModal(false);
    setStudentToRemoveIndex(null);
  };

  const cancelRemoveStudent = () => {
    setShowConfirmationModal(false);
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

  const handleAddressChange = (index, selectedOption) => {
    const addressDetails = {
      adresse: selectedOption.details.name,
      ville: selectedOption.details.city,
      codePostal: selectedOption.details.postcode,
      x: selectedOption.details.x,
      y: selectedOption.details.y,
    };

    // Preserve the accordion state by setting the expanded index
    updateStudent(index, addressDetails, index);
  };

  const addDisponibilite = (index, jour, debut, fin) => {
    if (!jour) {
      toast("Veuillez sélectionner un jour.");
      return;
    }
    if (debut >= fin) {
      toast("L'heure de fin doit être postérieure à l'heure de début.");
      return;
    }
    const debutHeure = parseInt(debut.split(":")[0]);
    if (debutHeure < 8 || debutHeure > 22) {
      toast("L'heure de début doit être comprise entre 8h et 22h.");
      return;
    }
    const finHeure = parseInt(fin.split(":")[0]);
    if (finHeure > 22) {
      toast("L'heure de fin ne doit pas être postérieure à 22h.");
      return;
    }
    const debutMinutes = parseInt(debut.split(":")[1]);
    const finMinutes = parseInt(fin.split(":")[1]);
    const duree = finHeure * 60 + finMinutes - (debutHeure * 60 + debutMinutes);
    if (duree < 60) {
      toast("La durée de disponibilité doit être d'au moins 1 heure.");
      return;
    }

    const conflits = formData.students[index].disponibilites.some((dispo) => {
      if (dispo.jour !== jour) return false;
      const dispoDebut =
        parseInt(dispo.debut.split(":")[0]) * 60 +
        parseInt(dispo.debut.split(":")[1]);
      const dispoFin =
        parseInt(dispo.fin.split(":")[0]) * 60 +
        parseInt(dispo.fin.split(":")[1]);
      const newDebut =
        parseInt(debut.split(":")[0]) * 60 + parseInt(debut.split(":")[1]);
      const newFin =
        parseInt(fin.split(":")[0]) * 60 + parseInt(fin.split(":")[1]);
      return newDebut < dispoFin && newFin > dispoDebut;
    });

    if (conflits) {
      toast(
        "Cette disponibilité se chevauche avec une autre disponibilité existante."
      );
      return;
    }

    const existingDisponibilite = formData.students[index].disponibilites.find(
      (dispo) =>
        dispo.jour === jour && dispo.debut === debut && dispo.fin === fin
    );

    if (existingDisponibilite) {
      toast("Cette disponibilité existe déjà.");
      return;
    }

    const nouvelleDisponibilite = { jour, debut, fin };
    updateStudent(index, {
      disponibilites: [
        ...formData.students[index].disponibilites,
        nouvelleDisponibilite,
      ],
    });

    toast("");
  };

  const removeDisponibilite = (studentIndex, dispoIndex) => {
    updateStudent(studentIndex, {
      disponibilites: formData.students[studentIndex].disponibilites.filter(
        (_, idx) => idx !== dispoIndex
      ),
    });
  };

  const [tempDisponibilite, setTempDisponibilite] = useState({
    jour: "",
    debut: "",
    fin: "",
  });

  const handleDisponibiliteChange = (name, value) => {
    const timeString = value.format("HH:mm");

    console.log("wesh", timeString);
    setTempDisponibilite((prev) => ({ ...prev, [name]: timeString }));
  };

  const instrumentsOptions = [
    { value: "piano", label: "Piano" },
    { value: "guitare", label: "Guitare" },
    { value: "violon", label: "Violon" },
    { value: "flûte traversière", label: "Flûte traversière" },
    { value: "batterie", label: "Batterie" },
    { value: "saxophone", label: "Saxophone" },
    { value: "clarinette", label: "Clarinette" },
    { value: "trompette", label: "Trompette" },
    { value: "violoncelle", label: "Violoncelle" },
    { value: "accordéon", label: "Accordéon" },
    { value: "basse", label: "Basse" },
    { value: "harmonica", label: "Harmonica" },
    { value: "ukulélé", label: "Ukulélé" },
    { value: "guitare électrique", label: "Guitare électrique" },
    { value: "trombone", label: "Trombone" },
    { value: "chant", label: "Chant" },
    { value: "m.a.o", label: "M.A.O" },
    { value: "percussions", label: "Percussions" },
    { value: "éveil musical", label: "Éveil musical" },
    { value: "flûte à bec", label: "Flûte à bec" },
  ];

  const joursOptions = [
    { value: "Lundi", label: "Lundi" },
    { value: "Mardi", label: "Mardi" },
    { value: "Mercredi", label: "Mercredi" },
    { value: "Jeudi", label: "Jeudi" },
    { value: "Vendredi", label: "Vendredi" },
    { value: "Samedi", label: "Samedi" },
  ];

  const requiredFields = [
    { field: "genre", label: "Civilité" },
    { field: "nom", label: "Nom de famille" },
    { field: "prenom", label: "Prénom(s)" },
    { field: "dateNaissance", label: "Date de naissance" },
    { field: "typePratique", label: "Type de l’activité" },
    { field: "instruments", label: "Instrument(s)" },
    { field: "niveau", label: "Niveau" },
    { field: "adresse", label: "Adresse" },
    { field: "codePostal", label: "Code postal" },
    { field: "ville", label: "Ville" },
    { field: "telephone", label: "Téléphone" },
  ];

  const validateStudents = () => {
    const missingFields = [];

    for (const student of formData.students) {
      for (const { field, label } of requiredFields) {
        if (
          !student[field] ||
          (Array.isArray(student[field]) && student[field].length === 0)
        ) {
          missingFields.push(label);
        }
      }
    }

    return missingFields;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const missingFields = validateStudents();
    if (missingFields.length === 0) {
      onNext(e);
    } else {
      toast(
        `Veuillez remplir les champs suivants: ${missingFields.join(", ")}`
      );
    }
  };

  const disabledHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      if (i < 8 || i > 22) {
        hours.push(i);
      }
    }
    return hours;
  };

  const disabledMinutes = (selectedHour) => {
    if (selectedHour === 22) {
      return [15, 30, 45]; // Assuming you want to disable these minutes for the 22:00 hour
    }
    return [];
  };

  return (
    <motion.div
      className="flex flex-col space-y-4"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 bg-white rounded-lg md:w-4/5 lg:w-1/2 xl:w-1/2 w-4/5 mx-auto">
        <div className="flex w-full justify-between">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Projet élève(s)
          </h2>
        </div>

        <div className="shadow-md rounded-lg bg-[#752466] mx-auto">
          {formData.students.map((student, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              defaultValue={String(index)}
              value={
                expandedAccordionIndex !== null
                  ? String(expandedAccordionIndex)
                  : undefined
              }
              onValueChange={(value) =>
                setExpandedAccordionIndex(
                  value !== undefined ? parseInt(value) : null
                )
              }
            >
              <AccordionItem value={String(index)}>
                <AccordionTrigger chevronColor="white" className="px-[1rem]">
                  <div className="flex items-center">
                    <span className="mr-2 text-1xl font-semibold text-white">
                      {student.prenom
                        ? `Élève : ${student.prenom}`
                        : "Informations de l'élève"}
                    </span>

                    <FaTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStudent(index);
                      }}
                      className="cursor-pointer text-white"
                    />

                    {showConfirmationModal && (
                      <div
                        className="h-screen fixed inset-0 flex cursor-default items-center justify-center bg-black bg-opacity-50 z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                          <p className="mb-4">
                            Êtes-vous sûr de vouloir supprimer cet élève ?
                          </p>
                          <div className="grid gap-6 md:grid-cols-2">
                            <Button
                              onClick={confirmRemoveStudent}
                              className="shadow-md rounded-lg bg-[#752466] mx-auto transition-transform transform-gpu hover:bg-[#752466] hover:scale-105"
                            >
                              Confirmer
                            </Button>
                            <Button
                              onClick={cancelRemoveStudent}
                              className="shadow-md rounded-lg bg-[#752466] mx-auto transition-transform transform-gpu hover:bg-[#752466] hover:scale-105"
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-white p-4">
                    <h3 className="mb-4 text-2xl font-semibold">
                      Profil de l'élève
                    </h3>
                    <Separator className=" mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />

                    <div>
                      <div>
                        <form>
                          <div className="grid gap-6 mb-6 md:grid-cols-4">
                            <div>
                              <label
                                htmlFor="genre"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Civilité
                              </label>
                              <select
                                id="genre"
                                value={student.genre}
                                onChange={(e) =>
                                  updateStudent(index, {
                                    genre: e.target.value,
                                  })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                <option value="">Choisir</option>
                                <option value="Madame">Madame</option>
                                <option value="Monsieur">Monsieur</option>
                                <option value="Non précisé">Non précisé</option>
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="nom"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Nom de famille
                              </label>
                              <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={student.nom}
                                onChange={(e) =>
                                  updateStudent(index, { nom: e.target.value })
                                }
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
                                Prénom(s)
                              </label>
                              <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={student.prenom}
                                onChange={(e) =>
                                  updateStudent(index, {
                                    prenom: e.target.value,
                                  })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Prénom"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="dateNaissance"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Date de naissance
                              </label>
                              <input
                                type="date"
                                id="dateNaissance"
                                name="dateNaissance"
                                value={student.dateNaissance}
                                onChange={(e) =>
                                  updateStudent(index, {
                                    dateNaissance: e.target.value,
                                  })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Date de naissance"
                                required
                              />
                            </div>
                          </div>
                          <div className="grid gap-6 mb-6 md:grid-cols-3">
                            <div>
                              <label
                                htmlFor="typePratique"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Type de l’activité
                              </label>
                              <select
                                id="typePratique"
                                name="typePratique"
                                value={student.typePratique}
                                onChange={(e) =>
                                  updateStudent(index, {
                                    typePratique: e.target.value,
                                  })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                <option value="Soutien scolaire">
                                  Soutien scolaire
                                </option>
                                <option value="Loisir">Loisir</option>
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="instruments"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Instrument(s):
                              </label>
                              <MultiSelector
                                values={student.instruments}
                                onValuesChange={(value) =>
                                  updateStudent(index, { instruments: value })
                                }
                                loop
                                className="max-w-xs"
                              >
                                <MultiSelectorTrigger>
                                  <MultiSelectorInput
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Sélectionner"
                                  />
                                </MultiSelectorTrigger>
                                <MultiSelectorContent>
                                  <MultiSelectorList>
                                    {instrumentsOptions.map((instrument) => (
                                      <MultiSelectorItem
                                        key={instrument.value}
                                        value={instrument.value}
                                      >
                                        {instrument.label}
                                      </MultiSelectorItem>
                                    ))}
                                  </MultiSelectorList>
                                </MultiSelectorContent>
                              </MultiSelector>
                            </div>
                            <div>
                              <label
                                htmlFor="niveau"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Niveau
                              </label>
                              <select
                                id="niveau"
                                name="niveau"
                                value={student.niveau}
                                onChange={(e) =>
                                  updateStudent(index, {
                                    niveau: e.target.value,
                                  })
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                <option value="">Sélectionner</option>
                                <option value="debutant">Débutant</option>
                                <option value="intermediaire">
                                  Intermédiaire
                                </option>
                                <option value="intermediaire+">
                                  Intermédiaire +
                                </option>
                                <option value="avance">Avancé</option>
                              </select>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>

                    <h3 className="mb-4 text-2xl font-semibold">
                      Adresse et contact de l'élève
                    </h3>
                    <Separator className=" mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />

                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadAddressOptions}
                      defaultOptions
                      className="w-full my-7 "
                      onChange={(selectedOption) =>
                        handleAddressChange(index, selectedOption)
                      }
                      placeholder="Entrez une adresse..."
                    />

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Adresse:
                        </label>
                        <input
                          type="addressName"
                          id="addressName"
                          name="addressName"
                          disabled
                          value={student.adresse}
                          onChange={(e) =>
                            updateStudent(index, { adresse: e.target.value })
                          }
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
                          type="codePostal"
                          id="codePostal"
                          name="codePostal"
                          disabled
                          value={student.codePostal}
                          onChange={(e) =>
                            updateStudent(index, { codePostal: e.target.value })
                          }
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
                          disabled
                          value={student.ville}
                          onChange={(e) =>
                            updateStudent(index, { ville: e.target.value })
                          }
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
                          value={student.telephone}
                          onChange={(e) =>
                            updateStudent(index, { telephone: e.target.value })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Téléphone"
                          required
                        />
                      </div>
                    </div>

                    <h3 className="mb-4 text-2xl font-semibold">
                      Disponibilités de l’élève
                    </h3>
                    <Separator className=" mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />

                    <p className="mb-8">
                      Information indicative qui nous permet d’affiner notre
                      sélection de professeurs. Pourra être ajusté après
                      l'inscription.
                    </p>
                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="jour"
                        >
                          Jour:
                        </label>
                        <select
                          id="jour"
                          value={tempDisponibilite.jour}
                          onChange={(e) =>
                            setTempDisponibilite((prev) => ({
                              ...prev,
                              jour: e.target.value,
                            }))
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="" disabled>
                            Sélectionner
                          </option>
                          {joursOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="debut"
                        >
                          Heure de début:
                        </label>
                        {/* <input
                          type="time"
                          id="debut"
                          name="debut"
                          value={tempDisponibilite.debut}
                          onChange={handleDisponibiliteChange}
                          min="08:00"
                          max="22:00"
                          step="900" // 15 minutes in seconds
                          placeholder="Heure de début"
                          className="
                          bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        /> */}
                        <TimePicker
                          defaultValue={moment('00:00', 'HH:mm')}
                          onChange={(value) =>
                            handleDisponibiliteChange("debut", value)
                          }
                          showSecond={false}
                          minuteStep={15}
                          disabledHours={disabledHours}
                          disabledMinutes={disabledMinutes}
                        />
                      </div>
                      <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          htmlFor="fin"
                        >
                          Heure de fin:
                        </label>
                        <TimePicker
                          defaultValue={moment('00:00', 'HH:mm')}
                          onChange={(value) =>
                            handleDisponibiliteChange("fin", value)
                          }
                          showSecond={false}
                          minuteStep={15}
                          disabledHours={disabledHours}
                          disabledMinutes={disabledMinutes}
                        />
                      </div>
                      <div className="flex items-center">
                        <div
                          onClick={() =>
                            addDisponibilite(
                              index,
                              tempDisponibilite.jour,
                              tempDisponibilite.debut,
                              tempDisponibilite.fin
                            )
                          }
                          type="submit"
                          className="shadow-md -mb-7 rounded-lg bg-[#752466]  text-white p-3 mx-auto transition-transform transform-gpu hover:bg-[#752466] hover:scale-105"
                        >
                          Ajouter
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                      {student.disponibilites.map((dispo, dispoIndex) => (
                        <span
                          key={dispoIndex}
                          className="disponibilite-item bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline-block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          style={{
                            width: "100%",
                            display: "inline-flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {dispo.jour} : de {dispo.debut} à {dispo.fin}
                          <FaTrash
                            onClick={() =>
                              removeDisponibilite(index, dispoIndex)
                            }
                            style={{
                              cursor: "pointer",
                              color: "#F25C05",
                              marginLeft: "5px",
                            }}
                          />
                        </span>
                      ))}
                    </div>

                    <h3 className="mb-4 text-2xl font-semibold">
                      Précisions/Questions
                    </h3>
                    <Separator className=" mb-8 border-2 border-[#F25C05] bg-[#F25C05]" />

                    <label
                      htmlFor="questions"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Votre message
                    </label>
                    <textarea
                      onChange={(e) =>
                        updateStudent(index, { message: e.target.value })
                      }
                      value={student.message}
                      id="questions"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Style de musique, achat ou location d'instrument, précisions, conseils, questions : nous sommes à votre écoute."
                    ></textarea>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
          
        </div>
        <div className="flex justify-center gap-6 m-6 ">
        <Button
            onClick={addStudent}
            className="shadow-md rounded-lg bg-white text-[#752466] border-2 border-[#752466] transition-transform transform-gpu hover:bg-white hover:scale-105"
          >
            <FaUserPlus className="mr-2" />
            Ajouter un autre élève
          </Button>
          </div>
        <div className="grid gap-6 m-6 md:grid-cols-1">
          <div className="flex w-full justify-end">
            <Button
              onClick={handleNextStep}
              className="shadow-md rounded-lg bg-[#752466] transition-transform transform-gpu hover:bg-[#752466] hover:scale-105"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
