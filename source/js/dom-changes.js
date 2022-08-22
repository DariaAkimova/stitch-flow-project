
const makeList = (array) => {
    const newList = document.createElement("ul");
  
    array.forEach((item) => {
      newList.appendChild(item);
    });
  
    return newList;
  };
  
  const removeList = (list) => {
    list.forEach((item) => item.remove());
  };

  export {makeList, removeList};