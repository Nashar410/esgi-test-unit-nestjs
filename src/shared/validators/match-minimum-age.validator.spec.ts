import { Test } from '@nestjs/testing';
import { MatchMinimumAgeValidatorConstraint } from './match-minimum-age.validator';

describe('MatchMinimumAgeValidator', () => {
  let matchMinimumAgeValidator: MatchMinimumAgeValidatorConstraint;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [], // Add
      providers: [MatchMinimumAgeValidatorConstraint], // Add
    }).compile();

    matchMinimumAgeValidator = moduleRef.get<MatchMinimumAgeValidatorConstraint>(
      MatchMinimumAgeValidatorConstraint,
    );
  });

  it('should be defined', () => {
    expect(matchMinimumAgeValidator).toBeDefined();
  });

  it('Cas date invalide', () => {
    expect(matchMinimumAgeValidator.validate(new Date())).toBeFalsy();
  });

  it('Cas type de date invalide', () => {
    expect(matchMinimumAgeValidator.validate('a')).toBeFalsy();
  });

  it('Cas date valide', () => {
    const dateValid: Date = new Date();
    dateValid.setMonth(dateValid.getMonth() - 12 * 18);
    expect(matchMinimumAgeValidator.validate(dateValid)).toBeTruthy();
  });
});
