import { Reporter, FullConfig, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

class CustomHTMLReporter implements Reporter {
  private reportPath: string = '';
  private testResults: Array<{name: string; status: string; duration: number}> = [];

  async onBegin(config: FullConfig) {
    this.reportPath = path.join(process.cwd(), 'test-results/custom-report');
    if (!fs.existsSync(this.reportPath)) {
      fs.mkdirSync(this.reportPath, { recursive: true });
    }
  }

  async onTestEnd(test: TestCase, result: TestResult) {
    this.testResults.push({
      name: test.title,
      status: result.status,
      duration: result.duration
    });
  }

  async onEnd() {
    const stats = {
      total: this.testResults.length,
      passed: this.testResults.filter(r => r.status === 'passed').length,
      failed: this.testResults.filter(r => r.status === 'failed').length
    };

    const testCards = this.testResults.map(test => `
      <div class="test-card bg-white rounded-lg p-6 shadow-md hover:shadow-lg animate-fade-in">
        <div class="flex items-center justify-between mb-4">
          <h3 class="test-name text-lg font-semibold text-gray-800">${test.name}</h3>
          <span class="px-3 py-1 rounded-full text-white text-sm font-medium ${
            test.status === 'passed' ? 'bg-green-500' : 'bg-red-500'
          }">${test.status}</span>
        </div>
        <p class="text-gray-600">Duration: ${(test.duration / 1000).toFixed(2)}s</p>
      </div>
    `).join('');

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Playwright Test Report</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            .test-card {
                transition: all 0.2s ease-in-out;
            }
            .test-card:hover {
                transform: translateY(-2px);
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-in;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .custom-shadow {
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            .stats-card {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
        </style>
    </head>
    <body class="bg-gray-100 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <header class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-800 mb-4">Playwright Test Results</h1>
                <p class="text-gray-600">Generated on ${new Date().toLocaleString()}</p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="stats-card rounded-lg p-6 text-white custom-shadow">
                    <h3 class="text-xl font-semibold mb-2">Total Tests</h3>
                    <p class="text-3xl font-bold">${stats.total}</p>
                </div>
                <div class="stats-card rounded-lg p-6 text-white custom-shadow">
                    <h3 class="text-xl font-semibold mb-2">Passed Tests</h3>
                    <p class="text-3xl font-bold">${stats.passed}</p>
                </div>
                <div class="stats-card rounded-lg p-6 text-white custom-shadow">
                    <h3 class="text-xl font-semibold mb-2">Failed Tests</h3>
                    <p class="text-3xl font-bold">${stats.failed}</p>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="mb-6">
                    <input type="text" 
                           id="searchInput" 
                           placeholder="Search tests..." 
                           class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div id="testResults" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${testCards}
                </div>
            </div>
        </div>

        <script>
            const searchInput = document.getElementById('searchInput');
            const testResults = document.getElementById('testResults');

            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const testCards = document.querySelectorAll('.test-card');
                
                testCards.forEach(card => {
                    const testName = card.querySelector('.test-name').textContent.toLowerCase();
                    card.style.display = testName.includes(searchTerm) ? 'block' : 'none';
                });
            });
        </script>
    </body>
    </html>`;

    fs.writeFileSync(path.join(this.reportPath, 'index.html'), htmlContent);
  }
}

export default CustomHTMLReporter;
