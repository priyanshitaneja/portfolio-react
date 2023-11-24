import "./index.scss";
import ProfileImg from "../../assets/images/profile-img.png";

const ProfileImage = () => {
  return (
    <div>
      <img className="circular" src={ProfileImg} alt="Priyanshi - My profile image" />
    </div>
  );
};

export default ProfileImage;