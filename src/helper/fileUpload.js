export const fileUpload = async(file) => {

  if (!file) throw new Error("No file selected");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dqyzbv4po/upload";

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {

    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData
    });

    if (!resp.ok) throw new Error("Error uploading file");

    const cloudResponse = await resp.json();

    return cloudResponse.secure_url;

  } catch(error) {
    console.log({error});
    throw new Error (error.message);
  }
}