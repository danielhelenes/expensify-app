const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7)
});

test('should be Daniel', () => {
  const result = generateGreeting('Daniel');
  expect(result).toBe('Hello Daniel!');
});

test('should be Daniel', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Anonymous!');
});
