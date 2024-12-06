import { CapitalizeWordsPipe } from './capitalize-words.pipe';

describe('CapitalizeWordsPipe', () => {
  const pipe = new CapitalizeWordsPipe();

  it('should capitalize the first letter of each word', () => {
    expect(pipe.transform('john doe')).toBe('John Doe');
    expect(pipe.transform('angular pipes')).toBe('Angular Pipes');
  });

  it('should handle single-word strings', () => {
    expect(pipe.transform('hello')).toBe('Hello');
  });

  it('should return an empty string for null or undefined', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('should handle empty strings', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should handle strings with mixed capitalization', () => {
    expect(pipe.transform('hELLo wORLD')).toBe('Hello World');
  });
});
