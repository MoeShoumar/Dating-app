const dating_pages = {};
dating_pages.base_url = "http://127.0.0.1:8000/api/v0.0.1/";

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
// dating_pages.load_signin = async () => {
//   const form = document.getElementById("login-form");
//   form.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const data = { email: email, password: password };
//     const signin_url = dating_pages.base_url + "signin.php";
//     const response = await dating_pages.postAPI(signin_url, data);
//     console.log(response.data);
//     if (response.data.status !== "null" && response.data.user_type == 3) {
//       localStorage.setItem("jwt", response.data.token);
//       window.location.href = "adminpanel.html";
//     } else if (
//       response.data.status !== "null" &&
//       response.data.user_type == 2
//     ) {
//       localStorage.setItem("jwt", response.data.token);
//       console.log(localStorage.getItem("jwt"));
//       window.location.href = "employee.html";
//     } else if (
//       response.data.status !== "null" &&
//       response.data.user_type == 1
//     ) {
//       localStorage.setItem("jwt", response.data.token);
//       window.location.href = "pateint.html";
//     } else {
//       const error_message = document.createElement("div");
//       error_message.textContent = "Incorrect email or password.";
//       form.appendChild(error_message);
//     }
//   });
// };

// sign-up
dating_pages.load_signup = async () => {
  const form_signup = document.getElementById("signup-form");
  form_signup.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const location = document.getElementById("location").value;
    const bio = document.getElementById("bio").value;
    const profile_pic = document.getElementById("profile_pic").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name="gender"]');
    const age = document.getElementById("age").value;

    const signup_data = {
      email: email,
      password: password,
      age: age,
      gender: gender,
      name: name,
      location: location,
      bio: bio,
    };
    console.log(signup_data);
    const signup_url = `${dating_pages.base_url}auth/register`;
    const response_signup = await dating_pages.postAPI(signup_url, signup_data);
    console.log(response_signup.data);
    window.location.href = "signin.html";
    localStorage.setItem("jwt", response_signup.data.token);
  });
};
