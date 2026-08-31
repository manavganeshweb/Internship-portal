import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  UserRound,
} from "lucide-react";

import {
  getApplications,
  updateApplicationStatus,
} from "../../../api/adminStudentApi";



const ApplicationManagement = () => {


  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");






  const fetchApplications = async () => {


    try {


      const data = await getApplications();


      setApplications(

        Array.isArray(data)

          ? data

          : data.applications || []

      );


    } catch(error) {


      console.log(
        "Applications error:",
        error
      );


    } finally {


      setLoading(false);


    }


  };







  useEffect(()=>{


    fetchApplications();


  },[]);









  const changeStatus = async (
    id,
    newStatus
  ) => {


    try {


      await updateApplicationStatus(
        id,
        newStatus
      );



      setApplications(

        applications.map(
          (application)=>


            application._id === id

            ?

            {
              ...application,
              status:newStatus
            }

            :

            application

        )

      );


    } catch(error){


      console.log(error);


    }


  };









  const filteredApplications =
    applications.filter(
      (application)=>{


        const studentName =
          application.student?.name
          ?.toLowerCase() || "";



        const internshipTitle =
          application.internship?.title
          ?.toLowerCase() || "";



        const searchValue =
          search.toLowerCase();



        const matchSearch =
          studentName.includes(searchValue)
          ||
          internshipTitle.includes(searchValue);



        const matchStatus =
          status
          ?
          application.status === status
          :
          true;



        return matchSearch && matchStatus;


      }
    );








  return (


    <div className="min-h-screen bg-slate-100 p-6">


      <div className="mx-auto max-w-7xl">





        <div>


          <h1 className="text-3xl font-bold text-slate-900">

            Internship Applications

          </h1>


          <p className="mt-2 text-slate-500">

            Review and manage student applications

          </p>


        </div>







        {/* Filters */}


        <div className="mt-8 flex flex-col gap-4 md:flex-row">



          <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3">


            <Search size={18}/>


            <input


              value={search}


              onChange={
                e=>setSearch(e.target.value)
              }


              placeholder="Search application..."

              className="w-full outline-none"

            />


          </div>







          <select


            value={status}


            onChange={
              e=>setStatus(e.target.value)
            }


            className="rounded-xl bg-white px-4 py-3"


          >

            <option value="">
              All Status
            </option>


            <option value="pending">
              Pending
            </option>


            <option value="approved">
              Approved
            </option>


            <option value="rejected">
              Rejected
            </option>


          </select>



        </div>









        {
          loading && (

            <div className="mt-8 rounded-xl bg-white p-10 text-center">

              Loading applications...

            </div>

          )
        }








        {!loading && (


          <div className="mt-8 space-y-5">


            {
              filteredApplications.length === 0 ? (


                <div className="rounded-xl bg-white p-10 text-center">


                  No applications found


                </div>



              ) : (


                filteredApplications.map(
                  (application,index)=>(



                    <motion.div


                      key={application._id}


                      initial={{

                        opacity:0,
                        y:20

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





                      <div className="flex flex-col justify-between gap-5 md:flex-row">



                        <div className="space-y-3">



                          <div className="flex items-center gap-3">


                            <UserRound

                              size={20}

                              className="text-blue-600"

                            />


                            <h2 className="font-bold">

                              {
                                application.student?.name
                                ||
                                "Student"

                              }

                            </h2>


                          </div>







                          <div className="flex items-center gap-3">


                            <Briefcase

                              size={20}

                              className="text-green-600"

                            />


                            <p>


                              {
                                application.internship?.title
                                ||
                                "Internship"

                              }


                            </p>


                          </div>







                          <div className="flex items-center gap-2">


                            <Clock size={16}/>


                            <span className="text-sm text-slate-500">


                              Status:


                              <span className="ml-2 font-medium">


                                {
                                  application.status
                                  ||
                                  "pending"

                                }


                              </span>


                            </span>


                          </div>




                        </div>









                        <div className="flex gap-3">



                          <button


                            onClick={()=>
                              changeStatus(
                                application._id,
                                "approved"
                              )
                            }


                            className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-green-600"


                          >

                            <CheckCircle size={16}/>

                            Approve

                          </button>







                          <button


                            onClick={()=>
                              changeStatus(
                                application._id,
                                "rejected"
                              )
                            }


                            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-red-600"


                          >

                            <XCircle size={16}/>

                            Reject


                          </button>



                        </div>




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


export default ApplicationManagement;