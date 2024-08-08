import axios from "axios";

export const uploadImage = async (email: string, file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result?.toString().split(',')[1];
      const res = await axios.post("/api/users/update/image",{email,imageBuffer:base64Image})
      return res.data;
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
  };
  