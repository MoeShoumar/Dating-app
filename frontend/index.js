const dating_pages = {};
dating_pages.base_url = "http://localhost:8000/api/v0.0.1/";
const reader = new FileReader();
let allUsers = [];

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
      console.log(response_signup);
      localStorage.setItem("id", response_signup.data.user.id);
      console.log(body);
      if ((response_signup.status = 201)) {
        window.location.href = "signin.html";
        console.log(response_signup);
      }
    });
  });
};

// userupload
const usersLoader = (users, wrapper) => {
  wrapper.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    wrapper.innerHTML += `
    <div class="user_card" id="user_card" data-value="${users[
      i
    ].name.toLowerCase()}">
    <img src="http://localhost:8000/images/${
      users[i].id
    }.png" alt="" id="image" />
    <h2>${users[i].name}</h2>
    <h3>Age:${users[i].age} </h3>
    <h3>Location: ${users[i].location}</h3>
    <div class="user_actions">
      <button  value="${users[i].id}"  class="like_btn">Like</button>
      <button  value="${users[i].id}"  class="block_btn">Block</button>
      <button  value="${users[i].id}"  class="message_btn">Message</button>
    </div>
    </div>`;
  }
};
dating_pages.load_userslist = async () => {
  const accountButton = document.getElementById("accountButton");

  // get users
  let api_token = localStorage.getItem("jwt");
  let id = localStorage.getItem("id");
  console.log(id);
  const users_url = `${dating_pages.base_url}user/oppgender/${id}`;
  const cards_container = document.getElementById("cards_container");
  const response = await dating_pages.getAPI(users_url, id, api_token);
  console.log(response);
  let users_data = response.users;
  allUsers = response.users;
  console.log(users_data);
  usersLoader(users_data, cards_container);

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
          filteredData = users_data.filter(
            (user) => user.age >= 18 && user.age <= 22
          );
          break;
        case "22to25":
          filteredData = users_data.filter(
            (user) => user.age >= 22 && user.age <= 25
          );
          break;
        case "25to36":
          filteredData = users_data.filter(
            (user) => user.age >= 25 && user.age <= 36
          );
          break;
        case "36to50":
          filteredData = users_data.filter(
            (user) => user.age >= 36 && user.age <= 50
          );
          break;
        case "over50":
          filteredData = users_data.filter((user) => user.age > 50);
          break;
      }
    }

    cards_container.innerHTML = "";
    for (let i = 0; i < filteredData.length; i++) {
      cards_container.innerHTML += `
            <div class="user_card ${users_data[
              i
            ].name.toLowerCase()}" id="user_card_${users_data[i].id}">
              <img src="http://localhost:8000/images/${
                filteredData[i].id
              }.png" alt="" id="image" />
              <h2>${filteredData[i].name}</h2>
              <h3>Age:${filteredData[i].age} </h3>
              <h3>Location: ${filteredData[i].location}</h3>
              <div class="user_actions">
                <button  value="${
                  filteredData[i].id
                }" class="like_btn">Like</button>
                <button  value="${
                  filteredData[i].id
                }" class="block_btn">Block</button>
                <button  value="${
                  filteredData[i].id
                }" class="message_btn">Message</button>
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

    filteredData = users_data.filter((user) =>
      user.name.toLowerCase().includes(value)
    );

    console.log(filteredData);

    usersLoader(filteredData, cards_container);
  });
  // logout
  const logout = document.getElementById("logout");
  logout.addEventListener("click", async () => {
    localStorage.clear();
    window.location.href = "signin.html";
  });

  // like
  const like_btn = document.querySelectorAll(".like_btn");
  like_btn.forEach((like_btn) => {
    like_btn.addEventListener("click", async () => {
      const liked_user = like_btn.getAttribute("value");
      const like_url = `${dating_pages.base_url}actions/likeuser/${id}/${liked_user}`;
      const response = await dating_pages.postAPI(like_url, api_token);
      console.log(response);
    });
  });
  // block
  const block_btn = document.querySelectorAll(".block_btn");
  block_btn.forEach((block_btn) => {
    block_btn.addEventListener("click", async () => {
      const blockeduser_id = block_btn.getAttribute("value");
      const block_url = `${dating_pages.base_url}actions/blockuser/${id}/${blockeduser_id}`;
      const response = await dating_pages.postAPI(block_url, api_token);
      console.log(response);
    });
  });
  // Get messages
  const chats_container = document.getElementById("chats_container");
  const message_btn = document.querySelectorAll(".message_btn");
  message_btn.forEach((message_btn) => {
    message_btn.addEventListener("click", async () => {
      chats_container.classList.toggle("hide");
      const messgaeduser_id = message_btn.getAttribute("value");
      console.log(response);
      for (let i = 0; i < users_data.length; i++) {
        chats_container.innerHTML += `
        <h2 class="title" id="title">${users_data[messgaeduser_id].name}</h2>
        <div class="chat_box">
          <div class="sender">

          </div>
          <br />
          <div class="receiver">
           
          </div>
        </div>
        <div class="send_message">
          <button class="sumbit" type="submit">Send</button>
          
          <input class="message" type="text" name="message" id="message" />
        </div>
        `;
        const id = document.getElementById("message").value;
        const message_url = `${dating_pages.base_url}actions/sendmessage/${id}/${messgaeduser_id}`;
        const response = await dating_pages.postAPI(message_url, api_token);
      }
    });
  });
};

dating_pages.load_profile = async () => {
  // uplaod images
  const image_input1 = document.getElementById("profile_pic1");
  const image_input2 = document.getElementById("profile_pic2");
  const image_input3 = document.getElementById("profile_pic3");
  let api_token = localStorage.getItem("jwt");
  let id = localStorage.getItem("id");
  image_input1.addEventListener("change", () => {
    let file = image_input1.files[0];
    reader.readAsDataURL(file);
    reader.addEventListener("load", async () => {
      const encoded = reader.result.split(",")[1];
      const body = new FormData();
      body.append("encoded", encoded);
      const imageupload = `${dating_pages.base_url}actions/upload1/${id}`;
      const response = await dating_pages.postAPI(imageupload, body, api_token);
      const image1 = document.getElementById("image1");
      image1.setAttribute("src", `http://127.0.0.1:8000/images/${id}op1.png`);
    });
  });

  image_input2.addEventListener("change", () => {
    let file = image_input2.files[0];
    reader.readAsDataURL(file);
    reader.addEventListener("load", async () => {
      const encoded = reader.result.split(",")[1];
      const body = new FormData();
      body.append("encoded", encoded);
      // body.append("number", 1);
      console.log(body);
      const imageupload = `${dating_pages.base_url}actions/upload2/${id}`;
      const response = await dating_pages.postAPI(imageupload, body, api_token);
      console.log(response);
      const image2 = document.getElementById("image2");
      image2.setAttribute("src", `http://127.0.0.1:8000/images/${id}op2.png`);
    });
  });

  image_input3.addEventListener("change", () => {
    let file = image_input3.files[0];
    reader.readAsDataURL(file);
    reader.addEventListener("load", async () => {
      const encoded = reader.result.split(",")[1];
      const body = new FormData();
      body.append("encoded", encoded);
      console.log(body);
      const imageupload = `${dating_pages.base_url}actions/upload3/${id}`;
      const response = await dating_pages.postAPI(imageupload, body, api_token);
      console.log(response);
      const image3 = document.getElementById("image3");
      image3.setAttribute("src", `http://127.0.0.1:8000/images/${id}op3.png`);
    });
  });
  const logout = document.getElementById("logout");
  logout.addEventListener("click", async () => {
    localStorage.clear();
    window.location.href = "signin.html";
  });
  // update info
  edit_btn.addEventListener("click", async () => {
    const edit_btn = document.getElementById("edit_btn");
    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const bio = document.getElementById("bio").value;
    const age = document.getElementById("age").value;
    const updateurl = `${dating_pages.base_url}user/editprofile`;
    const body = new FormData();
    body.append("id", id);
    body.append("name", name);
    body.append("age", age);
    body.append("location", location);
    body.append("bio", bio);
    const response = await dating_pages.postAPI(updateurl, body, api_token);
    console.log(response);
  });
  // get likes
  const liked_users_url = `${dating_pages.base_url}user/favorites/${id}`;
  const cards_container = document.getElementById("liked_cards_container");
  const liked_response = await dating_pages.getAPI(
    liked_users_url,
    id,
    api_token
  );
  let liked_users_data = liked_response.favorites;
  console.log(liked_users_data);

  cards_container.innerHTML = "";
  for (let i = 0; i < liked_users_data.length; i++) {
    cards_container.innerHTML += `
          <div class="user_card ${liked_users_data[i].liked.name}" id="user_card_${liked_users_data[i].liked.id}">
            <img src="http://localhost:8000/images/${liked_users_data[i].liked.id}.png" alt="" id="image" />
            <h2>${liked_users_data[i].liked.name}</h2>
            <h3>Age:${liked_users_data[i].liked.age} </h3>
            <h3>Location: ${liked_users_data[i].liked.location}</h3>
          </div>`;
  }

  // // get blocks
  // const blocked_users_url = `${dating_pages.base_url}user/favorites/${id}`;
  // const blocked_cards_container = document.getElementById(
  //   "blocked_cards_container"
  // );
  // const blocked_response = await dating_pages.getAPI(
  //   blocked_users_url,
  //   id,
  //   api_token
  // );
  // console.log(response);
  // let blocked_users_data = response.users;
  // console.log(blocked_users_data);

  // blocked_cards_container.innerHTML = "";
  // for (let i = 0; i < blocked_users_data.length; i++) {
  //   blocked_cards_container.innerHTML += `
  //         <div class="user_card ${blocked_users_data[
  //           i
  //         ].name.toLowerCase()}" id="user_card_${blocked_users_data[i].id}">
  //           <img src="http://localhost:8000/images/${
  //             blocked_users_data[i].id
  //           }.png" alt="" id="image" />
  //           <h2>${blocked_users_data[i].name}</h2>
  //           <h3>Age:${blocked_users_data[i].age} </h3>
  //           <h3>Location: ${blocked_users_data[i].location}</h3>
  //         </div>`;
  // }
};

// chats_container.innerHTML += `
// <div class="user_card  ${users_data[
//   i
// ].name.toLowerCase()}" id="user_card_${users_data[i].id}">
// <img src="http://localhost:8000/images/${
//   users_data[i].id
// }.png" alt="" id="image" />
// <h2>${users_data[i].name}</h2>
// <h3>Age:${users_data[i].age} </h3>
// <h3>Location: ${users_data[i].location}</h3>
// <div class="user_actions">
//   <button  value="${users_data[i].id}"  class="like_btn">Like</button>
//   <button  value="${users_data[i].id}"  class="block_btn">Block</button>
//   <button  value="${
//     users_data[i].id
//   }"  class="message_btn">Message</button>
// </div>
// </div>`;
