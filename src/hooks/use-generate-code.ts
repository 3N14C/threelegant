export const useCode = () => {
  const prefix = "#";
  const prefixLength = 4;
  const codeLength = 5;

  let code = prefix;

  for (let i = 0; i < prefixLength; i++) {
    code += Math.floor(Math.random() * 10);
  }

  code += "_";

  for (let i = 0; i < codeLength; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return code;
};
