import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LifeExpectancyEstimatorProps {
  onEstimate: (years: number) => void;
}

interface FormData {
  age: string;
  gender: string;
  education: string;
  income: string;
  smoking: string;
  alcohol: string;
  drugs: string;
  activity: string;
  sleep: string;
  sleepQuality: string;
  diet: string;
  bmi: string;
  chronic: string;
  stress: string;
  medicalCheck: string;
  environment: string;
  airQuality: string;
  socialSupport: string;
  water: string;
  relaxation: string;
}

const LifeExpectancyEstimator = ({ onEstimate }: LifeExpectancyEstimatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    education: '',
    income: '',
    smoking: '',
    alcohol: '',
    drugs: '',
    activity: '',
    sleep: '',
    sleepQuality: '',
    diet: '',
    bmi: '',
    chronic: '',
    stress: '',
    medicalCheck: '',
    environment: '',
    airQuality: '',
    socialSupport: '',
    water: '',
    relaxation: '',
  });

  const calculateLifeExpectancy = () => {
    let base = (formData.gender === 'femme') ? 86 : 82;
    let score = 0;
    const maxScore = 100;

    // Éducation (10 points)
    switch(formData.education) {
      case 'primaire': score += 2; break;
      case 'secondaire': score += 5; break;
      case 'superieur': score += 10; break;
    }

    // Revenu (10 points)
    switch(formData.income) {
      case 'faible': score += 2; break;
      case 'moyen': score += 5; break;
      case 'eleve': score += 10; break;
    }

    // Tabac (15 points)
    switch(formData.smoking) {
      case 'oui': score += 0; break;
      case 'occasionnel': score += 5; break;
      case 'non': score += 15; break;
    }

    // Alcool (10 points)
    switch(formData.alcohol) {
      case 'forte': score += 0; break;
      case 'moderee': score += 5; break;
      case 'occasionnelle': score += 8; break;
      case 'aucune': score += 10; break;
    }

    // Drogues (10 points)
    switch(formData.drugs) {
      case 'oui': score += 0; break;
      case 'occasionnel': score += 5; break;
      case 'non': score += 10; break;
    }

    // Activité physique (10 points)
    switch(formData.activity) {
      case 'aucune': score += 0; break;
      case '1-2': score += 3; break;
      case '3-4': score += 7; break;
      case '5+': score += 10; break;
    }

    // Sommeil durée (5 points)
    switch(formData.sleep) {
      case 'moins5': score += 0; break;
      case '5-6': score += 2; break;
      case '7-8': score += 5; break;
      case 'plus8': score += 3; break;
    }

    // Sommeil qualité (5 points)
    switch(formData.sleepQuality) {
      case 'mauvaise': score += 0; break;
      case 'correcte': score += 3; break;
      case 'bonne': score += 5; break;
    }

    // Alimentation (10 points)
    switch(formData.diet) {
      case 'deséquilibrée': score += 0; break;
      case 'moyenne': score += 4; break;
      case 'équilibrée': score += 7; break;
      case 'saine': score += 10; break;
    }

    // IMC (5 points)
    const bmi = parseFloat(formData.bmi);
    if (bmi < 18.5) score += 1;
    else if (bmi >= 18.5 && bmi < 25) score += 5;
    else if (bmi >= 25 && bmi < 30) score += 3;
    else score += 0;

    // Maladies chroniques (5 points)
    switch(formData.chronic) {
      case 'plus': score += 0; break;
      case '1': score += 2; break;
      case 'aucune': score += 5; break;
    }

    // Stress (5 points)
    switch(formData.stress) {
      case 'constant': score += 0; break;
      case 'souvent': score += 1; break;
      case 'occasionnel': score += 3; break;
      case 'rare': score += 5; break;
    }

    // Visites médicales (5 points)
    if(formData.medicalCheck === 'oui') score += 5;
    else score += 0;

    // Environnement (5 points)
    switch(formData.environment) {
      case 'zonePolluée': score += 0; break;
      case 'grandeVille': score += 2; break;
      case 'petiteVille': score += 3; break;
      case 'campagne': score += 5; break;
    }

    // Qualité de l'air (5 points)
    switch(formData.airQuality) {
      case 'mauvaise': score += 0; break;
      case 'moyenne': score += 3; break;
      case 'bonne': score += 5; break;
    }

    // Support social (5 points)
    switch(formData.socialSupport) {
      case 'faible': score += 0; break;
      case 'modéré': score += 3; break;
      case 'fort': score += 5; break;
    }

    // Consommation d'eau (5 points)
    switch(formData.water) {
      case 'insuffisante': score += 0; break;
      case 'suffisante': score += 3; break;
      case 'excellente': score += 5; break;
    }

    // Relaxation (5 points)
    switch(formData.relaxation) {
      case 'aucune': score += 0; break;
      case 'occasionnelle': score += 3; break;
      case 'quotidienne': score += 5; break;
    }

    // Calcul de l'espérance de vie finale
    const scorePercentage = (score / maxScore) * 100;
    // Impact de -10 ans pour score 0 à +8 ans pour score 100
    const impact = (scorePercentage / 100) * 18 - 10;
    const adjustedLifeExpectancy = base + impact;

    onEstimate(Math.round(adjustedLifeExpectancy));
    setIsOpen(false);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="age">Âge actuel</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                min="0"
                max="120"
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Sexe</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
                <SelectTrigger id="gender" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre sexe" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                  <SelectItem value="autre">Autre / Préfère ne pas dire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="education">Niveau d'éducation</Label>
              <Select value={formData.education} onValueChange={(value) => setFormData({...formData, education: value})}>
                <SelectTrigger id="education" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="primaire">Primaire</SelectItem>
                  <SelectItem value="secondaire">Secondaire</SelectItem>
                  <SelectItem value="superieur">Supérieur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="income">Niveau de revenu</Label>
              <Select value={formData.income} onValueChange={(value) => setFormData({...formData, income: value})}>
                <SelectTrigger id="income" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="faible">Faible</SelectItem>
                  <SelectItem value="moyen">Moyen</SelectItem>
                  <SelectItem value="eleve">Élevé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" onClick={() => setIsOpen(false)} variant="outline">
                Annuler
              </Button>
              <Button type="button" onClick={() => setStep(2)}>
                Suivant
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="smoking">Fumeur régulier ?</Label>
              <Select value={formData.smoking} onValueChange={(value) => setFormData({...formData, smoking: value})}>
                <SelectTrigger id="smoking" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre consommation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="non">Non</SelectItem>
                  <SelectItem value="occasionnel">Occasionnel</SelectItem>
                  <SelectItem value="oui">Oui</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alcohol">Consommation d'alcool</Label>
              <Select value={formData.alcohol} onValueChange={(value) => setFormData({...formData, alcohol: value})}>
                <SelectTrigger id="alcohol" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre consommation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="aucune">Aucune</SelectItem>
                  <SelectItem value="occasionnelle">Occasionnelle (1-2 verres/semaine)</SelectItem>
                  <SelectItem value="moderee">Modérée (3-6 verres/semaine)</SelectItem>
                  <SelectItem value="forte">Forte (plus de 6 verres/semaine)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="drugs">Consommation de drogues</Label>
              <Select value={formData.drugs} onValueChange={(value) => setFormData({...formData, drugs: value})}>
                <SelectTrigger id="drugs" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre consommation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="non">Non</SelectItem>
                  <SelectItem value="occasionnel">Occasionnel</SelectItem>
                  <SelectItem value="oui">Oui</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" onClick={() => setStep(1)} variant="outline">
                Précédent
              </Button>
              <Button type="button" onClick={() => setStep(3)}>
                Suivant
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="activity">Activité physique hebdomadaire</Label>
              <Select value={formData.activity} onValueChange={(value) => setFormData({...formData, activity: value})}>
                <SelectTrigger id="activity" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre activité" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="aucune">Aucune</SelectItem>
                  <SelectItem value="1-2">1 à 2 fois</SelectItem>
                  <SelectItem value="3-4">3 à 4 fois</SelectItem>
                  <SelectItem value="5+">5 fois et plus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sleep">Durée moyenne du sommeil par nuit</Label>
              <Select value={formData.sleep} onValueChange={(value) => setFormData({...formData, sleep: value})}>
                <SelectTrigger id="sleep" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre durée de sommeil" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="moins5">Moins de 5h</SelectItem>
                  <SelectItem value="5-6">5 à 6h</SelectItem>
                  <SelectItem value="7-8">7 à 8h</SelectItem>
                  <SelectItem value="plus8">Plus de 8h</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="sleepQuality">Qualité du sommeil</Label>
              <Select value={formData.sleepQuality} onValueChange={(value) => setFormData({...formData, sleepQuality: value})}>
                <SelectTrigger id="sleepQuality" className="bg-white">
                  <SelectValue placeholder="Sélectionnez la qualité" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="mauvaise">Mauvaise</SelectItem>
                  <SelectItem value="correcte">Correcte</SelectItem>
                  <SelectItem value="bonne">Bonne</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="diet">Alimentation</Label>
              <Select value={formData.diet} onValueChange={(value) => setFormData({...formData, diet: value})}>
                <SelectTrigger id="diet" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre alimentation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="deséquilibrée">Déséquilibrée</SelectItem>
                  <SelectItem value="moyenne">Moyenne</SelectItem>
                  <SelectItem value="équilibrée">Équilibrée</SelectItem>
                  <SelectItem value="saine">Saine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" onClick={() => setStep(2)} variant="outline">
                Précédent
              </Button>
              <Button type="button" onClick={() => setStep(4)}>
                Suivant
              </Button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bmi">Indice de masse corporelle (IMC)</Label>
              <Input
                id="bmi"
                type="number"
                value={formData.bmi}
                onChange={(e) => setFormData({...formData, bmi: e.target.value})}
                min="10"
                max="50"
                step="0.1"
                placeholder="ex: 23.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="chronic">Maladies chroniques diagnostiquées</Label>
              <Select value={formData.chronic} onValueChange={(value) => setFormData({...formData, chronic: value})}>
                <SelectTrigger id="chronic" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre situation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="aucune">Aucune</SelectItem>
                  <SelectItem value="1">1 maladie</SelectItem>
                  <SelectItem value="plus">Plus de 1 maladie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stress">Niveau de stress</Label>
              <Select value={formData.stress} onValueChange={(value) => setFormData({...formData, stress: value})}>
                <SelectTrigger id="stress" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="occasionnel">Occasionnel</SelectItem>
                  <SelectItem value="souvent">Souvent</SelectItem>
                  <SelectItem value="constant">Constant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="medicalCheck">Visites médicales régulières</Label>
              <Select value={formData.medicalCheck} onValueChange={(value) => setFormData({...formData, medicalCheck: value})}>
                <SelectTrigger id="medicalCheck" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre situation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="non">Non</SelectItem>
                  <SelectItem value="oui">Oui</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" onClick={() => setStep(3)} variant="outline">
                Précédent
              </Button>
              <Button type="button" onClick={() => setStep(5)}>
                Suivant
              </Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="environment">Environnement de vie</Label>
              <Select value={formData.environment} onValueChange={(value) => setFormData({...formData, environment: value})}>
                <SelectTrigger id="environment" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre environnement" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="campagne">Campagne</SelectItem>
                  <SelectItem value="petiteVille">Petite ville</SelectItem>
                  <SelectItem value="grandeVille">Grande ville</SelectItem>
                  <SelectItem value="zonePolluée">Zone polluée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="airQuality">Qualité de l'air</Label>
              <Select value={formData.airQuality} onValueChange={(value) => setFormData({...formData, airQuality: value})}>
                <SelectTrigger id="airQuality" className="bg-white">
                  <SelectValue placeholder="Sélectionnez la qualité" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="bonne">Bonne</SelectItem>
                  <SelectItem value="moyenne">Moyenne</SelectItem>
                  <SelectItem value="mauvaise">Mauvaise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="socialSupport">Support social</Label>
              <Select value={formData.socialSupport} onValueChange={(value) => setFormData({...formData, socialSupport: value})}>
                <SelectTrigger id="socialSupport" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre niveau" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="fort">Fort</SelectItem>
                  <SelectItem value="modéré">Modéré</SelectItem>
                  <SelectItem value="faible">Faible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="water">Consommation d'eau quotidienne</Label>
              <Select value={formData.water} onValueChange={(value) => setFormData({...formData, water: value})}>
                <SelectTrigger id="water" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre consommation" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="insuffisante">Insuffisante (&lt; 1L)</SelectItem>
                  <SelectItem value="suffisante">Suffisante (1-2L)</SelectItem>
                  <SelectItem value="excellente">Excellente (&gt; 2L)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="relaxation">Pratique de relaxation</Label>
              <Select value={formData.relaxation} onValueChange={(value) => setFormData({...formData, relaxation: value})}>
                <SelectTrigger id="relaxation" className="bg-white">
                  <SelectValue placeholder="Sélectionnez votre pratique" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="aucune">Aucune</SelectItem>
                  <SelectItem value="occasionnelle">Occasionnelle</SelectItem>
                  <SelectItem value="quotidienne">Quotidienne</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between pt-4">
              <Button type="button" onClick={() => setStep(4)} variant="outline">
                Précédent
              </Button>
              <Button type="button" onClick={calculateLifeExpectancy}>
                Calculer
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <span className="sr-only">Estimer l'espérance de vie</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Estimation de l'espérance de vie - Étape {step}/5</DialogTitle>
        </DialogHeader>
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}

export default LifeExpectancyEstimator; 