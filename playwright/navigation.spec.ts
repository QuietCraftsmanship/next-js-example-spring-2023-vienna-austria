import { expect, test } from '@playwright/test';

const animals = [
  {
    firstName: 'gigi',
    type: 'cat',
  },
  {
    firstName: 'freddy',
    type: 'dog',
  },
  {
    firstName: 'bob',
    type: 'trashpanda',
  },
  {
    firstName: 'nagini',
    type: 'snake',
  },
  {
    firstName: 'kunfu',
    type: 'panda',
  },
];

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(2),
  ).toBeVisible();

  await expect(page.getByAltText('cat sleeping').first()).toBeVisible();

  await page.getByRole('link', { name: 'animals' }).click();

  await expect(page.getByText('This are my animals')).toBeVisible();
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveText(
    animals.map((animal) => animal.firstName),
  );
  await expect(
    page.locator('[data-test-id^="animal-type-"] >> img'),
  ).toHaveCount(5);

  for (const animal of animals) {
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: 'avocado' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await page.getByRole('textbox').fill('asd');

  await page.getByRole('button', { name: 'Update comment' }).click();

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(
    page.getByTestId('fruit-name-avocado').getByText('asd'),
  ).toBeVisible();
});

// Additional tests

test('should display navigation links on homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'animals' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'fruits' })).toBeVisible();
});

test('should navigate to animal detail page and back', async ({ page }) => {
  await page.goto('http://localhost:3000/animals');
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  // Click on the first animal link
  await page.getByRole('link', { name: animals[0].firstName }).click();
  await expect(page).toHaveURL(/\/animals\/\d+/);

  // Check for animal name on detail page
  await expect(page.getByText(animals[0].firstName)).toBeVisible();

  // Go back to animals list
  await page.goBack();
  await expect(page).toHaveURL('http://localhost:3000/animals');
});

test('should update fruit comment and persist after reload', async ({ page }) => {
  await page.goto('http://localhost:3000/fruits/1');
  const comment = 'new comment';
  await page.getByRole('textbox').fill(comment);
  await page.getByRole('button', { name: 'Update comment' }).click();

  // Reload and check if comment persists
  await page.reload();
  await expect(
    page.getByTestId('fruit-name-avocado').getByText(comment),
  ).toBeVisible();
});

test('should show 404 page for invalid route', async ({ page }) => {
  await page.goto('http://localhost:3000/non-existent-page');
  await expect(page.getByText(/404/i)).toBeVisible();
});

test('navigation test duplicate', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  // await expect(page.locator('h1')).toHaveText('Hello UpLeveled');

  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(2),
  ).toBeVisible();

  await expect(page.getByAltText('cat sleeping').first()).toBeVisible();

  await page.getByRole('link', { name: 'animals' }).click();

  await expect(page.getByText('This are my animals')).toBeVisible();
  // use caret ^ to find all elements with data-test-id=animal-type
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveText(
    animals.map((animal) => animal.firstName),
  );
  // Use >> for direct descendant of the locator
  await expect(
    page.locator('[data-test-id^="animal-type-"] >> img'),
  ).toHaveCount(5);

  for (const animal of animals) {
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: 'avocado' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await page.getByRole('textbox').fill('asd');

  await page.getByRole('button', { name: 'Update comment' }).click();

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(
    page.getByTestId('fruit-name-avocado').getByText('asd'),
  ).toBeVisible();
});

// Additional tests

test('should display navigation links on homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('link', { name: 'animals' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'fruits' })).toBeVisible();
});

test('should navigate to animal detail page and back', async ({ page }) => {
  await page.goto('http://localhost:3000/animals');
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  // Click on the first animal link
  await page.getByRole('link', { name: animals[0].firstName }).click();
  await expect(page).toHaveURL(/\/animals\/\d+/);

  // Check for animal name on detail page
  await expect(page.getByText(animals[0].firstName)).toBeVisible();

  // Go back to animals list
  await page.goBack();
  await expect(page).toHaveURL('http://localhost:3000/animals');
});

test('should update fruit comment and persist after reload', async ({ page }) => {
  await page.goto('http://localhost:3000/fruits/1');
  const comment = 'new comment';
  await page.getByRole('textbox').fill(comment);
  await page.getByRole('button', { name: 'Update comment' }).click();

  // Reload and check if comment persists
  await page.reload();
  await expect(
    page.getByTestId('fruit-name-avocado').getByText(comment),
  ).toBeVisible();
});

test('should show 404 page for invalid route', async ({ page }) => {
  await page.goto('http://localhost:3000/non-existent-page');
  await expect(page.getByText(/404/i)).toBeVisible();
});

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(
    page.getByRole('heading', { name: 'Hello UpLeveled' }),
  ).toBeVisible();

  // await expect(page.locator('h1')).toHaveText('Hello UpLeveled');

  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(1),
  ).toBeVisible();
  await expect(
    page.getByRole('img', { name: 'cat sleeping' }).nth(2),
  ).toBeVisible();

  await expect(page.getByAltText('cat sleeping').first()).toBeVisible();

  await page.getByRole('link', { name: 'animals' }).click();

  await expect(page.getByText('This are my animals')).toBeVisible();
  // use caret ^ to find all elements with data-test-id=animal-type
  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveText(
    animals.map((animal) => animal.firstName),
  );
  // Use >> for direct descendant of the locator
  await expect(
    page.locator('[data-test-id^="animal-type-"] >> img'),
  ).toHaveCount(5);

  for (const animal of animals) {
    await expect(
      page.getByRole('link', { name: animal.firstName }),
    ).toBeVisible();
  }

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: 'avocado' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await page.getByRole('textbox').fill('asd');

  await page.getByRole('button', { name: 'Update comment' }).click();

  await page.getByRole('link', { name: 'fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(
    page.getByTestId('fruit-name-avocado').getByText('asd'),
  ).toBeVisible();
});
