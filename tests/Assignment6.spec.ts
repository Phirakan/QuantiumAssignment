import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 6 Progress Bar: Stop the progress bar at exactly 75%', async ({ authedPage }) => {
    const page = authedPage;

    await page.getByTestId('topic-card-progress-bar').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({ timeout: 60000 });
    await expect(page.getByTestId('topic-title')).toHaveText('Progress Bar');

    const progressBar = page.getByTestId('progress-bar');
    const result = page.getByTestId('result');

    await page.getByTestId('start').click();
    await progressBar.evaluate((bar, stopTestId) => {
        return new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('progress bar did not reach 75% in time')), 30000);

            const tryStop = () => {
                const value = bar.getAttribute('aria-valuenow');
                if (value === '75') {
                    clearTimeout(timeout);
                    observer.disconnect();
                    const stopBtn = document.querySelector(`[data-testid="${stopTestId}"]`) as HTMLElement;
                    stopBtn.click();
                    resolve();
                }
            };
            const observer = new MutationObserver(tryStop);
            observer.observe(bar, { attributes: true, attributeFilter: ['aria-valuenow'] });
            tryStop(); 
        });
    }, 'stop');

    await expect(result).toHaveText('✓ Stopped at exactly 75%.');
    await expect(progressBar).toHaveAttribute('aria-valuenow', '75');
});

test('Assignment 6 Progress Bar: Stop the progress bar at < 75%', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-progress-bar').click();

    await expect(page.getByTestId('page-loader')).toBeHidden({
        timeout: 60000
    });

    await expect(page.getByTestId('topic-title')).toHaveText('Progress Bar');

    const progressBar = page.getByTestId('progress-bar');
    const stopButton = page.getByTestId('stop');
    const result = page.getByTestId('result');
    const initialValue = Number(await progressBar.getAttribute('aria-valuenow'));
    await page.getByTestId('start').click();
    await expect.poll(async () => { const value = Number(
    await progressBar.getAttribute('aria-valuenow'));
    return value;}, { timeout: 30000,intervals: [10,20,50]}).toBeGreaterThan(initialValue);
    const currentValue = Number(await progressBar.getAttribute('aria-valuenow'));
    expect(currentValue).toBeLessThan(75);
    await stopButton.click();
    await expect(result).toBeVisible({timeout: 10000});
    await expect(result).toContainText('Target: 75%.');
    const stoppedValue = Number(
    await progressBar.getAttribute('aria-valuenow'));
    expect(stoppedValue).toBeGreaterThan(initialValue);
    expect(stoppedValue).toBeLessThan(75);
});


test('Assignment 6 Progress Bar: Stop the progress bar at > 75% ', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-progress-bar').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Progress Bar');

    const progressBar = page.getByTestId('progress-bar'); 
    const stopButton = page.getByTestId('stop'); 
    const result = page.getByTestId('result');

    await page.getByTestId('start').click();
    await expect .poll( async () => { const value = await progressBar.getAttribute('aria-valuenow'); 
    return Number(value); },{timeout: 30000, intervals: [1000]} ).toBeGreaterThan(75);
    await stopButton.click();
    await expect(result).toContainText('Target: 75%.');
    const stoppedValue = Number( await progressBar.getAttribute('aria-valuenow') );
    expect(stoppedValue).toBeGreaterThan(75);
});


