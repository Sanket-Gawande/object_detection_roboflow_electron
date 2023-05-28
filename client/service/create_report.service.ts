const path = import.meta.env.VITE_BASE_URL + "/api/report";
export default async function Save_Report(
  farmer_id: string,
  count: number = 0,
  label: string
) {
  const payload = {
    farmer_id,
    count,
    label,
  };
  const req = await fetch(path, {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });
  return (await req.json()) as { data: any; error: boolean; message: string };
}

export async function get_my_reports(id: string) {
  const path = import.meta.env.VITE_BASE_URL + "/api/report/" + id;
  const req = await fetch(path);
  const res = await req.json();
  return res;
}

export async function delete_my_reports(fid: string, rid: string) {
  const path = `${import.meta.env.VITE_BASE_URL}/api/report/${fid}/${rid}`;
  const req = await fetch(path, {
    method: "DELETE",
    credentials: "include",
  });
  const res = await req.json();
  return res;
}
