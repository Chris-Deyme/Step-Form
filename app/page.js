"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import AsyncSelect from "react-select/async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Select from "react-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaUserPlus } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { CiCircleCheck } from "react-icons/ci";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/multiselect";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaPen } from "react-icons/fa";
import { FaSignature } from "react-icons/fa";
import { Navigation } from "../components/navigation";
import { StepOne } from "@/components/steps/one";
import { StepTwo } from "@/components/steps/two";
import { StepThree } from "@/components/steps/three";
import { StepFour } from "@/components/steps/four";
import { StepFive } from "@/components/steps/five";

export default function GenerateCustomerSteps() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxValidatedStep, setMaxValidatedStep] = useState(1);
  const [formData, setFormData] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    nomNaissance: "",
    paysNaissance: "",
    villeNaissance: "",
    codePostalNaissance: "",
    adresse: "",
    codePostal: "",
    ville: "",
    telephone: "",
    parrainageProfesseur: false,
    parrainageFamille: false,
    pasParraine: false,
    creditImpot: false,
    paymentMethod: "",
    formule: "",
    choixFormule: "",
    prix: "",
    parHeure: "",
    students: [],
    iban: "",
    bic: "",
    swift: "",
    titulaire: "",
  });

  console.log("yoooo", formData);
  const nextStep = () => {
    setCurrentStep((prev) => {
      const nextStep = prev + 1;
      setMaxValidatedStep((prevMax) => Math.max(prevMax, nextStep));
      return nextStep;
    });
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <AnimatePresence>
      <Navigation
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        maxValidatedStep={maxValidatedStep}
      />

      {currentStep === 1 && (
        <StepOne
          onNext={(e) => {
            e.preventDefault();
            nextStep();
          }}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 2 && (
        <StepTwo
          onNext={(e) => {
            e.preventDefault();
            nextStep();
          }}
          onBack={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 3 && (
        <StepThree
          onNext={(e) => {
            e.preventDefault();
            nextStep();
          }}
          onBack={prevStep}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {currentStep === 4 && (
        <>
          <StepFour
            onNext={(e) => {
              e.preventDefault();
              nextStep();
            }}
            onBack={prevStep}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      )}
      {currentStep === 5 && (
        <>
          <StepFive
            onNext={(e) => {
              e.preventDefault();
              nextStep();
            }}
            onBack={prevStep}
            formData={formData}
            setFormData={setFormData}
            setCurrentStep={setCurrentStep}
          />
        </>
      )}
    </AnimatePresence>
  );
}
