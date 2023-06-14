const path = import.meta.env.VITE_BASE_URL + "/api/farmer/update";
export  async function update_farmer(payload: {}) {
  const req = await fetch(path, {
    method: "post",
    body: JSON.stringify({ payload }),
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  const res = await req.json();
  return res;
}
