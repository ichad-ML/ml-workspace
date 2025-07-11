const BASE_IN_APP = '/InAppOTP';
export const OTP = {
  IN_APP_GET_DETAILS: `${BASE_IN_APP}/GetDetails`,
  IN_APP_VALIDATE: `${BASE_IN_APP}/ValidateOTP`,

  SMS_GET_SMS: '/SMS/GetSMS',
  SMS_VALIDATE: '/SMS/ValidateOTP',
};

export const AUTHSERVICE = {
  GENERATE_TOKEN: '/api/v1/external-user',
};

export const URLS = {
  VALIDATE_DEVICE: '/api/money-accounts/validate-device',
};