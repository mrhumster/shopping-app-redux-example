import {uiActions} from "./ui-slice";
import {cartActions} from "./cart-slice";

export const fetchData = () => {
    return async(dispatch) => {
        const fetchHandler = async () => {
            const res = await fetch('https://redux-http-ba15f-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json')
            const data = await res.json()
            return data
        }
        try {
            const cartData = await fetchHandler()
            dispatch(cartActions.replaceData(cartData))
        } catch (error) {
            dispatch(uiActions.showNotification({
                type: 'error',
                message: 'Sending request failed',
                open: true
            }))
        }
    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
                type: 'warning',
                message: 'Sending request',
                open: true
            })
        );
        const sendRequest = async () => {
            const res = await fetch('https://redux-http-ba15f-default-rtdb.asia-southeast1.firebasedatabase.app/cartItems.json', {
                method: 'PUT',
                body: JSON.stringify(cart)
            })
            await res.json();
            dispatch(uiActions.showNotification({
                type: 'success',
                message: 'Send request to database successfully',
                open: true
                })
            );
        };
        try {
            await sendRequest();
        } catch (error) {
            dispatch(uiActions.showNotification({
                type: 'error',
                message: 'Sending request failed',
                open: true
            }))
        }
    }
}