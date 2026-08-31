import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  BookOpen,
  Pencil,
  Save,
} from "lucide-react";

const getStoredStudent = () => {
  try {
    const possibleKeys = [
      "student",
      "user",
      "studentUser",
      "authUser",
    ];

    for (const key of possibleKeys) {
      const stored = localStorage.getItem(key);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (parsed?.user) {
          return parsed.user;
        }

        if (parsed?.student) {
          return parsed.student;
        }

        return parsed;
      }
    }
  } catch (error) {
    console.error("Failed to read student profile:", error);
  }

  return null;
};

const Field = ({
  label,
  value,
  icon: Icon,
  name,
  editing,
  onChange,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          name={name}
          value={value || ""}
          onChange={onChange}
          disabled={!editing}
          className={`w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition ${
            editing
              ? "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        />
      </div>
    </div>
  );
};

export default function Profile() {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedStudent = getStoredStudent();

    if (storedStudent) {
      setStudent(storedStudent);

      setFormData({
        name: storedStudent.name || "",
        email: storedStudent.email || "",
        phone: storedStudent.phone || "",
        college: storedStudent.college || "",
        course: storedStudent.course || "",
      });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    try {
      const storedStudent = getStoredStudent();

      const updatedStudent = {
        ...storedStudent,
        ...formData,
      };

      localStorage.setItem(
        "student",
        JSON.stringify(updatedStudent)
      );

      setStudent(updatedStudent);
      setEditing(false);
      setSaved(true);
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const initials = formData.name
    ? formData.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "S";

  return (
    <div className="space-y-6 m-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your personal and academic information.
          </p>
        </div>

        {!editing ? (
          <button
            type="button"
            onClick={() => {
              setEditing(true);
              setSaved(false);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            <Save size={16} />
            Save Changes
          </button>
        )}
      </div>

      {/* Success message */}
      {saved && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm font-medium text-green-700">
            Profile updated successfully.
          </p>
        </div>
      )}

      {/* Profile card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Profile header */}
        <div className="bg-gray-50 px-5 py-6 sm:px-7">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              {initials}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {formData.name || "Student"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {formData.email || "Student account"}
              </p>
            </div>
          </div>
        </div>

        {/* Personal information */}
        <div className="p-5 sm:p-7">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-900">
              Personal Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your basic account information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="Full Name"
              name="name"
              value={formData.name}
              icon={User}
              editing={editing}
              onChange={handleChange}
            />

            <Field
              label="Email Address"
              name="email"
              value={formData.email}
              icon={Mail}
              editing={editing}
              onChange={handleChange}
            />

            <Field
              label="Phone Number"
              name="phone"
              value={formData.phone}
              icon={Phone}
              editing={editing}
              onChange={handleChange}
            />
          </div>

          {/* Academic information */}
          <div className="my-7 border-t border-gray-100" />

          <div className="mb-5">
            <h3 className="text-base font-semibold text-gray-900">
              Academic Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Your college and course details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field
              label="College"
              name="college"
              value={formData.college}
              icon={Building2}
              editing={editing}
              onChange={handleChange}
            />

            <Field
              label="Course"
              name="course"
              value={formData.course}
              icon={BookOpen}
              editing={editing}
              onChange={handleChange}
            />

            <Field
              label="Education"
              name="education"
              value={student?.education || "B.Tech / Undergraduate"}
              icon={GraduationCap}
              editing={false}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}