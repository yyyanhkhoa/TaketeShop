const setConvertSQL = (value, field) => {
  return value ? field + " = " + `'${value}'` + ", " : "";
};

module.exports = {setConvertSQL}