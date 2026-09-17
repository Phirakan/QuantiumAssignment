import { test, expect } from '../fixture/Auth.fixture';
import path from 'path';

test('Assignment 10 File Upload', async ({ authedPage }) => {

    const page = authedPage;

    await page.getByTestId('topic-card-file-upload').click();
    await expect(page.getByTestId('page-loader')).toBeHidden({timeout: 60000});
    await expect(page.getByTestId('topic-title')).toHaveText('File Upload');

    const fileInput = page.getByTestId('file-input');
    const uploadedFiles = page.getByTestId('uploaded-files');
    const fileName = 'Test.txt';
    const filePath = path.join( process.cwd(), 'testdata', fileName );
    await fileInput.setInputFiles(filePath);
    await expect(uploadedFiles).toBeVisible();
    await expect(uploadedFiles).toContainText(fileName);
});

