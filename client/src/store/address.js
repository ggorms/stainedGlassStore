import axios from "axios";
import { BASE_URL } from "./BASE_URL";

const ALL_ADDRESSES = "ALL_ADDRESSES";
const NEW_ADDRESS = "NEW_ADDRESS";
const UPDATE_ADDRESS = "UPDATE_ADDRESS";
const DELETE_ADDRESS = "DELETE_ADDRESS";

const allAddresses = (addresses) => ({
  type: ALL_ADDRESSES,
  payload: addresses,
});

const newAddress = (address) => ({
  type: NEW_ADDRESS,
  payload: address,
});

const updateAddress = (address) => ({
  type: UPDATE_ADDRESS,
  payload: address,
});

const deleteAddress = (address) => ({
  type: DELETE_ADDRESS,
  payload: address,
});

export const allAddressesThunk = (id) => async (dispatch) => {
  try {
    const { data: addresses } = await axios.get(
      `${BASE_URL}/api/address/${id}`
    );
    return dispatch(allAddresses(addresses));
  } catch (error) {
    console.error(error);
  }
};

export const newAddressThunk = (addressInfo) => async (dispatch) => {
  try {
    const { userId, unit, street, city, state, zip, country } = addressInfo;
    const { data: address } = await axios.post(`${BASE_URL}/api/address/new`, {
      userId,
      unit,
      street,
      city,
      state,
      zip,
      country,
    });
    return dispatch(newAddress(address));
  } catch (error) {
    console.error(error);
  }
};

export const updateAddressThunk = (addressInfo) => async (dispatch) => {
  try {
    const { id, unit, street, city, state, zip, country } = addressInfo;
    const { data: address } = await axios.put(
      `${BASE_URL}/api/address/update/${id}`,
      {
        unit,
        street,
        city,
        state,
        zip,
        country,
      }
    );
    return dispatch(updateAddress(address));
  } catch (error) {
    console.error(error);
  }
};

export const deleteAddressThunk = (id) => async (dispatch) => {
  try {
    const { data: address } = await axios.delete(
      `${BASE_URL}/api/address/delete/${id}`
    );
    return dispatch(deleteAddress(address));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  allAddresses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ALL_ADDRESSES:
      return { ...state, allAddresses: action.payload };
    case NEW_ADDRESS:
      return { ...state, allAddresses: action.payload };
    case UPDATE_ADDRESS:
      return { ...state, allAddresses: action.payload };
    case DELETE_ADDRESS:
      return { ...state, allAddresses: action.payload };
    default:
      return state;
  }
}
