const dating_pages = {};
dating_pages.base_url = "http://localhost:8000/api/v0.0.1/";

dating_pages.getAPI = async (api_url, id, api_token = null) => {
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
  const forgot_password = document.getElementById("forgot-password-link");
  const forgot_password_form = document.getElementById("forgot_password_form");
  forgot_password.addEventListener("click", async (e) => {
    e.preventDefault();
    form.style.display = "none";
    forgot_password_form.style.display = "block";
    // add the reset password conditions
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = { email: email, password: password };
    const signin_url = `${dating_pages.base_url}auth/login`;
    const response = await dating_pages.postAPI(signin_url, data);
    console.log(response.data.access_token);
    console.log(response.status);
    if (response.status == "200") {
      console.log(response);
      localStorage.setItem("jwt", response.data.access_token);
      window.location.href = "users_list.html";
      localStorage.setItem("id", response.data.user_id);
    } else {
      const error_message = document.getElementById("error_message");
      error_message.innerText = `${response.data.error}`;
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
    const image_input = document.getElementById("profile_pic").files[0];
    const reader = new FileReader();

    reader.readAsDataURL(image_input);

    reader.addEventListener("load", async () => {
      const encoded = reader.result.split(",")[1];

      const body = new FormData();
      body.append("name", name);
      body.append("password", password);
      body.append("location", location);
      body.append("bio", bio);
      body.append("email", email);
      body.append("gender", gender);
      body.append("age", age);
      body.append("pic", encoded);

      const signup_url = `${dating_pages.base_url}auth/register`;
      const response_signup = await dating_pages.postAPI(signup_url, body);

      localStorage.setItem("id", response_signup.user.id);

      if ((response_signup.status = 201)) {
        window.location.href = "signin.html";
        console.log(response_signup);
      }
    });
  });
};

// userupload
dating_pages.load_userslist = async () => {
  const accountButton = document.getElementById("accountButton");

  // const block_btn = document.getElementById("block_btn");
  // block_btn.addEventListener("click", async () => {
  //   // like user
  // });
  // const message_btn = document.getElementById("message_btn");
  // message_btn.addEventListener("click", async () => {
  //   // like user
  // });
  const chats_container = document.getElementById("chats_container");
  // get users
  let api_token = localStorage.getItem("jwt");
  let id = localStorage.getItem("id");
  console.log(id);
  const users_url = `${dating_pages.base_url}user/oppgender/${id}`;
  const cards_container = document.getElementById("cards_container");
  const response = await dating_pages.getAPI(users_url, id, api_token);
  console.log(response);
  let users_data = response.users;
  console.log(users_data);
  for (let i = 0; i < users_data.length; i++) {
    cards_container.innerHTML += `
    <div class="user_card hide ${users_data[
      i
    ].name.toLowerCase()}" id="user_card_${users_data[i].id}">
    <img src="http://localhost:8000/images/${
      users_data[i].id
    }.png" alt="" id="image" />
    <h2>${users_data[i].name}</h2>
    <h3>Age:${users_data[i].age} </h3>
    <h3>Location: ${users_data[i].location}</h3>
    <div class="user_actions">
      <button class="like_btn">Like</button>
      <button class="block_btn">Block</button>
      <button class="message_btn">Message</button>
    </div>
    </div>`;
  }
  // filter users:
  const ageSelect = document.getElementById("age");
  const locationSelect = document.getElementById("location");
  locationSelect.addEventListener("change", filterData);
  ageSelect.addEventListener("change", filterData);
  let filteredData = users_data;
  function filterData() {
    const selectedLocation = locationSelect.value;
    const selectedAge = ageSelect.value;
    if (selectedLocation) {
      filteredData = filteredData.filter(
        (user) => user.location === selectedLocation
      );
    }

    if (selectedAge) {
      switch (selectedAge) {
        case "18to22":
          filteredData = filteredData.filter(
            (user) => user.age >= 18 && user.age <= 22
          );
          break;
        case "22to25":
          filteredData = filteredData.filter(
            (user) => user.age >= 22 && user.age <= 25
          );
          break;
        case "25to36":
          filteredData = filteredData.filter(
            (user) => user.age >= 25 && user.age <= 36
          );
          break;
        case "36to50":
          filteredData = filteredData.filter(
            (user) => user.age >= 36 && user.age <= 50
          );
          break;
        case "over50":
          filteredData = filteredData.filter((user) => user.age > 50);
          break;
      }
    }

    cards_container.innerHTML = "";
    for (let i = 0; i < filteredData.length; i++) {
      cards_container.innerHTML += `
            <div class="user_card ${users_data[
              i
            ].name.toLowerCase()}" id="user_card">
              <img src="http://localhost:8000/images/${
                filteredData[i].id
              }.png" alt="" id="image" />
              <h2>${filteredData[i].name}</h2>
              <h3>Age:${filteredData[i].age} </h3>
              <h3>Location: ${filteredData[i].location}</h3>
              <div class="user_actions">
                <button class="like_btn">Like</button>
                <button class="block_btn">Block</button>
                <button class="message_btn">Message</button>
              </div>
            </div>`;
    }
  }
  // search
  const search = document.getElementById("search");
  const user_cards = document.querySelectorAll(".user_card");
  console.log(user_cards);
  search.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    users_data.forEach((user) => {
      const isVisible = user.name.toLowerCase().includes(value);
      for (let i = 0; i < user_cards.length; i++) {
        if (user_cards[i].classList.contains(user.name.toLowerCase())) {
          user_cards[i].classList.remove("hide");
        }
      }
    });
  });
};

// like
const like_btn = document.getElementById("like_btn");
const liked_user = like_btn.addEventListener("click", async () => {
  const like_url = `${dating_pages.base_url}actions/likeuser/${id}/${liked_user}`;
  const response = await dating_pages.getAPI(users_url, id, api_token);
  console.log(response);
  let users_data = response.users;
});

// upload images
// dating_pages.load_profile = async () => {
//   const mainPic = document.getElementById("profile_main");
//   const optionalCards = document.querySelectorAll(".optional .card");
//   mainPic.addEventListener("click", () => {
//     const imageInput = document.createElement("input");
//     imageInput.type = "file";
//     imageInput.accept = "image/*";
//     const reader = new FileReader();
//     let encoded;
//     imageInput.addEventListener("change", (event) => {
//       reader.readAsDataURL(event.target.files[0]);
//       reader.addEventListener("load", () => {
//         mainPic.querySelector("img").src = reader.result;
//         encoded = reader.result;
//       });
//     });
//     imageInput.click();
//   });

//   optionalCards.forEach((card) => {
//     optionalCards.addEventListener("click", () => {
//       const imageInput = document.createElement("input");
//       imageInput.type = "file";
//       imageInput.accept = "image/*";
//       imageInput.addEventListener("change", (event) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(event.target.files[0]);
//         reader.onload = () => {
//           card.querySelector("img").src = reader.result;
//         };
//       });
//       imageInput.click();
//     });

//     upload_btn.addEventListener("submit", async (event) => {
//       event.preventDefault();
//       const body = new FormData();
//       body.append("encoded", encoded.split(",")[1]);
//     });
//   });
// };
