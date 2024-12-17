import { test, expect } from "@playwright/test";

test("Loads the main page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Dream travels/);
});

// Use case 1: As a user, I want to see the list of trips on the home page,
//  It will have an initial view with the default list of trips received from the endpoint,
// including trip titles, details, and the thumbnail of the trip.
test("use case 1", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const trips = await page.locator("[data-testid='trip-card']");
  await expect(trips).toHaveCount(7);

  const firstTrip = trips.first();
  const title = firstTrip.locator("[data-testid='trip-title']");
  await expect(title).toHaveText("Portugal");
  const description = firstTrip.locator("[data-testid='trip-description']");
  await expect(description).toHaveText(
    "Embark on a journey through Portugal, where the charming streets of Lisbon captivate you, the golden beaches of the Algarve await, and Portuguese cuisine delights with authentic flavors. Explore castles in Sintra and create unforgettable memories in this destination full of history and beauty. Portugal invites you to experience something truly unique!"
  );
  const image = firstTrip.locator("img");
  await expect(image).toHaveAttribute(
    "src",
    "https://a.cdn-hotels.com/gdcs/production82/d1923/447a348f-f875-4885-b00a-e9a90603fef5.jpg"
  );
});

// Use case 2: As a user, I want to be able to search for trips by title,
// We will be able to filter by any text found on the cards, both by details and by title
// or description.
test("use case 2", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const searchInput = await page.locator("[data-testid='search-input']");
  await searchInput.fill("Portugal");

  const searchButton = await page.locator("[data-testid='search-button']");
  await searchButton.click();

  await expect(page).toHaveURL("http://localhost:3000/?query=Portugal");

  const trips = await page.locator("[data-testid='trip-card']");
  await expect(trips).toHaveCount(1);

  const firstTrip = trips.first();
  const title = firstTrip.locator("[data-testid='trip-title']");
  await expect(title).toHaveText("Portugal");
});

// Use case 3: As a user, I want to be able to see the details of a trip,
// When clicking on a trip card, a dialog will open with the details of the trip,
// including the title, description, itinerary, and status of the trip.

test("use case 3", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const trips = await page.locator("[data-testid='trip-card']");
  const firstTrip = trips.first();
  const details = await firstTrip.locator("[data-testid='trip-details']");
  await details.click();

  const dialog = await page.locator("[data-testid='trip-dialog']");
  await expect(dialog).toBeVisible();

  const title = await dialog.locator("h2");
  await expect(title).toHaveText("Portugal");

  const description = await dialog.locator(
    "[data-testid='trip-dialog-description']"
  );
  await expect(description).toHaveText(
    "Embark on a journey through Portugal, where the charming streets of Lisbon captivate you, the golden beaches of the Algarve await, and Portuguese cuisine delights with authentic flavors. Explore castles in Sintra and create unforgettable memories in this destination full of history and beauty. Portugal invites you to experience something truly unique!"
  );

  await expect(dialog.locator("h3")).toHaveText("Itinerary");
  const itinerary = await dialog.locator("[data-testid='itinerary']");

  expect(itinerary.locator("[data-testid='itinerary-day']").first()).toHaveText(
    "Day 1: Lisbon"
  );

  const status = await dialog.locator("[data-testid='trip-dialog-status']");
  await expect(status).toHaveText("Mark as completed");
});

// Use case 4: As a user, I want to be able to mark a trip as completed
// When clicking on the "Mark as completed" button, the trip status will change to "completed",
// and the button text will change to "Complete".

test("use case 4", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const trips = await page.locator("[data-testid='trip-card']");
  const firstTrip = trips.first();
  const details = await firstTrip.locator("[data-testid='trip-details']");
  await details.click();

  const dialog = await page.locator("[data-testid='trip-dialog']");
  const status = await dialog.locator("[data-testid='trip-dialog-status']");
  await status.click();

  await expect(status).toHaveText("Complete");
});

// Use case 5: As a user, I want to be able to edit a trip
// When clicking on the "Edit" button, a dialog will open with the trip details,
// allowing the user to change the title, description, and itinerary of the trip.

test("use case 5", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const trips = await page.locator("[data-testid='trip-card']");
  const firstTrip = trips.first();
  const edit = await firstTrip.locator("[data-testid='edit-trip']");
  await edit.click();

  const dialog = await page.locator("[data-testid='edit-trip-dialog']");
  await expect(dialog).toBeVisible();

  const title = await dialog.locator("h2");
  await expect(title).toHaveText("Edit the trip");

  const titleInput = await dialog.locator("#title");
  await titleInput.fill("New title");

  const descriptionInput = await dialog.locator("#description");
  await descriptionInput.fill("New description");

  const submit = await dialog.locator("button[type='submit']");
  await submit.click();

  await page.waitForSelector("[data-testid='edit-trip-dialog']", {
    state: "hidden",
  });
  await expect(firstTrip.locator("[data-testid='trip-title']")).toHaveText(
    "New title"
  );
});

// Use case 6: As a user, I want to be able to delete a trip
// When clicking on the "Delete" button, a dialog will open asking the user to confirm the deletion.

test("use case 6", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const trips = await page.locator("[data-testid='trip-card']");
  const firstTrip = trips.first();
  const deleteButton = await firstTrip.locator("[data-testid='delete-trip']");
  await deleteButton.click();

  await expect(page.locator("[data-testid='trip-card']")).toHaveCount(6);
});

// Use case 7: As a user, I want to be able to add a new trip
// When clicking on the "Create new trip" button, a dialog will open with a form to add a new trip,
// including the title, description, itinerary, and photo of the trip.

test("use case 7", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const createButton = await page.locator("[data-testid='create-trip']");
  await createButton.click();

  const dialog = await page.locator("[data-testid='edit-trip-dialog']");
  await expect(dialog).toBeVisible();

  const titleInput = await dialog.locator("#title");
  await titleInput.fill("New trip");

  const descriptionInput = await dialog.locator("#description");
  await descriptionInput.fill("New trip description");

  const submit = await dialog.locator("button[type='submit']");
  await submit.click();

  await page.waitForSelector("[data-testid='edit-trip-dialog']", {
    state: "hidden",
  });

  const trips = await page.locator("[data-testid='trip-card']");
  await expect(trips).toHaveCount(8);
});

// Use case 8: As a user, I want to be able to see completed trips
// When clicking on the "Completed" button, the user will see only the trips marked as completed.

test("use case 8", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const completedButton = await page.locator(
    "[data-testid='status-toggle-Completed']"
  );
  await completedButton.click();

  const trips = await page.locator("[data-testid='trip-card']");
  await expect(trips).toHaveCount(2);

  const firstTrip = trips.first();
  const doItAgainButton = await firstTrip.locator(
    "[data-testid='do-it-again']"
  );
  await expect(doItAgainButton).toBeVisible();
});
