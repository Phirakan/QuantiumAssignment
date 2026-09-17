import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 5 Dynamic Table', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-dynamic-table').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Dynamic Table');
    const chromeCpuLabel = page.getByTestId('chrome-cpu-label');
    const chromeCpuText = await chromeCpuLabel.textContent();
    const chromeCpu = chromeCpuText?.match(/\d+(\.\d+)?%/)?.[0];
    expect(chromeCpu).toBeTruthy();
    const chromeRow = page.getByTestId('row-chrome');
    const chromeCpuCell = chromeRow.locator('[data-col="cpu"]');
    await expect(chromeCpuCell).toHaveText(chromeCpu!);

});

