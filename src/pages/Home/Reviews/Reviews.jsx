import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise) || [];

  return (
    <section className="my-28">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h3 className="text-4xl font-bold mb-6">What People Say</h3>
        <p className="text-gray-600 leading-relaxed">
          Hear from our valued customers. We value your experience and
          constantly work to provide the best service possible.
        </p>
      </div>

      {/* Swiper Reviews */}
      <Swiper
        loop
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 50,
          depth: 150,
          modifier: 1,
          scale: 0.85,
          slideShadows: false,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="review-swiper px-4"
      >
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500">No reviews available.</p>
        )}
      </Swiper>
    </section>
  );
};

export default Reviews;
