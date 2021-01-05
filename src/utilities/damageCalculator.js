export default function(attack, defense) {
  let result = attack - defense;
  if (result < 0) {
    (Math.random() * 2) < 1 ? result = 1 : result = 0; 
  }
  return result;
}