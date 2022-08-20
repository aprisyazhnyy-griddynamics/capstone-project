const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`
};

module.exports ={
  formatDate,
};
