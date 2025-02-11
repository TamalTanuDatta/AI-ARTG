import { Reporter, FullConfig, Suite, TestCase, TestResult, TestStep } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface TestResultWithSteps extends TestResult {
  steps: TestStep[];
}

interface EnhancedTestResult {
  name: string;
  status: string;
  duration: number;
  group: string;
  error?: string;
  steps?: TestStep[];
  assertions?: number;
}

class CustomHTMLReporter implements Reporter {
  private reportPath: string = '';
  private testResults: EnhancedTestResult[] = [];
  private testGroups: Map<string, EnhancedTestResult[]> = new Map();
  private startTime: number = Date.now();

  async onBegin(config: FullConfig) {
    this.startTime = Date.now();
    this.reportPath = path.join(process.cwd(), 'test-results/custom-report');
    if (!fs.existsSync(this.reportPath)) {
      fs.mkdirSync(this.reportPath, { recursive: true });
    }
  }

  async onTestEnd(test: TestCase, result: TestResultWithSteps) {
    const testPath = test.title.split(' › ');
    const mainTestGroup = testPath[0].includes('Homepage') ? 'Homepage Test' : 'Registration Page Test';
    const assertions = this.countAssertions(result.steps || []);

    const testResult: EnhancedTestResult = {
      name: test.title,
      status: result.status,
      duration: result.duration,
      group: mainTestGroup,
      error: result.error?.message,
      steps: result.steps,
      assertions
    };

    if (!this.testGroups.has(testResult.group)) {
      this.testGroups.set(testResult.group, []);
    }
    this.testGroups.get(testResult.group)?.push(testResult);
    this.testResults.push(testResult);
  }

  private countAssertions(steps: TestStep[]): number {
    let count = 0;
    for (const step of steps) {
      if (step.category === 'expect') count++;
      if (step.steps) count += this.countAssertions(step.steps);
    }
    return count;
  }

