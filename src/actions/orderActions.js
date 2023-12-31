// Import the action types
import {
    UPDATE_SHIPPING_INFO_REQUEST,
    UPDATE_SHIPPING_INFO_SUCCESS,
    UPDATE_SHIPPING_INFO_FAILURE,
    UPDATE_PAYMENT_INFO_REQUEST,
    UPDATE_PAYMENT_INFO_SUCCESS,
    UPDATE_PAYMENT_INFO_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILURE,
    GET_ORDER_PRODUCT_SUCCESS
  } from './actionTypes';
import { API } from 'aws-amplify';

export const sendOrder = ({orderId, shippingData }) => (dispatch) => {
  
      API.post("api", "/sendOrderEmail", {
          body: {
            orderId,
            shippingData
          }
      })
      .then((response) => {
          console.log("Email sent successfully:", response);

      })
      .catch((error) => {
          console.error("Error changing settings:", error);

      });
};

export const OrderProductLink = ({ orderid, cartItems }) => (dispatch) => {


      API.post('api', '/orderProduct', {
        body: {
          orderid,
          cartItems,
        },
      })
        .then((response) => {
          console.log("Order Product Link successful")
        })
        .catch((error) => {
          console.log("Order product link not successful.")
        });
    };

export const getOrderProduct = ({ orderId }) => (dispatch) =>{
  API.post('api', '/getOrderProduct',{
    body: {
      orderId
    }
  }).then((response) => {
    console.log(response.order)
    
    dispatch({ type: GET_ORDER_PRODUCT_SUCCESS, orderProduct: response.order});

  })
  .catch((error) => {
    // Dispatch a failure action with the error message

    dispatch({ type: CREATE_ORDER_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });

  });
}

export const getOrder = ({ orderId}) => (dispatch) =>{

  API.post('api', '/getOrder',{
    body: {
       orderId
    }
  }).then((response) => {
    const order = response.order
    const { order_date, order_id, total_price, user_id} = order[0]

    dispatch({ type: CREATE_ORDER_SUCCESS, date: order_date, userId: user_id, total: total_price, orderId: orderId});

  })
  .catch((error) => {
    // Dispatch a failure action with the error message

    dispatch({ type: CREATE_ORDER_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });

  });
}



// Define the action creator for creating an order
export const createOrder = ({ date, userId, total}) => (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });

  return new Promise((resolve, reject) => {
    API.post('api', '/createOrder', {
      body: {
        date,
        userId,
        total
      },
    })
      .then((response) => {
        const orderid = response.results.insertId;

        // Dispatch a success action indicating that the order was created
        dispatch({ type: CREATE_ORDER_SUCCESS, date, userId, total, orderid});

        resolve(orderid);
      })
      .catch((error) => {
        // Dispatch a failure action with the error message
        dispatch({ type: CREATE_ORDER_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });

        reject(error); // Reject the promise with the error
      });
  });
};



export const updatePaymentInfo = ({userId, billingInfo, paymentInfo}) => dispatch => {
    dispatch({ type: UPDATE_PAYMENT_INFO_REQUEST });

    console.log(billingInfo)
    console.log(paymentInfo)
    console.log(userId)

    if (!userId) {
    // If userId is not provided (for guest users), simply dispatch the success action with the billingInfo and paymentInfo
    dispatch({ type: UPDATE_PAYMENT_INFO_SUCCESS, billingInfo, paymentInfo });
    }

    // Make an API request to update the user's payment information using AWS Amplify
    API.post('api', '/updatePayment', {
    body: {
        userId,
        billingInfo,
        paymentInfo,
    },
    })
    .then(response => {
        console.log(response);

        // Dispatch a success action indicating that the payment information was updated
        dispatch({ type: UPDATE_PAYMENT_INFO_SUCCESS, billingInfo, paymentInfo });

    })
    .catch(error => {
        // Dispatch a failure action with the error message
        dispatch({ type: UPDATE_PAYMENT_INFO_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
    });
};


export const updateShippingInfo = ({userId, shippingInfo, phoneNumber}) => dispatch => {
    dispatch({ type: UPDATE_SHIPPING_INFO_REQUEST });
  
    if (!userId) {
      // If userId is not provided (for guest users), simply dispatch the success action with the shippingInfo
      dispatch({ type: UPDATE_SHIPPING_INFO_SUCCESS, shippingInfo });
      return Promise.resolve(); // Resolve the promise to indicate success
    }
  
    // Make an API request to update the user's shipping information using AWS Amplify
    API.post('api', '/updateShipping', {
      body: {
        userId,
        shippingInfo,
        phoneNumber
      },
    })
      .then(response => {
        console.log(response);
  
        // Dispatch a success action indicating that the shipping information was updated
        dispatch({ type: UPDATE_SHIPPING_INFO_SUCCESS, shippingInfo });
  
      })
      .catch(error => {
        // Dispatch a failure action with the error message
        dispatch({ type: UPDATE_SHIPPING_INFO_FAILURE, error: "An Error occured with the API, check AWS to resolve."  });
      });
  };
  