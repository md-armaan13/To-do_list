const form = {
    email: document.querySelector("#username"),
    password: document.querySelector("#password"),
    name : document.querySelector("#name"),
    submit: document.querySelector("#signin-btn-submit"),
  };
  let button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "http://localhost:3000/api/v1/todo/sign-up";
  
    fetch(login, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
        name : form.name.value
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.error) {
          alert("user already exist"); /*displays error message*/
        } else {
            
            window.location="index.html" /*opens the target page while Id & password matches*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });