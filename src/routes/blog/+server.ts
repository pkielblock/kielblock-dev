import { redirect } from '@sveltejs/kit';

// The journal lives in the terminal now; old links keep working.
export function GET() {
	redirect(308, '/#journal');
}
