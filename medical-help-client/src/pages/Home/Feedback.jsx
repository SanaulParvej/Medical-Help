import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeedbackCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(1);

    const feedbacks = [
        {
            id: 1,
            name: 'রহিম আহমেদ',
            nameEn: 'Rahim Ahmed',
            text: 'অসাধারণ সেবা পেয়েছি এখানে। ডাক্তারেরা খুবই যত্নশীল এবং পেশাদার।',
            textEn: 'Excellent service received here. The doctors are very caring and professional.',
            rating: 5,
        },
        {
            id: 2,
            name: 'জাহিরা বেগম',
            nameEn: 'Jahira Begum',
            text: 'খুবই সহজ এবং দ্রুত অ্যাপয়েন্টমেন্ট সিস্টেম। সবাইকে সুপারিশ করছি।',
            textEn: 'Very easy and quick appointment system. Recommending to everyone.',
            rating: 5,
        },
        {
            id: 3,
            name: 'করিম হোসেন',
            nameEn: 'Karim Hosen',
            text: 'চিকিৎসকদের পরামর্শ অত্যন্ত কার্যকর ছিল। খুবই সন্তুষ্ট।',
            textEn: 'The doctor consultation was very effective. Very satisfied.',
            rating: 4,
        },
    ];

    const carouselFeedbacks = feedbacks.length < 4 ? [...feedbacks, ...feedbacks, ...feedbacks] : feedbacks;

    return (
        <div className="my-8 rounded-xl bg-[#00A8E7] px-5 py-10">
            <div className="mx-auto max-w-[700px]">
                <h2 className="mb-8 text-center text-3xl font-bold text-white">Patient Feedback</h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    loop
                    watchOverflow={false}
                    loopAdditionalSlides={carouselFeedbacks.length}
                    loopedSlides={carouselFeedbacks.length}
                    speed={700}
                    centeredSlides
                    initialSlide={1}
                    slidesPerView={3}
                    spaceBetween={24}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        waitForTransition: false,
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    className="pb-12"
                    onSwiper={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                        if (swiper.autoplay) {
                            swiper.autoplay.start();
                        }
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    onAutoplayStop={(swiper) => {
                        if (swiper.autoplay) {
                            swiper.autoplay.start();
                        }
                    }}
                >
                    {carouselFeedbacks.map((feedback, index) => {
                        return (
                            <SwiperSlide key={`${feedback.id}-${index}`}>
                                <div
                                    className={`mx-2 flex min-h-[250px] flex-col justify-between rounded-[10px] bg-white p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-500 lg:mx-0 ${index === activeIndex
                                        ? 'lg:-translate-y-6 lg:scale-[1.05]'
                                        : 'lg:translate-y-0 lg:opacity-90'
                                        }`}
                                >
                                    <div className="mb-[15px] text-2xl">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`mr-[5px] ${i < feedback.rating ? 'text-[#ffc107]' : 'text-[#ddd]'}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <p className="mb-5 text-base leading-relaxed text-[#333]">
                                        {feedback.text}
                                    </p>

                                    <div>
                                        <h4 className="m-0 text-base font-semibold text-[#00A8E7]">
                                            {feedback.name}
                                        </h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default FeedbackCarousel;