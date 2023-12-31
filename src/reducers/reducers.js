// reducers.js
import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import your authReducer
import faqReducer from './faqReducer'; // Import your faqReducer
import orderReducer from './orderReducer'; // Import your orderReducer
import productReducer from './productReducer'; // Import your productReducer
import reviewReducer from './reviewReducer'; // Import your reviewReducer
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  faq: faqReducer, // Include faqReducer
  orders: orderReducer, // Include orderReducer
  products: productReducer, // Include productReducer
  reviews: reviewReducer, // Include reviewReducer
});

export default rootReducer;
