import { mockOtpApiService, mockOtpConfig } from '../common/utils/mocks';
import { SmsOtpService } from './sms-otp.service';
import { OtpApiService } from '@ml-workspace/api-lib';

describe('SmsOtpService', () => {
  let smsOtpService: SmsOtpService;

  beforeAll(() => {
    smsOtpService = new SmsOtpService(
      mockOtpConfig,
      mockOtpApiService as OtpApiService
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
