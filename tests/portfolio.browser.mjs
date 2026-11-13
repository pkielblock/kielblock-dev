// Run with an installed Playwright module and Chromium executable as arguments.
import assert from 'node:assert/strict';
const { chromium } = await import(process.argv[2] || 'playwright');
const browser = await chromium.launch({ executablePath: process.argv[3], headless: true });
const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:5173';
const shot = (page, name) =>
	page.screenshot({ path: `docs/${name}.png`, fullPage: true, animations: 'disabled' });
const noOverflow = (page) =>
	page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
try {
	const context = await browser.newContext({
		viewport: { width: 1440, height: 900 },
		permissions: ['clipboard-read', 'clipboard-write']
	});
	const page = await context.newPage();
	page.setDefaultTimeout(10000);
	const errors = [];
	page.on('pageerror', (error) => errors.push(error.message));
	const tabs = page.getByRole('navigation', { name: 'Portfolio sections' });
	const tab = (name) => tabs.getByRole('link', { name, exact: true });
	const heading = (name) => page.getByRole('heading', { name, exact: true });

	// Theme, font and window chrome
	await page.goto(origin);
	await heading('Pedro Kielblock').waitFor();
	await page.evaluate(() => document.fonts.ready);
	const background = (selector) =>
		page.locator(selector).evaluate((el) => getComputedStyle(el).backgroundColor);
	assert.equal(await background('body'), 'rgb(10, 11, 13)');
	assert.equal(await background('.terminal-window'), 'rgb(14, 15, 18)');
	assert.equal(await background('.cursor >> nth=0'), 'rgb(142, 170, 255)');
	assert.ok(await page.evaluate(() => document.fonts.check('16px "JetBrains Mono"')));
	assert.equal(await page.title(), 'pedro@kielblockdev');
	assert.equal(await page.locator('input').count(), 0);
	assert.equal(await page.locator('a[href*="privacy"]').count(), 0);
	assert.doesNotMatch(await page.content(), /privacy|ghostty/i);
	assert.equal(await page.getByText(`© ${new Date().getFullYear()} Pedro Kielblock`).count(), 1);
	assert.equal(await tabs.getByRole('link').count(), 6);
	assert.equal(await tab('overview').getAttribute('aria-current'), 'page');

	// Favicon
	const icons = page.locator('link[rel="icon"]');
	assert.equal(await icons.count(), 2);
	for (const icon of await icons.all()) {
		const href = await icon.getAttribute('href');
		assert.ok(href.includes('?v=4'), href);
		const response = await context.request.get(new URL(href, origin).href);
		assert.equal(response.status(), 200, href);
		if (href.includes('.svg')) assert.ok((await response.text()).includes('#3d6bf5'));
	}
	await shot(page, 'portfolio-desktop');

	// Opening sequence: the first command is typed, then the output prints; it plays once
	assert.equal(await page.locator('.output.boot .prompt.typed').count(), 1);
	const typing = page.locator('.typed > :nth-child(3)');
	assert.equal(await typing.textContent(), 'fastfetch');
	assert.deepEqual(
		await typing.evaluate((el) => {
			const style = getComputedStyle(el);
			return [style.animationName, style.animationDuration, style.animationTimingFunction];
		}),
		['type', '0.576s', 'steps(9)']
	);
	await page.locator('.typed > .cursor').evaluate((el) => {
		for (const animation of el.getAnimations()) animation.pause();
	});
	const cursorAt = (ms) =>
		page.locator('.typed > .cursor').evaluate((el, time) => {
			for (const animation of el.getAnimations()) animation.currentTime = time;
			return Math.round(
				el.getBoundingClientRect().x - el.parentElement.children[2].getBoundingClientRect().x
			);
		}, ms);
	const character = await typing.evaluate((el) => el.getBoundingClientRect().width / 9);
	assert.equal(await cursorAt(0), 0);
	assert.equal(await cursorAt(640 + 576), Math.round(character * 9));
	assert.equal(
		await page.locator('.fetch').evaluate((el) => getComputedStyle(el).animationDelay),
		'1.376s'
	);
	await tab('about').click();
	await heading('A little about me').waitFor();
	assert.equal(await page.locator('.boot, .typed').count(), 0);
	await tab('overview').click();
	await heading('Pedro Kielblock').waitFor();
	assert.equal(await page.locator('.boot, .typed').count(), 0);

	// Overview links open their section
	const links = page.getByRole('navigation', { name: 'Profile links' });
	assert.equal(await links.getByRole('link').count(), 7);
	assert.equal(
		await links.getByRole('link', { name: /^github/ }).getAttribute('href'),
		'https://github.com/pkielblock'
	);
	for (const [file, category, text] of [
		['education.md', 'Education', 'Technologist in Systems Analysis and Development'],
		['certifications.md', 'Certifications', 'C2 Proficiency'],
		['courses.md', 'Courses', 'Complete Java Course - REST API/Spring Boot/OOP/JPA']
	]) {
		await links.getByRole('link', { name: file, exact: true }).click();
		await page.getByText(text).waitFor();
		assert.equal(await tab('learning').getAttribute('aria-current'), 'page');
		assert.equal(
			await page.getByRole('button', { name: category, exact: true }).getAttribute('aria-pressed'),
			'true'
		);
		await tab('overview').click();
		await links.waitFor();
	}

	// Sections
	await tab('about').click();
	await heading('A little about me').waitFor();
	assert.equal(await page.locator('.inline-links a').count(), 2);
	await shot(page, 'about');
	await tab('experience').click();
	await heading('Work experience').waitFor();
	assert.equal(await page.locator('details[open]').count(), 1);
	await page.locator('summary').filter({ hasText: 'Intern' }).click();
	assert.equal(await page.locator('details[open]').count(), 2);

	await tab('learning').click();
	await heading('Keep learning').waitFor();
	await page.getByRole('button', { name: 'Education', exact: true }).click();
	assert.equal(
		await page.getByRole('link', { name: /Technical Degree/ }).getAttribute('href'),
		'http://www.etelg.com.br/'
	);
	const certifications = page.getByRole('button', { name: 'Certifications', exact: true });
	await certifications.focus();
	await page.keyboard.press('Enter');
	await page.getByText('C2 Proficiency').waitFor();
	assert.ok(await certifications.evaluate((el) => el === document.activeElement));
	assert.deepEqual(
		await page.locator('.rows a').evaluateAll((rows) => rows.map((row) => row.href)),
		[
			'https://www.cambridgeenglish.org/exams-and-tests/qualifications/proficiency/',
			'https://www.ets.org/toeic/about/listening-reading.html',
			'https://www.cambridgeenglish.org/exams-and-tests/qualifications/advanced/',
			'https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/'
		]
	);
	await shot(page, 'certifications');
	await page.getByRole('button', { name: 'Courses', exact: true }).click();
	await page.getByRole('link', { name: /Complete Java Course/ }).waitFor();
	assert.equal(await page.locator('a[href="/certificates/java-en.pdf"]').count(), 1);
	assert.equal(await page.locator('a[href="/certificates/iot.pdf"]').count(), 1);
	assert.equal(
		await page.getByRole('link', { name: 'View course' }).getAttribute('href'),
		'https://www.udemy.com/share/101scA3@-D140oZP3RgZDsD-bivzG16DSDWYmgIvpqdnzxmMrQyOq31_x6UtNeJHKkAgrUdt/'
	);
	for (const file of ['java-en.pdf', 'java-pt-BR.pdf', 'iot.pdf']) {
		const response = await context.request.get(origin + '/certificates/' + file);
		assert.equal(response.status(), 200);
		assert.match(response.headers()['content-type'], /application\/pdf/);
		assert.equal((await response.body()).subarray(0, 5).toString(), '%PDF-');
	}
	await shot(page, 'courses');

	// Contact and clipboard
	await tab('contact').click();
	await heading('Contact').waitFor();
	await shot(page, 'contact');
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

	// Window size, history, skip link, deep links
	const frame = page.locator('.terminal-window');
	assert.equal((await frame.boundingBox()).width, 1408);
	await page.getByRole('button', { name: 'Restore window' }).click();
	assert.deepEqual(await frame.boundingBox().then((box) => [box.width, box.height]), [1152, 720]);
	await page.getByRole('button', { name: 'Expand window' }).click();
	await page.goBack();
	await heading('Keep learning').waitFor();
	await page.locator('.skip-link').focus();
	await page.keyboard.press('Enter');
	assert.equal(await page.evaluate(() => document.activeElement.id), 'screen');
	await heading('Keep learning').waitFor();
	await page.goto(origin + '/#about');
	await heading('A little about me').waitFor();
	await page.goto(origin + '/#constructor');
	await heading('Pedro Kielblock').waitFor();

	// Journal
	await tab('journal').click();
	await heading('Journal').waitFor();
	await page.getByRole('link', { name: /about-me\.md/ }).click();
	await heading('Background').waitFor();
	assert.equal(await tab('journal').getAttribute('aria-current'), 'page');
	assert.deepEqual(
		await page.locator('.journal-content pre').evaluate((el) => ({
			background: getComputedStyle(el).backgroundColor,
			fontSize: getComputedStyle(el).fontSize
		})),
		{ background: 'rgb(22, 24, 28)', fontSize: '16px' }
	);
	await shot(page, 'journal');
	await page.reload();
	await heading('Background').waitFor();

	// Old blog links land in the journal; removed and unknown pages fail like a shell
	await page.goto(origin + '/blog');
	await heading('Journal').waitFor();
	await page.goto(origin + '/blog/about-me');
	await heading('Background').waitFor();
	assert.equal(new URL(page.url()).hash, '#journal/about-me');
	assert.equal((await context.request.get(origin + '/blog/__missing__')).status(), 404);
	const missing = await page.goto(origin + '/privacy');
	assert.equal(missing.status(), 404);
	await heading('cat: /privacy: No such file or directory').waitFor();
	assert.equal(await tabs.locator('[aria-current]').count(), 0);
	await page.getByRole('link', { name: 'Back to home' }).click();
	await heading('Pedro Kielblock').waitFor();
	const posts = await (await context.request.get(origin + '/api/content')).json();
	assert.ok(posts.length > 0 && posts.every((post) => post.published));

	// Small screens: no sideways scroll, no clipped tabs
	const hashes = ['overview', 'about', 'experience', 'courses', 'certifications', 'contact'];
	for (const width of [320, 360, 390, 430, 768]) {
		await page.setViewportSize({ width, height: 844 });
		for (const hash of [...hashes, 'journal', 'journal/about-me']) {
			await page.goto(origin + '/#' + hash);
			await page.locator('.output').waitFor();
			assert.ok(await noOverflow(page), `Horizontal overflow: ${hash} at ${width}px`);
		}
		assert.ok(
			await tabs.evaluate((nav) =>
				[...nav.querySelectorAll('a')].every((link) => link.scrollWidth <= link.clientWidth)
			),
			`Tab clipped at ${width}px`
		);
	}
	await page.setViewportSize({ width: 844, height: 390 });
	await page.goto(origin);
	assert.ok(await noOverflow(page), 'Landscape overflow');
	await tab('contact').click();
	await heading('Contact').waitFor();
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto(origin);
	await heading('Pedro Kielblock').waitFor();
	assert.equal(await page.getByRole('button', { name: 'Restore window' }).isVisible(), false);
	await shot(page, 'portfolio-mobile');

	// Desktop: the window fills the viewport and the screen scrolls inside it
	for (const [width, height] of [
		[1920, 1080],
		[1440, 900],
		[1024, 768]
	]) {
		await page.setViewportSize({ width, height });
		await page.goto(origin);
		await heading('Pedro Kielblock').waitFor();
		await frame.evaluate((el) =>
			Promise.all(el.getAnimations().map((entrance) => entrance.finished))
		);
		const box = await frame.boundingBox();
		assert.deepEqual([box.x, box.y, box.width, box.height].map(Math.round), [
			16,
			16,
			width - 32,
			height - 32
		]);
		assert.ok(await page.evaluate(() => document.documentElement.scrollHeight <= innerHeight));
		if (width === 1920) await shot(page, 'portfolio-wide');
	}
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.reload();
	await heading('Pedro Kielblock').waitFor();
	assert.equal(await page.locator('.typed > .cursor').isVisible(), false);
	assert.equal(
		await page.locator('.fetch').evaluate((el) => getComputedStyle(el).animationName),
		'none'
	);
	assert.equal(
		await page
			.locator('.cursor')
			.last()
			.evaluate((el) => getComputedStyle(el).animationIterationCount),
		'1'
	);

	// Portuguese
	const portugueseContext = await browser.newContext({
		locale: 'pt-BR',
		reducedMotion: 'reduce',
		viewport: { width: 1440, height: 900 }
	});
	const pt = await portugueseContext.newPage();
	pt.on('pageerror', (error) => errors.push(error.message));
	const ptHeading = (name) => pt.getByRole('heading', { name, exact: true });
	await pt.goto(origin);
	await pt.getByRole('link', { name: 'visão-geral', exact: true }).waitFor();
	assert.equal(await pt.locator('html').getAttribute('lang'), 'pt-BR');
	assert.equal(await pt.evaluate(() => localStorage.getItem('portfolio-language')), null);
	await shot(pt, 'portfolio-portuguese');
	for (const [hash, name] of [
		['about', 'Um pouco sobre mim'],
		['experience', 'Experiência profissional'],
		['learning', 'Continuar aprendendo'],
		['contact', 'Contato'],
		['journal/about-me', 'Formação']
	]) {
		await pt.goto(origin + '/#' + hash);
		await ptHeading(name).waitFor();
	}
	await pt.goto(origin + '/#courses');
	await pt.getByRole('link', { name: /Curso completo de Java/ }).waitFor();
	assert.equal(await pt.locator('a[href="/certificates/java-pt-BR.pdf"]').count(), 1);
	assert.equal(await pt.getByRole('link', { name: 'Ver curso' }).count(), 1);
	await pt.getByRole('button', { name: 'English', exact: true }).click();
	await pt.getByRole('link', { name: /Complete Java Course/ }).waitFor();
	assert.equal(await pt.evaluate(() => localStorage.getItem('portfolio-language')), 'en');
	await pt.reload();
	await pt.getByRole('link', { name: /Complete Java Course/ }).waitFor();
	assert.equal(await pt.locator('html').getAttribute('lang'), 'en');
	await pt.getByRole('button', { name: 'Português', exact: true }).click();
	await pt.goto(origin + '/privacy');
	await ptHeading('cat: /privacy: Arquivo ou diretório inexistente').waitFor();
	for (const width of [320, 390, 768]) {
		await pt.setViewportSize({ width, height: 844 });
		for (const hash of hashes) {
			await pt.goto(origin + '/#' + hash);
			await pt.waitForFunction(() => document.documentElement.lang === 'pt-BR');
			assert.ok(await noOverflow(pt), `Portuguese overflow at ${width}px in ${hash}`);
		}
		assert.ok(
			await pt
				.locator('.window-tabs')
				.evaluate((nav) =>
					[...nav.querySelectorAll('a')].every((link) => link.scrollWidth <= link.clientWidth)
				),
			`Portuguese tab clipped at ${width}px`
		);
	}
	await portugueseContext.close();

	// Blocked browser storage
	const blockedStorage = await browser.newContext({ locale: 'pt-BR', reducedMotion: 'reduce' });
	await blockedStorage.addInitScript(() => {
		Object.defineProperty(window, 'localStorage', {
			get() {
				throw new DOMException('Storage blocked', 'SecurityError');
			}
		});
	});
	const blockedPage = await blockedStorage.newPage();
	blockedPage.on('pageerror', (error) => errors.push(error.message));
	await blockedPage.goto(origin);
	await blockedPage.getByRole('link', { name: 'visão-geral', exact: true }).waitFor();
	await blockedPage.getByRole('button', { name: 'English', exact: true }).click();
	await blockedPage.getByRole('link', { name: 'overview', exact: true }).waitFor();
	await blockedStorage.close();
	assert.deepEqual(errors, []);
	console.log(
		'Passed: theme and font, favicon, tabs, overview links, sections, learning categories, clipboard success and failure, window size, history, skip link, deep links, journal, old blog links, 404, 40 small-screen views, landscape, 3 desktop sizes, reduced motion, Portuguese, saved language, blocked storage, certificate PDFs and course links.'
	);
} finally {
	await browser.close();
}
