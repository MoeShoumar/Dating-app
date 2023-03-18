const dating_pages = {};
dating_pages.base_url = "http://localhost/hospital_fullstack/hospital_backend/";

dating_pages.getAPI = async (api_url, api_token = null) => {
  try {
    const headers = {};
    if (api_token) {
      headers.Authorization = "Bearer ${api_token}";
    }
    const response = await axios.get(api_url, { headers });
    return response.data;
  } catch (error) {
    console.log("Error from GET API");
  }
};
console.log(typeof dating_pages.getAPI);
dating_pages.postAPI = async (api_url, api_data, api_token = null) => {
  try {
    return await axios.post(api_url, api_data, {
      headers: {
        Authorization: api_token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

dating_pages.loadFor = (page) => {
  eval("dating_pages.load_" + page + "();");
};

// sign-in
dating_pages.load_signin = async () => {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = { email: email, password: password };
    const signin_url = dating_pages.base_url + "signin.php";
    const response = await dating_pages.postAPI(signin_url, data);
    console.log(response.data);
    if (response.data.status !== "null" && response.data.user_type == 3) {
      localStorage.setItem("jwt", response.data.token);
      window.location.href = "adminpanel.html";
    } else if (
      response.data.status !== "null" &&
      response.data.user_type == 2
    ) {
      localStorage.setItem("jwt", response.data.token);
      console.log(localStorage.getItem("jwt"));
      window.location.href = "employee.html";
    } else if (
      response.data.status !== "null" &&
      response.data.user_type == 1
    ) {
      localStorage.setItem("jwt", response.data.token);
      window.location.href = "pateint.html";
    } else {
      const error_message = document.createElement("div");
      error_message.textContent = "Incorrect email or password.";
      form.appendChild(error_message);
    }
  });
};
//   // sign-up
//   const form_signup = document.getElementById("signup-form");
//   form_signup.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const name = document.getElementById("name").value;
//     const signup_email = document.getElementById("signup-email").value;
//     const gender = document.getElementById("gender").value;
//     const user_type = document.getElementById("user_typer").value;
//     const date_of_birth = document.getElementById("date_of_birth").value;
//     const signup_password = document.getElementById("signup-password").value;
//     const signup_data = {
//       email: signup_email,
//       password: signup_password,
//       date_of_birth: date_of_birth,
//       user_type: user_type,
//       gender: gender,
//       name: name,
//     };
//     console.log(signup_data);
//     const signup_url = dating_pages.base_url + "signup.php";
//     const response_signup = await dating_pages.postAPI(signup_url, signup_data);
//     console.log(response_signup.data);
//     form_signup.style.display = "none";
//   });
// };
