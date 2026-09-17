import { test, expect } from '../fixture/Auth.fixture';

test.setTimeout(60000);

test('Assignment 2 Client-side Delay: Run heavy computation', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-client-side-delay').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Client Side Delay');
    await page.getByTestId('start').click();
    const result = page.getByTestId('result');
    await expect(result).toBeVisible({timeout: 10000});
    await expect(result).toHaveText('Computation complete · 42 ops finished');

});

