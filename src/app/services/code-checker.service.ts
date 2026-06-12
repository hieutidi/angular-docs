import { Injectable } from '@angular/core';
import { CodeCheck } from '../models/content.model';

export interface CheckResult {
  check: CodeCheck;
  passed: boolean;
}

@Injectable({ providedIn: 'root' })
export class CodeCheckerService {
  runChecks(code: string, checks: CodeCheck[]): CheckResult[] {
    return checks.map((check) => ({
      check,
      passed: this.matches(code, check),
    }));
  }

  allPassed(results: CheckResult[]): boolean {
    return results.length > 0 && results.every((r) => r.passed);
  }

  private matches(code: string, check: CodeCheck): boolean {
    try {
      const regex = new RegExp(check.pattern, check.flags ?? 'i');
      return regex.test(code);
    } catch {
      return false;
    }
  }
}
