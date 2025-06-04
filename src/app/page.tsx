"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Calendar,
  ListTodo,
  Users,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "@/components/local/LogoutButton";

export default function Home() {
  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.2 },
    },
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "Tech Innovators",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      quote:
        "TaskFlow has transformed our team's productivity. The intuitive interface and powerful features have made managing complex projects a breeze.",
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "BuildRight Solutions",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      quote:
        "I've tried dozens of task management tools, but TaskFlow strikes the perfect balance between simplicity and power. Our engineering team's efficiency has improved by 35%.",
    },
    {
      name: "Priya Sharma",
      role: "Marketing Director",
      company: "Growth Ventures",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "The collaborative features in TaskFlow have made our marketing campaigns more cohesive. I can't imagine going back to our old system.",
    },
  ];

  // Testimonial carousel state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    // Auto-advance testimonial every 6 seconds
    const interval = setInterval(() => {
      setActiveTestimonial((current) =>
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const prevTestimonial = () => {
    setActiveTestimonial((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-blue-50'>
      {/* Hero Section */}
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center space-x-2'>
            <Image src='/logo.png' alt='TaskFlow Logo' width={40} height={40} />
            <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent'>
              TaskFlow
            </span>
          </div>
          <div className='flex space-x-4'>
            {user ? (
              <>
                <Link href='/dashboard'>
                  <Button
                    variant='outline'
                    className='font-medium transition-all duration-300 hover:shadow-md group'
                  >
                    Dashboard
                    <ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>
                <LogoutButton
                  variant='default'
                  className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transform hover:-translate-y-1 font-medium shadow-lg hover:shadow-xl transition-all duration-300'
                />
              </>
            ) : (
              <>
                <Link href='/login'>
                  <Button
                    variant='outline'
                    className='font-medium transition-all duration-300 hover:shadow-md group'
                  >
                    Log In
                    <ChevronRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>
                <Link href='/register'>
                  <Button className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'>
                    Sign Up
                    <Star className='ml-1 h-4 w-4 transition-transform group-hover:rotate-12' />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Animated Notification Banner */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
        className='bg-indigo-50 border-y border-indigo-100 py-3'
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center text-sm md:text-base'>
            <span className='bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-xs font-semibold mr-3'>
              NEW
            </span>
            <p className='text-indigo-800'>
              Introducing Team Collaboration Features
              <span className='hidden md:inline'>
                {" "}
                — Share and assign tasks with your team members
              </span>
            </p>
            <motion.div
              className='ml-4'
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className='h-5 w-5 text-indigo-500' />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <section className='py-20 px-4 sm:px-6 max-w-7xl mx-auto'>
        <motion.div
          className='text-center mb-20'
          initial='hidden'
          animate='visible'
          variants={containerVariants}
        >
          <motion.h1
            className='text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent'
            variants={itemVariants}
          >
            Manage Tasks With Ease
          </motion.h1>

          <motion.p
            className='text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10'
            variants={itemVariants}
          >
            Streamline your workflow, boost productivity, and collaborate
            seamlessly with our intuitive task management platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row gap-4 justify-center'
          >
            <Link href='/register'>
              <Button className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg py-6 px-8'>
                Get Started — It&apos;s Free
              </Button>
            </Link>
            <Link href='#features'>
              <Button variant='outline' className='text-lg py-6 px-8'>
                Explore Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className='relative w-full max-w-4xl mx-auto'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className='bg-white rounded-lg shadow-2xl overflow-hidden'>
            <Image
              src='/pattern.svg'
              alt='Dashboard Preview'
              width={1200}
              height={600}
              className='w-full h-auto opacity-10 absolute'
            />
            <Image
              src='/dashboard-preview.svg'
              alt='Dashboard Preview'
              width={1200}
              height={600}
              className='w-full h-auto'
            />
          </div>

          {/* Floating Elements */}
          <motion.div
            className='absolute -top-6 -right-6 bg-blue-500 text-white p-4 rounded-lg shadow-lg'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
          >
            <span className='font-bold'>+28%</span> Productivity
          </motion.div>

          <motion.div
            className='absolute -bottom-6 -left-6 bg-green-500 text-white p-4 rounded-lg shadow-lg'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            whileHover={{ y: -3, scale: 1.03, transition: { duration: 0.2 } }}
          >
            <span className='font-bold'>15+</span> Task Templates
          </motion.div>

          {/* New floating element */}
          <motion.div
            className='absolute top-1/2 right-[-20px] transform -translate-y-1/2 bg-amber-500 text-white p-4 rounded-lg shadow-lg'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            whileHover={{ x: -3, scale: 1.03, transition: { duration: 0.2 } }}
          >
            <span className='font-bold'>24/7</span> Cloud Sync
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 px-4 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              Why Choose TaskFlow?
            </h2>
            <p className='text-slate-600 max-w-2xl mx-auto'>
              Our comprehensive task management solution helps teams stay
              organized, meet deadlines, and boost overall productivity.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <motion.div
              className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all'
              variants={featureVariants}
              initial='hidden'
              whileInView='visible'
              whileHover='hover'
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className='bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4'>
                <ListTodo className='text-blue-600 w-7 h-7' />
              </div>
              <h3 className='text-xl font-bold mb-2'>
                Intuitive Task Management
              </h3>
              <p className='text-gray-600'>
                Create, organize, and prioritize tasks with a simple
                drag-and-drop interface.
              </p>
            </motion.div>

            <motion.div
              className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all'
              variants={featureVariants}
              initial='hidden'
              whileInView='visible'
              whileHover='hover'
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className='bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4'>
                <CheckCircle className='text-green-600 w-7 h-7' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Task Progress Tracking</h3>
              <p className='text-gray-600'>
                Monitor task completion and project milestones with
                comprehensive tracking tools.
              </p>
            </motion.div>

            <motion.div
              className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all'
              variants={featureVariants}
              initial='hidden'
              whileInView='visible'
              whileHover='hover'
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className='bg-amber-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4'>
                <Calendar className='text-amber-600 w-7 h-7' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Deadline Management</h3>
              <p className='text-gray-600'>
                Set due dates, receive timely reminders, and never miss a
                deadline again.
              </p>
            </motion.div>

            <motion.div
              className='bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all'
              variants={featureVariants}
              initial='hidden'
              whileInView='visible'
              whileHover='hover'
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className='bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4'>
                <Users className='text-purple-600 w-7 h-7' />
              </div>
              <h3 className='text-xl font-bold mb-2'>Team Collaboration</h3>
              <p className='text-gray-600'>
                Work together seamlessly with team members on shared projects
                and tasks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className='py-20 px-4 bg-white border-y border-gray-100'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              Trusted by thousands
            </h2>
            <p className='text-slate-600 max-w-2xl mx-auto'>
              TaskFlow is helping teams and individuals around the world achieve
              more.
            </p>
          </motion.div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2'>
                10k+
              </p>
              <p className='text-gray-500'>Active Users</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2'>
                1.2M+
              </p>
              <p className='text-gray-500'>Tasks Completed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent mb-2'>
                98%
              </p>
              <p className='text-gray-500'>Customer Satisfaction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className='text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2'>
                150+
              </p>
              <p className='text-gray-500'>Countries</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-20 px-4 bg-blue-50'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            className='text-center mb-12'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              Trusted by Teams Worldwide
            </h2>
            <p className='text-slate-600 max-w-2xl mx-auto'>
              See what our customers have to say about how TaskFlow has
              transformed their productivity.
            </p>
          </motion.div>

          {/* Testimonial Carousel */}
          <div className='relative'>
            <div className='overflow-hidden rounded-xl bg-white shadow-xl'>
              <div className='p-8 md:p-12'>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-8 ${
                      index === activeTestimonial ? "block" : "hidden"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className='md:w-1/4 flex flex-col items-center md:items-start'>
                      <div className='relative w-24 h-24 mb-4'>
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          layout='fill'
                          className='rounded-full object-cover border-4 border-blue-50'
                          unoptimized
                        />
                        <div className='absolute -right-2 -bottom-2 bg-blue-500 rounded-full p-2'>
                          <Star className='h-4 w-4 text-white' />
                        </div>
                      </div>
                      <h4 className='font-bold text-lg'>{testimonial.name}</h4>
                      <p className='text-sm text-gray-600'>
                        {testimonial.role}
                      </p>
                      <p className='text-xs text-blue-600 font-medium'>
                        {testimonial.company}
                      </p>
                    </div>
                    <div className='md:w-3/4'>
                      <blockquote>
                        <p className='text-xl italic text-gray-700 leading-relaxed'>
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </blockquote>
                      <div className='mt-4 flex'>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className='h-5 w-5 text-amber-500 fill-amber-500'
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className='flex justify-center mt-6 gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className='absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors'
              aria-label='Previous testimonial'
            >
              <ChevronLeft className='h-6 w-6 text-blue-600' />
            </button>
            <button
              onClick={nextTestimonial}
              className='absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors'
              aria-label='Next testimonial'
            >
              <ChevronRight className='h-6 w-6 text-blue-600' />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className='py-20 px-4 bg-gradient-to-b from-blue-50 to-white'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl sm:text-4xl font-bold mb-4'>
              Why TaskFlow Stands Out
            </h2>
            <p className='text-slate-600 max-w-2xl mx-auto'>
              See how we compare to other task management solutions
            </p>
          </motion.div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-blue-100'>
                  <th className='py-4 px-6 text-left font-medium text-gray-500'>
                    Features
                  </th>
                  <th className='py-4 px-6 text-center'>
                    <div className='flex flex-col items-center'>
                      <span className='text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent'>
                        TaskFlow
                      </span>
                      <span className='text-sm text-blue-600 font-medium'>
                        Our solution
                      </span>
                    </div>
                  </th>
                  <th className='py-4 px-6 text-center'>
                    <div className='flex flex-col items-center'>
                      <span className='text-xl font-bold text-gray-700'>
                        Basic Tools
                      </span>
                      <span className='text-sm text-gray-500'>Competitors</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <motion.tr
                  className='border-b border-gray-100'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <td className='py-4 px-6 font-medium'>
                    Drag-and-drop Interface
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                </motion.tr>
                <motion.tr
                  className='border-b border-gray-100'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <td className='py-4 px-6 font-medium'>
                    Priority-based Organization
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                </motion.tr>
                <motion.tr
                  className='border-b border-gray-100'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <td className='py-4 px-6 font-medium'>Team Collaboration</td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500 opacity-30' />
                    </div>
                  </td>
                </motion.tr>
                <motion.tr
                  className='border-b border-gray-100'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <td className='py-4 px-6 font-medium'>Advanced Analytics</td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500 opacity-30' />
                    </div>
                  </td>
                </motion.tr>
                <motion.tr
                  className='border-b border-gray-100'
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <td className='py-4 px-6 font-medium'>
                    Custom Task Templates
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500 opacity-30' />
                    </div>
                  </td>
                </motion.tr>
                <motion.tr
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <td className='py-4 px-6 font-medium'>
                    24/7 Customer Support
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    </div>
                  </td>
                  <td className='py-4 px-6 text-center'>
                    <div className='flex justify-center'>
                      <CheckCircle className='h-6 w-6 text-green-500 opacity-30' />
                    </div>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </div>

          <motion.div
            className='mt-10 text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className='text-sm text-gray-500 italic'>
              * Feature availability may vary based on subscription plan
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700'>
        <motion.div
          className='max-w-4xl mx-auto text-center text-white'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl sm:text-4xl font-bold mb-6'>
            Ready to boost your productivity?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Join thousands of professionals who trust TaskFlow to organize their
            work and life.
          </p>
          <Link href='/register'>
            <Button className='bg-white text-blue-700 hover:bg-blue-50 font-medium text-lg py-6 px-8'>
              Get Started Now — Free
            </Button>
          </Link>
          <p className='mt-4 text-sm text-blue-200'>No credit card required</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className='bg-slate-900 text-white py-12 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <div className='flex items-center space-x-2 mb-6'>
                <Image
                  src='/logo.png'
                  alt='TaskFlow Logo'
                  width={32}
                  height={32}
                />
                <span className='text-xl font-bold'>TaskFlow</span>
              </div>
              <p className='text-slate-400'>
                The modern task management solution for teams and individuals.
              </p>
            </div>

            <div>
              <h3 className='font-bold text-lg mb-4'>Product</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Features
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Pricing
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Integrations
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    What&apos;s New
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-bold text-lg mb-4'>Resources</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Guides
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='font-bold text-lg mb-4'>Company</h3>
              <ul className='space-y-2'>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Careers
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Contact
                  </a>
                </li>
                <li>
                  <a href='#' className='text-slate-400 hover:text-white'>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center'>
            <p className='text-slate-400 text-sm'>
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </p>
            <div className='mt-4 md:mt-0 flex space-x-6'>
              <a href='#' className='text-slate-400 hover:text-white'>
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
              <a href='#' className='text-slate-400 hover:text-white'>
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
                </svg>
              </a>
              <a href='#' className='text-slate-400 hover:text-white'>
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
