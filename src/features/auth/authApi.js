
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// SIGN UP


export async function apiSignup({
first_name,
last_name,
email,
password,
}) {
const res = await fetch(`${BASE_URL}/api/auth/signup`, {
method: "POST",

headers: {
  "Content-Type": "application/json",
},

body: JSON.stringify({
  first_name,
  last_name,
  email,
  password,
}),

});

const data = await res.json().catch(() => ({}));

if (!res.ok) {
throw new Error(
data.message || "Signup failed"
);
}

return data;
}


// LOGIN


export async function apiLogin({
email,
password,
}) {
const res = await fetch(`${BASE_URL}/api/auth/login`, {
method: "POST",

headers: {
  "Content-Type": "application/json",
},

body: JSON.stringify({
  email,
  password,
}),


});

const data = await res.json().catch(() => ({}));

if (!res.ok) {
throw new Error(
data.message || "Invalid email or password"
);
}

return data;
}

// GET CURRENT USER


export async function apiFetchCurrentUser(token) {
const res = await fetch(
`${BASE_URL}/api/auth/me`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

const data = await res.json().catch(() => ({}));

if (!res.ok) {
throw new Error(
data.message || "Session expired"
);
}

return data;
}


// UPDATE PROFILE


export async function apiUpdateProfile(
updates,
token
) {
const res = await fetch(
`${BASE_URL}/api/auth/me`,
{
method: "PATCH",


  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },

  body: JSON.stringify(updates),
}


);

const data = await res.json().catch(() => ({}));

if (!res.ok) {
throw new Error(
data.message || "Failed to update profile"
);
}

return data;
}
