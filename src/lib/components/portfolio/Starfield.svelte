<script lang="ts">
	import { onMount } from 'svelte';
	export let paused = false;
	let canvas: HTMLCanvasElement;
	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		let width = 0,
			height = 0,
			frame = 0,
			time = 0,
			last = 0;
		let scrollOffset = window.scrollY;
		let heroHeight = 0;
		const hero = canvas.parentElement?.querySelector('.hero');
		let pointer = { x: -1000, y: -1000 };
		const reduced = matchMedia('(prefers-reduced-motion: reduce)');
		const stars = Array.from({ length: 260 }, () => ({
			x: Math.random(),
			y: Math.random(),
			size: Math.random() * 1.2 + 0.25,
			phase: Math.random() * 6.28
		}));
		const dust = Array.from({ length: 2200 }, () => ({
			angle: Math.random() * Math.PI * 2,
			radius: 0.56 + Math.pow(Math.random(), 1.6) * 0.56,
			size: Math.random() * 1.15 + 0.25,
			brightness: Math.random()
		}));
		let waves: { x: number; y: number; life: number }[] = [];
		function resize() {
			width = canvas.clientWidth;
			height = canvas.clientHeight;
			heroHeight = hero?.getBoundingClientRect().height ?? height;
			const dpr = Math.min(devicePixelRatio, 2);
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
		}
		function scroll() {
			scrollOffset = window.scrollY;
		}
		function move(e: PointerEvent) {
			const rect = canvas.getBoundingClientRect();
			pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		}
		function leave() {
			pointer = { x: -1000, y: -1000 };
		}
		function click(e: PointerEvent) {
			if (paused || reduced.matches) return;
			const rect = canvas.getBoundingClientRect();
			waves.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, life: 0 });
			waves = waves.slice(-6);
		}
		function draw(now: number) {
			frame = requestAnimationFrame(draw);
			if (document.hidden || now - last < 32) return;
			const delta = Math.min((now - last) / 1000, 0.05);
			last = now;
			const still = paused || reduced.matches;
			if (!still) time += delta;
			ctx!.clearRect(0, 0, width, height);
			for (const s of stars) {
				let x = s.x * width,
					y = (((s.y * height - scrollOffset * s.size * 0.08) % height) + height) % height;
				const dx = x - pointer.x,
					dy = y - pointer.y,
					distance = Math.hypot(dx, dy);
				if (!still && distance < 150 && distance > 0) {
					x += (dx / distance) * (150 - distance) * 0.2;
					y += (dy / distance) * (150 - distance) * 0.2;
				}
				ctx!.fillStyle = `rgba(224,225,231,${0.2 + (Math.sin(time * 0.65 + s.phase) + 1) * 0.22})`;
				ctx!.fillRect(x, y, s.size, s.size);
			}
			if (scrollOffset < heroHeight + 400) {
				const cx = width * (width > 700 ? 0.7 : 0.59),
					cy = heroHeight * (width > 700 ? 0.44 : 0.22) - scrollOffset;
				const radius = Math.min(width * 0.34, 380);
				const px = still || pointer.x < 0 ? 0 : (pointer.x / width - 0.5) * 14;
				const py = still || pointer.y < 0 ? 0 : (pointer.y / height - 0.5) * 12;
				ctx!.save();
				ctx!.translate(cx + px, cy + py);
				ctx!.rotate(-0.48);
				const halo = ctx!.createRadialGradient(0, 0, radius * 0.28, 0, 0, radius * 1.23);
				halo.addColorStop(0, 'rgba(155,90,255,0)');
				halo.addColorStop(0.45, 'rgba(135,65,255,.045)');
				halo.addColorStop(0.7, 'rgba(125,45,255,.12)');
				halo.addColorStop(1, 'rgba(140,70,255,0)');
				ctx!.fillStyle = halo;
				ctx!.fillRect(-radius * 1.4, -radius * 1.4, radius * 2.8, radius * 2.8);
				for (let i = 0; i < 9; i++) {
					ctx!.beginPath();
					ctx!.ellipse(
						0,
						0,
						radius * (0.65 + i * 0.045),
						radius * (0.19 + i * 0.018),
						0,
						0,
						Math.PI * 2
					);
					ctx!.strokeStyle = `rgba(${140 + i * 8},100,255,${0.08 - i * 0.006})`;
					ctx!.lineWidth = 1;
					ctx!.stroke();
				}
				for (const d of dust) {
					const a = d.angle + (time * 0.065) / d.radius;
					const x = Math.cos(a) * radius * d.radius;
					const y = Math.sin(a) * radius * d.radius * 0.34;
					ctx!.fillStyle = `rgba(${140 + d.brightness * 90},${90 + d.brightness * 80},255,${0.2 + d.brightness * 0.6})`;
					ctx!.fillRect(x, y, d.size, d.size);
				}
				ctx!.restore();
				const core = radius * 0.415;
				const glow = ctx!.createRadialGradient(
					cx + px,
					cy + py,
					core * 0.95,
					cx + px,
					cy + py,
					core * 1.38
				);
				glow.addColorStop(0, 'rgba(190,145,255,.6)');
				glow.addColorStop(0.12, 'rgba(145,80,255,.3)');
				glow.addColorStop(1, 'rgba(155,80,255,0)');
				ctx!.fillStyle = glow;
				ctx!.beginPath();
				ctx!.arc(cx + px, cy + py, core * 1.38, 0, Math.PI * 2);
				ctx!.fill();
				ctx!.fillStyle = '#050505';
				ctx!.beginPath();
				ctx!.arc(cx + px, cy + py, core, 0, Math.PI * 2);
				ctx!.fill();
				ctx!.strokeStyle = 'rgba(191,155,255,.9)';
				ctx!.lineWidth = 1.3;
				ctx!.stroke();
				// A soft reflection follows the inner rim, leaving the center dark.
				const reflection = time * 0.22;
				ctx!.save();
				ctx!.beginPath();
				ctx!.arc(cx + px, cy + py, core - 2, 0, Math.PI * 2);
				ctx!.clip();
				const reflectionX = cx + px + Math.cos(reflection) * core * 0.86;
				const reflectionY = cy + py + Math.sin(reflection) * core * 0.86;
				const innerGlow = ctx!.createRadialGradient(
					reflectionX,
					reflectionY,
					0,
					reflectionX,
					reflectionY,
					core * 0.8
				);
				innerGlow.addColorStop(0, `rgba(159,105,245,${0.11 + Math.sin(time * 0.7) * 0.025})`);
				innerGlow.addColorStop(1, 'rgba(110,60,200,0)');
				ctx!.fillStyle = innerGlow;
				ctx!.fillRect(cx + px - core, cy + py - core, core * 2, core * 2);
				ctx!.restore();
				// The coordinate callout stays attached to the event horizon during parallax.
				const side = width > 900 ? 1 : -1;
				const markerX = cx + px + side * core * 0.72;
				const markerY = cy + py - core * 0.72;
				const labelX = markerX + side * 24;
				const labelY = markerY - 28;
				ctx!.strokeStyle = 'rgba(181,150,255,.45)';
				ctx!.lineWidth = 0.7;
				ctx!.beginPath();
				ctx!.moveTo(markerX - 4, markerY);
				ctx!.lineTo(markerX + 4, markerY);
				ctx!.moveTo(markerX, markerY - 4);
				ctx!.lineTo(markerX, markerY + 4);
				ctx!.moveTo(markerX + side * 6, markerY - 6);
				ctx!.lineTo(labelX, labelY + 8);
				ctx!.lineTo(labelX + side * 20, labelY + 8);
				ctx!.stroke();
				ctx!.font = `${width > 700 ? 9 : 7}px monospace`;
				ctx!.textAlign = side === 1 ? 'left' : 'right';
				ctx!.fillStyle = 'rgba(205,187,236,.8)';
				ctx!.fillText('23°39′ S / 46°32′ W', labelX, labelY);
				ctx!.font = `${width > 700 ? 8 : 6}px monospace`;
				ctx!.fillStyle = 'rgba(161,148,181,.65)';
				ctx!.fillText('Santo André, Brazil', labelX, labelY + 23);
				ctx!.textAlign = 'start';
			}
			if (!still)
				waves = waves.filter((w) => {
					w.life += delta;
					ctx!.beginPath();
					ctx!.arc(w.x, w.y, w.life * 300, 0, Math.PI * 2);
					ctx!.strokeStyle = `rgba(185,140,255,${Math.max(0, 1 - w.life) * 0.6})`;
					ctx!.lineWidth = 1;
					ctx!.stroke();
					return w.life < 1;
				});
		}
		const observer = new ResizeObserver(resize);
		observer.observe(canvas);
		if (hero) observer.observe(hero);
		window.addEventListener('scroll', scroll, { passive: true });
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerdown', click);
		document.addEventListener('pointerleave', leave);
		resize();
		frame = requestAnimationFrame(draw);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener('scroll', scroll);
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerdown', click);
			document.removeEventListener('pointerleave', leave);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: fixed;
		z-index: -1;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
