import { useState } from "react";
import { uploadProfileImage } from "../../api/profileApi";
import "./UploadPhoto.css";

const UploadPhoto = ({ setProfile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setIsUploading(true);

      const data = await uploadProfileImage(formData);

      setProfile(data.data);

      alert("Profile photo uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload profile photo:", error);
      alert("Failed to upload profile photo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-photo">
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button type="button" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default UploadPhoto;
