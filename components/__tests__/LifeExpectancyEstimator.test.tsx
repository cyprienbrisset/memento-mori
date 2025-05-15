import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LifeExpectancyEstimator } from '../LifeExpectancyEstimator';
import userEvent from '@testing-library/user-event';

describe('LifeExpectancyEstimator', () => {
  const mockOnEstimate = jest.fn();

  beforeEach(() => {
    mockOnEstimate.mockClear();
  });

  it('renders the estimator button', () => {
    render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dialog when clicking the button', async () => {
    render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(screen.getByText('Estimation de l\'espérance de vie - Étape 1/4')).toBeInTheDocument();
  });

  describe('Step 1 - Basic Information', () => {
    it('handles age input correctly', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      expect(ageInput).toHaveValue(30);
    });

    it('handles gender selection correctly', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      const genderSelect = screen.getByTestId('gender-select');
      await userEvent.click(genderSelect);
      const genderOption = screen.getByTestId('gender-femme');
      await userEvent.click(genderOption);
      expect(genderOption).toBeInTheDocument();
    });
  });

  describe('Step 2 - Consumption Habits', () => {
    it('handles smoking habits selection', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Fill step 1
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);

      // Test step 2
      const smokingSelect = screen.getByTestId('smoking-select');
      await userEvent.click(smokingSelect);
      const smokingOption = screen.getByTestId('smoking-non');
      await userEvent.click(smokingOption);
      expect(smokingOption).toBeInTheDocument();

      const alcoholSelect = screen.getByTestId('alcohol-select');
      await userEvent.click(alcoholSelect);
      const alcoholOption = screen.getByTestId('alcohol-aucune');
      await userEvent.click(alcoholOption);
      expect(alcoholOption).toBeInTheDocument();
    });

    it('handles alcohol consumption selection', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Fill step 1
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      const nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);

      // Test step 2
      const smokingSelect = screen.getByTestId('smoking-select');
      await userEvent.click(smokingSelect);
      const smokingOption = screen.getByText('Non');
      await userEvent.click(smokingOption);
      expect(screen.getByText('Non')).toBeInTheDocument();

      const alcoholSelect = screen.getByTestId('alcohol-select');
      await userEvent.click(alcoholSelect);
      const alcoholOption = screen.getByText('Aucune');
      await userEvent.click(alcoholOption);
      expect(screen.getByText('Aucune')).toBeInTheDocument();
    });
  });

  describe('Step 3 - Lifestyle', () => {
    it('handles physical activity selection', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Fill previous steps
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      let nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
      nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);

      // Test step 3
      const activitySelect = screen.getByTestId('activity-select');
      await userEvent.click(activitySelect);
      const activityOption = screen.getByText('3 à 4 fois');
      await userEvent.click(activityOption);
      expect(screen.getByText('3 à 4 fois')).toBeInTheDocument();

      const sleepSelect = screen.getByTestId('sleep-select');
      await userEvent.click(sleepSelect);
      const sleepOption = screen.getByText('7 à 8h');
      await userEvent.click(sleepOption);
      expect(screen.getByText('7 à 8h')).toBeInTheDocument();
    });

    it('handles sleep duration selection', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Fill previous steps
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      let nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
      nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);

      // Test step 3
      const activitySelect = screen.getByTestId('activity-select');
      await userEvent.click(activitySelect);
      const activityOption = screen.getByText('3 à 4 fois');
      await userEvent.click(activityOption);
      expect(screen.getByText('3 à 4 fois')).toBeInTheDocument();

      const sleepSelect = screen.getByTestId('sleep-select');
      await userEvent.click(sleepSelect);
      const sleepOption = screen.getByText('7 à 8h');
      await userEvent.click(sleepOption);
      expect(screen.getByText('7 à 8h')).toBeInTheDocument();
    });
  });

  describe('Step 4 - Health', () => {
    it('handles BMI input correctly', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Fill previous steps
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      let nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
      nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
      nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);

      // Test step 4
      const bmiInput = screen.getByLabelText('Indice de masse corporelle (IMC)');
      await userEvent.type(bmiInput, '22.5');
      expect(bmiInput).toHaveValue(22.5);
    });

    it('handles chronic diseases selection', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Fill previous steps
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      let nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
      nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);
      nextButton = screen.getByText('Suivant');
      await userEvent.click(nextButton);

      // Test step 4
      const chronicSelect = screen.getByTestId('chronic-select');
      await userEvent.click(chronicSelect);
      const chronicOption = screen.getByText('Aucune');
      await userEvent.click(chronicOption);
      expect(screen.getByText('Aucune')).toBeInTheDocument();
    });
  });

  describe('Life Expectancy Calculation', () => {
    it('calculates life expectancy correctly for a healthy female', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Step 1
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      const genderSelect = screen.getByTestId('gender-select');
      await userEvent.click(genderSelect);
      await userEvent.click(screen.getByText('Femme'));
      await userEvent.click(screen.getByText('Suivant'));

      // Step 2
      const smokingSelect = screen.getByTestId('smoking-select');
      await userEvent.click(smokingSelect);
      await userEvent.click(screen.getByText('Non'));
      const alcoholSelect = screen.getByTestId('alcohol-select');
      await userEvent.click(alcoholSelect);
      await userEvent.click(screen.getByText('Aucune'));
      await userEvent.click(screen.getByText('Suivant'));

      // Step 3
      const activitySelect = screen.getByTestId('activity-select');
      await userEvent.click(activitySelect);
      await userEvent.click(screen.getByText('3 à 4 fois'));
      const sleepSelect = screen.getByTestId('sleep-select');
      await userEvent.click(sleepSelect);
      await userEvent.click(screen.getByText('7 à 8h'));
      await userEvent.click(screen.getByText('Suivant'));

      // Step 4
      const bmiInput = screen.getByLabelText('Indice de masse corporelle (IMC)');
      await userEvent.type(bmiInput, '22.5');
      const chronicSelect = screen.getByTestId('chronic-select');
      await userEvent.click(chronicSelect);
      await userEvent.click(screen.getByText('Aucune'));
      await userEvent.click(screen.getByText('Calculer'));

      // Base (86) + Activity (+2) + Sleep (+3) + BMI (+2) = 93
      expect(mockOnEstimate).toHaveBeenCalledWith(93);
    });

    it('calculates life expectancy correctly for a male with health risks', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Step 1
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      const genderSelect = screen.getByTestId('gender-select');
      await userEvent.click(genderSelect);
      await userEvent.click(screen.getByText('Homme'));
      await userEvent.click(screen.getByText('Suivant'));

      // Step 2
      const smokingSelect = screen.getByTestId('smoking-select');
      await userEvent.click(smokingSelect);
      await userEvent.click(screen.getByText('Oui'));
      const alcoholSelect = screen.getByTestId('alcohol-select');
      await userEvent.click(alcoholSelect);
      await userEvent.click(screen.getByText('Forte'));
      await userEvent.click(screen.getByText('Suivant'));

      // Step 3
      const activitySelect = screen.getByTestId('activity-select');
      await userEvent.click(activitySelect);
      await userEvent.click(screen.getByText('Aucune'));
      const sleepSelect = screen.getByTestId('sleep-select');
      await userEvent.click(sleepSelect);
      await userEvent.click(screen.getByText('Moins de 5h'));
      await userEvent.click(screen.getByText('Suivant'));

      // Step 4
      const bmiInput = screen.getByLabelText('Indice de masse corporelle (IMC)');
      await userEvent.type(bmiInput, '32');
      const chronicSelect = screen.getByTestId('chronic-select');
      await userEvent.click(chronicSelect);
      await userEvent.click(screen.getByText('Plus de 1 maladie'));
      await userEvent.click(screen.getByText('Calculer'));

      // Base (82) - Smoking (-12) - Alcohol (-7) - Activity (-6) - Sleep (-8) - BMI (-7) - Chronic (-15) = 27
      expect(mockOnEstimate).toHaveBeenCalledWith(27);
    });
  });

  describe('Navigation', () => {
    it('allows going back to previous steps', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      // Go to step 2
      const ageInput = screen.getByLabelText('Âge actuel');
      await userEvent.type(ageInput, '30');
      await userEvent.click(screen.getByText('Suivant'));

      // Go back to step 1
      await userEvent.click(screen.getByText('Précédent'));
      expect(screen.getByText('Estimation de l\'espérance de vie - Étape 1/4')).toBeInTheDocument();
    });

    it('closes dialog when clicking cancel', async () => {
      render(<LifeExpectancyEstimator onEstimate={mockOnEstimate} />);
      const button = screen.getByRole('button');
      await userEvent.click(button);

      await userEvent.click(screen.getByText('Annuler'));
      expect(screen.queryByText('Estimation de l\'espérance de vie - Étape 1/4')).not.toBeInTheDocument();
    });
  });
}); 