import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 7A Visibility - Hide A (display)', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-visibility').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Visibility');

    const target = page.getByTestId('target');
    const resetButton = page.getByTestId('visibility-reset');

    await expect(target).toBeVisible();
    await page.getByTestId('hide-display').click();
    await expect(target).not.toBeVisible();
    await resetButton.click();
    await expect(target).toBeVisible();
});


test('Assignment 7B Visibility - Hide B (visibility)', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-visibility').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Visibility');

    const target = page.getByTestId('target');
    const resetButton = page.getByTestId('visibility-reset');

    await expect(target).toBeVisible();
    await page.getByTestId('hide-visibility').click();
    await expect(target).not.toBeVisible();
    await resetButton.click();
    await expect(target).toBeVisible();
});


test('Assignment 7C Visibility - Hide C (opacity)', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-visibility').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Visibility');

    const target = page.getByTestId('target');
    const resetButton = page.getByTestId('visibility-reset');

    await expect(target).toBeVisible();
    await page.getByTestId('hide-opacity').click();

    const opacity = await target.evaluate((element) => {
        return window.getComputedStyle(element).opacity;
    });
    // Verify opacity is 0
    expect(opacity).toBe('0');
    await resetButton.click();
    await expect(target).toBeVisible();
});


test('Assignment 7D Visibility - Hide D (offscreen)', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-visibility').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({ timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Visibility');

    const target = page.getByTestId('target');
    const resetButton = page.getByTestId('visibility-reset');

    await expect(target).toBeVisible();
    await page.getByTestId('hide-offscreen').click();
    // Verify target is outside the viewport
    const isOffscreen = await target.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.bottom <= 0 ||
            rect.top >= window.innerHeight ||
            rect.right <= 0 ||
            rect.left >= window.innerWidth
        );
    });

    expect(isOffscreen).toBe(true);
    await resetButton.click();
    await expect(target).toBeVisible();
});


test('Assignment 7E Visibility - Hide E (zero size)', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-visibility').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('Visibility');

    const target = page.getByTestId('target');
    const resetButton = page.getByTestId('visibility-reset');

    await expect(target).toBeVisible();
    await page.getByTestId('hide-zero-size').click();
    // Verify target has zero width and height
    const size = await target.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height
        };
    });

    expect(size.width).toBe(0);
    expect(size.height).toBe(0);
    await resetButton.click();
    await expect(target).toBeVisible();
});


test('Assignment 7F Visibility - Hide F (covered)', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-visibility').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({ timeout: 60000 });
    await expect(page.getByTestId('topic-title')).toHaveText('Visibility');

    const target = page.getByTestId('target');
    const resetButton = page.getByTestId('visibility-reset');

    await expect(target).toBeVisible();
    await page.getByTestId('hide-covered').click();
    // Check whether another element is covering the target
    const isCovered = await target.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const topElement = document.elementFromPoint(x, y);
        return topElement !== element &&
               !element.contains(topElement);
    });

    expect(isCovered).toBe(true);
    await resetButton.click();
    await expect(target).toBeVisible();
});

