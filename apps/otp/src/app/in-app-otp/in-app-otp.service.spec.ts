import { OtpApiService } from '@ml-workspace/api-lib';
import { mockOtpApiService, mockOtpConfig } from '../common/utils/mocks';
import { InAppOtpService } from './in-app-otp.service';

describe('InAppOtpService', () => {
  let inAppOtpService: InAppOtpService;

  beforeAll(() => {
    inAppOtpService = new InAppOtpService(
      mockOtpConfig,
      mockOtpApiService as OtpApiService
    );
  });

  beforeEach(() => {
    jest.clearAllMocks().restoreAllMocks();
  });

  it('should be defined', () => {
    expect(inAppOtpService).toBeTruthy();
  });
});

// npx nx test otp --testPathPattern="src/app/sms-otp/sms-otp.service.spec.ts"
