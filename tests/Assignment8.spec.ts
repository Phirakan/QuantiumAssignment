import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 8 Overlapped Element', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-overlapped-element').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000 });
    await expect(page.getByTestId('topic-title')).toHaveText('Overlapped Element');

    const emailInput = page.getByTestId('overlapped-input');
    const result = page.getByTestId('result');
    const email = 'test@example.com';

    await page.getByTestId('overlapped-container')
    .evaluate((scroll) => scroll.scrollTo({ top: scroll.scrollHeight }));
    await emailInput.click();
    await expect(emailInput).toBeFocused();
    await emailInput.pressSequentially(email, { delay: 300 });
    await expect(result).toBeVisible();
    await expect(result).toContainText(`Email captured: ${email}`);
});

