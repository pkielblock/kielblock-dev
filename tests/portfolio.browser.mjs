// Run with an installed Playwright module and Chromium executable as arguments.
import assert from 'node:assert/strict';
const { chromium } = await import(process.argv[2] || 'playwright');
const browser = await chromium.launch({ executablePath: process.argv[3], headless: true });
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:5173';
try {
	const context = await browser.newContext({
		viewport: { width: 1440, height: 1200 },
		permissions: ['clipboard-read', 'clipboard-write']
	});
	const page = await context.newPage();
	page.setDefaultTimeout(10000);
	const errors = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto(origin);
	await page.getByRole('heading', { name: 'Pedro Kielblock', exact: true }).waitFor();
	await page.evaluate(() => document.fonts.ready);
	assert.equal(
		await page.evaluate(() => getComputedStyle(document.body).backgroundColor),
		'rgb(17, 17, 27)'
	);
	assert.ok(await page.evaluate(() => document.fonts.check('16px "JetBrains Mono"')));
	assert.equal(await page.locator('input').count(), 0);
	assert.equal(await page.title(), 'pedro@kielblockdev');
	assert.equal(await page.locator('.launch-command').textContent(), 'open overview.md');
	assert.equal(
		await page.locator('.terminal-window').evaluate((el) => getComputedStyle(el).animationDuration),
		'3.5s'
	);

	assert.equal(
		await page.locator('.terminal-window').evaluate((el) => getComputedStyle(el).animationName),
		'workspace-open'
	);
	assert.equal(await page.locator('.site-footer').count(), 0);
	const copyright = page
		.locator('.window-status')
		.getByText(`© ${new Date().getFullYear()} Pedro Kielblock`);
	assert.equal(await copyright.count(), 1);
	await page.locator('.terminal-window').evaluate((el) => {
		const animation = el.getAnimations()[0];
		animation.pause();
		animation.currentTime = 1000;
	});
	assert.equal(
		await copyright.evaluate((el) => getComputedStyle(el.closest('.terminal-window')).opacity),
		'0'
	);
	await page.locator('.terminal-window').evaluate(async (el) => {
		const animation = el.getAnimations()[0];
		animation.play();
		await animation.finished;
	});
	await page
		.locator('.workspace-launch')
		.evaluate((el) => Promise.all(el.getAnimations().map((animation) => animation.finished)));
	assert.equal(await copyright.isVisible(), true);
	assert.equal(
		await page.locator('.workspace-launch').evaluate((el) => getComputedStyle(el).visibility),
		'hidden'
	);
	assert.equal(
		await page.locator('.desktop-heading, .desktop-bottom, a[href="/privacy"]').count(),
		0
	);
	const folders = page.locator('.explorer-folder');
	assert.equal(await folders.count(), 2);
	for (const folder of await folders.all()) {
		const summary = folder.locator('summary');
		await summary.click();
		assert.equal(await folder.getAttribute('open'), null);
		assert.equal(await folder.locator('nav').isVisible(), false);
		await summary.focus();
		await page.keyboard.press('Enter');
		assert.notEqual(await folder.getAttribute('open'), null);
	}
	const journal = page.getByRole('navigation', { name: 'Journal entries' });
	await journal.getByRole('link', { name: 'about-me.md' }).click();
	await page.getByRole('heading', { name: 'Background', exact: true }).waitFor();
	assert.match(await page.locator('.document-tab').textContent(), /about-me\.md/);
	assert.equal(await journal.getByRole('link').getAttribute('aria-current'), 'page');
	const codeStyle = await page.locator('.journal-content pre').evaluate((el) => ({
		background: getComputedStyle(el).backgroundColor,
		fontSize: getComputedStyle(el).fontSize
	}));
	assert.deepEqual(codeStyle, { background: 'rgb(17, 17, 27)', fontSize: '16px' });
	await page.screenshot({ path: 'docs/journal.png', fullPage: true, animations: 'disabled' });
	await page.reload();
	await page.getByRole('heading', { name: 'Background', exact: true }).waitFor();
	await page.getByRole('link', { name: 'overview.md' }).click();
	await page
		.getByRole('navigation', { name: 'Profile links' })
		.getByRole('link', { name: 'Journal', exact: true })
		.click();
	await page.getByRole('heading', { name: '# Journal', exact: true }).waitFor();
	await page.getByRole('link', { name: 'overview.md' }).click();
	const faviconHref = await page.locator('link[rel="icon"]').getAttribute('href');
	assert.ok(faviconHref.includes('favicon.svg?v=3'));
	const favicon = await context.request.get(new URL(faviconHref, origin).href);
	assert.equal(favicon.status(), 200);
	assert.match(favicon.headers()['content-type'], /image\/svg\+xml/);
	const svg = await favicon.text();
	assert.ok(
		await page.evaluate(
			(markup) =>
				new DOMParser().parseFromString(markup, 'image/svg+xml').querySelector('parsererror') ===
				null,
			svg
		)
	);
	assert.ok(svg.includes('#11111b') && svg.includes('#b4befe'));

	assert.equal(
		await page.getByRole('button', { name: 'Restore window' }).getAttribute('aria-pressed'),
		'true'
	);
	await page.screenshot({
		path: 'docs/portfolio-desktop.png',
		fullPage: true,
		animations: 'disabled'
	});

	assert.equal(await page.getByRole('img', { name: 'kielblockdev', exact: true }).count(), 1);
	const shortcuts = page.getByRole('navigation', { name: 'Profile links' });
	assert.equal(await shortcuts.getByRole('link').count(), 7);
	for (const [label, heading] of [
		['Education', 'Technologist in Systems Analysis and Development'],
		['Certifications', 'C2 Proficiency [202]'],
		['Courses', 'Complete Java Course - REST API/Spring Boot/OOP/JPA']
	]) {
		await shortcuts.getByRole('link', { name: label, exact: true }).click();
		await page.getByRole('heading', { name: heading, exact: true }).waitFor();
		if (label === 'Education') {
			assert.equal(
				await page
					.getByRole('link')
					.filter({ hasText: 'Technologist in Systems Analysis and Development' })
					.getAttribute('href'),
				'https://fatecsaocaetano.cps.sp.gov.br/'
			);
			assert.equal(
				await page
					.getByRole('link')
					.filter({ hasText: 'Technical Degree in Systems Development' })
					.getAttribute('href'),
				'http://www.etelg.com.br/'
			);
		}
		await page.getByRole('link', { name: 'overview.md' }).click();
		await shortcuts.waitFor();
	}

	await page.getByRole('link', { name: 'experience.md' }).click();
	await page.getByRole('heading', { name: '# Work experience' }).waitFor();
	assert.equal(await page.locator('.document details[open]').count(), 1);
	await page.locator('summary').filter({ hasText: 'Intern' }).click();
	assert.equal(await page.locator('.document details[open]').count(), 2);
	await page.getByRole('link', { name: 'learning.md' }).click();
	await page.getByRole('button', { name: 'Certifications', exact: true }).click();
	await page.getByRole('heading', { name: 'C2 Proficiency [202]' }).waitFor();
	await page.getByRole('button', { name: 'Courses', exact: true }).click();
	await page.getByRole('heading', { name: 'Complete Java Course', exact: false }).waitFor();
	await page.getByRole('link', { name: 'contact.md' }).click();
	assert.equal(await page.getByRole('link', { name: 'GitHub' }).count(), 0);
	assert.equal(await page.getByRole('link', { name: 'LinkedIn' }).count(), 0);
	await page.screenshot({ path: 'docs/contact.png', fullPage: true, animations: 'disabled' });
	await page.getByRole('button', { name: 'Copy email address' }).click();
	await page.getByRole('status').filter({ hasText: 'Email copied.' }).waitFor();
	assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'pedro@kielblock.dev');
	await page.evaluate(() =>
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: { writeText: () => Promise.reject(new Error('denied')) }
		})
	);
	await page.getByRole('button', { name: 'Copy email address' }).click();
	await page.getByRole('status').filter({ hasText: 'Copy unavailable.' }).waitFor();
	await page.getByRole('button', { name: 'Restore window' }).click();
	await page.getByRole('button', { name: 'Expand window' }).waitFor();
	await page.getByRole('button', { name: 'Expand window' }).click();
	await page.getByRole('button', { name: 'Restore window' }).waitFor();
	await page.goBack();
	await page.getByRole('heading', { name: '# Keep learning' }).waitFor();
	await page.goto(origin + '/#about');
	await page.getByRole('heading', { name: '# A little about me' }).waitFor();
	const socialLinks = page.locator('.social-links');
	assert.equal(await socialLinks.getByRole('link', { name: 'GitHub' }).count(), 1);
	assert.equal(await socialLinks.getByRole('link', { name: 'LinkedIn' }).count(), 1);
	await page.screenshot({ path: 'docs/about.png', fullPage: true, animations: 'disabled' });
	await page.goto(origin + '/#constructor');
	await page.getByRole('heading', { name: 'Pedro Kielblock', exact: true }).waitFor();

	for (const width of [320, 360, 390, 430, 768]) {
		await page.setViewportSize({ width, height: 844 });
		for (const section of [
			'overview',
			'about',
			'experience',
			'learning',
			'contact',
			'journal/about-me'
		]) {
			await page.goto(origin + '/#' + section);
			await page
				.locator('.document-tab')
				.filter({ hasText: section.split('/').at(-1) + '.md' })
				.waitFor();
			assert.ok(
				await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
				`Horizontal overflow: ${section} at ${width}px`
			);
			if (width <= 430) {
				assert.ok(
					await page.locator('.explorer').evaluate((el) =>
						[...el.querySelectorAll('a')].every((link) => {
							const box = link.getBoundingClientRect();
							return box.left >= 0 && box.right <= innerWidth;
						})
					),
					`Navigation clipped at ${width}px`
				);
				if (section === 'overview') {
					assert.ok(
						await page
							.getByRole('img', { name: 'kielblockdev' })
							.evaluate((el) => el.scrollWidth <= el.clientWidth),
						`Wordmark clipped at ${width}px`
					);
					assert.ok(
						await page
							.locator('.shortcut-links')
							.evaluate((el) =>
								[...el.querySelectorAll('a')].every((link) => link.scrollWidth <= link.clientWidth)
							),
						`Button text clipped at ${width}px`
					);
				}
			}
		}
	}

	await page.setViewportSize({ width: 844, height: 390 });
	await page.goto(origin);
	await page.getByRole('heading', { name: 'Pedro Kielblock', exact: true }).waitFor();
	assert.ok(
		await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
		'Landscape overflow'
	);
	await page.locator('.explorer a[href="#contact"]').click();
	await page.getByRole('heading', { name: "# Let's build something good." }).waitFor();

	for (const [width, height] of [
		[1920, 1080],
		[1440, 900],
		[1024, 768]
	]) {
		await page.setViewportSize({ width, height });
		await page.goto(origin);
		await page
			.locator('.terminal-window')
			.evaluate((el) => Promise.all(el.getAnimations().map((animation) => animation.finished)));
		const layout = await page.evaluate(() => {
			const frame = document.querySelector('.terminal-window').getBoundingClientRect();
			const pane = document.querySelector('.document-content').getBoundingClientRect();
			const content = document.querySelector('.document-inner').getBoundingClientRect();
			return {
				width: frame.width,
				height: frame.height,
				bottom: frame.bottom,
				centered: Math.abs(content.x + content.width / 2 - pane.x - pane.width / 2)
			};
		});
		assert.ok(
			layout.width >= width - 40 && layout.height >= height - 140 && layout.bottom <= height,
			`Viewport fill at ${width}x${height}`
		);
		assert.ok(layout.centered < 2, `Content centered at ${width}px`);
		if (width === 1920)
			await page.screenshot({
				path: 'docs/portfolio-wide.png',
				fullPage: true,
				animations: 'disabled'
			});
	}

	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto(origin);
	await page.screenshot({
		path: 'docs/portfolio-mobile.png',
		fullPage: true,
		animations: 'disabled'
	});
	assert.equal(await copyright.isVisible(), true);
	await page.emulateMedia({ reducedMotion: 'reduce' });
	assert.equal(
		await page.locator('.terminal-window').evaluate((el) => getComputedStyle(el).animationName),
		'none'
	);
	assert.equal(
		await page.locator('.workspace-launch').evaluate((el) => getComputedStyle(el).display),
		'none'
	);

	await page.locator('.explorer a[href="#contact"]').click();
	assert.equal(
		await page.locator('.document-inner').evaluate((el) => getComputedStyle(el).animationName),
		'none'
	);
	await page.keyboard.press('Tab');
	assert.ok(await page.evaluate(() => document.activeElement !== document.body));
	for (const route of ['/blog', '/blog/about-me', '/privacy']) {
		const response = await page.goto(origin + route);
		assert.equal(response.status(), 200, route);
	}
	const contentResponse = await context.request.get(origin + '/api/content');
	assert.equal(contentResponse.status(), 200);
	const posts = await contentResponse.json();
	assert.ok(posts.length > 0 && posts.every((post) => post.published));
	const missingPost = await context.request.get(origin + '/blog/__missing__');
	assert.equal(missingPost.status(), 404);
	assert.deepEqual(errors, []);
	console.log(
		'Passed: SVG favicon, opening animation, reduced-motion fallback, navigation, collapsible folders, journal Markdown and deep links, history, disclosures, learning, clipboard success/failure, expansion, deep links, 30 responsive views, mobile landscape, and 3 desktop sizes, reduced motion, keyboard focus, journal, privacy.'
	);
} finally {
	await browser.close();
}
