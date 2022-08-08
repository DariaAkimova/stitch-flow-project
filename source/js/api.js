const sendData = (onSuccess, onFail, body) => {
    fetch("#", {
      method: "POST",
      body,
    })
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => {
        onFail();
      });
  };

  
  export {sendData};