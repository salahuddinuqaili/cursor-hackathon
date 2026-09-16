import type { ConsoleMessage, Page, Request } from "@playwright/test";
import { expect, firefox, test, webkit } from "@playwright/test";

const appUrl = "http://127.0.0.1:5173";

function collectBrowserErrors(page: Page, errors: string[]): () => void {
	const recordPageError = (error: Error) => errors.push(error.message);
	const recordConsoleError = (message: ConsoleMessage) => {
		if (message.type() === "error") {
			errors.push(message.text());
		}
	};

	page.on("pageerror", recordPageError);
	page.on("console", recordConsoleError);

	return () => {
		page.off("pageerror", recordPageError);
		page.off("console", recordConsoleError);
	};
}

function isCounterSnapshotRead(request: Request): boolean {
	const url = new URL(request.url());

	return (
		request.method() === "GET" &&
		(url.pathname.endsWith("/_.data") ||
			(request.resourceType() === "document" && url.pathname === "/"))
	);
}

function waitForCounterStream(page: Page) {
	return page.waitForResponse((response) => {
		const url = new URL(response.url());

		return (
			response.ok() &&
			response.request().method() === "GET" &&
			url.pathname === "/api/counter/events"
		);
	});
}

async function openCounterPage(page: Page, url: string): Promise<void> {
	const streamConnected = waitForCounterStream(page);
	await Promise.all([page.goto(url), streamConnected]);
}

test("persists events and synchronizes the counter across tabs", async ({
	context,
	page,
}) => {
	const browserErrors: string[] = [];

	collectBrowserErrors(page, browserErrors);
	await openCounterPage(page, "/");
	const secondPage = await context.newPage();
	collectBrowserErrors(secondPage, browserErrors);
	await openCounterPage(secondPage, "/");
	const snapshotReads: string[] = [];
	const recordSnapshotRead = (request: Request) => {
		if (isCounterSnapshotRead(request)) {
			snapshotReads.push(request.url());
		}
	};
	page.on("request", recordSnapshotRead);
	secondPage.on("request", recordSnapshotRead);

	await expect(page).toHaveTitle("Counter");
	await expect(
		page.getByRole("heading", { name: "Counter / Event Log" }),
	).toBeVisible();

	const counter = page.getByRole("status", { name: "Current count" });
	const synchronizedCounter = secondPage.getByRole("status", {
		name: "Current count",
	});
	const initialValue = Number(await counter.getAttribute("data-value"));

	await page.getByRole("button", { name: "Increase by one" }).click();
	await expect(counter).toHaveAttribute("data-value", String(initialValue + 1));
	await expect(synchronizedCounter).toHaveAttribute(
		"data-value",
		String(initialValue + 1),
	);

	await secondPage.getByRole("button", { name: "Decrease by one" }).click();
	await expect(counter).toHaveAttribute("data-value", String(initialValue));
	await expect(synchronizedCounter).toHaveAttribute(
		"data-value",
		String(initialValue),
	);

	for (let index = 1; index <= 10; index += 1) {
		await page.getByRole("button", { name: "Increase by one" }).click();
		await expect(counter).toHaveAttribute(
			"data-value",
			String(initialValue + index),
		);
	}

	await expect(page.getByRole("row")).toHaveCount(11);
	await expect(page.getByRole("row").nth(1)).toContainText("+1");
	expect(snapshotReads).toEqual([]);

	await page.reload();
	await expect(
		page.getByRole("status", { name: "Current count" }),
	).toHaveAttribute("data-value", String(initialValue + 10));
	await expect(page.getByRole("row")).toHaveCount(11);
	expect(browserErrors).toEqual([]);
});

test("synchronizes the counter across separate browser engines", async ({
	browserName,
}) => {
	test.skip(
		browserName !== "chromium",
		"This cross-engine scenario only needs to run once.",
	);

	const [firefoxBrowser, webkitBrowser] = await Promise.all([
		firefox.launch(),
		webkit.launch(),
	]);

	try {
		const [firefoxContext, webkitContext] = await Promise.all([
			firefoxBrowser.newContext(),
			webkitBrowser.newContext(),
		]);
		const [firefoxPage, webkitPage] = await Promise.all([
			firefoxContext.newPage(),
			webkitContext.newPage(),
		]);
		const browserErrors: string[] = [];

		const stopCollectingFirefoxErrors = collectBrowserErrors(
			firefoxPage,
			browserErrors,
		);
		collectBrowserErrors(webkitPage, browserErrors);
		await Promise.all([
			openCounterPage(firefoxPage, appUrl),
			openCounterPage(webkitPage, appUrl),
		]);
		const firefoxSnapshotReads: string[] = [];
		const webkitSnapshotReads: string[] = [];
		firefoxPage.on("request", (request) => {
			if (isCounterSnapshotRead(request)) {
				firefoxSnapshotReads.push(request.url());
			}
		});
		webkitPage.on("request", (request) => {
			if (isCounterSnapshotRead(request)) {
				webkitSnapshotReads.push(request.url());
			}
		});

		const firefoxCounter = firefoxPage.getByRole("status", {
			name: "Current count",
		});
		const webkitCounter = webkitPage.getByRole("status", {
			name: "Current count",
		});
		const initialValue = Number(
			await firefoxCounter.getAttribute("data-value"),
		);

		await firefoxPage.getByRole("button", { name: "Increase by one" }).click();
		await expect(firefoxCounter).toHaveAttribute(
			"data-value",
			String(initialValue + 1),
		);
		await expect(webkitCounter).toHaveAttribute(
			"data-value",
			String(initialValue + 1),
		);

		await webkitPage.getByRole("button", { name: "Decrease by one" }).click();
		await expect(firefoxCounter).toHaveAttribute(
			"data-value",
			String(initialValue),
		);
		await expect(webkitCounter).toHaveAttribute(
			"data-value",
			String(initialValue),
		);
		expect(firefoxSnapshotReads).toEqual([]);
		expect(webkitSnapshotReads).toEqual([]);
		expect(browserErrors).toEqual([]);

		stopCollectingFirefoxErrors();
		await firefoxPage.goto("about:blank");
		await webkitPage.getByRole("button", { name: "Increase by one" }).click();
		await expect(webkitCounter).toHaveAttribute(
			"data-value",
			String(initialValue + 1),
		);

		await firefoxPage.goto(appUrl);
		collectBrowserErrors(firefoxPage, browserErrors);
		await expect(firefoxCounter).toHaveAttribute(
			"data-value",
			String(initialValue + 1),
		);
		expect(firefoxSnapshotReads.length).toBeGreaterThan(0);
		expect(browserErrors).toEqual([]);
	} finally {
		await Promise.all([firefoxBrowser.close(), webkitBrowser.close()]);
	}
});
