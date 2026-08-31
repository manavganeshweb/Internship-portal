import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";


const questions = [

  {
    question:
      "What is Nexavision LMS?",

    answer:
      "Nexavision is a learning platform where students can learn industry skills, complete practical projects, enroll in courses and access internship opportunities.",
  },


  {
    question:
      "Who can join Nexavision?",

    answer:
      "Any student who wants to improve technical skills, build projects and prepare for career opportunities can join Nexavision.",
  },


  {
    question:
      "Do I get certificates after completing courses?",

    answer:
      "Yes. Students receive certificates after successfully completing eligible courses and internship programs.",
  },


  {
    question:
      "Are the courses beginner friendly?",

    answer:
      "Yes. Courses are structured from basics to advanced concepts with practical examples and projects.",
  },


  {
    question:
      "Can I apply for internships through Nexavision?",

    answer:
      "Yes. Students can explore available internships, apply and track their application status through their dashboard.",
  },


  {
    question:
      "How can I track my learning progress?",

    answer:
      "Your student dashboard shows enrolled courses, completed lessons, progress percentage and achievements.",
  },

];



const FAQ = () => {

  const [active,setActive] = useState(null);


  return (

    <section className="py-20">


      <div className="mx-auto max-w-5xl px-6">


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

          className="mb-12 text-center"

        >

          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">

            <HelpCircle size={16}/>

            FAQ

          </div>


          <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-4xl">

            Frequently asked questions

          </h2>


          <p className="mt-4 text-slate-600">

            Find answers about courses, internships and learning.

          </p>


        </motion.div>





        {/* Accordion */}


        <div className="space-y-4">


          {
            questions.map((item,index)=>{


              const isOpen = active === index;


              return (

                <motion.div

                  key={item.question}

                  initial={{
                    opacity:0,
                    y:20
                  }}

                  whileInView={{
                    opacity:1,
                    y:0
                  }}

                  viewport={{
                    once:true
                  }}

                  transition={{
                    delay:index * 0.08
                  }}

                  className="overflow-hidden rounded-2xl border bg-white"

                >


                  <button

                    onClick={() =>
                      setActive(
                        isOpen ? null : index
                      )
                    }

                    className="flex w-full items-center justify-between p-6 text-left"

                  >

                    <span className="font-semibold text-slate-900">

                      {item.question}

                    </span>


                    <motion.div

                      animate={{
                        rotate:isOpen ? 180 : 0
                      }}

                    >

                      <ChevronDown
                        size={20}
                        className="text-slate-500"
                      />

                    </motion.div>


                  </button>





                  <AnimatePresence>


                    {
                      isOpen && (

                        <motion.div

                          initial={{
                            height:0,
                            opacity:0
                          }}

                          animate={{
                            height:"auto",
                            opacity:1
                          }}

                          exit={{
                            height:0,
                            opacity:0
                          }}

                          transition={{
                            duration:0.25
                          }}

                          className="overflow-hidden"

                        >

                          <p className="border-t px-6 pb-6 pt-4 text-sm leading-6 text-slate-600">

                            {item.answer}

                          </p>


                        </motion.div>

                      )
                    }


                  </AnimatePresence>


                </motion.div>

              );

            })
          }


        </div>


      </div>


    </section>

  );

};


export default FAQ;