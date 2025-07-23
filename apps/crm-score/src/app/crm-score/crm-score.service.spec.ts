import { CrmApiService } from '../api/crm-api.service';
import { CrmScoreService } from './crm-score.service';

export type Functions<T> = Partial<{
  [K in keyof T]: T[K];
}>;

export const mockCrmApiService: Functions<CrmApiService> = {
  async getData<T>(): Promise<T> {
    return {} as T;
  },
};

describe('CrmScoreService', () => {
  let crmService: CrmScoreService;

  beforeAll(() => {
    crmService = new CrmScoreService(mockCrmApiService as CrmApiService);
  });

  beforeEach(() => {
    jest.clearAllMocks().restoreAllMocks();
  });

  it('should be defined', () => {
    expect(crmService).toBeTruthy();
  });
});

// npx nx test crm-score --testPathPattern="src/app/crm-score/crm-score.service.spec.ts"
