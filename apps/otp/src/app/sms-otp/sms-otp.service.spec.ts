import { FirebaseService } from '../common/firebase/firebase.service';
import {
  mockFirebaseService,
  mockOtpApiService,
  mockOtpConfig,
} from '../common/utils/mocks';
import { SmsOtpService } from './sms-otp.service';
import { OtpApiService } from '@ml-workspace/api-lib';

describe('SmsOtpService', () => {
  let smsOtpService: SmsOtpService;

  beforeAll(() => {
    smsOtpService = new SmsOtpService(
      mockOtpConfig,
      mockOtpApiService as OtpApiService,
      mockFirebaseService as FirebaseService
    );
  });

  beforeEach(() => {
    jest.clearAllMocks().restoreAllMocks();
  });

  it('should be defined', () => {
    expect(smsOtpService).toBeTruthy();
  });
});

// npx nx test otp --testPathPattern="src/app/sms-otp/sms-otp.service.spec.ts"
