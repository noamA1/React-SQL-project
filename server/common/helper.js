export const checkResultStatus = (result) => {
  if (!result.success) {
    return false;
  }
  return true;
};
