import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  Edit,
  Trash2,
  Plus,
  BookOpen,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getCourses,
  deleteCourse
} from "../../api/adminCourseApi";

const CourseList = () => {


  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");




  const fetchCourses = async () => {

    try {


      const response = await api.get("/admin/courses");


      setCourses(
        Array.isArray(response.data)
          ? response.data
          : response.data.courses || []
      );


    } catch(error) {


      console.log(error);


    } finally {


      setLoading(false);


    }

  };





  useEffect(()=>{

    fetchCourses();

  },[]);






  const deleteCourse = async(id)=>{


    const confirmDelete = window.confirm(
      "Delete this course?"
    );


    if(!confirmDelete) return;



    try {


      await api.delete(
        `/admin/courses/${id}`
      );


      setCourses(
        courses.filter(
          (course)=>course._id !== id
        )
      );


    }
    catch(error){

      console.log(error);

    }


  };






  const filteredCourses = courses.filter(
    (course)=>

      course.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

  );






  return (


    <div className="min-h-screen bg-slate-100 p-6">


      {/* Header */}


      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


        <div>


          <h1 className="text-3xl font-bold text-slate-900">

            Courses Management

          </h1>


          <p className="mt-1 text-slate-500">

            Manage LMS courses and content

          </p>


        </div>




        <Link

          to="/admin/courses/add"

          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"

        >

          <Plus size={18}/>

          Add Course

        </Link>



      </div>







      {/* Search */}



      <div className="mb-6 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">


        <Search
          size={20}
          className="text-slate-400"
        />


        <input

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          placeholder="Search courses..."

          className="w-full outline-none"

        />


      </div>







      {/* Loading */}


      {
        loading && (

          <div className="rounded-xl bg-white p-10 text-center">

            Loading courses...

          </div>

        )
      }








      {/* Course List */}


      {!loading && (


        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


          {
            filteredCourses.length === 0 ? (


              <div className="col-span-full rounded-xl bg-white p-10 text-center">


                <BookOpen

                  className="mx-auto text-slate-400"

                />


                <p className="mt-3 text-slate-500">

                  No courses found

                </p>


              </div>



            ) : (


              filteredCourses.map((course,index)=>(


                <motion.div


                  key={course._id}


                  initial={{
                    opacity:0,
                    y:30
                  }}


                  animate={{
                    opacity:1,
                    y:0
                  }}


                  transition={{
                    delay:index*0.1
                  }}


                  className="rounded-2xl bg-white p-6 shadow-sm"


                >




                  <div className="flex items-start justify-between">


                    <div>


                      <h2 className="text-xl font-bold text-slate-900">

                        {course.title}

                      </h2>


                      <p className="mt-2 text-sm text-slate-500">

                        {course.description}

                      </p>


                    </div>



                    <BookOpen

                      className="text-blue-600"

                    />


                  </div>






                  <div className="mt-5 flex flex-wrap gap-2">


                    {
                      course.skills?.map(skill=>(


                        <span

                          key={skill}

                          className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600"

                        >

                          {skill}

                        </span>


                      ))
                    }


                  </div>






                  <div className="mt-6 flex gap-3">


                    <Link

                      to={`/admin/courses/edit/${course._id}`}

                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-sm"

                    >

                      <Edit size={16}/>

                      Edit

                    </Link>





                    <button


                      onClick={()=>deleteCourse(course._id)}


                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 py-2 text-sm text-red-600"

                    >

                      <Trash2 size={16}/>

                      Delete


                    </button>



                  </div>




                </motion.div>


              ))


            )
          }



        </div>


      )}



    </div>


  );

};


export default CourseList;