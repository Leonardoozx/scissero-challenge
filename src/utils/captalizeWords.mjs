/**
 * Captalizes all the first letters in the given string, example:
 * 
 * input: 'hi I like gym'
 * output: 'Hi I Like Gym' 
 * 
 * @param {string} str
 */
export default (string) => {
  return string.split(' ').map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}
