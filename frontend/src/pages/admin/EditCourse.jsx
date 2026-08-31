import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getCourseById,
  updateCourse,
} from "../../api/adminCourseApi";


const EditCourse = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  const [loading, setLoading] = useState(false);

  const [fetching, setFetching] = useState(true);

  const [error, setError] = useState("");



  const [formData, setFormData] = useState({

    title: "",

    description: "",

    duration: "",

    level: "beginner",

    instructor: "",

    thumbnail: "",

  });





  useEffect(() => {

    const fetchCourse = async () => {

      try {

        setFetching(true);

        const data = await getCourseById(id);


        if (!data.success) {

          throw new Error(
            data.message || "Course not found"
          );

        }


        const course = data.course;


        setFormData({

          title: course.title || "",

          description: course.description || "",

          duration: course.duration || "",

          level: course.level || "beginner",

          instructor: course.instructor || "",

          thumbnail: course.thumbnail || "",

        });


      } catch (error) {


        setError(
          error.response?.data?.message ||
          error.message ||
          "Unable to load course"
        );


      } finally {

        setFetching(false);

      }

    };


    fetchCourse();


  }, [id]);







  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });


  };








  const handleSubmit = async (e) => {


    e.preventDefault();


    try {


      setLoading(true);

      setError("");



      const data = await updateCourse(
        id,
        formData
      );



      if (!data.success) {

        throw new Error(
          data.message ||
          "Course update failed"
        );

      }



      navigate("/admin/courses");



    } catch (error) {


      setError(

        error.response?.data?.message ||
        error.message ||
        "Something went wrong"

      );


    } finally {


      setLoading(false);


    }


  };







  if (fetching) {


    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-50">

        <p className="text-slate-500">

          Loading course...

        </p>

      </div>

    );


  }







  return (

    <div className="min-h-screen bg-slate-50">


      <main className="mx-auto max-w-4xl px-4 py-8">



        <Link

          to="/admin/courses"

          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"

        >

          <ArrowLeft className="h-4 w-4" />

          Back to Courses

        </Link>





        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">



          <h1 className="text-3xl font-bold text-slate-900">

            Edit Course

          </h1>


          <p className="mt-2 text-slate-500">

            Update course information

          </p>





          {
            error && (

              <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">

                {error}

              </div>

            )
          }






          <form

            onSubmit={handleSubmit}

            className="mt-8 space-y-6"

          >





            <div>

              <label className="text-sm font-medium">

                Course Title

              </label>


              <input

                name="title"

                value={formData.title}

                onChange={handleChange}

                className="mt-2 w-full rounded-lg border px-4 py-3"

                required

              />

            </div>








            <div>


              <label className="text-sm font-medium">

                Description

              </label>



              <textarea

                name="description"

                value={formData.description}

                onChange={handleChange}

                rows={5}

                className="mt-2 w-full rounded-lg border px-4 py-3"

                required

              />


            </div>







            <div className="grid gap-5 md:grid-cols-2">



              <div>


                <label className="text-sm font-medium">

                  Duration

                </label>


                <input

                  name="duration"

                  value={formData.duration}

                  onChange={handleChange}

                  className="mt-2 w-full rounded-lg border px-4 py-3"

                />


              </div>







              <div>


                <label className="text-sm font-medium">

                  Level

                </label>


                <select

                  name="level"

                  value={formData.level}

                  onChange={handleChange}

                  className="mt-2 w-full rounded-lg border px-4 py-3"

                >

                  <option value="beginner">

                    Beginner

                  </option>


                  <option value="intermediate">

                    Intermediate

                  </option>


                  <option value="advanced">

                    Advanced

                  </option>


                </select>


              </div>



            </div>







            <div>


              <label className="text-sm font-medium">

                Instructor

              </label>


              <input

                name="instructor"

                value={formData.instructor}

                onChange={handleChange}

                className="mt-2 w-full rounded-lg border px-4 py-3"

              />


            </div>








            <div>


              <label className="text-sm font-medium">

                Thumbnail URL

              </label>


              <input

                name="thumbnail"

                value={formData.thumbnail}

                onChange={handleChange}

                className="mt-2 w-full rounded-lg border px-4 py-3"

              />


            </div>








            <button

              disabled={loading}

              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"

            >


              <Save className="h-5 w-5" />


              {
                loading
                ? "Updating..."
                : "Update Course"
              }


            </button>





          </form>




        </div>


      </main>


    </div>

  );

};


export default EditCourse;