  private generateTestGroupHTML(group: string, tests: EnhancedTestResult[]): string {
    const passedTests = tests.filter(t => t.status === 'passed').length;
    const failedTests = tests.filter(t => t.status === 'failed').length;
    const totalDuration = tests.reduce((acc, curr) => acc + curr.duration, 0);

    // Group tests by their subgroup (e.g., "Link Tests", "Form Elements Tests")
    const subGroups = new Map<string, EnhancedTestResult[]>();
    tests.forEach(test => {
      const subGroup = test.name.split(' › ')[2] || 'Other Tests';
      if (!subGroups.has(subGroup)) {
        subGroups.set(subGroup, []);
      }
      subGroups.get(subGroup)?.push(test);
    });

    return `
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4 bg-gray-800 p-6 rounded-lg cursor-pointer group-header" onclick="toggleGroup('${group.replace(/'/g, "\\'")}')">
          <div>
            <h2 class="text-3xl font-bold text-white mb-2">${group}</h2>
            <div class="flex space-x-6 text-gray-400">
              <p>Total Duration: ${(totalDuration / 1000).toFixed(2)}s</p>
              <p>Total Tests: ${tests.length}</p>
            </div>
          </div>
          <div class="flex items-center space-x-8">
            <div class="flex flex-col items-end">
              <span class="text-xl text-green-400 font-semibold">${passedTests} passed</span>
              <span class="text-xl text-red-400 font-semibold">${failedTests} failed</span>
            </div>
            <span class="transform transition-transform duration-200 text-3xl" id="arrow-${group.replace(/[^a-zA-Z0-9]/g, '-')}">▼</span>
          </div>
        </div>
        <div class="space-y-6 group-content" id="group-${group.replace(/[^a-zA-Z0-9]/g, '-')}">
          ${Array.from(subGroups.entries()).map(([subGroup, subTests]) => `
            <div class="bg-gray-900 rounded-lg p-4">
              <h3 class="text-xl font-semibold text-white mb-4">${subGroup}</h3>
              <div class="grid grid-cols-1 gap-4">
                ${subTests.map(test => `
                  <div class="test-card bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-200">
                    <div class="flex justify-between items-start mb-4">
                      <h4 class="text-lg font-medium text-white test-name">${test.name.split(' › ').pop()}</h4>
                      <span class="px-3 py-1 rounded-full text-sm font-medium ${
                        test.status === 'passed' ? 'bg-green-500/20 text-green-400' :
                        test.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }">${test.status}</span>
                    </div>
                    <div class="flex space-x-6 text-sm text-gray-400">
                      <p>Duration: ${(test.duration / 1000).toFixed(2)}s</p>
                      <p>Assertions: ${test.assertions}</p>
                    </div>
                    ${test.error ? `
                      <div class="mt-4 p-4 bg-red-500/10 rounded-lg">
                        <pre class="text-red-400 text-sm overflow-x-auto">${test.error}</pre>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  async onEnd() {
    const totalDuration = Date.now() - this.startTime;
    const stats = {
      total: this.testResults.length,
      passed: this.testResults.filter(t => t.status === 'passed').length,
      failed: this.testResults.filter(t => t.status === 'failed').length,
      duration: totalDuration
    };

    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Playwright Test Report</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { background-color: #111827; }
            .stats-card { background-color: #1F2937; }
            .test-card:hover { transform: translateY(-2px); }
        </style>
    </head>
    <body class="min-h-screen p-8">
        <div class="max-w-7xl mx-auto">
            <h1 class="text-4xl font-bold text-white mb-8">Playwright Test Report</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div class="stats-card rounded-lg p-6 text-white">
                    <h3 class="text-xl font-semibold mb-2">Total Tests</h3>
                    <p class="text-3xl font-bold">${stats.total}</p>
                </div>
                <div class="stats-card rounded-lg p-6 text-white">
                    <h3 class="text-xl font-semibold mb-2">Passed Tests</h3>
                    <p class="text-3xl font-bold text-green-400">${stats.passed}</p>
                </div>
                <div class="stats-card rounded-lg p-6 text-white">
                    <h3 class="text-xl font-semibold mb-2">Failed Tests</h3>
                    <p class="text-3xl font-bold text-red-400">${stats.failed}</p>
                </div>
                <div class="stats-card rounded-lg p-6 text-white">
                    <h3 class="text-xl font-semibold mb-2">Total Duration</h3>
                    <p class="text-3xl font-bold">${(stats.duration / 1000).toFixed(2)}s</p>
                </div>
            </div>

            <div class="bg-gray-900 rounded-lg shadow-xl p-6">
                <div class="mb-6">
                    <input type="text" 
                           id="searchInput" 
                           placeholder="Search tests..." 
                           class="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div id="testResults" class="space-y-8">
                    ${Array.from(this.testGroups.entries())
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([group, tests]) => this.generateTestGroupHTML(group, tests))
                      .join('')}
                </div>
            </div>
        </div>

        <script>
            const searchInput = document.getElementById('searchInput');
            const testResults = document.getElementById('testResults');

            function toggleGroup(groupId) {
                const content = document.getElementById('group-' + groupId.replace(/[^a-zA-Z0-9]/g, '-'));
                const arrow = document.getElementById('arrow-' + groupId.replace(/[^a-zA-Z0-9]/g, '-'));
                if (content.style.display === 'none') {
                    content.style.display = 'grid';
                    arrow.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'none';
                    arrow.style.transform = 'rotate(-90deg)';
                }
            }

            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                document.querySelectorAll('.test-card').forEach(card => {
                    const testName = card.querySelector('.test-name').textContent.toLowerCase();
                    const isVisible = testName.includes(searchTerm);
                    let current = card;
                    
                    // Show/hide the test card
                    card.style.display = isVisible ? 'block' : 'none';
                    
                    // Walk up the DOM tree to show/hide parent containers
                    while (current && !current.matches('.mb-8')) {
                        if (current.matches('.bg-gray-900')) {
                            // Handle subgroup visibility
                            const hasVisibleTests = Array.from(current.querySelectorAll('.test-card'))
                                .some(c => c.style.display !== 'none');
                            current.style.display = hasVisibleTests ? 'block' : 'none';
                        }
                        current = current.parentElement;
                    }
                    
                    // Handle main group visibility
                    if (current && current.matches('.mb-8')) {
                        const hasVisibleSubgroups = Array.from(current.querySelectorAll('.bg-gray-900'))
                            .some(g => g.style.display !== 'none');
                        current.style.display = hasVisibleSubgroups ? 'block' : 'none';
                        if (hasVisibleSubgroups) {
                            current.querySelector('.group-content').style.display = 'block';
                            current.querySelector('[id^="arrow-"]').style.transform = 'rotate(0deg)';
                        }
                    }
                });
            });

            // Initially collapse all groups
            document.querySelectorAll('.group-content').forEach(content => {
                content.style.display = 'none';
            });
            document.querySelectorAll('[id^="arrow-"]').forEach(arrow => {
                arrow.style.transform = 'rotate(-90deg)';
            });
        </script>
    </body>
    </html>`;

    fs.writeFileSync(path.join(this.reportPath, 'index.html'), htmlContent);
  }
}

export default CustomHTMLReporter;
