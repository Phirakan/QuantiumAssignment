import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 9 Shadow DOM', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-shadow-dom').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({ timeout: 60000 });
    await expect(page.getByTestId('topic-title')).toHaveText('Shadow DOM');

    const shadowHost = page.getByTestId('shadow-host');
    const shadowInput = shadowHost.getByTestId('shadow-input');
    const shadowSubmit = shadowHost.getByTestId('shadow-submit');
    const value = 'Test Shadow DOM Input';

    await shadowInput.fill(value);
    await shadowSubmit.click();
    await expect(shadowHost.getByTestId('shadow-result')).toContainText(`Submitted: ${value}`);

    const outerEcho = page.getByTestId('outer-echo');

    await expect(outerEcho).toContainText( `Outer page received: ${value}`);
});

