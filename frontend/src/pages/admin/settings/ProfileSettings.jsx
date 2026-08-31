import {
  useState
} from "react";

import {
  User,
  Lock,
  Save
} from "lucide-react";


const ProfileSettings = () => {


const [profile,setProfile] = useState({

name:"Admin",
email:"admin@lms.com",
phone:""

});


const [password,setPassword] = useState({

oldPassword:"",
newPassword:""

});



const handleProfileChange=(e)=>{

setProfile({

...profile,

[e.target.name]:
e.target.value

});

};




const handlePasswordChange=(e)=>{

setPassword({

...password,

[e.target.name]:
e.target.value

});

};




return (

<div className="min-h-screen bg-slate-100 p-6">


<div className="mx-auto max-w-5xl">


<h1 className="text-3xl font-bold">

Profile Settings

</h1>


<p className="mt-2 text-slate-500">

Manage admin account details

</p>





<div className="mt-8 grid gap-6 lg:grid-cols-2">


{/* Profile */}


<div className="rounded-2xl bg-white p-6">


<div className="flex items-center gap-3">

<User className="text-blue-600"/>

<h2 className="text-xl font-bold">

Personal Information

</h2>

</div>




<div className="mt-6 space-y-4">


<input

name="name"

value={profile.name}

onChange={handleProfileChange}

className="w-full rounded-lg border px-4 py-3"

placeholder="Name"

/>



<input

name="email"

value={profile.email}

onChange={handleProfileChange}

className="w-full rounded-lg border px-4 py-3"

placeholder="Email"

/>



<input

name="phone"

value={profile.phone}

onChange={handleProfileChange}

className="w-full rounded-lg border px-4 py-3"

placeholder="Phone"

/>



<button className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white">

<Save size={18}/>

Save Profile

</button>


</div>


</div>







{/* Password */}


<div className="rounded-2xl bg-white p-6">


<div className="flex items-center gap-3">

<Lock className="text-red-600"/>

<h2 className="text-xl font-bold">

Change Password

</h2>

</div>





<div className="mt-6 space-y-4">


<input

type="password"

name="oldPassword"

onChange={handlePasswordChange}

className="w-full rounded-lg border px-4 py-3"

placeholder="Current Password"

/>



<input

type="password"

name="newPassword"

onChange={handlePasswordChange}

className="w-full rounded-lg border px-4 py-3"

placeholder="New Password"

/>



<button className="rounded-lg bg-red-600 px-5 py-3 text-white">

Update Password

</button>



</div>


</div>





</div>


</div>


</div>

);


};


export default ProfileSettings;