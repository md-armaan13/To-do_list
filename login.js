const form = {
    email: document.querySelector("#username"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#signin-btn-submit"),
  };
  let button = form.submit.addEventListener("click", (e) => {
    e.preventDefault();
    const login = "https://list-oz7s.onrender.com/api/v1/todo/sign-in";
  
    fetch(login, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // code here //
        if (data.error) {
          alert("Error Password or Username"); /*displays error message*/
        } else {
            var date = new Date();
            date.setTime(date.getTime() + (1* 24 * 60 * 60 * 1000));
          var  expires = "; expires=" + date.toGMTString();
          document.cookie = "email" + "=" + data.user.email + expires + "; path=/";
            window.location="index1.html" /*opens the target page while Id & password matches*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });