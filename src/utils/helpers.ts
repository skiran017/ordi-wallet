export function isValidBTCAddress(str: string) {
  let regex = new RegExp(
    /^([13]{1}[a-km-zA-HJ-NP-Z1-9]{26,33}|bc1[a-z0-9]{39,59}|tb1[a-z0-9]{39,59})$/
  );

  // Return true if the str
  // matched the ReGex
  if (regex.test(str) == true) {
    return true;
  } else {
    return false;
  }
}