import ChangeProfilePicture from "./settings/ChangeProfilePicture";
import EditProfile from "./settings/EditProfile";


export default function Settings() {
  return (
    <>
      <h1 className="mb-10 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
     
    </>
  )
}