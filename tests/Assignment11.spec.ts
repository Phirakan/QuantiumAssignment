import { test, expect } from '../fixture/Auth.fixture';

test('Assignment 11 Mystery Button', async ({ authedPage }) => {
  const page = authedPage;

  await page.getByTestId('topic-card-mystery-button').click();
  await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
  await expect(page.getByTestId('topic-title')).toHaveText('Mystery Button');

  const counter = page.getByTestId('outer-counter');
  const initialCount = Number(await counter.getAttribute('data-count'));
  const frame = page.frameLocator('[data-testid="sandbox-frame"]');
  const button = frame.getByRole('button', { name: 'Click me from the parent'});

  await expect(button).toBeVisible();
  await button.click();
  await expect.poll(
    async () => {
      return Number(
        await counter.getAttribute('data-count')
      );
    },
    {
      timeout: 10000,
      intervals: [100]
    }
  ).toBe(initialCount + 1);
});