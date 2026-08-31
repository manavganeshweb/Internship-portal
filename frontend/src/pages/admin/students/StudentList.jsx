import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  UserRound,
  Eye,
  Trash2,
  GraduationCap,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getAllStudents,
  deleteStudent,
} from "../../../api/adminStudentApi";



const StudentList = () => {


  const [students,setStudents] = useState([]);

  const [loading,setLoading] = useState(true);

  const [search,setSearch] = useState("");





  const fetchStudents = async()=>{


    try{


      const data = await getAllStudents();



      setStudents(

        Array.isArray(data)

        ? data

        : data.students || []

      );



    }
    catch(error){


      console.log(
        "Students fetch error:",
        error
      );


    }
    finally{


      setLoading(false);


    }


  };







  useEffect(()=>{


    fetchStudents();


  },[]);









  const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(

      "Delete this student?"

    );


    if(!confirmDelete) return;




    try{


      await deleteStudent(id);



      setStudents(

        students.filter(

          student => student._id !== id

        )

      );



    }
    catch(error){


      console.log(error);


    }


  };








  const filteredStudents = students.filter(

    (student)=>{


      const name =

        student.name
        ?.toLowerCase()
        || "";



      const email =

        student.email
        ?.toLowerCase()
        || "";



      const value = search.toLowerCase();



      return (

        name.includes(value)

        ||

        email.includes(value)

      );


    }

  );









  return (

    <div className="min-h-screen bg-slate-100 p-6">


      <div className="mx-auto max-w-7xl">





        {/* Header */}


        <div className="mb-8">


          <h1 className="text-3xl font-bold text-slate-900">

            Student Management

          </h1>


          <p className="mt-2 text-slate-500">

            Manage registered students

          </p>


        </div>









        {/* Search */}


        <div className="mb-8 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">


          <Search

            size={20}

            className="text-slate-400"

          />



          <input


            value={search}


            onChange={
              e=>setSearch(e.target.value)
            }


            placeholder="Search student..."

            className="w-full outline-none"

          />


        </div>









        {
          loading && (


            <div className="rounded-xl bg-white p-10 text-center">


              Loading students...


            </div>


          )
        }









        {!loading && (


          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">



            {
              filteredStudents.length === 0 ? (


                <div className="col-span-full rounded-xl bg-white p-10 text-center">


                  <GraduationCap

                    className="mx-auto text-slate-400"

                  />


                  <p className="mt-3 text-slate-500">

                    No students found

                  </p>


                </div>



              ) : (


                filteredStudents.map(

                  (student,index)=>(



                    <motion.div


                      key={student._id}


                      initial={{

                        opacity:0,

                        y:30

                      }}


                      animate={{

                        opacity:1,

                        y:0

                      }}


                      transition={{

                        delay:index * 0.1

                      }}


                      className="rounded-2xl bg-white p-6 shadow-sm"

                    >






                      <div className="flex items-center gap-4">


                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">


                          <UserRound

                            className="text-blue-600"

                          />


                        </div>





                        <div>


                          <h2 className="font-bold text-slate-900">

                            {student.name}

                          </h2>


                          <p className="text-sm text-slate-500">

                            {student.email}

                          </p>


                        </div>


                      </div>







                      <div className="mt-5 space-y-2 text-sm">


                        <p>

                          Role:

                          <span className="ml-2 font-medium">

                            {student.role || "student"}

                          </span>

                        </p>



                        <p>

                          Joined:

                          <span className="ml-2">

                            {
                              student.createdAt
                              ?
                              new Date(
                                student.createdAt
                              ).toLocaleDateString()
                              :
                              "N/A"
                            }

                          </span>

                        </p>


                      </div>









                      <div className="mt-6 flex gap-3">


                        <Link


                          to={`/admin/students/${student._id}`}


                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-2 text-sm"


                        >


                          <Eye size={16}/>


                          View


                        </Link>







                        <button


                          onClick={()=>handleDelete(student._id)}


                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 text-red-600"


                        >


                          <Trash2 size={16}/>


                          Delete


                        </button>



                      </div>





                    </motion.div>



                  )


                )


              )
            }



          </div>


        )}



      </div>


    </div>


  );


};


export default StudentList;