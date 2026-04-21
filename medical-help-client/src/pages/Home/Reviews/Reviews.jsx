import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="my-12">
      <div className="text-center mb-10">
        <h3 className="text-3xl text-center font-bold my-4">
          আমাদের গ্রাহকরা যা বলছেন
        </h3>
        <p className="md:w-1/2 w-11/12 mx-auto text-sm text-[#606060] text-center leading-relaxed">
          'পোশ্চার প্রো'-এর মাধ্যমে খুব সহজেই আপনার শারীরিক ভঙ্গি, গতিশীলতা এবং
          সুস্থতা বৃদ্ধি করুন। সঠিক অ্যালাইনমেন্ট বজায় রাখুন, ব্যথা কমান এবং
          অনায়াসেই আপনার শরীরকে শক্তিশালী করে তুলুন!
        </p>
      </div>

      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
