import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 4 Scrollbars', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-scrollbars').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Scrollbars');

    const targetButton = page.getByTestId('scroll-target');
    await targetButton.scrollIntoViewIfNeeded();
    await expect(targetButton).toBeVisible();
    await targetButton.click();
    await expect(page.getByTestId('result')).toHaveText( '✓ Target reached and clicked.' );
});