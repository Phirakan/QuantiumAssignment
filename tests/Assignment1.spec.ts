import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 1 Text Input: Type value and click button', async ({ authedPage }) => {

  const page = authedPage;

  await page.getByTestId('topic-card-text-input').click();
  await expect(page.getByTestId('topic-title')).toBeVisible();
  const text = 'Test mosu123';
  await page.getByTestId('text-input').fill(text);
  await page.getByTestId('update-button').click();
  await expect(page.getByTestId('update-button')).toHaveText(text);
});

test('Assignment 1 Text Input: Delete value and click button without typing', async ({ authedPage }) => {

  const page = authedPage;

  await page.getByTestId('topic-card-text-input').click();
  await expect(page.getByTestId('topic-title')).toBeVisible();
  const text = 'Test mosu123';
  await page.getByTestId('text-input').fill(text);
  await page.getByTestId('update-button').click();
  await expect(page.getByTestId('update-button')).toHaveText(text);
  await page.getByTestId('text-input').fill('');
  await page.getByTestId('update-button').click();
  await expect(page.getByTestId('update-button')).toHaveText('Button');
});

