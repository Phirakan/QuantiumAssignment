import { test, expect } from '../fixture/Auth.fixture';

test.setTimeout(60000);

test('Assignment 3: AJAX Data', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-ajax-data').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('AJAX Data');
    const responsePromise = page.waitForResponse( response => response.url().includes('httpbin.org/delay/3') && response.status() === 200 );
    await page.getByTestId('fetch').click();
    const response = await responsePromise;
    const responseBody = await response.json();
    const data = JSON.parse(responseBody.data);
    const returnedCount = data.records.length;
    const ajaxData = page.getByTestId('ajax-data');
    await expect(ajaxData).toBeVisible();
    await expect(ajaxData).toContainText('200 OK');
    const displayedCount = Number( await ajaxData.getAttribute('data-count') );
    expect(displayedCount).toBe(returnedCount);
});

