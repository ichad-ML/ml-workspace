import { Injectable } from "@nestjs/common";
import { CrmApiService } from '../api/crm-api.service';

@Injectable()
export class CrmScoreService {
  constructor(private readonly crmApiService: CrmApiService) {}

  async getData() {
    return this.crmApiService.getData();
  }
}