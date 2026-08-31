import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent } from "../../api/studentApi";

const StudentRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await registerStudent(form);

    console.log(data);

    if (data.success) {

 localStorage.setItem(
   "token",
   data.token
 );

      navigate("/login");
    }

  } catch (error) {
    console.log(
      error.response?.data || error.message
    );
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >

        <h1 className="text-2xl font-bold">
          Create Student Account
        </h1>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="mt-5 w-full rounded border p-3"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mt-4 w-full rounded border p-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mt-4 w-full rounded border p-3"
        />

        <button
          className="mt-6 w-full rounded bg-blue-600 py-3 text-white"
        >
          Register
        </button>


        <p className="mt-4 text-sm text-center">
          Already have account?{" "}
          <Link
            to="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default StudentRegister;


