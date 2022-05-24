import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import Totalorder from './Totalorder';

const TotalOrders = () => {

    const { isLoading, error, data: products,refetch } = useQuery('service', () =>
        fetch(`http://localhost:4000/totalorder`,
        {
            method: "GET",
            headers: {
                "authorization": `bearer ${localStorage.getItem("AccessToken")}`
            }
        }
        ).then(res =>
            res.json()
        )
        )
        refetch()
        
    if (isLoading ) {

        return <Loading></Loading>
    }
    console.log(products.orders);
    return (
        <div>
            <h1>appointment infor:{products?.orders?.length}</h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    {products?.result?.length === 0 ? <h1 className='text-4xl text-center font-bold mb-32 mt-20'>Your Haven't Order Any Product</h1> : <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Total Qty</th>
                            <th>Total Price</th>
                            <th style={{width:"230px"}}>Payment</th>
                        </tr>
                    </thead>}
                    <tbody>

                        {
                           !products?.orders?.map ? <Loading></Loading> : products?.orders?.map((product,index)=><Totalorder key={product._id} refetch={refetch} isLoading={isLoading} product={product} index={index} ></Totalorder>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalOrders;