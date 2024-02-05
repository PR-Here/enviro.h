import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HEADERS, REGENERATE_ACCESS_TOKEN } from '../services/ApiEndPoint';
import { useNavigation } from '@react-navigation/native';
import { setAccessToken } from '../redux/slices/TokenSlice';

const useApiEffect = () => {
  const dispatch = useDispatch();
  var accessToken = useSelector((state) => state?.authToken?.accessToken);
  const refreshToken = useSelector((state) => state?.authToken?.refreshToken);
  const dbCall = useSelector((state) => state?.authToken?.dbCall);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  let headers = null


  // API CALL
  async function apiCall(url, method, isToken, data = {}, maxRetries = 3, isImageUpload, refreshAccessToken = null) {

    if (isImageUpload) {
      headers = {
        Authorization: `${refreshAccessToken == null ? accessToken : refreshAccessToken}`,
        "Accept": "*/*",
      };
    } else {
      headers = {
        Authorization: isToken ? `${refreshAccessToken == null ? accessToken : refreshAccessToken}` : `JWT ${data.token}`,
        'Content-Type': 'application/json',
        "dbtoken": "agl"
      }
    }
    const body = method != 'GET' && isImageUpload ? data : method == 'GET' ? null : JSON.stringify(data)
    console.log("API PARAMS: ", { Url: url, Method: method, isToken: isToken, Data: body, Condition: headers });
    var res = null
    var response = null
    try {
      response = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });

      // WORKED IF ACCESS TOKEN EXPIRED
      res = await response?.json()
      //console.log("res -->", response?.status, res)
      setLoading(false)
      return res;
    } catch (error) {
      //console.log("API ERROR: ",response?.status, error?.message)
      if (response?.status === 401 && res?.error?.statusCode != 401 && maxRetries > 0) {
        //Handle token expiration here, possibly by refreshing the token
        try {
          // Dispatch the new token to Redu
          // Retry the original request with the new access token
          var refBody = JSON.stringify({ jwtRefreshToken: refreshToken })
          var refHeader = { Host: '13.127.230.193:3000', 'Content-Type': 'application/json', dbtoken: dbCall }
          //console.log('refHeader => ', refHeader)
          //console.log('refBody => ', refBody)
          const retryResponse = await fetch(REGENERATE_ACCESS_TOKEN, {
            method: 'POST',
            headers: refHeader,
            body: refBody
          });
          const apiData = await retryResponse.json();
          //console.log('jwtRefreshToken apiData =>', JSON.stringify(apiData));
          if (apiData?.data) {
            dispatch(setAccessToken(`JWT ${apiData?.data}`))
            // IF ACCESS TOKEN GENERATE SUCCESSFULLY MAKE API CALL AGAIN WITH MAX RETRIES 3 TIMES
            return apiCall(url, method, isToken, data, maxRetries - 1, isImageUpload, `JWT ${apiData?.data}`);
          } else {
            setLoading(false)
            ///Navigate to Login
            return res
          }
        } catch (refreshError) {
          console.log("Refresh Token Error: ", refreshError);
        }
      }
      {/** Some Changes for "Forbidden!!" process */ }
      // else if (response?.status === 403) {
      //   return {
      //     error: { statusCode: response?.status, message: error?.message },
      //     status: false
      //   };
      // }

      return {
        error: { statusCode: response?.status, message: error?.message },
        status: false
      };


    }
  }

  async function uploadImageWithData(url, formData) {
    try {
      const response = await apiCall(url, 'POST', false, formData, 1, true);
      //console.log("API Response: ", response);
      return response;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  const makeApiRequest = async ({ url: url, method: method = 'GET', isToken: isToken = false, data: data = {}, showProgress: showProgress = true, isImageUpload: isImageUpload = false }) => {
    showProgress && setLoading(true);
    try {
      if (isImageUpload) {
        const response = await uploadImageWithData(url, data);
        return await response;
      } else {
        const response = await apiCall(url, method, isToken, data);
        return await response;
      }
    } catch (error) {
      console.log(error);
    } finally {
      showProgress && setLoading(false);
    }
  };
  return { makeApiRequest, loading };
};

export default useApiEffect;