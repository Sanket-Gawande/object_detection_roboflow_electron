import { Prediction } from "@/pages/Counter";

export default {
  PYTHON: async (image: File | any) => {
    const formdata = new FormData();
    formdata.append("image", image);
    const req = await fetch(`${import.meta.env.VITE_BASE_PYTHON_URL}/detect`, {
      method: "post",
      body: formdata,
    });
    const res = await req.json();
    return res as { status: string; data: { predictions: Prediction[] }, message : 'string' };
  },
  NODE: async (imageString: string | any) => {
    const req = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/count`, {
      method: "POST",
      body: JSON.stringify({
        image: imageString,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    return res as { status: string; data: { predictions: Prediction[] }, message? : 'string' };
  },
};
