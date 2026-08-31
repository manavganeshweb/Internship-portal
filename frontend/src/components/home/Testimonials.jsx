import { motion } from "framer-motion";
import {
  Star,
  Quote,
} from "lucide-react";


const testimonials = [

  {
    name: "Rahul Sharma",
    role: "Frontend Developer Intern",
    image: "RS",
    message:
      "Nexavision helped me improve my React skills and build projects that made my portfolio stronger.",
    rating: 5,
  },


  {
    name: "Priya Verma",
    role: "Full Stack Developer",
    image: "PV",
    message:
      "The practical learning approach and internship support helped me become confident as a developer.",
    rating: 5,
  },


  {
    name: "Aman Kumar",
    role: "Computer Science Student",
    image: "AK",
    message:
      "The courses are structured perfectly for students who want industry-ready skills.",
    rating: 4,
  },


];



const Testimonials = () => {


  return (

    <section className="bg-slate-50 py-20">


      <div className="mx-auto max-w-7xl px-6">


        {/* Heading */}

        <motion.div

          initial={{
            opacity:0,
            y:30
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="mx-auto mb-14 max-w-3xl text-center"

        >

          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">

            Student Stories

          </p>


          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">

            Loved by students building their careers

          </h2>


          <p className="mt-4 text-slate-600">

            See how learners are using Nexavision to improve
            their skills and achieve their goals.

          </p>


        </motion.div>





        {/* Cards */}


        <div className="grid gap-8 md:grid-cols-3">


          {
            testimonials.map((item,index)=>(


              <motion.div


                key={item.name}


                initial={{
                  opacity:0,
                  y:50
                }}


                whileInView={{
                  opacity:1,
                  y:0
                }}


                viewport={{
                  once:true
                }}


                transition={{
                  delay:index * 0.15
                }}


                whileHover={{
                  y:-10
                }}


                className="relative rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl"

              >



                {/* Quote Icon */}

                <Quote

                  className="absolute right-6 top-6 text-blue-100"

                  size={45}

                />





                {/* Rating */}


                <div className="flex gap-1">


                  {
                    Array.from({
                      length:item.rating
                    }).map((_,i)=>(

                      <Star

                        key={i}

                        size={18}

                        fill="currentColor"

                        className="text-yellow-400"

                      />

                    ))
                  }


                </div>





                <p className="mt-6 leading-7 text-slate-600">

                  "{item.message}"

                </p>





                {/* User */}


                <div className="mt-8 flex items-center gap-4">


                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

                    {item.image}

                  </div>



                  <div>

                    <h3 className="font-semibold text-slate-900">

                      {item.name}

                    </h3>


                    <p className="text-sm text-slate-500">

                      {item.role}

                    </p>


                  </div>


                </div>



              </motion.div>


            ))
          }


        </div>


      </div>


    </section>

  );

};


export default Testimonials;