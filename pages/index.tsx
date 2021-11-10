import Hero from '../components/home/Hero';
import Services from '../components/home/Services'; 
import Layout from '../components/Layout';
import { authUserServerSideProps } from '../lib/auth';

export const getServerSideProps = async (context) => {
	const data = await authUserServerSideProps(context);
	return { props: { ...data } };
};

export default function Home({ props }) {
	return (
		<Layout user={props?.givenName}>
			<Hero />
			<Services />  
		</Layout>
	);
}
