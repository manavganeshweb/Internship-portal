import { useEffect, useState } from "react";
import {
  ArrowLeft,
  UserRound,
  BookOpen,
  Briefcase,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getStudentById,
} from "../../../api/adminStudentApi";



const StudentDetails = () => {


  const { id } = useParams();


  const [student,setStudent] = useState(null);

  const [loading,setLoading] = useState(true);






  const fetchStudent = async()=>{


    try{


      const data = await getStudentById(id);



      setStudent(

        data.student || data

      );



    }
    catch(error){


      console.log(
        "Student details error:",
        error
      );


    }
    finally{


      setLoading(false);


    }


  };








  useEffect(()=>{


    fetchStudent();


  },[id]);







  if(loading){


    return (

      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        Loading student...

      </div>

    );


  }







  if(!student){


    return (

      <div className="p-10 text-center">

        Student not found

      </div>

    );


  }









  return (


    <div className="min-h-screen bg-slate-100 p-6">


      <div className="mx-auto max-w-6xl">



        <Link

          to="/admin/students"

          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600"

        >

          <ArrowLeft size={16}/>

          Back Students

        </Link>








        {/* Profile */}


        <div className="mt-6 rounded-2xl bg-white p-8 shadow-sm">


          <div className="flex flex-col gap-5 md:flex-row md:items-center">


            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">


              <UserRound

                size={38}

                className="text-blue-600"

              />


            </div>





            <div>


              <h1 className="text-3xl font-bold text-slate-900">

                {student.name}

              </h1>


              <p className="text-slate-500">

                {student.email}

              </p>


              <span className="mt-2 inline-block rounded-full bg-blue-50 px-4 py-1 text-sm text-blue-600">

                {student.role || "Student"}

              </span>


            </div>


          </div>



        </div>










        <div className="mt-6 grid gap-6 md:grid-cols-3">



          {/* Courses */}


          <div className="rounded-2xl bg-white p-6 shadow-sm">


            <BookOpen className="text-blue-600"/>


            <h3 className="mt-4 font-bold">

              Enrolled Courses

            </h3>


            <p className="mt-2 text-3xl font-bold">

              {
                student.courses?.length || 0
              }

            </p>


          </div>







          {/* Internships */}


          <div className="rounded-2xl bg-white p-6 shadow-sm">


            <Briefcase className="text-green-600"/>


            <h3 className="mt-4 font-bold">

              Internships

            </h3>


            <p className="mt-2 text-3xl font-bold">

              {
                student.internships?.length || 0
              }

            </p>


          </div>







          {/* Certificates */}


          <div className="rounded-2xl bg-white p-6 shadow-sm">


            <Award className="text-purple-600"/>


            <h3 className="mt-4 font-bold">

              Certificates

            </h3>


            <p className="mt-2 text-3xl font-bold">

              {
                student.certificates?.length || 0
              }

            </p>


          </div>



        </div>









        <div className="mt-6 grid gap-6 lg:grid-cols-2">





          {/* Courses List */}


          <div className="rounded-2xl bg-white p-6 shadow-sm">


            <h2 className="text-xl font-bold">

              Learning Progress

            </h2>



            <div className="mt-5 space-y-4">


              {
                student.courses?.length ? (

                  student.courses.map((course)=>(


                    <div

                      key={course._id}

                      className="rounded-xl border p-4"

                    >

                      <div className="flex justify-between">


                        <p className="font-medium">

                          {course.title}

                        </p>


                        <span className="text-sm text-blue-600">

                          {course.progress || 0}%

                        </span>


                      </div>



                      <div className="mt-3 h-2 rounded-full bg-slate-100">


                        <div

                          className="h-2 rounded-full bg-blue-600"

                          style={{

                            width:
                            `${course.progress || 0}%`

                          }}

                        />


                      </div>


                    </div>


                  ))

                ) : (

                  <p className="text-slate-500">

                    No enrolled courses

                  </p>

                )

              }



            </div>


          </div>










          {/* Activity */}


          <div className="rounded-2xl bg-white p-6 shadow-sm">


            <h2 className="text-xl font-bold">

              Recent Activity

            </h2>




            <div className="mt-5 space-y-5">


              {
                (student.activity || []).map(
                  (item,index)=>(


                    <div

                      key={index}

                      className="flex gap-3"

                    >


                      <CheckCircle

                        size={20}

                        className="text-green-600"

                      />


                      <div>


                        <p className="font-medium">

                          {item.title}

                        </p>


                        <div className="flex items-center gap-1 text-xs text-slate-500">

                          <Clock size={12}/>

                          {item.time}

                        </div>


                      </div>


                    </div>


                  )
                )
              }



              {
                !student.activity?.length && (

                  <p className="text-slate-500">

                    No recent activity

                  </p>

                )
              }



            </div>


          </div>



        </div>






      </div>


    </div>


  );

};


export default StudentDetails;