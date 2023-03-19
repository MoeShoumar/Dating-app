const dating_pages = {};
dating_pages.base_url = "http://localhost:8000/api/v0.0.1/";

dating_pages.getAPI = async (api_url, api_token = null) => {
  try {
    const headers = {};
    if (api_token) {
      headers.Authorization = `Bearer ${api_token}`;
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
  const form = document.getElementById("signin_form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = { email: email, password: password };
    const signin_url = `${dating_pages.base_url}auth/login`;
    const response = await dating_pages.postAPI(signin_url, data);
    console.log(response.data);
    if (response.data.status === "200") {
      localStorage.setItem("jwt", response.data.token);
      window.location.href = "users-list.html";
    } else {
      const error_message = document.getElementById("error_message");
      error_message.style.display = "block";
    }
  });
};

// sign-up
dating_pages.load_signup = async () => {
  const form_signup = document.getElementById("signup-form");

  form_signup.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const location = document.getElementById("location").value;
    const bio = document.getElementById("bio").value;
    const email = document.getElementById("email").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = document.getElementById("age").value;
    const body = new FormData();
    body.append("name", name);
    body.append("password", password);
    body.append("location", location);
    body.append("bio", bio);
    body.append("email", email);
    body.append("gender", gender);
    body.append("age", age);
    const signup_url = `${dating_pages.base_url}auth/register`;
    const response_signup = await dating_pages.postAPI(signup_url, body);
    window.location.href = "profileupload.html";
    console.log(response_signup);
    // localStorage.setItem("jwt", response_signup.data.token);
  });
};

dating_pages.load_profile = async () => {
  const image_input = document.getElementById("profile_pic");
  const upload_btn = document.getElementById("upload_btn");
  const reader = new FileReader();
  let encoded;
  image_input.addEventListener("change", (event) => {
    let file = image_input.files[0];

    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
      console.log(reader.result);
      encoded = reader.result;
    });
  });

  upload_btn.addEventListener("submit", async (event) => {
    event.preventDefault();
    const body = new FormData();
    body.append("encoded", encoded.split(",")[1]);
  });
};
