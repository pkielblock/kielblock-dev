// This remains a Server Component
import { getDictionary } from "../../../lib/dictionaries"; 
import HomePageContent from "../../../components/HomePageContent"; // Import the new client component

// Main page component fetches data and passes it to the client component
export default async function Home(props) {
	const params = await props.params;
	const lang = params.lang;
	const dict = await getDictionary(lang);
	return <HomePageContent dict={dict} lang={lang} />;
} 