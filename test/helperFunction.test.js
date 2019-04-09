import { isEmpty, toSentenceCase } from '../helpers';

const testString = '   ';
const sampleEmptyArray = [];
const sampleNonEmptyArray = ['value', 'target', 'name', 'field'];
const sampleNestedObject = {
  division: {
    house: {
      utilities: [],
      food: ''
    }
  }
};
const sampleToSentenceCase = 'knitedeveloper';

describe('HELPER FUNCTIONS TEST SUITES', () => {
  describe('isEmpty', () => {
    it('should indicate when a string is empty', () => {
      expect(isEmpty(testString)).toBe(true);
    });
    it('should indicate when an array is empty', () => {
      expect(isEmpty(sampleEmptyArray)).toBe(true);
    });
    it('should return false when an array is not empty', () => {
      expect(isEmpty(sampleNonEmptyArray)).toBe(false);
    });
    it('Verifies the emptiness or otherwise of an object with nested properties', () => {
      expect(isEmpty(sampleNestedObject)).toBe(true);
    });
  });
  describe('toSentenceCase', () => {
    it('should return a sentenceCase value', () => {
      expect(toSentenceCase(sampleToSentenceCase)).toBe('Knitedeveloper');
    });
  });
});
