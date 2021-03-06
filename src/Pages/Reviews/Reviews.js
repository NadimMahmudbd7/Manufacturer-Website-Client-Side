import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import Review from './Review';

const Reviews = () => {
    const [allReviews,setAllRevires] = useState('')
    const { isLoading, error, data: reviews } = useQuery('reviews', () =>
        fetch('https://cryptic-waters-16109.herokuapp.com/reviews').then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Loading></Loading>
    }
    const HandleReviews=()=>{
        setAllRevires("all Revires")
    }
    return (
      <div className='mt-20'>
           <h1 data-aos="fade-down" className='text-center text-4xl text-primary font-bold my-10 bg-gray-200 py-6' style={{letterSpacing:'3px'}}>Check What Customers Are Saying About Us</h1>
        <div className=" grid lg:grid-cols-3 gap-y-8 gap-x-1 reviews" >
           {
              allReviews ?  reviews.reviews.map(review => <Review review={review} key={review._id}></Review>): reviews.reviews.slice(-6).map(review => <Review review={review} key={review.id}></Review>)
           }
        </div>
        {allReviews ? <button style={{display:"none"}} onClick={HandleReviews} className="btn btn-wide">See All Products</button> : <button onClick={HandleReviews} className="btn btn-primary">See All Reviews</button>}
      </div>
    );
};

export default Reviews;