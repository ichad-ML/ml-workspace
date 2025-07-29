import { OtpApiService } from "@ml-workspace/api-lib";
import { mockFirebaseService, mockLoggerService, mockOtpApiService, mockOtpConfig } from "../common/utils/mocks";
import { OtpService } from "./otp.service";
import { FirebaseService } from "../common/firebase/firebase.service";
import { CollectionType, CustomLoggerService,createInAppSignature, OtpRequestDto, SmsOtpResponseDto, isSmsOTP, } from "@ml-workspace/common";
import { BadRequestException } from "@nestjs/common";

jest.mock('@ml-workspace/common', () => ({
  ...jest.requireActual('@ml-workspace/common'),
  createInAppSignature: jest.fn(),
}));

jest.mock('../common/utils/otplib', () => ({
  ...jest.requireActual('../common/utils/otplib'),
  verifyOTP: jest.fn(),
}));

describe('OTPService', () => {
    let otpService: OtpService;
  
    beforeAll(() => {
      otpService = new OtpService(
        mockOtpConfig,
        mockOtpApiService as OtpApiService,
        mockFirebaseService as FirebaseService,
        mockLoggerService as CustomLoggerService
      );
    });
  
    beforeEach(() => {
      jest.clearAllMocks().restoreAllMocks();
    });
  
    it('should be defined', () => {
      expect(otpService).toBeDefined();
    });

    describe('requestOtp', () => {
        const otpRequestDto = {
        mobileNumber: '09925235991',
        deviceId: '72dd435951c44e63',
        serviceType: 'ELOAD',
        signature:
            'mock-signature',
        timeLimit: 120,
        otpType: 'sms-otp',
        } as unknown as OtpRequestDto;

        beforeEach(async () => {
            const token = 'token-12345';
            jest
              .spyOn(otpService, 'generateToken')
              .mockResolvedValue({ token });
            (createInAppSignature as jest.Mock).mockReturnValue(
              'expected-signature'
            );
        })

        it('should request OTP successfully', async () => {
    
            const response = { status: 200 } as unknown as SmsOtpResponseDto;
        
            (createInAppSignature as jest.Mock).mockReturnValue('mock-signature');
            
            jest.spyOn(mockOtpApiService, 'validateDevice').mockResolvedValue(200);
            jest
              .spyOn(mockOtpApiService, 'sendSmsOTP')
              .mockResolvedValue(response);

            jest.spyOn(mockFirebaseService, 'createDocument').mockResolvedValue({
            id: 'mock-id',
            } as any);
        
            const result = await otpService.requestOtp(otpRequestDto, CollectionType.SMS_OTP);
            const smsStatus = isSmsOTP(otpRequestDto.otpType) ? response.status : undefined
        
            expect(result).toMatchObject({
              smsStatus,
              otp: expect.any(String),
              id: 'mock-id',
              code: expect.any(Number),
              name: expect.any(String),
              message: 'OTP successfully generated.',
            });
        });

        it('should throw an error if signature does not match', async () => {
            (createInAppSignature as jest.Mock).mockReturnValue('expected-signature');

            await expect(
            otpService.requestOtp(otpRequestDto, CollectionType.IN_APP_OTP)
            ).rejects.toThrow(BadRequestException);
        })

        it('should throw if device validation fails', async () => {
          const otpRequestDtoV2 = {
            mobileNumber: '09925235991',
            deviceId: 'invalid-device',
            serviceType: 'ELOAD',
            signature: 'mock-signature',
            timeLimit: 120,
            otpType: 'in-app-otp',
          } as unknown as OtpRequestDto;

          jest
            .spyOn(mockOtpApiService, 'validateDevice')
            .mockRejectedValue(new Error('Device not registered'));

          await expect(
            otpService.requestOtp(otpRequestDtoV2, CollectionType.IN_APP_OTP)
          ).rejects.toThrow('Device not registered');
        });

        it('should throw if token generation fails', async () => {

          jest
            .spyOn(mockOtpApiService, 'validateDevice')
            .mockResolvedValue(200);

          jest
            .spyOn(otpService, 'generateToken')
            .mockRejectedValue(new Error('Token generation failed'));

          await expect(
            otpService.requestOtp(otpRequestDto, CollectionType.IN_APP_OTP)
          ).rejects.toThrow('Token generation failed');
        });
    }); 

    describe('verifyOtp', () => {
      it('should verify OTP successfully', async () => {
        // success case
      });

      it('should throw BadRequest if OTP was already used', async () => {
        // otpUsed = true
      });

      it('should throw BadRequest if OTP is expired', async () => {
        // verifyOTP -> isExpired = true
      });

      it('should throw BadRequest if OTP is invalid', async () => {
        // verifyOTP -> isValid = false
      });

      it('should throw BadRequest if OTP is both invalid and expired', async () => {
        // verifyOTP -> isValid = false, isExpired = true
      });

      // optional edge cases
      it('should handle missing document fields gracefully', async () => {
        // missing secretKey or iv
      });
    });
})

// npx nx test otp --testPathPattern="src/app/otp/otp.service.spec.ts"